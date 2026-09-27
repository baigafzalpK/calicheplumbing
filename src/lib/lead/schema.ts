import { z } from "zod";

const clean = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((s) => s.replace(/[<>]/g, ""));

import { phoneRe } from "./phone";
export { phoneRe };

export const leadSchema = z.object({
  service: clean(80).pipe(z.string().min(1, "Choose what you need help with")),
  emergency: z.boolean(),
  zip: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
  timing: z.enum(["asap", "today", "this-week", "flexible"]).optional(),
  name: clean(80).pipe(z.string().min(2, "Enter your name")),
  phone: z.string().trim().regex(phoneRe, "Enter a 10-digit US phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(120)]).optional(),
  contactMethod: z.enum(["call", "text", "email"]).optional(),
  notes: clean(1000).optional(),
  consent: z.literal(true, { message: "Please agree so a plumber can contact you" }),
  // Anti-spam
  company: z.string().max(0).optional(),
  startedAt: z.number().optional(),
  attribution: z.record(z.string(), z.string().max(300)).optional(),
});

export type Lead = z.infer<typeof leadSchema>;
