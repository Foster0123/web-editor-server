import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';

import { languageCompiler } from "./controllers/editor.controller";

const app = new Elysia({ serve: { hostname: process.env.HOST }})

app.post("/api", async ({ body }) => languageCompiler({ body })), 
	{
		body: t.Object({
			code: t.String(),
			lang: t.String()
		})
	}

app.use(cors())
app.listen(process.env.PORT ?? 3000);

console.log(`Web Editor's Server is running at ${app.server?.hostname}:${app.server?.port}`);