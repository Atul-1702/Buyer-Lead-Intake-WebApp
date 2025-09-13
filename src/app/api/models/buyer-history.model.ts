import { z } from "zod";
import buyersModel from "./buyers.model";

const buyerHistoryModel = z
  .object({
    buyerId: z.string(),
    changedBy: z.string(),
    changedAt: z.date().optional(),
    diff: buyersModel.partial(),
  })
  .refine(
    (data) =>
      data.diff.budgetMin !== undefined && data.diff.budgetMax !== undefined
        ? data.diff.budgetMin <= data.diff.budgetMax
        : true,
    {
      message: "budgetMin must be less than or equal to budgetMax in diff",
      path: ["diff.budgetMin"],
    }
  );

export default buyerHistoryModel;
