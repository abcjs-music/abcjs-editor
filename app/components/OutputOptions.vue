<template>
	<div class="output-options">
		<h2>Witness Image:</h2>
		<AnimatedButton id="showUpload" el="checkbox" label="Show Witness Uploader" :check-value="abcStore.showUpload" @checked="abcStore.setShowUpload($event)"/>
		<div><label>Zoom (%): <input :value="abcStore.uploadZoom" @input="setUploadZoom" type="number"></label></div>
		<h2>Output:</h2>
		<AnimatedButton el="button" label="Print" class="print-button" @click="print" />
		<AnimatedButton id="shortenOutput" el="checkbox" label="Shorten Output" :check-value="abcStore.shortenOutput" @checked="abcStore.setShortenOutput($event)" />
	</div>
</template>

<script lang="ts" setup>
import { useAbcStore } from "~/store/abcStore";
import AnimatedButton from "~/components/atoms/AnimatedButton.vue";

const abcStore = useAbcStore();

function print() {
	window.print();
}
function setUploadZoom(ev:Event) {
	//@ts-expect-error - ev.target does exist
	useAbcStore().setUploadZoom(parseInt(ev.target.value,10))
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
