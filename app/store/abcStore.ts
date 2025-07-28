import { defineStore } from "pinia";
import { abcTitle } from "~/helpers/abc";
import {
	getLocalStorage,
	setLocalStorage,
} from "~/helpers/local-storage-wrapper";

export const useAbcStore = defineStore("abcStore", {
	// Initial state configuration for the content
	state: () => {
		return {
			_allTunes: {},
			showUpload: false,
			shortenOutput: false,
			uploadZoom: 100,
			fontSize: 18,
			visualTranspose: 0,
			syntaxHighlighting: true,
		};
	},
	// Getters to retrieve store content
	getters: {
		allTuneNames: state => Object.keys(state._allTunes).sort(),
		tuneByTitle: state => (title:string) => {
			//@ts-ignore - referencing object
			return state._allTunes[title];
		},
	},
	// Actions to save content to the store
	actions: {
		initTunes() {
			//@ts-ignore - TODO-PER: getLocalStorage doesn't handle objects
			this._allTunes = getLocalStorage("tunes", {}, "Object");
			this.setShowUpload(
				getLocalStorage("show-upload", false, "Boolean"),
			);
			this.setShortenOutput(
				getLocalStorage("shorten-output", false, "Boolean"),
			);
			this.setUploadZoom(getLocalStorage("upload-zoom", 100, "Integer"));
			this.setFontSize(getLocalStorage("font-size", 18, "Integer"));
		},
		saveTune(tune:string) {
			const title = abcTitle(tune);
			const all = { ...this._allTunes };
			//@ts-ignore - referencing object
			all[title] = tune;
			this._allTunes = all;
			setLocalStorage("tunes", JSON.stringify(this._allTunes));
		},
		deleteTuneByName(name:string) {
			const all = { ...this._allTunes };
			//@ts-ignore - referencing object
			delete all[name];
			this._allTunes = all;
			setLocalStorage("tunes", JSON.stringify(this._allTunes));
		},
		setShowUpload(showUpload:boolean) {
			this.showUpload = showUpload;
			setLocalStorage("show-upload", showUpload);
		},
		setShortenOutput(shortenOutput:boolean) {
			this.shortenOutput = shortenOutput;
			setLocalStorage("shorten-output", shortenOutput);
		},
		setUploadZoom(uploadZoom:number) {
			this.uploadZoom = uploadZoom;
			setLocalStorage("upload-zoom", uploadZoom);
		},
		setFontSize(fontSize:number) {
			this.fontSize = fontSize;
			setLocalStorage("font-size", fontSize);
		},
		setVisualTranspose(visualTranspose:number) {
			this.visualTranspose = visualTranspose;
		},
		setSyntaxHighlighting(syntaxHighlighting:boolean) {
			this.syntaxHighlighting = syntaxHighlighting;
		},
	},
});
