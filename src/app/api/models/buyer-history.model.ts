import { z } from "zod";
import buyersModel from "./buyers.model";

const buyerHistoryModel = z
  .object({
    buyerId: z.string(),
    changedBy: z.string(),
    changedAt: z.date().optional(),
    diff: z.object({ old: buyersModel.partial(), new: buyersModel.partial() }),
  })
  .refine(
    (data) =>
      data.diff.new.budgetMin !== undefined &&
      data.diff.new.budgetMax !== undefined
        ? data.diff.new.budgetMin <= data.diff.new.budgetMax
        : true,
    {
      message: "budgetMin must be less than or equal to budgetMax in diff",
      path: ["diff.budgetMin"],
    }
  );

export default buyerHistoryModel;
