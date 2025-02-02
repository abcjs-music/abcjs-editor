<template>
	<div class="container">
		<div id="print-version" />
		<header>
			<div class="header-image">
				<h1>quick editor</h1>
			</div>
		</header>
		<!-- @nvue3 MIGRATION: main has to provide attrs to inner components -->
		<!-- <main> -->
		<main v-bind="$attrs">
			<!-- @nuxt3 MIGRATION: -->
			<!-- <nuxt/> -->
			<NuxtPage />
		</main>
		<footer>
			<ul>
				<li>
					<span class="pgm-name">abcjs quick editor v{{ packageVersion }}</span> courtesy of <a class="link external-link" href="https://abcjs.net" target="_blank" rel="noreferrer">abcjs v{{ abcjsVersion }}</a><br>
					<button class="link external-link" rel="noreferrer" @click="bugs">
						Bugs and Feature Requests
					</button>
				</li>
				<li>
					Written by <a class="link external-link" href="https://paulrosen.net" target="_blank" rel="noreferrer">Paul Rosen</a><br>
					Copyright &copy; 2018-3 by Paul Rosen
				</li>
			</ul>
		</footer>
	</div>
</template>

<script>
import { version as abcjsVersion } from "abcjs/package.json";
import { version as packageVersion } from "./package.json";
// @ESlint: abcjs is NOT used!
// const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.

export default {
	data() {
		return {
			abcjsVersion,
			packageVersion,
		};
	},
	methods: {
		bugs() {
			window.location.href = "mailto:blog@paulrosen.net?subject=[abcjs-editor] ";
		},
	},
};
</script>

<style>
@font-face {
	font-family: 'itim-music';
	src:  	url('~/assets/fonts/itim-music.ttf') format('truetype'),
	url('~/assets/fonts/itim-music.woff') format('woff'),
	url('~/assets/fonts/itim-music.svg#icomoon') format('svg');
	font-weight: normal;
	font-style: normal;
}
.highlight {
	fill: #0a9ecc;
}
.abcjs-cursor {
	stroke: red;
}

	html {
		font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		box-sizing: border-box;
		margin: 0;
	}

	body {
		background-color: #f1f4f4;
		margin: 0;
	}

	header, footer {
		background: #a9e4f7; /* Old browsers */
		background: -moz-linear-gradient(left, #a9e4f7 0%, #0fb4e7 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(left, #a9e4f7 0%, #0fb4e7 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to right, #a9e4f7 0%, #0fb4e7 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#a9e4f7', endColorstr='#0fb4e7', GradientType=1); /* IE6-9 */
	}

	header {
		display: flex;
		margin-bottom: 20px;
		align-items: center;
		height: 40px;
	}

	/*header object {*/
		/*height: 77px;*/
	/*}*/

	.header-image {
		width: 100%;
		background-image: url("~/assets/abcjs_comp_extended_08.svg");
		background-repeat: no-repeat;
		background-size: cover;
		height: 30px;
	}

	header h1 {
		margin: 0;
		color: #333;
		font-size: 22px;
		font-family: "Fira Mono", Monaco, sans-serif;
		font-weight: normal;
		padding-left: 170px;
		padding-top: 6px;
		text-shadow: 1px 1px 1px white, -1px -1px 1px white;
	}

	.red-dot {
		fill: #D93928;
		stroke: white;
		stroke-width: 2px;
		height: 20px;
		position: absolute;
		top: 8px;
		left: 59px;
	}

	.logo-wrapper {
		width: 90px;
		height: 67px;
		display: flex;
		align-items: center;
		padding-top: 14px;
	}

	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	main {
		flex-grow: 2;
	}

	footer {
		padding: 1px 0;
		margin-top: 20px;
	}

	footer ul {
		list-style: none;
		padding: 5px;
		margin: 10px 40px 10px 0;
		opacity: 0.8;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.pgm-name {
		font-family: "Fira Mono", Monaco, sans-serif;
		border: 1px solid #aaaaaa;
		padding: 0 4px;
		background: #a9e4f7;
	}

	h2 {
		text-shadow: 1px 1px 1px white, -1px -1px 1px white;
		color: #0098c4;
		margin-bottom: 10px;
	}

	p {
		margin-bottom: 1em;
	}

	.link {
		text-shadow: 1px 1px #eeeeee;
		text-decoration: none;
		border: none;
		background: transparent;
		font-size: 1em;
		color: #000000;
		margin: 0;
		padding: 0;
	}

	.link:hover {
		text-decoration: underline;
	}

	.external-link::after {
		margin-left: 0.2em;
		display: inline-block;
		font-style: normal;
		font-variant: normal;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		font-size: .8em;
	}

	.external-link::after {
		font-weight: 900; content: "🔗";
	}

	table {
		box-shadow: 2px 2px 2px #aaaaaa, 0px -1px 0 #cccccc;
		margin-bottom: 10px;
	}
	tr:nth-child(odd) {
		background: rgba(255,255,255,.7);
	}
	td {
		border-left: 1px solid #aaaaaa;
		padding-left: 5px;
	}
	th {
		text-align: left;
		border-left: 1px solid #aaaaaa;
		padding-left: 5px;
	}

	pre {
		font-family: "Fira Mono", Monaco, sans-serif;
		box-shadow: 1px 1px 3px #aaaaaa;
		background: #f7f7f7;
		padding: 5px;
		color: #333;
	}

	@media screen and (min-width: 361px) {
		header {
			height: 70px;
			padding-left: 20px;
		}
		.header-image {
			height: 50px;
			font-size: 30px;
		}
		.red-dot {
			top: 15px;
			left: 91px;
			height: 30px;
		}
		header h1 {
			font-size: 35px;
			letter-spacing: -6px;
			padding-left: 130px;
		}
		.logo-wrapper {
			height: 74px;
		}
	}

	@media screen and (min-width: 565px) {
		header h1 {
			padding-left: 170px;
			padding-top: 6px;
		}
	}

	@media screen and (min-width: 670px) {
		main {
			margin: 10px 30px 0 30px;
		}
		header, footer {
			padding-left: 30px;
		}
		header {
			height: 100px;
		}
		.header-image {
			height: 80px;
		}
		.red-dot {
			top: 19px;
			left: 155px;
			height: 40px;
		}
		header h1 {
			font-size: 62px;
			margin-left: 25px;
			margin-top: 2px;
			padding-left: 190px;
		}
		.logo-wrapper {
			height: 98px;
		}
	}

	@media screen and (min-width: 900px) {
		.header-image {
			background-size: contain;
		}
		header h1 {
			padding-left: 170px;
			padding-top: 6px;
		}
	}

	@media print {
		header, footer, nav button, main section {
			display: none;
		}
	}
#print-version {
	display: none;
}
@media print {
	#print-version {
		display: block;
	}
	.no-print {
		display: none;
	}
}
</style>
