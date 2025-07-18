<template>
	<div>
		<IntroText/>
		<section :class="{ help: true, open: cheatSheetVisible }">
			<nav aria-label="cheat sheet">
				<ButtonWithIcon
					:icon="cheatSheetVisible ? '✘' : '?'"
					:label="cheatSheetVisible ? 'Close' : 'Help'"
					@click="helpToggle"
				/>
			</nav>
			<CheatSheet v-if="cheatSheetVisible"/>
		</section>
		<section :class="{ options: true, open: optionsVisible }">
			<nav aria-label="options">
				<ButtonWithIcon
					:icon="optionsVisible ? '✘' : '⚙'"
					:label="optionsVisible ? 'Close' : 'Options'"
					@click="optionsToggle"
				/>
			</nav>
			<OptionsPicker v-if="optionsVisible"/>
		</section>
		<div class="content">
			<div class="content-section">
				<section class="input">
					<nav aria-label="input options">
						<GrowToModal aria="Input Options" :force-close="inputClose">
							<template #body>
								<LoadAndSave :current-tune="abcString" @load="setTune($event)" @close="close" @transpose-source="transposeSource"/>
							</template>
						</GrowToModal>
					</nav>
					<div class="input-area">
						<div>
							<code-input
								id="abc"
								name="abc"
								aria-label="ABC string"
								spellcheck="false"
								:style="{ fontSize: fontSize + 'px' }"
							/>
						</div>
						<div id="warnings"/>
						<div id="midi" class="abcjs-large"/>
					</div>
				</section>
			</div>
			<div class="content-section">
				<div class="menu-holder no-print">
					<nav aria-label="rendering options">
						<GrowToModal ref="modal2" aria="Rendering Options">
							<template #body>
								<OutputOptions/>
							</template>
						</GrowToModal>
					</nav>
				</div>
				<ImgUploader :show="showUpload" :upload-zoom="uploadZoom"/>
				<AbcjsOutput class="no-print" :shorten="shortenOutput"/>
			</div>
		</div>
		<section class="download">
			<a class="btn" :download="midiFilename" :href="midiData">Download MIDI</a>
			<button class="btn" @click="downloadWav">
				Download WAV
			</button>
			<button v-if="hasClipboard" class="btn" @click="createSharableLink">
				{{ copyText }}
			</button>
		</section>
	</div>
</template>

<script lang="ts" setup>
import * as Vue from "vue";
import abcjsDefaultExport from "abcjs";
import CheatSheet from "../components/help/CheatSheet.vue";
import ButtonWithIcon from "../components/atoms/ButtonWithIcon.vue";
import {CursorControl} from "~/helpers/cursor-control";
import ImgUploader from "../components/generic/ImgUploader.vue";
import {getLocalStorage, setLocalStorage} from "~/helpers/local-storage-wrapper";
import GrowToModal from "../components/generic/GrowToModal.vue";
import {useAbcStore} from "~/store/abcStore";
import {sleep} from "~/helpers/sleep";
import codeInputDefaultExport from "@webcoder49/code-input";

import highlight from "highlight.js/lib/core"
import highlightAbc from "highlightjs-abc"
import CiHljsTemplate from "@webcoder49/code-input/templates/hljs.mjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
const codeInput = import.meta.browser ? codeInputDefaultExport : null;
const abcStore = useAbcStore();

const inputClose = ref(0)
const cheatSheetVisible = ref(false)
const optionsVisible = ref(false)
const copyProgress = ref("idle")
const abcString = ref("")
const abcjsEditor = ref(null)
const cursorControl = ref(new CursorControl("#canvas"))
const midiData = ref("")
const hasClipboard = ref(false)
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
})

const showUpload = computed(() => abcStore.showUpload)
const uploadZoom = computed(() => abcStore.uploadZoom)
const shortenOutput = computed(() => abcStore.shortenOutput)
const fontSize = computed(() => abcStore.fontSize)
const visualTranspose = computed(() => abcStore.visualTranspose)

const midiFilename = computed(() => {
	if (!abcjsEditor.value || abcjsEditor.value.tunes.length === 0)
		return "tune.midi";
	let title = abcjsEditor.value.tunes[0].metaText.title;
	if (!title)
		title = "untitled";
	title = title.replace(/\W+/g, "-");
	return title + ".midi";
})

const copyText = computed(() => {
	switch (copyProgress.value) {
		case "idle":
			return "Copy Sharable Link To Clipboard";
		case "working":
			return "Copying...";
		case "done":
			return "Copied!";
	}
	return "Copy Sharable Link To Clipboard";
})

watch(
	() => abcString.value,
	() => {
		try {
			midiData.value = new abcjs.synth.getMidiFile(abcString.value, {midiOutputType: "encoded"});
		} catch (error) {
			console.error("Error creating MIDI", error);
		}
	}
)

watch(
	() => visualTranspose.value,
	() => {
		abcjsParams.value.visualTranspose = visualTranspose.value;
		abcjsEditor.value.paramChanged(abcjsParams.value);
	}
)

onMounted(() => {
	abcStore.initTunes();
	cheatSheetVisible.value = getLocalStorage("help-open", false, "Boolean");
	optionsVisible.value = getLocalStorage("options-open", false, "Boolean");
	try {
		// See if clipboard works before giving the user the option
		const type = "text/plain";
		const blob = new Blob(["test"], {type});
		// @ESLint @typescript-eslint/no-unused-expressions
		// [new ClipboardItem({ [type]: blob })];
		new ClipboardItem({[type]: blob});
		hasClipboard.value = true;
	} catch (error) {
		hasClipboard.value = false;
	}
	highlight.registerLanguage("abc", highlightAbc);
	//highlight.registerLanguage("abc", highlightAbcParser);
	if (abcjs && codeInput) {
		codeInput.registerTemplate("syntax-highlighted", new CiHljsTemplate(highlight, []));

		const el = document.querySelector('#abc textarea')
		if (!el) {
			console.log("Error! Can't find the editor on the page")
			return
		}
		const editArea = new abcjs.EditArea(el)
		// TODO-PER: Change this to `new abcjs.Editor('#abc textarea', {` after release
		new abcjs.Editor(editArea, {
			canvas_id: "paper",
			warnings_id: "warnings",
			abcjsParams: {}
		});
		// codeInput.registerTemplate("syntax-highlighted", codeInput.templates.hljs(hljs, []));
		// const el = document.querySelector('#abc textarea')
		// //@ts-ignore - abcjs error - EditArea isn't exposed
		// const editArea = new abcjs.EditArea(el)
		abcjsEditor.value = new abcjs.Editor(editArea, {
			canvas_id: "canvas",
			warnings_id: "warnings",
			synth: {
				el: "#midi",
				cursorControl: cursorControl,
				options: {
					displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true,
					// pan: [-1,1],
				},
			},
			abcjsParams: abcjsParams.value,
		});
	}
	let startingTune = getLocalStorage("current-tune", `X: 1
T: Cooley's
M: 4/4
L: 1/8
R: reel
K: Emin
|:D2|"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|"Em"DEFD E2:|`, "String");
	const overrideTune = useRoute().query.t;
	if (overrideTune)
		startingTune = overrideTune;
	setTune({abc: startingTune});

	window.addEventListener("beforeunload", (e) => {
		saveCurrent();
	});
	setInterval(() => {
		saveCurrent();
	}, 20000);

	document.getElementById("abc").focus();

	window.onbeforeprint = redrawPrint;
})

function clickListener(abcElem, tuneNumber, classes, analysis, drag, mouseEvent) {
	const lastClicked = abcElem.midiPitches;
	if (!lastClicked)
		return;

	abcjs.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, abcjsEditor.value.millisecondsPerMeasure()).then(function (response) {
		console.log("note played");
	}).catch(function (error) {
		console.log("error playing note", error);
	});
}

function redrawPrint() {
	const output = document.getElementById("print-version");
	let text = "";
	let svgs = document.querySelectorAll("#canvas .abcjs-container");
	if (svgs.length === 0) {
		svgs = [document.querySelector("#canvas")];
	}
	svgs.forEach((svg) => {
		text += svg.innerHTML;
	});
	text = text.replace(/display: inline-block; position: absolute; top: 0px; left: 0px;/g, "");
	output.innerHTML = text;
}

function helpToggle() {
	cheatSheetVisible.value = !cheatSheetVisible.value;
	setLocalStorage("help-open", cheatSheetVisible.value);
}

function optionsToggle() {
	optionsVisible.value = !optionsVisible.value;
	setLocalStorage("options-open", optionsVisible.value);
}

function close() {
	inputClose.value++
}

function setTune(payload) {
	inputClose.value++
	abcString.value = payload.abc;
	Vue.nextTick(() => {
		abcjsEditor.value.paramChanged({});
	});
}

function transposeSource(options) {
	const visualObj = abcjs.renderAbc("*", abcString.value);
	const newAbc = abcjs.strTranspose(abcString.value, visualObj, options.halfSteps);
	abcString.value = newAbc;
	Vue.nextTick(() => {
		abcjsEditor.value.paramChanged({});
	});
}

function downloadWav() {
	const visualObj = abcjs.renderAbc("*", abcString.value)[0];

	const midiBuffer = new abcjs.synth.CreateSynth();
	midiBuffer.init({
		visualObj: visualObj,
		options: {},
	}).then((response) => {
		midiBuffer.prime().then((response) => {
			const url = midiBuffer.download();
			const link = document.createElement("a");
			document.body.appendChild(link);
			link.setAttribute("style", "display: none;");
			link.href = url;
			const fileName = midiFilename.value.replace(/\.midi/, ".wav");
			link.download = fileName ? fileName : "output.wav";
			link.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
		});
	}).catch((error) => {
		console.warn("Audio problem:", error);
	});
}

function saveCurrent() {
	setLocalStorage("current-tune", abcString.value);
}

async function createSharableLink() {
	try {
		copyProgress.value = "working";
		const encoded = encodeURIComponent(abcString.value);
		const here = document.location.href;
		const link = here + "?t=" + encoded;
		const type = "text/plain";
		const blob = new Blob([link], {type});
		const data = [new ClipboardItem({[type]: blob})];
		await navigator.clipboard.write(data);
		await sleep(1000);
		copyProgress.value = "done";
		await sleep(1000);
		copyProgress.value = "idle";
	} catch (error) {
		console.log("error", error);
	}
}
</script>

<style scoped>
.help {
	border: 1px solid transparent;
	position: relative;
	min-height: 55px;
	border-radius: 8px;
	margin: -45px 0 0 auto;
	width: 130px;
}

.help.open {
	border-top-color: #dddddd;
	border-left-color: #dddddd;
	box-shadow: 2px 2px 4px #bbbbbb, -1px -1px 1px #bbbbbb;
	padding: 0 10px 10px 10px;
	background: #ffffff;
	margin-bottom: 10px;
	width: inherit;
}

.options {
	border: 1px solid transparent;
	position: relative;
	min-height: 55px;
	border-radius: 8px;
	margin-top: 10px;
}

.options.open {
	border-top-color: #dddddd;
	border-left-color: #dddddd;
	box-shadow: 2px 2px 4px #bbbbbb, -1px -1px 1px #bbbbbb;
	padding: 0 10px 10px 10px;
	background: #ffffff;
	margin-bottom: 10px;
}

.input {
	margin-bottom: 10px;
	position: relative;
	height: 100%;
}

.menu-holder {
	position: relative;
	z-index: 2;
}

.download {
	margin-top: 30px;
}

.download a, .download button {
	margin-left: 5px;
	margin-right: 5px;
}

.content {
	display: flex;
	flex-direction: column-reverse;
}

@media screen and (min-width: 900px) {
	.content {
		justify-content: space-between;
		flex-direction: row;
	}

	.content-section {
		width: 49%;
	}
}

textarea {
	width: 100%;
	font-size: 18px;
	height: 400px;
	border-radius: 4px;
	padding: 8px;
	font-family: "Fira Mono", Monaco, monospace;
	border: none;
	box-shadow: 2px 2px 4px #bbbbbb, -1px -1px 1px #bbbbbb;
	margin-bottom: 5px;
}

#warnings {
	font-family: "Fira Mono", Monaco, monospace;
	border: 2px solid #f10707;
	margin: 0 0 10px 0;
	padding: 10px;
	border-radius: 4px;
}

#warnings span {
	color: #f10707;
}

#warnings:empty {
	display: none;
}

#midi {
	max-width: 900px;
}

nav {
	position: absolute;
	right: 0;
	top: 0;
	/*z-index: 20;*/
	display: flex;
}
</style>
