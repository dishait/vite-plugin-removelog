import $ from 'gogocode'

export type Include = 'all' | (keyof typeof console)[]

/**
 * transform code
 * @param code the code of source
 * @param include scope to be removed
 * @returns the code of transformed
 */
export const transform = (
	code: string,
	include: Include = ['log', 'warn', 'error']
) => {
	let selectors
	if (include === 'all') {
		selectors = `console.$_$()`
	} else if (Array.isArray(include)) {
		selectors = include.map(type => {
			return `console.${type}()`
		})
	} else {
		throw new Error(
			`transform's include should be string or string[]`
		)
	}

	return (
		$(code, { parseOptions: { sourceType: 'module' } })
			// @ts-ignore
			.find(selectors)
			.remove()
			.generate()
	)
}
