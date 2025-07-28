<template>
	<div class="load-and-save">
		<AnimatedButton el="a" :label="downloadLabel" :download="abcFilename(currentTune)" :href="saveAbcString" />
		<AnimatedButton el="button" :label="saveLabel" @click="storeAbcString" />
		<div v-if="allTuneNames.length > 0">
			<h2>Load:</h2>
			<ul class="tune-picker">
				<li v-for="name in allTuneNames" :key="name">
					<AnimatedButton el="button" class="load" :label="name" @click="loadTune(name)" />
					<AnimatedButton el="button" label="×" :aria-label="`Delete ${name}`" @click="deleteTune(name)" />
				</li>
			</ul>
		</div>
		<div class="bottom-options">
			<label>Font Size: <input :value="fontSize" @input="abcStore.setFontSize(parseInt($event.target.value,10))" type="number" min="8" max="30"></label>
			<label>Visual Transpose: <input :value="visualTranspose" @input="abcStore.setVisualTranspose(parseInt($event.target.value,10))" type="number" min="-24" max="24"></label>
		</div>
		<div v-if="visualTranspose !== 0 && visualTranspose !== '0'" class="extra-bottom">
			<AnimatedButton el="button" label="Apply Transpose" @click="transposeSource" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAbcStore } from "~/store/abcStore";
import { abcTitle, abcFilename } from "~/helpers/abc";
import AnimatedButton from "./atoms/AnimatedButton.vue";

const props = defineProps<{
	currentTune: string;
}>();

const emit = defineEmits<{
	(e: "close"): void;
	(e: "load", ev: { abc: string }): void;
	(e: "transposeSource", { halfSteps: number}): void;
}>();

const abcStore = useAbcStore();

const allTuneNames = computed(() => abcStore.allTuneNames)
const fontSize = computed(() => abcStore.fontSize)
const visualTranspose = computed(() => abcStore.visualTranspose)

const saveAbcString = computed(() => `data:text/plain,${encodeURIComponent(props.currentTune)}`)
const saveLabel = computed(() => `Save "${abcTitle(props.currentTune)}" in browser`)
const downloadLabel = computed(() => `Download "${abcTitle(props.currentTune)}"`)


function storeAbcString() {
	abcStore.saveTune(props.currentTune);
	emit("close");
}
function loadTune(name) {
	const abc = abcStore.tuneByTitle(name);
	emit("load", { abc: abc });
}
function deleteTune(name) {
	abcStore.deleteTuneByName(name);
	//emit("close");
}
function transposeSource() {
	emit("transposeSource", { halfSteps: abcStore.visualTranspose });
	abcStore.setVisualTranspose(0);
	emit("close");
}

</script>

<style scoped>
.load-and-save {
	margin-top: 10px;
	white-space: nowrap;
	display: flex;
	flex-direction: column;
	padding: 10px;
}

/*.src-button {
//	padding: 10px;
//	border: 1px solid #0fb4e7;
//	border-radius: 4px;
//	background: white;
//	text-decoration: none;
//	font-size: 1em;
//	color: black;
//	margin-bottom: 5px;
//	text-align: left;
//}
*/
.tune-picker {
	max-height: 200px;
	overflow-y: auto;
	list-style: none;
	margin: 0;
	padding: 5px;
	box-shadow: 1px 1px 1px #888, -1px -1px 1px #bbbbbb;
}
.tune-picker li {
	display: flex;
	margin-bottom: 5px;
}
/*.load,.delete {*/
/*	background: white;*/
/*	font-size: 1em;*/
/*	padding: 5px;*/
/*	border: 1px solid #5c5c5c;*/
/*	border-radius: 4px;*/
/*}*/
.load {
	flex-grow: 2;
	margin-right: 20px;
	/*text-align: left;*/
	/*padding-left: 10px;*/
}
h2 {
	text-shadow: none;
	color: black;
	margin-top: 15px;
	margin-bottom: 10px;
	font-size: 16px;
}
.bottom-options {
	width: 100%;
	margin-top: 8px;
	background-color: #8DE0E8;
	display: flex;
	justify-content: space-between;
}
.bottom-options input {
	font-size: 1em;
	width: 50px;
}

.extra-bottom {
	margin-top: 10px;
    display: flex;
    justify-content: right;
}
</style>
