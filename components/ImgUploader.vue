<template>
		<div class="img-uploader no-print">
			<!--UPLOAD-->
			<form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
				<h2>Display witness image</h2>
				<label
					class="dropbox"
					tabindex="0"
					@keyup.enter.self.stop="toggle"
					@keyup.space.self.stop="toggle"
					@keydown.space.prevent="swallow"
					@keydown.tab="($event.shiftKey) ? $emit('shift-tab') : $emit('tab')"
				>
					<input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files)"
						   accept="image/*,.pdf" class="input-file">
					<p v-if="isInitial">Drag your file here to insert image<br>or click to browse.</p>
				</label>
			</form>
			<!--SUCCESS-->
			<div v-if="isSuccess">
				<div :class="`target-for-image ${uploadedFile ? 'loaded' : 'empty'}`" tabindex="0">
				</div>
			</div>
			<!--FAILED-->
			<div v-if="isFailed">
				<h2>Uploaded failed.</h2>
				<p>
					<a href="javascript:void(0)" @click="reset()">Try again</a>
				</p>
				<pre>{{ uploadError }}</pre>
			</div>
		</div>
</template>

<script>
import ButtonWithIcon from "./ButtonWithIcon";
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
	name: 'img-uploader',
	components: {ButtonWithIcon},
	props: {
		show: {
			type: Boolean,
			required: false,
			default: false
		},
		uploadZoom: {
			type: Number,
			required: false,
			default: 100
		},
	},
	data() {
		return {
			uploadedFile: '',
			uploadError: null,
			currentStatus: null,
			uploadFieldName: 'photos',
		}
	},
	watch: {
		show(newValue) {
			if (newValue)
				this.reset();
			else
				this.setClosed();
		},
		uploadZoom(newValue) {
			const target = document.querySelector('.target-for-image iframe');
			if (target) {
				target.style.transform = `scale(${newValue/100})`;
			}
		},
	},
	computed: {
		isInitial() {
			return this.currentStatus === STATUS_INITIAL;
		},
		isSaving() {
			return this.currentStatus === STATUS_SAVING;
		},
		isSuccess() {
			return this.currentStatus === STATUS_SUCCESS;
		},
		isFailed() {
			return this.currentStatus === STATUS_FAILED;
		}
	},
	methods: {
		reset() {
			// reset form to initial state
			this.currentStatus = STATUS_INITIAL;
			this.uploadedFile = "";
			this.uploadError = null;
		},
		save(formData) {
			// upload data to the server
			this.currentStatus = STATUS_SAVING;

			this.upload(formData)
				.then(x => {
					this.uploadedFile = x;
					this.currentStatus = STATUS_SUCCESS;
				})
				.catch(err => {
					this.uploadError = err.response;
					this.currentStatus = STATUS_FAILED;
				});
			this.currentStatus = STATUS_SUCCESS;
		},
		filesChange(fieldName, fileList) {
			// handle file changes
			const formData = new FormData();

			if (!fileList.length) return;

			// append the files to FormData
			Array
				.from(Array(fileList.length).keys())
				.map(x => {
					formData.append(fieldName, fileList[x], fileList[x].name);
				});

			// save it
			this.save(formData);
		},
		upload(formData) {
			const photos = formData.getAll('photos');
			const promises = photos.map((x) => this.getImage(x)
				.then(img => ({
					id: img,
					originalName: x.name,
					fileName: x.name,
					url: img
				})));
			return Promise.all(promises);
		},
		getImage(file) {
			return new Promise((resolve, reject) => {
				const fReader = new FileReader();
				const tagName = (file.type === "application/pdf") ? "iframe" : "img";
				const img = document.createElement(tagName);
				img.setAttribute("style", `height: ${this.uploadZoom}vh;transform: scale(${this.uploadZoom/100})`);
				img.setAttribute("title", "Witness Document");

				fReader.onload = () => {
					img.src = fReader.result;
					const target = document.querySelector(".target-for-image");
					target.appendChild(img);
					resolve();
				}

				fReader.readAsDataURL(file);
			})
		},
		setClosed() {
			this.reset();
			const target = document.querySelector(".target-for-image");
			if (target)
				target.innerHTML = '';
			this.currentStatus = STATUS_SUCCESS;
		},
		toggle(event) {
			// Called when user clicks with keyboard
			const input = event.target.querySelector("input");
			input.click();
		},
		swallow() {
			// this keeps the page from scrolling when the space key is pressed.
		},
	},
	mounted() {
		this.setClosed();
	},
}

</script>

<style scoped>
.dropbox {
	outline: 2px dashed grey;
	outline-offset: -10px;
	background: lightcyan;
	color: dimgray;
	padding: 10px 10px;
	height: 100px;
	position: relative;
	cursor: pointer;
	display: block;
}
.dropbox:focus {
	border: 1px solid #005FCC;
}

.input-file {
	opacity: 0;
	width: calc(100% - 20px);
	height: 80px;
	position: absolute;
	cursor: pointer;
}

.dropbox:hover {
	background: lightblue;
}

.dropbox p {
	font-size: 1.2em;
	text-align: center;
	padding: 14px 0;
}
.cancel {
	float: right;
	padding: 5px 20px;
	border-radius: 4px;
}
</style>
<style>
.target-for-image {
	overflow: auto;
}
.target-for-image.loaded {
	height: 230px;
}
.target-for-image img {
	width: 100%;
}
.target-for-image embed,.target-for-image iframe {
	width: 100%;
	transform-origin: top left;
}
</style>
