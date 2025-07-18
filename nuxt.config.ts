// Make use of compile time environment var NUXT_APP_BASE_URL
// to make baseURL work for GitHub Pages deployments as well.
// See https://nuxt.com/deploy/github-pages and https://vite.dev/guide/env-and-mode.html for details.
const baseURL = import.meta.env.NUXT_APP_BASE_URL
	? import.meta.env.NUXT_APP_BASE_URL
	: "/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@pinia/nuxt", "@nuxtjs/google-fonts", "@nuxt/eslint"],
	devtools: { enabled: true },
	app: {
		head: {
			title: "abcjs: Quick Editor",
			link: [
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: baseURL + "apple-touch-icon.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: baseURL + "favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: baseURL + "favicon-16x16.png",
				},
				{
					rel: "icon",
					type: "image/x-icon",
					href: baseURL + "favicon.ico?x=2",
				},
			],
		},
	},
	css: ["abcjs/abcjs-audio.css", "@webcoder49/code-input/code-input.css"],
	compatibilityDate: "2024-11-01",
	eslint: {
		checker: true,
	},
	googleFonts: {
		families: {
			"Roboto": [300, 400, 500, 700],
			"Kreon": true,
			"Itim": true,
			"Fira+Mono": true,
		},
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag === "code-input",
		},
	},
});
