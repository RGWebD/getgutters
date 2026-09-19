import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[0-9()+\-\s.]+$/),
  email: z.string().trim().email().max(255).or(z.literal("")).optional(),
  service: z.string().max(100).optional(),
  message: z.string().trim().min(10).max(2000),
});

export const submitEstimateRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("estimate_requests")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        service: data.service || null,
        message: data.message,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("[estimate] insert failed:", error.message);
      throw new Error("Could not save your request. Please try again.");
    }

    // Notify the owner by email. Failure to send must not fail the request —
    // the submission is already stored and visible in /admin.
    const ownerEmail = process.env["ESTIMATE_NOTIFICATION_EMAIL"];
    if (ownerEmail) {
      try {
        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        await sendTemplateEmail("estimate-notification", ownerEmail, {
          templateData: {
            name: data.name,
            phone: data.phone,
            email: data.email || "",
            service: data.service || "Not specified",
            message: data.message,
            submittedAt: new Date(row.created_at).toLocaleString("en-US", {
              timeZone: "America/New_York",
            }),
          },
          idempotencyKey: `estimate-notification-${row.id}`,
          ...(data.email ? { replyTo: data.email } : {}),
        });
      } catch (err) {
        console.error("[estimate] notification email failed:", err);
      }
    } else {
      console.warn("[estimate] ESTIMATE_NOTIFICATION_EMAIL not set; skipping notification");
    }

    return { ok: true as const };
  });
