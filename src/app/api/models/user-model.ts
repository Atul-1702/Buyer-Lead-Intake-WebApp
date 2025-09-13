import { z } from "zod";

const UserModel = z.object({
  email: z.email().nonempty(),
  password: z.string().min(6).max(12),
  buyers: z.array(z.string()).optional(),
  history: z.string().optional(),
  role: z.enum(["ADMIN", "DEALER"]).optional().default("DEALER"),
});

export default UserModel;
