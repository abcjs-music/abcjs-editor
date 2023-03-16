<template>
	<div class="intro-text">
		<collapsible-section class="no-print" title="Free online sheet music creation." :is-header2="true" :is-open="isOpen" @click="toggle">
			<div class="intro">
				<p>
					The input is in the form of ABC Notation and it is processed with
					<a href="https://abcjs.net" target="_blank" class="external-link muted" rel="noreferrer">abcjs</a>.
				</p>
				<p class="gdpr">✽ This website does not use cookies or collect any information about you or the music you create - everything you enter stays
					in the browser. Be sure to save any music you create elsewhere! (localStorage is used for your convenience to save your current work.)</p>
				<ul class="instructions">
					<li>☞
						Type ABC-formatted music in the box below and instantly see the sheet music being rendered.
					</li>
					<li>☞
						Click the "Help" button to see an abbreviated cheat sheet for the ABC Notation.
					</li>
					<li>☞
						Use the music player to test your input for typos.
					</li>
					<li>☞
						Click "Download" to download what you've typed to your computer (this is similar to
						cutting-and-pasting from the input box.)
					</li>
					<li>☞
						Click "Print" to see a version formatted for printing. (In the browser's
						print preview page, there is an option to "save as PDF" to keep a PDF version of your music.)
					</li>
					<li>☞
						If you are transcribing from an image, you can upload it and it will be shown along with the music for easier comparison.
					</li>
					<li>☞
						If you want to display a particular tune when this website opens, then pass it in using "?t=abcString". Note that abcString must be encoded so that special characters are handled by the browser. With Javascript that is done with the function "encodeURIComponent()".
					</li>
					<li class="offset">☞
						This website is provided for free as a convenience to you. I hope you find it useful! Tell your friends about <a href="https://abcjs.net" target="_blank" class="external-link muted" rel="noreferrer">abcjs</a>!
					</li>
				</ul>
			</div>
		</collapsible-section>
	</div>
</template>

<script>
import CollapsibleSection from "./CollapsibleSection";
import {getLocalStorage, setLocalStorage} from "../helpers/local-storage-wrapper";
export default {
	name: "intro-text",
	components: {CollapsibleSection},
	data() {
		return {
			isOpen: true
		}
	},
	mounted() {
		this.isOpen = getLocalStorage("intro-open", true, "Boolean")
	},
	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
			setLocalStorage("intro-open", this.isOpen);
		}
	}
}
</script>

<style scoped>
.intro {
	max-width: 900px;
}

.instructions {
	margin-top: 1em;
	list-style: none;
	padding: 0;
}

.gdpr {
	font-weight: bold;
	border: 1px solid #5c5c5c;
	color: #5c5c5c;
	padding: 5px;
}
@media print {
	.intro-text {
		display: none;
	}
}
.offset {
	margin-top: 1em;
}
</style>
