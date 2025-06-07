<template>
	<div class="load-and-save">
		<animated-button el="a" :label="downloadLabel" :download="abcTitle" :href="saveAbcString" />
		<animated-button el="button" :label="saveLabel" @click="storeAbcString" />
		<div v-if="allTuneNames.length > 0">
			<h2>Load:</h2>
			<ul class="tune-picker">
				<li v-for="name in allTuneNames" :key="name">
					<animated-button el="button" class="load" :label="name" @click="loadTune(name)" />
					<animated-button el="button" label="×" :aria-label="`Delete ${name}`" @click="deleteTune(name)" />
				</li>
			</ul>
		</div>
		<div class="bottom-options">
			<label>Font Size: <input v-model="fontSize" type="number" min="8" max="30"></label>
			<label>Visual Transpose: <input v-model="visualTranspose" type="number" min="-24" max="24"></label>
		</div>
		<div v-if="visualTranspose !== 0 && visualTranspose !== '0'" class="extra-bottom">
			<animated-button el="button" label="Apply Transpose" @click="transposeSource" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "pinia";
import { useAbcStore } from "../store/abcStore";
import { abcTitle, abcFilename } from "../helpers/abc";
import AnimatedButton from "./AnimatedButton";
export default {
	name: "LoadAndSave",
	components: { AnimatedButton },
	props: {
		currentTune: {
			type: String,
			required: true,
		},
	},
	emits: ["close", "load", "transposeSource"],
	setup() {
		const abcStore = useAbcStore();
		return {
			abcStore,
		};
	},
	computed: {
		...mapGetters(useAbcStore, ["allTuneNames", "tuneByTitle"]),
		fontSize: {
			get() {
				return this.abcStore.fontSize;
			},
			set(value) {
				this.abcStore.setFontSize(value);
			},
		},
		visualTranspose: {
			get() {
				return this.abcStore.visualTranspose;
			},
			set(value) {
				this.abcStore.setVisualTranspose(value);
			},
		},
		abcTitle() {
			return abcTitle(this.currentTune);
		},
		abcFilename() {
			return abcFilename(this.currentTune);
		},
		saveAbcString() {
			return `data:text/plain,${encodeURIComponent(this.currentTune)}`;
		},
		saveLabel() {
			return `Save "${this.abcTitle}" in browser`;
		},
		downloadLabel() {
			return `Download "${this.abcTitle}"`;
		},
	},
	methods: {
		...mapActions(useAbcStore, ["saveTune", "deleteTuneByName"]),
		storeAbcString() {
			this.saveTune(this.currentTune);
			this.$emit("close");
		},
		loadTune(name) {
			const abc = this.tuneByTitle(name);
			this.$emit("load", { abc: abc });
		},
		deleteTune(name) {
			this.deleteTuneByName(name);
			this.$emit("close");
		},
		transposeSource() {
			this.$emit("transposeSource", { halfSteps: this.abcStore.visualTranspose });
			this.abcStore.setVisualTranspose(0);
			this.$emit("close");
		},
	},
};
</script>

<style scoped>
.load-and-save {
	margin-top: 10px;
	white-space: nowrap;
	display: flex;
	flex-direction: column;
	padding: 10px;
}

.src-button {
	padding: 10px;
	border: 1px solid #0fb4e7;
	border-radius: 4px;
	background: white;
	text-decoration: none;
	font-size: 1em;
	color: black;
	margin-bottom: 5px;
	text-align: left;
}

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
