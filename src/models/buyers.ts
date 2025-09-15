import { z } from "zod";

const buyersSchema = z
  .object({
    id: z.string().optional(),
    fullName: z.string().min(2, "Please enter at least 2 characters"),
    email: z.email("Please enter a Valid email.").optional().or(z.literal("")),
    phone: z
      .string()
      .min(10, "Phone number should must contain 10–15 digits")
      .max(15, "Phone number should must contain 10–15 digits"),
    city: z.enum(["CHANDIGARH", "MOHALI", "ZIRKAPUR", "PANCHKULA", "OTHER"]),
    propertyType: z.enum(["APARTMENT", "VILLA", "PLOT", "OFFICE", "RETAIL"]),
    bhk: z
      .enum(["ONE", "TWO", "THREE", "FOUR", "STUDIO"])
      .optional()
      .nullable(),
    purpose: z.enum(["BUY", "RENT"]),
    budgetMin: z.string().optional(),
    budgetMax: z.string().optional(),
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
      .default("NEW")
      .optional(),
    notes: z.string().max(1000).optional(),
    tags: z.string().optional(),
    updatedAt: z.date().optional(),
    ownerId: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.budgetMin ||
      !data.budgetMax ||
      Number(data.budgetMax) >= Number(data.budgetMin),
    {
      message: "Maximum budget should be greater than or equal to minimum",
      path: ["budgetMax"],
    }
  )
  .refine(
    (data) => !["APARTMENT", "VILLA"].includes(data.propertyType) || !!data.bhk,
    {
      message: "Please select BHK for Apartment or Villa",
      path: ["bhk"],
    }
  );

export default buyersSchema;
