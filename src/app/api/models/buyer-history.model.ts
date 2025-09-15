import { z } from "zod";
import buyersModel from "./buyers.model";

const buyerHistoryModel = z.object({
  buyerId: z.string(),
  changedBy: z.string(),
  changedAt: z.date().optional(),
  diff: z.object({ old: buyersModel.partial(), new: buyersModel.partial() }),
});

export default buyerHistoryModel;
