import { z } from "zod";

const buyersModel = z
  .object({
    fullName: z.string().min(2).max(80),
    email: z.email().optional(),
    phone: z.string().min(10).max(15),
    city: z.enum(["CHANDIGARH", "MOHALI", "ZIRKAPUR", "PANCHKULA", "OTHER"]),
    propertyType: z.enum(["APARTMENT", "VILLA", "PLOT", "OFFICE", "RETAIL"]),
    bhk: z.enum(["ONE", "TWO", "THREE", "FOUR", "STUDIO"]).optional(),
    purpose: z.enum(["BUY", "RENT"]),
    budgetMin: z.number().nonnegative().optional(),
    budgetMax: z.number().nonnegative().optional(),
    timeline: z.enum(["M_0_3", "M_3_6", "GT6M", "EXPLORING"]),
    source: z.enum(["WEBSITE", "REFERRAL", "WALK_IN", "CALL", "OTHER"]),
    status: z
      .enum([
        "NEW",
        "QUALIFIED",
        "CONTACTED",
        "VISITED",
        "NEGOTIATION",
        "CONVERTED",
        "DROPPED",
      ])
      .default("NEW"),
    notes: z.string().max(1000).optional(),
    tags: z.array(z.string()).optional(),
    updatedAt: z.date().optional(),
    ownerId: z.number().int().positive().optional(),
  })
  .refine(
    (data) => {
      if (data.budgetMin !== undefined && data.budgetMax != undefined) {
        if (data.budgetMin <= data.budgetMax) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    {
      message: "budgetMin must be less than or equal to budgetMax",
      path: ["budgetMin"],
    }
  );

export default buyersModel;
