import { z } from "zod";

export const IUserSchema = z.object({
  age: z.number().min(18).max(99),
  gender: z.number().min(1).max(2),
  height: z.number().min(100).max(999),
  residence: z.number().min(1).max(47),
  selfExpression: z
    .object({
      first: z.string().max(20),
      second: z.string().max(20),
      third: z.string().max(20),
    })
    .optional(),
});
