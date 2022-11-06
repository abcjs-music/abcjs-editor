import {abcTitle} from '../helpers/abc';
import {getLocalStorage, setLocalStorage} from "../helpers/local-storage-wrapper";

export const state = () => ({
	allTunes: {},
	showUpload: false,
	shortenOutput: false,
	uploadZoom: 100,
	fontSize: 18,
	visualTranspose: 0,
});

export const getters = {
	allTuneNames(state) {
		return Object.keys(state.allTunes).sort();
	},
	tuneByTitle: state => (title) => {
		return state.allTunes[title];
	},
	showUpload(state) {
		return state.showUpload;
	},
	shortenOutput(state) {
		return state.shortenOutput;
	},
	uploadZoom(state) {
		return state.uploadZoom;
	},
	fontSize(state) {
		return state.fontSize;
	},
	visualTranspose(state) {
		return state.visualTranspose;
	},
};

export const mutations = {
	saveTune(state, payload) {
		const all = { ...state.allTunes };
		all[payload.title] = payload.abc;
		state.allTunes = all;
	},
	deleteTune(state, payload) {
		const all = { ...state.allTunes };
		delete all[payload];
		state.allTunes = all;
	},
	setAllTunes(state, payload) {
		state.allTunes = payload;
	},
	showUpload(state, payload) {
		state.showUpload = payload;
	},
	shortenOutput(state, payload) {
		state.shortenOutput = payload;
	},
	uploadZoom(state, payload) {
		state.uploadZoom = payload;
	},
	fontSize(state, payload) {
		state.fontSize = payload;
	},
	visualTranspose(state, payload) {
		state.visualTranspose = payload;
	},
};

export const actions = {
	initTunes(context, payload) {
		const tunes = getLocalStorage("tunes", {}, 'Object');
		context.commit("setAllTunes", tunes);
		const showUpload = getLocalStorage("show-upload", false, 'Boolean');
		context.commit("showUpload", showUpload);
		const shortenOutput = getLocalStorage("shorten-output", false, 'Boolean');
		context.commit("shortenOutput", shortenOutput);
		const uploadZoom = getLocalStorage("upload-zoom", 100, 'Integer');
		context.commit("uploadZoom", uploadZoom);
	},
	saveTune(context, payload) {
		let title = abcTitle(payload);
		context.commit("saveTune", { title: title, abc: payload });
		setLocalStorage("tunes", JSON.stringify(context.state.allTunes))
	},
	deleteTuneByName(context, payload) {
		context.commit("deleteTune", payload)
		setLocalStorage("tunes", JSON.stringify(context.state.allTunes))
	},
	setShowUpload(context, payload) {
		context.commit("showUpload", payload)
		setLocalStorage("show-upload", payload)
	},
	setShortenOutput(context, payload) {
		context.commit("shortenOutput", payload)
		setLocalStorage("shorten-output", payload)
	},
	setUploadZoom(context, payload) {
		context.commit("uploadZoom", payload)
		setLocalStorage("upload-zoom", payload)
	},
	setFontSize(context, payload) {
		context.commit("fontSize", payload)
		setLocalStorage("font-size", payload)
	},
	setVisualTranspose(context, payload) {
		context.commit("visualTranspose", payload)
	},
};
