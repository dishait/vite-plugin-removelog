import { transform } from '../src/transform'
import { describe, expect, it } from 'vitest'

describe('remove log', () => {
	it('basic', () => {
		expect(
			transform(`console.log("foo")`)
		).toMatchInlineSnapshot('""')
	})

	it('multi parameter', () => {
		expect(
			transform(`console.log("foo", "bar", "jack");`)
		).toMatchInlineSnapshot('""')
	})

	it('other types', () => {
		expect(
			transform(`console.warn("foo"); console.error("bar")`)
		).toMatchInlineSnapshot('""')
	})

	it('other types', () => {
		expect(
			transform(`console.warn("foo"); console.error("bar")`)
		).toMatchInlineSnapshot('""')
	})

	it('include', () => {
		expect(
			transform(
				`console.log('log'); console.warn("warn"); console.error("error")`,
				['log', 'error']
			)
		).toMatchInlineSnapshot('"console.warn(\\"warn\\");"')

		expect(
			transform(
				`console.clear();console.error("bar")`,
				'all'
			)
		).toMatchInlineSnapshot('""')
	})

	it('typecheck', () => {
		expect(() =>
			transform(
				`console.clear();`,
				// @ts-ignore
				false
			)
		).toThrow(
			`transform's include should be string or string[]`
		)
	})
})
