import {z} from "zod";
export const registerSchema = z.object({
   email: z.string().trim().toLowerCase().email("Please provide valid email address").max(320,"Email address must not exceed 320 characters"),
   password:z.string().min(8,"Password must be at least 8 characters").max(128,"Password must not exceed 128 characters"),
   displayName:z.string().trim().min(2,"Display name must be at least 2 characters").max(100,"Display name must not exceed 100 characters").optional()
}).strict();
export type RegisterInput = z.infer<typeof registerSchema>;
export const loginSchema = z.object({
   email: z.string().trim().toLowerCase().email("Please provide valid email address").max(320,"Email address must not exceed 320 characters"),
   password:z.string().min(8,"Password must be at least 8 characters").max(128,"Password must not exceed 128 characters")
}).strict();
export type LoginInput = z.infer<typeof loginSchema>;