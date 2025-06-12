<template>
	<div class="img-uploader no-print">
		<!-- UPLOAD -->
		<form v-if="isInitial || isSaving" enctype="multipart/form-data" novalidate>
			<h2>Display witness image</h2>
			<label
				class="dropbox"
				tabindex="0"
				@keyup.enter.self.stop="toggle"
				@keyup.space.self.stop="toggle"
				@keydown.space.prevent="swallow"
				@keydown.tab="($event.shiftKey) ? emit('shift-tab', $event) : emit('tab', $event)"
			>
				<input
					type="file"
					:name="uploadFieldName"
					:disabled="isSaving"
					accept="image/*,.pdf"
					class="input-file"
					@change="filesChange($event)"
				>
				<p v-if="isInitial">Drag your file here to insert image<br>or click to browse.</p>
			</label>
		</form>
		<!-- SUCCESS -->
		<div v-if="isSuccess">
			<div :class="`target-for-image ${uploadedFile ? 'loaded' : 'empty'}`" tabindex="0" />
		</div>
		<!-- FAILED -->
		<div v-if="isFailed">
			<h2>Uploaded failed.</h2>
			<p>
				<a href="javascript:void(0)" @click="reset()">Try again</a>
			</p>
			<pre>{{ uploadError }}</pre>
		</div>
	</div>
</template>

<script lang="ts" setup>
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

const props = withDefaults(defineProps<{
	show?: boolean;
	uploadZoom?: number;
}>(), {
	show: false,
	uploadZoom: 100,
});

const emit = defineEmits<{
	(e: "shift-tab", ev: KeyboardEvent): void;
	(e: "tab", ev: KeyboardEvent): void;
}>();


const uploadedFile = ref("")
const uploadError = ref(null)
const currentStatus = ref(STATUS_INITIAL)
const uploadFieldName = ref("photos")

const isInitial = computed(() => {
	return currentStatus.value === STATUS_INITIAL;
})
const isSaving = computed(() => {
	return currentStatus.value === STATUS_SAVING;
})
const isSuccess = computed(() => {
	return currentStatus.value === STATUS_SUCCESS;
})
const isFailed = computed(() => {
	return currentStatus.value === STATUS_FAILED;
})

watch(
	() => props.show,
	() => {
		if (props.show)
			reset();
		else
			setClosed();
	}
)

watch(
	() => props.uploadZoom,
	() => {
		const target = document.querySelector(".target-for-image img,.target-for-image iframe");
		if (target) {
			//@ts-ignore - style does exist
			target.style.transform = `scale(${props.uploadZoom / 100})`;
		}
	}
)

onMounted(() => {
	setClosed();
})
function reset() {
	// reset form to initial state
	currentStatus.value = STATUS_INITIAL;
	uploadedFile.value = "";
	uploadError.value = null;
}
function save(formData:FormData) {
	// upload data to the server
	currentStatus.value = STATUS_SAVING;

	upload(formData)
		.then((x) => {
			//@ts-ignore = x will be of type string
			uploadedFile.value = x;
			currentStatus.value = STATUS_SUCCESS;
		})
		.catch((err) => {
			uploadError.value = err.response;
			currentStatus.value = STATUS_FAILED;
		});
	currentStatus.value = STATUS_SUCCESS;
}
function filesChange(ev: Event) {
	const target = ev.target
	//@ts-ignore - target exists and name exists
	const fieldName = target.name
	//@ts-ignore - target exists and files exists
	const fileList = target.files

	// handle file changes
	const formData = new FormData();

	if (!fileList.length) return;

	// append the files to FormData
	Array
		.from(Array(fileList.length).keys())
		.map((x) => {
			formData.append(fieldName, fileList[x], fileList[x].name);
		});

	// save it
	save(formData);
}
function upload(formData: FormData) {
	const photos = formData.getAll("photos");
	const promises = photos.map(x => getImage(x)
		.then(img => ({
			id: img,
			originalName: x.name,
			fileName: x.name,
			url: img,
		})));
	return Promise.all(promises);
}
function getImage(file: Blob) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return new Promise((resolve, reject) => {
		const fReader = new FileReader();
		const tagName = (file.type === "application/pdf") ? "iframe" : "img";
		const img = document.createElement(tagName);
		img.setAttribute("style", `height: ${props.uploadZoom}vh;transform: scale(${props.uploadZoom / 100})`);
		img.setAttribute("title", "Witness Document");

		fReader.onload = () => {
			img.src = fReader.result;
			const target = document.querySelector(".target-for-image");
			//@ts-ignore - target does exist
			target.appendChild(img);
			resolve();
		};

		fReader.readAsDataURL(file);
	});
}
function setClosed() {
	reset();
	const target = document.querySelector(".target-for-image");
	if (target)
		target.innerHTML = "";
	currentStatus.value = STATUS_SUCCESS;
}
function toggle(event: KeyboardEvent) {
	// Called when user clicks with keyboard
	//@ts-ignore - event.target does exist
	const input = event.target.querySelector("input");
	input.click();
}
function swallow() {
	// this keeps the page from scrolling when the space key is pressed.
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
.target-for-image embed,.target-for-image img,.target-for-image iframe {
	width: 100%;
	transform-origin: top left;
}
</style>
