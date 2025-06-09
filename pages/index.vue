<template>
	<div>
		<intro-text />
		<section :class="{ help: true, open: cheatSheetVisible }">
			<nav aria-label="cheat sheet">
				<button-with-icon
					:icon="cheatSheetVisible ? '✘' : '?'"
					:label="cheatSheetVisible ? 'Close' : 'Help'"
					@click="helpToggle"
				/>
			</nav>
			<cheat-sheet v-if="cheatSheetVisible" />
		</section>
		<section :class="{ options: true, open: optionsVisible }">
			<nav aria-label="options">
				<button-with-icon
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
						<grow-to-modal ref="modal1" aria="Input Options">
							<template #body>
								<load-and-save :current-tune="abcString" @load="setTune($event)" @close="close" @transpose-source="transposeSource" />
							</template>
						</grow-to-modal>
					</nav>
					<div class="input-area">
						<div>
							<textarea
								id="abc"
								v-model="abcString"
								aria-label="ABC string"
								spellcheck="false"
								:style="{ fontSize: fontSize + 'px' }"
							/>
						</div>
						<div id="warnings" />
						<div id="midi" class="abcjs-large" />
					</div>
				</section>
			</div>
			<div class="content-section">
				<div class="menu-holder no-print">
					<nav aria-label="rendering options">
						<grow-to-modal ref="modal2" aria="Rendering Options">
							<template #body>
								<output-options />
							</template>
						</grow-to-modal>
					</nav>
				</div>
				<img-uploader :show="showUpload" :upload-zoom="uploadZoom" />
				<abcjs-output class="no-print" :shorten="shortenOutput" />
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

<script>
import * as Vue from "vue";
import {mapGetters, mapActions} from "pinia";
import abcjsDefaultExport from "abcjs";
import CheatSheet from "../components/help/CheatSheet.vue";
import ButtonWithIcon from "../components/ButtonWithIcon";
import {CursorControl} from "../helpers/cursor-control";
import AbcjsOutput from "../components/AbcjsOutput";
import ImgUploader from "../components/ImgUploader";
import IntroText from "../components/IntroText";
import {getLocalStorage, setLocalStorage} from "../helpers/local-storage-wrapper";
import GrowToModal from "../components/GrowToModal";
import LoadAndSave from "../components/LoadAndSave";
import {useAbcStore} from "../store/abcStore";
import OutputOptions from "../components/OutputOptions";
import {sleep} from "../helpers/sleep";
import OptionsPicker from "~/components/OptionsPicker.vue";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;

export default {
	components: {
		OptionsPicker,
		OutputOptions,
		LoadAndSave,
		GrowToModal,
		IntroText,
		ImgUploader,
		AbcjsOutput,
		ButtonWithIcon,
		CheatSheet,
	},
	setup() {
		const abcStore = useAbcStore();
		return {
			abcStore,
		};
	},
	data() {
		return {
			cheatSheetVisible: false,
			optionsVisible: false,
			copyProgress: "idle",
			abcString: "",
			abcjsEditor: null,
			cursorControl: new CursorControl("#canvas"),
			midiData: "",
			hasClipboard: false,
			abcjsParams: {
				responsive: "resize",
				add_classes: true,
				clickListener: this.clickListener,
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
			},
		};
	},
	computed: {
		...mapGetters(useAbcStore, ["showUpload", "uploadZoom", "shortenOutput", "fontSize", "visualTranspose"]),
		midiFilename() {
			if (!this.abcjsEditor || this.abcjsEditor.tunes.length === 0)
				return "tune.midi";
			let title = this.abcjsEditor.tunes[0].metaText.title;
			if (!title)
				title = "untitled";
			title = title.replace(/\W+/g, "-");
			return title + ".midi";
		},
		copyText() {
			switch (this.copyProgress) {
				case "idle":
					return "Copy Sharable Link To Clipboard";
				case "working":
					return "Copying...";
				case "done":
					return "Copied!";
			}
			return "Copy Sharable Link To Clipboard";
		},
	},
	watch: {
		abcString(newValue) {
			try {
				this.midiData = new abcjs.synth.getMidiFile(newValue, {midiOutputType: "encoded"});
			} catch (error) {
				console.error("Error creating MIDI", error);
			}
		},
		visualTranspose(newValue) {
			this.abcjsParams.visualTranspose = newValue;
			this.abcjsEditor.paramChanged(this.abcjsParams);
		},
	},
	mounted() {
		this.initTunes();
		this.cheatSheetVisible = getLocalStorage("help-open", false, "Boolean");
		this.optionsVisible = getLocalStorage("options-open", false, "Boolean");
		try {
			// See if clipboard works before giving the user the option
			const type = "text/plain";
			const blob = new Blob(["test"], {type});
			// @ESLint @typescript-eslint/no-unused-expressions
			// [new ClipboardItem({ [type]: blob })];
			new ClipboardItem({[type]: blob});
			this.hasClipboard = true;
		} catch (error) {
			this.hasClipboard = false;
		}
		this.abcjsEditor = new abcjs.Editor("abc", {
			canvas_id: "canvas",
			warnings_id: "warnings",
			synth: {
				el: "#midi",
				cursorControl: this.cursorControl,
				options: {
					displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true,
					// pan: [-1,1],
				},
			},
			abcjsParams: this.abcjsParams,
		});

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
		const overrideTune = this.$route.query.t;
		if (overrideTune)
			startingTune = overrideTune;
		this.setTune({abc: startingTune});

		window.addEventListener("beforeunload", (e) => {
			this.saveCurrent();
		});
		setInterval(() => {
			this.saveCurrent();
		}, 20000);

		document.getElementById("abc").focus();

		window.onbeforeprint = this.redrawPrint;
	},
	methods: {
		...mapActions(useAbcStore, ["initTunes"]),
		clickListener(abcElem, tuneNumber, classes, analysis, drag, mouseEvent) {
			const lastClicked = abcElem.midiPitches;
			if (!lastClicked)
				return;

			abcjs.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, this.abcjsEditor.millisecondsPerMeasure()).then(function (response) {
				console.log("note played");
			}).catch(function (error) {
				console.log("error playing note", error);
			});
		},
		redrawPrint() {
			const output = document.getElementById("print-version");
			let text = "";
			let svgs = document.querySelectorAll("#canvas .abcjs-container");
			console.log(svgs.length);
			if (svgs.length === 0) {
				svgs = [document.querySelector("#canvas")];
			}
			console.log(svgs[0]);
			svgs.forEach((svg) => {
				text += svg.innerHTML;
			});
			text = text.replace(/display: inline-block; position: absolute; top: 0px; left: 0px;/g, "");
			output.innerHTML = text;
		},
		helpToggle() {
			this.cheatSheetVisible = !this.cheatSheetVisible;
			setLocalStorage("help-open", this.cheatSheetVisible);
		},
		optionsToggle() {
			this.optionsVisible = !this.optionsVisible;
			setLocalStorage("options-open", this.optionsVisible);
		},
		close() {
			this.$refs.modal1.forceClose();
		},
		setTune(payload) {
			this.$refs.modal1.forceClose();
			this.abcString = payload.abc;
			Vue.nextTick(() => {
				this.abcjsEditor.paramChanged({});
			});
		},
		transposeSource(options) {
			const visualObj = abcjs.renderAbc("*", this.abcString);
			const newAbc = abcjs.strTranspose(this.abcString, visualObj, options.halfSteps);
			this.abcString = newAbc;
			Vue.nextTick(() => {
				this.abcjsEditor.paramChanged({});
			});
		},
		downloadWav() {
			const visualObj = abcjs.renderAbc("*", this.abcString)[0];

			const midiBuffer = new abcjs.synth.CreateSynth();
			midiBuffer.init({
				visualObj: visualObj,
				options: {
				},
			}).then((response) => {
				console.log(response);
				midiBuffer.prime().then((response) => {
					const url = midiBuffer.download();
					const link = document.createElement("a");
					document.body.appendChild(link);
					link.setAttribute("style", "display: none;");
					link.href = url;
					const fileName = this.midiFilename.replace(/\.midi/, ".wav");
					link.download = fileName ? fileName : "output.wav";
					link.click();
					window.URL.revokeObjectURL(url);
					document.body.removeChild(link);
				});
			}).catch((error) => {
				console.warn("Audio problem:", error);
			});
		},
		saveCurrent() {
			setLocalStorage("current-tune", this.abcString);
		},
		async createSharableLink() {
			try {
				this.copyProgress = "working";
				const encoded = encodeURIComponent(this.abcString);
				const here = document.location.href;
				const link = here + "?t=" + encoded;
				const type = "text/plain";
				const blob = new Blob([link], {type});
				const data = [new ClipboardItem({[type]: blob})];
				await navigator.clipboard.write(data);
				await sleep(1000);
				this.copyProgress = "done";
				await sleep(1000);
				this.copyProgress = "idle";
				console.log("copied");
			} catch (error) {
				console.log("error", error);
			}
		},
	},
};
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
