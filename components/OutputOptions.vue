<template>
	<div class="output-options">
		<h2>Witness Image:</h2>
		<animated-button el="checkbox" label="Show Witness Uploader" id="showUpload" action="setShowUpload"></animated-button>
		<div><label>Zoom (%): <input type="number" v-model="uploadZoom"></label></div>
		<h2>Output:</h2>
		<animated-button el="button" label="Print" class="print-button" @click="print"></animated-button>
		<animated-button el="checkbox" label="Shorten Output" id="shortenOutput" action="setShortenOutput"></animated-button>
	</div>
</template>

<script>
// @Store MIGRATION to Pinia
//import {mapActions} from 'vuex';
import { mapActions } from "pinia";
import { useAbcStore } from "../store/abcStore";
import CheckBox from "./CheckBox";
import AnimatedButton from "./AnimatedButton";
export default {
	// @Store MIGRATION to Pinia
	setup() {
		const abcStore = useAbcStore();
		return {
			abcStore,
		};
	},
	name: "output-options",
	components: {AnimatedButton, CheckBox},
	computed: {
		uploadZoom: {
			get() {
				// @Store MIGRATION to Pinia
				//return this.$store.getters.uploadZoom; },
				return this.abcStore.uploadZoom; },
			set(value) {
				// Called when the user clicks with mouse
				this.setUploadZoom(parseInt(value,10));
			}
		},
	},
	data() {
		return {
		}
	},
	methods: {
		// @Store MIGRATION to Pinia
		//...mapActions(['setUploadZoom']),
		...mapActions(useAbcStore, ['setUploadZoom']),
		print() {
			window.print();
		},
	}
}
</script>

<style scoped>
.output-options {
	margin-top: 10px;
	white-space: nowrap;
	display: flex;
	flex-direction: column;
	padding: 10px;
}

.print-button {
	margin-bottom: 10px;
}
label {
	margin-bottom: 10px;
	background-color: white;
	padding: 10px 0 11px 5px;
}
input[type="number"] {
	font-size: 1em;
	padding: 10px;
	width: 70px;
}
h2 {
	text-shadow: none;
	color: black;
	margin-top: 15px;
	margin-bottom: 10px;
	font-size: 16px;
	background-color: rgba(255,255,255,0.2);
	padding: 5px 0;
}
</style>
