import type { Plugin } from 'vite'
import type { Include } from './transform'
import { transform } from './transform'
import { createPluginName } from './shared/create'

interface Options {
	include: Include
}

const useName = createPluginName(false)

const usePlugin = (options?: Partial<Options>): Plugin => {
	const { include } = options || {}
	return {
		apply: 'build',
		enforce: 'post',
		name: useName('removelog'),
		transform(code, id) {
			if (
				/(\.vue|\.[jt]sx?)$/.test(id) &&
				!/node_modules/.test(id)
			) {
				return transform(code, include)
			}
		}
	}
}

export default usePlugin
