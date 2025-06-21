export const languageCompiler = async ({ body }: any) => {
	
	const filePath = `${process.cwd()}\\..\\temp\\input.txt`;
	await Bun.write(filePath, body.code);

	if (body.lang === 'javascript') {

		const proc = Bun.spawn(['node', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()
		const errors = await Bun.readableStreamToText(proc.stderr)

		if (errors) {
			return { output: errors }
		}
		return { output: output }
	}

	if (body.lang === 'python') {

		const proc = Bun.spawn(['python', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()
		const errors = await Bun.readableStreamToText(proc.stderr)

		if (errors) {
			return { output: errors }
		}
		return { output: output }
	}
	
	if (body.lang === 'lua') {

		const proc = Bun.spawn(['lua', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()
		const errors = await Bun.readableStreamToText(proc.stderr)

		if (errors) {
			return { output: errors }
		}
		return { output: output }
	}

}