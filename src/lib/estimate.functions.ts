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
    const { saveLead } = await import("@/lib/leads.server");
    await saveLead({ ...data, source: "form" });
    return { ok: true as const };
  });
