import type { VercelRequest, VercelResponse } from "@vercel/node";

import { categories, insertCategorySchema, insertMugsSchema, mugs } from "../../drizzle/schema";
import { buildDbClient } from "./../_db";

import { v4 as uuidv4 } from "uuid";

const checkValidBody = (data: VercelRequest["body"]) => {
  const { name, description, price, category_id, image } = data;
  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof price !== "number" ||
    typeof category_id !== "string"
  ) {
    return null;
  }
  const imageObj = image?.length && typeof image === "string" ? { image } : {};
  return { name, description, price, category_id, ...imageObj };
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const db = buildDbClient(process.env);

  if (req.method === "GET") {
    const mugsData = await db.select().from(mugs).all();
    return res.json({ mugs: mugsData });
  }

  if (req.method === "POST") {
    const reqBody = checkValidBody(req.body);
    if (!reqBody) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    const { category_id, ...jsonData } = reqBody;
    const mugData = insertMugsSchema.safeParse({
      id: uuidv4(),
      categoryId: category_id,
      ...(jsonData as object),
    });
    if (!mugData.success) {
      const { message, path } = mugData.error.issues[0];
      return res.status(path.length ? 422 : 400).json({ error: `[${path}]: ${message}` });
    }

    const newMug = await db.insert(mugs).values(mugData.data).returning().get();
    return res.status(201).json({ mug: newMug });
  }

  return res.status(405).json({ error: "Unsupported method" });
};
