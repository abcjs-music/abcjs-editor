<template>
	<button :class="{'animated-hamburger': true, btn: true, 'active' : isOpen}" :aria-label="aria" @click="toggle">
		<span />
	</button>
</template>

<script lang="ts" setup>
const props = defineProps<{
	aria: string;
	isOpen: boolean;
}>();

const emit = defineEmits<{
	(e: "click", ev: { isOpen:boolean }): void;
}>();

function toggle() {
	emit("click", { isOpen: !props.isOpen });
}
</script>

<style scoped>
.animated-hamburger {
	padding: 13px 26px 16px 5px;
	min-width: inherit;
}
.animated-hamburger span, .animated-hamburger span:before, .animated-hamburger span:after {
	border-radius: 1px;
	height: 2px;
	width: 20px;
	background: white;
	position: absolute;
	display: block;
	content: '';
}
.animated-hamburger span:before {
	top: -7px;
}
.animated-hamburger span:after {
	bottom: -7px;
}

.animated-hamburger span, .animated-hamburger span:before, .animated-hamburger span:after {
	transition: all 500ms ease-in-out;
}
.animated-hamburger.active span {
	background-color: transparent;
}
.animated-hamburger.active span:before, .animated-hamburger.active span:after {
	top: 0;
}
.animated-hamburger.active span:before {
	transform: rotate(45deg);
}
.animated-hamburger.active span:after {
	transform: rotate(-45deg);
}
</style>
