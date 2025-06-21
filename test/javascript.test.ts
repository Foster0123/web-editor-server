import { describe, it, expect } from 'bun:test'

describe('Check JavaScript Compilation', () => {
	const JSCode = 
	`
		class User {
			constructor (name, age) {
				this.name = name
				this.age = age
			}
		}
		const user = new User('Foster Z', 19);
		console.log('Name: ' + user.name + ', Age: ' + user.age)
	`

	const JSCodeWithErr = 
	`
		class User {
			constructor (name, age) {
				this.name = name
				this.age = age
			}
		}
		const user = new User('Foster Z', 19);
		console.log('Name: ' + user.name +
	`

	it('JavaScript is Compiled When The Code is Error Free', async () => {

		const filePath = `${process.cwd()}\\..\\temp\\input.txt`;
		await Bun.write(filePath, JSCode);

		const proc = Bun.spawn(['node', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()

		expect(output).toBe('Name: Foster Z, Age: 19\n')
	})

	it('JavaScript Compiler is Throwing Errors When The Code Contains Bugs or Errors', async () => {

		const filePath = `${process.cwd()}\\..\\temp\\input.txt`;
		await Bun.write(filePath, JSCodeWithErr);

		const proc = Bun.spawn(['node', filePath], { stderr: 'pipe' })
		const errors = await Bun.readableStreamToText(proc.stderr)

		let result = null;
		errors ? result = false : result = true

		expect(result).toBeFalsy()
	})

})