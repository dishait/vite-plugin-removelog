import type { Plugin } from 'vite'
import type { Include } from './transform'
import { transform } from './transform'
import { createPluginName } from './shared/create'

interface Options {
	include: Include
	normalize: (path: string) => boolean
}

const useName = createPluginName(false)

function defaultNormalize(id: string) {
	return /(\.vue|\.[jt]sx?)$/.test(id)
}

export default function (
	options?: Partial<Options>
): Plugin {
	const { include, normalize = defaultNormalize } =
		options || {}
	return {
		apply: 'build',
		enforce: 'post',
		name: useName('removelog'),
		transform(code, id) {
			if (normalize(id) && !/node_modules/.test(id)) {
				return transform(code, include)
			}
		}
	}
}
