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
							<AbcEditor
								:theme="theme"
								:value="abcString"
								:fontSize="fontSize"
								:visualTranspose="visualTranspose"
								@input="updateAbcString"
								@editorCreated="editorCreated"
							></AbcEditor>
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
import abcjsDefaultExport, {type Editor} from "abcjs";
import CheatSheet from "../components/help/CheatSheet.vue";
import ButtonWithIcon from "../components/atoms/ButtonWithIcon.vue";
import ImgUploader from "../components/generic/ImgUploader.vue";
import {getLocalStorage, setLocalStorage} from "~/helpers/local-storage-wrapper";
import GrowToModal from "../components/generic/GrowToModal.vue";
import {useAbcStore} from "~/store/abcStore";
import {sleep} from "~/helpers/sleep";
import AbcEditor from "~/components/atoms/AbcEditor.vue";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;

const abcStore = useAbcStore();

const inputClose = ref(0)
const cheatSheetVisible = ref(false)
const optionsVisible = ref(false)
const copyProgress = ref("idle")
const abcString = ref(" ")
const midiData = ref("")
const hasClipboard = ref(false)

const showUpload = computed(() => abcStore.showUpload)
const uploadZoom = computed(() => abcStore.uploadZoom)
const shortenOutput = computed(() => abcStore.shortenOutput)
const fontSize = computed(() => abcStore.fontSize)
const visualTranspose = computed(() => abcStore.visualTranspose)
const theme = computed(() => abcStore.syntaxHighlighting ? "abcjs-light" : 'highlight-off')

function updateAbcString(value: string) {
	abcString.value = value
}

const abcjsEditor = ref(null as Editor | null)
function editorCreated(editor: Editor) {
	abcjsEditor.value = editor
}
const midiFilename = computed(() => {
	if (!abcjsEditor.value)
		return "tune.midi";
	const tunes = abcjsEditor.value.getTunes()
	if (!tunes || !tunes.length)
		return "tune.midi";
	let title = tunes[0].metaText.title;
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
			if (abcjs)
				midiData.value = abcjs.synth.getMidiFile(abcString.value, {midiOutputType: "encoded"});
		} catch (error) {
			console.error("Error creating MIDI", error);
		}
	}
)

function initCodeInput() {

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
}

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
	window.addEventListener("beforeunload", (e) => {
		saveCurrent();
	});
	setInterval(() => {
		saveCurrent();
	}, 20000);

	initCodeInput()
	window.onbeforeprint = redrawPrint;
})

function redrawPrint() {
	const output = document.getElementById("print-version");
	if (output) {
		let text = "";
		let svgs = document.querySelectorAll("#canvas .abcjs-container");
		if (svgs.length === 0) {
			const canvas = document.querySelector("#canvas")
			if (canvas)
				svgs = [canvas];
		}
		svgs.forEach((svg) => {
			text += svg.innerHTML;
		});
		text = text.replace(/display: inline-block; position: absolute; top: 0px; left: 0px;/g, "");
		output.innerHTML = text;
	}
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

function setTune(payload: {abc: string}) {
	inputClose.value++
	abcString.value = payload.abc;
}

function transposeSource(options: { halfSteps: number}) {
	if (abcjs) {
		const visualObj = abcjs.renderAbc("*", abcString.value);
		const newAbc = abcjs.strTranspose(abcString.value, visualObj, options.halfSteps);
		abcString.value = newAbc;
	}
}

function downloadWav() {
	if (abcjs) {
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
}

function saveCurrent() {
	setLocalStorage("current-tune", abcString.value);
}

async function createSharableLink() {
	try {
		copyProgress.value = "working";
		const encoded = encodeURIComponent(abcString.value);
		const here = document.location.href.split('?')[0];
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
	z-index: 20;
	display: flex;
}
</style>
