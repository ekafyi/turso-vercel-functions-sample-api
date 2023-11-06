# [Turso](https://turso.tech) + [Drizzle](https://orm.drizzle.team) + [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

Fork of https://github.com/turso-extended/api-mug-store-api, using Vercel Serverless Functions instead of [Cloudflare Workers](https://developers.cloudflare.com/workers/)

See details in [original code](https://github.com/turso-extended/api-mug-store-api).

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fekafyi%2turso-vercel-functions-sample-api)

Use the one-click deploy above OR setup locally from CLI:

1. Install [Vercel CLI](https://vercel.com/docs/cli)
2. Run `vercel`	in the project directory; follow the instructions to create a new Vercel project

Add your Turso credentials to [Vercel project env variables](https://vercel.com/docs/projects/environment-variables)

Docs: https://vercel.com/docs/deployments/overview

## Example

POST /api/mugs

```sh
curl --request POST \
  --url http://localhost:3000/api/mugs \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Lorem Mug",
  "description": "Consectetur sunt culpa reprehenderit voluptate pariatur nulla esse fugiat ipsum",
  "price": 1.23,
  "category_id": "aab5c2dd-1141-4f71-bdc2-c6344f52e174"
}'
```

DELETE /api/mugs/:id

```sh
curl --request DELETE \
  --url http://localhost:3000/api/mugs/REPLACE_WITH_MUG_ID \
  --header 'Content-Type: application/json' \
  --data '{}'
```

Replace `http://localhost:3000` with your base URL.
