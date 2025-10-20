<template>
	<section :class="{'abcjs-output': true, short: shorten}" :tabindex="shorten ? 0 : undefined">
		<div id="canvas" />
	</section>
</template>

<script lang="ts" setup>
const props = defineProps<{
	shorten: boolean;
}>();
</script>

<style scoped>
.abcjs-output {
	position: relative;
	max-width: 900px;
	background-color: #F3ECe2;
	box-shadow: 2px 2px 4px #bbbbbb, -1px -1px 1px #bbbbbb;
}

nav {
	text-align: right;
	padding-right: 10px;
}

.short {
	height: 290px;
	overflow: auto;
}
</style>

<style>
@media print {
	[fill="#ff0000"] {
		fill: currentColor;
	}
	.abcjs-cursor {
		display: none;
	}
}
</style>
