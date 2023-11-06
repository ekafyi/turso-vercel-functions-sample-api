import type { VercelRequest, VercelRequestQuery, VercelResponse } from "@vercel/node";

import { eq } from "drizzle-orm";
import { categories, insertCategorySchema, insertMugsSchema, mugs } from "../../drizzle/schema";
import { buildDbClient } from "../_db";

export default async (req: VercelRequest, res: VercelResponse) => {
  const id = req.query.id;
  if (!id || typeof id !== "string") {
    return res.status(422).json({ error: "ID is required" });
  }

  const db = buildDbClient(process.env);
  const categoryData = await db.select().from(categories).where(eq(categories.id, id)).get();
  return categoryData
    ? res.json({
        category: categoryData,
      })
    : res.status(404).json({ error: "Category not found!" });
};
