<template>
	<div :class="wrapperClass">
		<input :id="id" :checked="value" @input="input" type="checkbox" :disabled="disabled">
		<label
			:for="id"
			:title="disabled ? disabledMessage : ''"
			@keydown.space.prevent="swallow"
			@keydown.tab="($event.shiftKey) ? emit('shift-tab', $event) : emit('tab', $event)"
		>
			{{ label }}
		</label>
	</div>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
	label: string;
	id: string;
	value: boolean;
	disabled?: boolean;
	disabledMessage?: string;
	type?: string;
}>(), {
	disabled: false,
	disabledMessage: '',
	type: '',
});

const emit = defineEmits<{
	(e: "input", value: boolean): void;
	(e: "shift-tab", ev: KeyboardEvent): void;
	(e: "tab", ev: KeyboardEvent): void;
}>();

const wrapperClass = computed(() => {
	const cls = ["check-box"];
	if (props.type)
		cls.push(props.type);
	return cls.join(" ");
})

function swallow() {
	// this keeps the page from scrolling when the space key is pressed.
}

function input(ev: Event) {
	emit('input', ev.target.checked)
}

</script>

<style scoped>
input[type="checkbox"] {
	display: none;
}

input[type="checkbox"] + label {
	display: block;
	position: relative;
	padding: 8px 5px 8px 32px;
	font-size: 18px;
	color: black;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.large input[type="checkbox"] + label {
	font-size: 24px;
	border: 3px solid #0074db;
	border-radius: 6px;
	padding: 15px 15px 15px 40px;
}

input[type="checkbox"] + label:before {
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

.large input[type="checkbox"] + label:before {
	margin-top: 21px;
	margin-left: 15px;
}

input[type="checkbox"]:checked + label:before {
	width: 10px;
	top: -1px;
	left: 10px;
	border-radius: 0;
	opacity: 1;
	border-top-color: transparent;
	border-left-color: transparent;
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
}

.large input[type="checkbox"]:checked + label:before {
	border: 3px solid #3B305D;
	border-top-color: transparent;
	border-left-color: transparent;
}

input[type="checkbox"]:disabled + label {
	text-decoration: line-through;
}
</style>
