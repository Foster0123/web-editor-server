// ELysia Imports
import Elysia from 'elysia';
import cors from '@elysiajs/cors';

// Bun Imports
import { describe, it, expect } from 'bun:test';

// Test Suite -> Check Server Status
describe('Check Server Status', () => {
	it('Server Is Running', async () => {
		const value = 'Aight'
		const app = new Elysia()
		app.get('/', (response: any) => {
			return value
		})

		const response = await app.handle(new Request(`http://${process.env.HOST}`)).then((res) => res.text())

		expect(response).toBe(value);

	})
})