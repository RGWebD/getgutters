// Server-only: saves a customer lead and emails Pablo. Shared by the estimate form and AI chat.
export type LeadInput = {
  name: string;
  phone: string;
  email?: string | null;
  service?: string | null;
  message: string;
  source: "form" | "chat";
};

export async function saveLead(lead: LeadInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: row, error } = await supabaseAdmin
    .from("estimate_requests")
    .insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      service: lead.service || null,
      message: lead.message,
      source: lead.source,
    })
    .select("id, created_at")
    .single();

  if (error) {
    console.error("[lead] insert failed:", error.message);
    throw new Error("Could not save your request. Please try again.");
  }

  const ownerEmail = process.env["ESTIMATE_NOTIFICATION_EMAIL"];
  if (ownerEmail) {
    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("estimate-notification", ownerEmail, {
        templateData: {
          name: lead.name,
          phone: lead.phone,
          email: lead.email || "",
          service: `${lead.service || "Not specified"}${lead.source === "chat" ? " (via website chat)" : ""}`,
          message: lead.message,
          submittedAt: new Date(row.created_at).toLocaleString("en-US", {
            timeZone: "America/New_York",
          }),
        },
        idempotencyKey: `estimate-notification-${row.id}`,
        ...(lead.email ? { replyTo: lead.email } : {}),
      });
    } catch (err) {
      console.error("[lead] notification email failed:", err);
    }
  } else {
    console.warn("[lead] ESTIMATE_NOTIFICATION_EMAIL not set; skipping notification");
  }

  return row;
}
