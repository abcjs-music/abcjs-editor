import pkg from './package'

export default {
	server: {
		port: 3000, // default: 3000
		host: '0.0.0.0', // default: localhost
	},

	/*
	** Headers of the page
	*/
	head: {
		title: "abcjs: Quick Editor",
		meta: [
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: pkg.description}
		],
		link: [
			{rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
			{rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
			{rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?x=2'},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Kreon|Itim|Fira+Mono'
			}
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: {color: '#3B8070'},

	/*
	** Global CSS
	*/
	css: [
		'abcjs/abcjs-audio.css'
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/pwa'
	],

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
		},

	},
	workbox: {
		runtimeCaching: [
			{
				urlPattern: 'https://fonts.googleapis.com/.*',
				handler: 'cacheFirst',
				method: 'GET',
				strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
			},
			{
				urlPattern: 'https://fonts.gstatic.com/.*',
				handler: 'cacheFirst',
				method: 'GET',
				strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
			},
		]
	}
};
