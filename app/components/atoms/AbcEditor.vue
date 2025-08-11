<template>
	<CodeInputWrapper
		ref="editor"
		:theme="theme"
		name="abc"
		ariaLabel="ABC string"
		:value="value"
		:fontSize="fontSize"
		@input="input($event)"
		@ready="ready"
	></CodeInputWrapper>

</template>

<script lang="ts" setup>
import CodeInputWrapper from "~/components/atoms/CodeInputWrapper.vue";
import abcjs, {type AbcElem, type AbcVisualParams, type Editor} from "abcjs";
import {CursorControl} from "~/helpers/cursor-control";
import {sleep} from "~/helpers/sleep";

const emit = defineEmits<{
	(e: "input", value: string): void;
	(e: "editorCreated", value: Editor): void;
}>();

const props = defineProps<{
	theme: string;
	value: string;
	fontSize: number;
	visualTranspose: number;
}>();

const abcjsEditor = ref(null as Editor|null)
const cursorControl = ref(new CursorControl("#canvas"))

watch(
	() => props.visualTranspose,
	() => {
		abcjsParams.value.visualTranspose = props.visualTranspose;
		updateParams()
	}
)

watch(
	() => props.value,
	() => {
		updateString()
	}
)

async function updateParams() {
	while (!abcjsEditor.value) {
		console.log("waiting for editor...")
		await sleep(1)
	}
	await nextTick()
	abcjsEditor.value.paramChanged(abcjsParams.value);
}

async function updateString() {
	while (!abcjsEditor.value) {
		console.log("waiting for editor...")
		await sleep(1)
	}
	await sleep(1)
	abcjsEditor.value.fireChanged();
}

const abcjsParams = ref({
	responsive: "resize",
	add_classes: true,
	clickListener: clickListener,
	oneSvgPerLine: true,
	jazzchords: true,
	format: {
		titlefont: "Kreon 24",
		subtitlefont: "Kreon 24",
		composerfont: "Helvetica 18 italic",
		gchordfont: "itim-music,Itim 20",
		tempofont: "Helvetica 14",
		partsfont: "Helvetica 20",
		partsbox: 1,
		annotationfont: "Helvetica-Oblique 10",
	},
} as AbcVisualParams)

function clickListener(abcElem : AbcElem) {
	const lastClicked = abcElem.midiPitches;
	if (!lastClicked || !abcjsEditor.value)
		return;

	abcjs.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, abcjsEditor.value.millisecondsPerMeasure()).then(function () {
		console.log("note played");
	}).catch(function (error) {
		console.log("error playing note", error);
	});
}

function input(value: string) {
	//console.log("input", value)
	emit('input', value)
}

async function ready(el: HTMLElement) {
	const abcjs = await import("abcjs");
	abcjsEditor.value = new abcjs.Editor(el, {
		canvas_id: "canvas",
		warnings_id: "warnings",
		synth: {
			el: "#midi",
			cursorControl: cursorControl.value,
			options: {
				displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true,
				// pan: [-1,1],
			},
		},
		abcjsParams: abcjsParams.value,
	});
	emit('editorCreated', abcjsEditor.value)
	el.focus();
	await updateParams()
}
</script>
