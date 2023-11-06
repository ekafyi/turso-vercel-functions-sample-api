import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  return res.json({
    name: "The Mugs Store API",
    endpoints: [
      {
        path: "/",
        information: "Get this endpoints index",
        method: "GET",
      },
      {
        path: "/mugs",
        information: "Get a list of all mugs",
        method: "GET",
      },
      {
        path: "/categories",
        information: "Get a list of all mug categories",
        method: "GET",
      },
      {
        path: "/mug/$id",
        information: "Get the information on a mug whose $id was passed",
        method: "GET",
      },
      {
        path: "/category/$id",
        information: "Get the information on the mug category whose $id was passed",
        method: "GET",
      },
    ],
  });
};
