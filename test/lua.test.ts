import { describe, it, expect } from 'bun:test'

describe('Check Lua Compilation', () => {
	const LuaCode = 
	`
		local module = {}
		module.__index = module

		function module.new()
  			local User = setmetatable({}, module)
  
  			User.name = 'Foster Z '
  			User.age = '19'
  
  			return User
		end

		local user = module.new()

		print(user.name .. user.age)

	`

	const LuaCodeWithErr = 
	`
		local module = {}
		module.__index = module

		function module.new()
  			local User = setmetatable({}, module)
  
  			User.name = 'Foster Z'
  			User.age = '19'

	`

	it('Lua is Compiled When The Code is Error Free', async () => {

		const filePath = `${process.cwd()}\\..\\temp\\input.txt`;
		await Bun.write(filePath, LuaCode);

		const proc = Bun.spawn(['lua', filePath], { stderr: 'pipe' })
		const output = await new Response(proc.stdout).text()

		expect(output).toBe(
			`Foster Z 19\r\n`
		)
	})

	it('Lua Compiler is Throwing Errors When The Code Contains Bugs or Errors', async () => {

		const filePath = `${process.cwd()}\\..\\temp\\input.txt`;
		await Bun.write(filePath, LuaCodeWithErr);

		const proc = Bun.spawn(['lua', filePath], { stderr: 'pipe' })
		const errors = await Bun.readableStreamToText(proc.stderr)

		let result = null;
		errors ? result = false : result = true

		expect(result).toBeFalsy()
	})

})