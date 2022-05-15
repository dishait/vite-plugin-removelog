import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import Removelog from 'vite-plugin-removelog'
import Compress from 'vite-plugin-compression'

export default defineConfig({
	plugins: [
		Vue(),
		Jsx(),
		Inspect(),
		Compress(),
		Removelog()
	]
})
