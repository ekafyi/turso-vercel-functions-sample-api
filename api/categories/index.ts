import type { VercelRequest, VercelResponse } from "@vercel/node";

import { categories, insertCategorySchema, insertMugsSchema, mugs } from "../../drizzle/schema";
import { buildDbClient } from "../_db";

export default async (req: VercelRequest, res: VercelResponse) => {
  const db = buildDbClient(process.env);
  const categoryData = await db.select().from(categories).all();
  return res.json({ categories: categoryData });
};
