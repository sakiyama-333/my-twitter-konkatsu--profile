import { z } from "zod";

export const IUserSchema = z.object({
  age: z.number().min(18).max(99),
  gender: z.number().min(1).max(2),
  height: z.number().min(100).max(999),
  residence: z.number().min(1).max(47),
  selfExpression: z.array(z.string().max(20)).length(3).optional(),
});
