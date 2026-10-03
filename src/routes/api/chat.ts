import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-knowledge";

const MODEL = "openai/gpt-6-astra";
const RUN_HEADER = "X-Lovable-AIG-Run-ID";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Chat is not configured.", { status: 500 });

        let body: { conversationId?: string; messages?: UIMessage[] };
        try {
          const rawBody = await request.text();
          if (rawBody.length > 50_000) {
            return new Response("Request too large", { status: 413 });
          }
          body = JSON.parse(rawBody);
        } catch {
          return new Response("Invalid request", { status: 400 });
        }
        const conversationId = body.conversationId ?? "";
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
        if (!UUID_RE.test(conversationId) || messages.length === 0) {
          return new Response("Invalid request", { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        let leadCaptured = false;

        let runId = request.headers.get(RUN_HEADER)?.trim() || undefined;
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: async (input, init) => {
            const headers = new Headers(init?.headers);
            if (runId && !headers.has(RUN_HEADER)) headers.set(RUN_HEADER, runId);
            const res = await fetch(input, { ...init, headers });
            runId ??= res.headers.get(RUN_HEADER)?.trim() || undefined;
            return res;
          },
        });

        const result = streamText({
          model: provider.responses(MODEL),
          system: CHAT_SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
          stopWhen: stepCountIs(8),
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
          tools: {
            save_lead: tool({
              description:
                "Save the customer's contact info and project request so Pablo gets an email and can follow up with a free estimate.",
              inputSchema: z.object({
                name: z.string().trim().min(1).max(100).describe("Customer full name"),
                phone: z
                  .string()
                  .trim()
                  .min(7)
                  .max(20)
                  .regex(/^[0-9()+\-\s.]+$/)
                  .describe("Customer phone number"),
                email: z.string().trim().email().max(255).nullable().describe("Customer email, or null"),
                service: z.string().trim().max(100).nullable().describe("Service needed, or null"),
                details: z
                  .string()
                  .trim()
                  .min(10)
                  .max(2000)
                  .describe("Project description, location/area, and any notes"),
              }),
              execute: async (input) => {
                const name = input.name.trim().slice(0, 100);
                const phone = input.phone.trim().slice(0, 20);
                const email = (input.email ?? "").trim();
                if (!name || phone.replace(/\D/g, "").length < 7) {
                  return { ok: false, error: "Need a name and a valid phone number." };
                }
                const validEmail = z.string().email().safeParse(email).success ? email : null;
                try {
                  const { saveLead } = await import("@/lib/leads.server");
                  await saveLead({
                    name,
                    phone,
                    email: validEmail,
                    service: input.service?.slice(0, 100) || null,
                    message: (input.details || "Requested via website chat").slice(0, 2000),
                    source: "chat",
                  });
                  leadCaptured = true;
                  return { ok: true };
                } catch {
                  return { ok: false, error: "Could not save right now." };
                }
              },
            }),
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onFinish: async ({ messages: finalMessages }) => {
            const update: Record<string, unknown> = {
              id: conversationId,
              messages: finalMessages,
              updated_at: new Date().toISOString(),
            };
            if (leadCaptured) update.lead_captured = true;
            const { error } = await supabaseAdmin
              .from("chat_conversations")
              .upsert(update as never);
            if (error) console.error("[chat] save failed:", error.message);
          },
          onError: (err) => {
            console.error("[chat] stream error:", err);
            return "Sorry, the assistant is unavailable right now. Please call or text (904) 589-0000.";
          },
        });
      },
    },
  },
});
