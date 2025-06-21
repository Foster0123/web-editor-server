import { describe, it, expect } from 'bun:test'

describe('Check Python Compilation', () => {
	const PYCode = 
`
class User:
    def __init__(self,name,age):
        self.name = name
        self.age = age

user = User('Foster Z', 19)

print(f"Name: {user.name}, Age: {user.age}")
`

	const PYCodeWithErr = 
`
	class User:
	    def __init__(self,name,age):
	        self.name = name
	        self.age = age

	user = Us
`

	it('Python is Interpreted When The Code is Error Free', async () => {

		const filePath = `${process.cwd()}\\..\\temp\\input.txt`;
		await Bun.write(filePath, PYCode);

		const proc = Bun.spawn(['python', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()

		expect(output).toBe('Name: Foster Z, Age: 19\r\n')
	})

	it('Python Interpreter is Throwing Errors When The Code Contains Bugs or Errors', async () => {

		const filePath = `${process.cwd()}\\..\\temp\\input.txt`;
		await Bun.write(filePath, PYCodeWithErr);

		const proc = Bun.spawn(['python', filePath], { stderr: 'pipe' })
		const errors = await Bun.readableStreamToText(proc.stderr)

		let result = null;
		errors ? result = false : result = true

		expect(result).toBeFalsy()
	})

})