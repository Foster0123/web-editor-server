import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';

const app = new Elysia()

app.post("/api", async ({ body }) => {
	const filePath = `${process.cwd()}\\temp\\main.js`;
	const writePath = `${process.cwd()}\\temp\\output.txt`;
	if (body.lang === 'javascript') {

		Bun.write(filePath, body.code)

		const proc = Bun.spawn(['node', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()
		const errors = await Bun.readableStreamToText(proc.stderr)

		if (errors) {
			return { output: errors }
		}
		return { output: output }
	}
	if (body.lang === 'python') {

		Bun.write(filePath, body.code)

		const proc = Bun.spawn(['python', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()
		const errors = await Bun.readableStreamToText(proc.stderr)

		if (errors) {
			return { output: errors }
		}
		return { output: output }
	}
	if (body.lang === 'lua') {

		Bun.write(filePath, body.code)

		const proc = Bun.spawn(['lua', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()
		const errors = await Bun.readableStreamToText(proc.stderr)

		if (errors) {
			return { output: errors }
		}
		return { output: output }
	}
}, 
	{
		body: t.Object({
			code: t.String(),
			lang: t.String()
		})
	})

app.use(cors())
app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);