import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Removelog from 'vite-plugin-removelog'

export default defineConfig({
	plugins: [Vue(), Inspect(), Removelog()]
})
