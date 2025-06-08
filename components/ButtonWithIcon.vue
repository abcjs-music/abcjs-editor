<template>
	<button class="btn" @click="emit('click')">
		{{ label }} {{icon}}
	</button>
</template>

<script lang="ts" setup>
const props = defineProps<{
	label: string;
	icon: string;
}>();

const emit = defineEmits<{
	(e: "click", ev: MouseEvent): void;
}>();
</script>

<style>
/* hack - this is not scoped so that <a> would also get the styles. */
.btn {
	font-size: 14px;
	padding: 3px 10px;
	border-radius: 8px;
	margin-top: 0px;
	color: white;
	background: #0080a6;
	text-decoration: none;
	font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	border: none;
	display: inline-block;
	min-width: 110px;
	text-align: center;
}

.btn:hover {
	cursor: pointer;
	text-decoration: underline;
	background-color: #0a9ecc;
}

@media screen and (min-width: 550px) {
	.btn {
		font-size: 20px;
		padding: 5px 20px;
		margin-top: 5px;
	}
	.btn span {
		padding-right: 0.5em;
	}
}

@media print {
	.btn {
		display: none;
	}
}

.btn.reverse {
	color: #0fb4e7;
	background: transparent;
	border: 1px solid #0fb4e7;
}

.btn.reverse:hover {
	background-color: #d6eef3;
	color: #0b6a88;
}
</style>
