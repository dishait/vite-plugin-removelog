import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import Removelog from 'vite-plugin-removelog'

export default defineConfig({
	plugins: [
		Vue(),
		Jsx(),
		Inspect(),
		Removelog()
	]
})
