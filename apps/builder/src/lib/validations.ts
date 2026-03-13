import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const verifyTotpSchema = z.object({
  code: z.string().length(6),
  tempToken: z.string().min(1),
});

export const setupTotpSchema = z.object({
  code: z.string().length(6),
});
