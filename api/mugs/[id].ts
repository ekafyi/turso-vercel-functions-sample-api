import type { VercelRequest, VercelRequestQuery, VercelResponse } from "@vercel/node";

import { eq } from "drizzle-orm";
import { categories, insertCategorySchema, insertMugsSchema, mugs } from "../../drizzle/schema";
import { buildDbClient } from "./../_db";

export default async (req: VercelRequest, res: VercelResponse) => {
  const id = req.query.id;
  if (!id || typeof id !== "string") {
    return res.status(422).json({ error: "ID is required" });
  }

  const db = buildDbClient(process.env);

  if (req.method === "GET") {
    const mugData = await db.select().from(mugs).where(eq(mugs.id, id)).get();
    return mugData ? res.json({ mug: mugData }) : res.status(404).json({ error: "Mug not found!" });
  }

  // ⚠️ DELETE request must include JSON body (empty object is fine).
  // Alternative workaround: Use POST request (no body needed).
  // @link https://github.com/vercel/next.js/discussions/48072
  if (req.method === "DELETE") {
    const mugData = await db.delete(mugs).where(eq(mugs.id, id)).returning();
    return mugData ? res.json({ mug: mugData }) : res.status(404).json({ error: "Mug not found!" });
  }

  return res.status(405).json({ error: "Unsupported method" });
};
