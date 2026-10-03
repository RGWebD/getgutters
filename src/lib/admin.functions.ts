import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  accessCode: z.string().min(12).max(128),
  days: z.union([z.literal(7), z.literal(30), z.literal(90)]),
});

export const getAdminDashboardData = createServerFn({ method: "POST" })
  .inputValidator((data) => schema.parse(data))
  .handler(async ({ data }) => {
    const { createHash, timingSafeEqual } = await import("node:crypto");
    const adminAccessCode = process.env["ADMIN_ACCESS_CODE"];

    if (!adminAccessCode) {
      console.error("[admin] ADMIN_ACCESS_CODE is not configured");
      throw new Error("Private dashboard access is not configured.");
    }

    const suppliedHash = createHash("sha256").update(data.accessCode).digest();
    const expectedHash = createHash("sha256").update(adminAccessCode).digest();

    if (
      suppliedHash.length !== expectedHash.length ||
      !timingSafeEqual(suppliedHash, expectedHash)
    ) {
      throw new Error("Unauthorized");
    }

    const [{ supabaseAdmin }, { fetchGscData }] = await Promise.all([
      import("@/integrations/supabase/client.server"),
      import("@/lib/gsc.functions"),
    ]);

    const since = new Date(Date.now() - data.days * 86400000).toISOString();
    const [pageViewsResult, requestsResult, gsc] = await Promise.all([
      supabaseAdmin
        .from("page_views")
        .select("path, referrer, user_agent, visitor_id, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(10000),
      supabaseAdmin
        .from("estimate_requests")
        .select("id, name, phone, email, service, message, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
      fetchGscData(),
    ]);

    if (pageViewsResult.error || requestsResult.error) {
      console.error("[admin] dashboard query failed", {
        pageViews: pageViewsResult.error?.message,
        requests: requestsResult.error?.message,
      });
      throw new Error("Could not load the private dashboard.");
    }

    return {
      rows: pageViewsResult.data ?? [],
      requests: requestsResult.data ?? [],
      gsc,
    };
  });
