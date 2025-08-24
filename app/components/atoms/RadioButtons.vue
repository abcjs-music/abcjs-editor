<template>
	<div class="radio-buttons">
		<label
			v-for="button in options" :key="button.value"
			@keydown.space.prevent="swallow"
			@keydown.tab="($event.shiftKey) ? emit('shift-tab', $event) : emit('tab', $event)"
		>
			<input :name="id" :value="button.value" v-model="picked" type="radio">
			{{ button.label }}
		</label>
	</div>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
	options: Array<{ label: string, value: string }>;
	id: string;
	value: string;
}>(), {
});

const emit = defineEmits<{
	(e: "input", value: string): void;
	(e: "shift-tab", ev: KeyboardEvent): void;
	(e: "tab", ev: KeyboardEvent): void;
}>();

const picked = ref('')

watch(
	() => props.value,
	() => {
		picked.value = props.value
	}
)

watch(
	() => picked.value,
	() => {
		emit('input', picked.value)
	}
)

function swallow() {
	// this keeps the page from scrolling when the space key is pressed.
}

</script>

<style scoped>
.radio-buttons {
	border: 1px solid #0074db;
	border-radius: 6px;
	padding: 15px;
	background: white;
	display: flex;
	flex-direction: column;
	row-gap: 10px;
}
label {
	font-size: 18px;

}
/*
input[type="radio"] {
	display: none;
}

input[type="radio"] + label {
	display: block;
	position: relative;
	padding: 8px 5px 8px 32px;
	font-size: 18px;
	color: black;
	cursor: pointer;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.large input[type="radio"] + label {
	font-size: 24px;
	border: 3px solid #0074db;
	border-radius: 6px;
	padding: 15px 15px 15px 40px;
}

input[type="radio"] + label:before {
	content: '';
	display: block;
	width: 20px;
	height: 18px;
	margin-top: 8px;
	border: 1px solid #606878;
	position: absolute;
	left: 5px;
	top: 2px;
	opacity: .6;
	-webkit-transition: all .12s, border-color .08s;
	transition: all .12s, border-color .08s;
}

.large input[type="radio"] + label:before {
	margin-top: 21px;
	margin-left: 15px;
}

input[type="radio"]:checked + label:before {
	width: 10px;
	top: -1px;
	left: 10px;
	border-radius: 0;
	opacity: 1;
	border-top-color: transparent;
	border-left-color: transparent;
	transform: rotate(45deg);
}

.large input[type="radio"]:checked + label:before {
	border: 3px solid #3B305D;
	border-top-color: transparent;
	border-left-color: transparent;
}

input[type="radio"]:disabled + label {
	text-decoration: line-through;
}
*/
</style>
