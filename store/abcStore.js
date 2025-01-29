import { defineStore } from "pinia";
import { abcTitle } from "../helpers/abc";
import {
	getLocalStorage,
	setLocalStorage,
} from "../helpers/local-storage-wrapper";
// Defining a Pinia store named "abcStore" to manage abc editor related data
export const useAbcStore = defineStore("abcStore", {
	// Initial state configuration for the content
	state: () => {
		return {
			_allTunes: {},
			_showUpload: false,
			_shortenOutput: false,
			_uploadZoom: 100,
			_fontSize: 18,
			_visualTranspose: 0,
		};
	},
	// Getters to retrieve store content
	getters: {
		allTuneNames: (state) => Object.keys(state._allTunes).sort(),
        tuneByTitle: (state) => (title) => {
            return state._allTunes[title];
        },
        showUpload: (state) => state._showUpload,
		shortenOutput: (state) => state._shortenOutput,
        uploadZoom: (state) => state._uploadZoom,
        fontSize: (state) => state._fontSize,
        visualTranspose: (state) => state._visualTranspose,
	},
	// Actions to save content to the store
	actions: {
		initTunes() {
			this._allTunes = getLocalStorage("tunes", {}, "Object");
			this.setShowUpload(
				getLocalStorage("show-upload", false, "Boolean")
			);
			this.setShortenOutput(
				getLocalStorage("shorten-output", false, "Boolean")
			);
			this.setUploadZoom(getLocalStorage("upload-zoom", 100, "Integer"));
			this.setFontSize(getLocalStorage("font-size", 18, "Integer"));
		},
		saveTune(tune) {
			let title = abcTitle(tune);
			const all = { ...this._allTunes };
			all[title] = tune;
			this._allTunes = all;
			setLocalStorage("tunes", JSON.stringify(this._allTunes));
		},
		deleteTuneByName(name) {
			const all = { ...this._allTunes };
			delete all[name];
			this._allTunes = all;
			setLocalStorage("tunes", JSON.stringify(this._allTunes));
		},
		setShowUpload(showUpload) {
			this._showUpload = showUpload;
			setLocalStorage("show-upload", showUpload);
		},
		setShortenOutput(shortenOutput) {
			this._shortenOutput = shortenOutput;
			setLocalStorage("shorten-output", shortenOutput);
		},
		setUploadZoom(uploadZoom) {
			this._uploadZoom = uploadZoom;
			setLocalStorage("upload-zoom", uploadZoom);
		},
		setFontSize(fontSize) {
			this._fontSize = fontSize;
			setLocalStorage("font-size", fontSize);
		},
		setVisualTranspose(visualTranspose) {
			this._visualTranspose = visualTranspose;
		},
	},
});
