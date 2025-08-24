<template>
	<CodeInputWrapper
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
import abcjs, {type AbcElem, type AbcVisualParams, type Editor, type SynthOptions} from "abcjs";
import {CursorControl} from "~/helpers/cursor-control";
import {sleep} from "~/helpers/sleep";
import type {TablatureTypes} from "~/store/abcStore";

const emit = defineEmits<{
	(e: "input", value: string): void;
	(e: "editorCreated", value: Editor): void;
}>();

const props = defineProps<{
	theme: string;
	value: string;
	fontSize: number;
	visualTranspose: number;
	swingPlayback: boolean;
	tablature: TablatureTypes;
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
	() => props.tablature,
	() => {
		if (props.tablature === 'none')
			abcjsParams.value.tablature = []
		else
			abcjsParams.value.tablature = [{instrument: props.tablature}];
		updateParams()
	}
)

watch(
	() => props.swingPlayback,
	() => {
		setSwing(props.swingPlayback)
	}
)

watch(
	() => props.value,
	() => {
		updateString()
	}
)

function setSwing(on: boolean) {
	if (on) {
		abcjsSynthParams.value.swing = 75
		abcjsSynthParams.value.gchord = "bzczbzcz"
		abcjsSynthParams.value.bassprog = 58
		abcjsSynthParams.value.bassvol = 80
		abcjsSynthParams.value.chordprog = 25
		abcjsSynthParams.value.chordvol = 19
		abcjsSynthParams.value.program = 24
	} else {
		abcjsSynthParams.value = {}
	}
	updateSynthParams()
}

onMounted(() => {
	setSwing(props.swingPlayback)
})

async function updateParams() {
	while (!abcjsEditor.value) {
		console.log("waiting for editor...")
		await sleep(1)
	}
	await nextTick()
	abcjsEditor.value.paramChanged(abcjsParams.value);
}

async function updateSynthParams() {
	while (!abcjsEditor.value) {
		console.log("waiting for editor...")
		await sleep(1)
	}
	await nextTick()
	abcjsEditor.value.synthParamChanged(abcjsSynthParams.value);
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

const abcjsSynthParams = ref({
	displayLoop: true,
	displayRestart: true,
	displayPlay: true,
	displayProgress: true,
	displayWarp: true,
} as SynthOptions)

function clickListener(abcElem : AbcElem) {
	const textarea : HTMLInputElement | null = document.querySelector('textarea[name="abc"]')
	if (textarea && abcElem.startChar !== undefined && abcElem.endChar !== undefined) {
		textarea.setSelectionRange(abcElem.endChar,abcElem.endChar)
		textarea.focus()
		textarea.setSelectionRange(abcElem.startChar,abcElem.endChar)
	}
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
