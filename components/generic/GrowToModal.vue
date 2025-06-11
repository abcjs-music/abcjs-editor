<template>
	<div :class="{'grow-to-modal': true, expanded: isExpanded, collapsed: !isExpanded}">
		<div class="mask" @click="forceClose" />
		<div :class="{open: !isExpanded, close: isExpanded, expanded: isExpanded, collapsed: !isExpanded}">
			<AnimatedHamburger :aria="aria" :is-open="isExpanded" @click="toggle" />
		</div>
		<div :class="{'body': true, expanded: isExpanded, collapsed: !isExpanded}">
			<slot name="body" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import AnimatedHamburger from "~/components/atoms/AnimatedHamburger.vue";

const props = withDefaults(defineProps<{
	aria: string;
	forceClose?: number;
}>(), {
	forceClose: 0
});

watch(
	() => props.forceClose,
	() => {
		isExpanded.value = false
	}
)

const isExpanded = ref(false)

function toggle(state: {isOpen: boolean}) {
	isExpanded.value = state.isOpen;
}

function forceClose() {
	isExpanded.value = false;
}
</script>

<style scoped>
.grow-to-modal.expanded {
	position: absolute;
	right: 0;
	top: 0;
}

.mask {
	background-color: transparent;
	transition: background-color 1000ms linear;
	z-index: 30;
}

.grow-to-modal.expanded .mask {
	display: block;
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000000;
	opacity: 0.2;
}

.close.expanded {
	position: absolute;
	right: 10px;
	z-index: 50;
}

.open.collapsed {
	margin-right: 10px;
}

.open.expanded, .close.collapsed {
	display: none;
}

.body {
	transition: transform 0.4s ease-out, padding 0.4s ease-out;
	transform-origin: top;
	background: rgba(129, 221, 230, 0.9);
}
.body.collapsed {
	transform: scale(0,0);
	position: absolute;
	padding-top: 0;
	right: 0;
	top: 0;
}

.body.expanded {
	overflow: hidden;
	height: auto;
	transform: scale(1,1);
	padding-top: 40px;
	box-shadow: 2px 2px 4px #bbbbbb, -1px -1px 1px #bbbbbb;
	z-index: 40;
	position: relative;
}
</style>
