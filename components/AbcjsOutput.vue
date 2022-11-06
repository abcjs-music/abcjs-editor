<template>
	<section :class="`abcjs-output ${shorten ? 'short' :''}`" :tabindex="shorten ? '0' : null">
		<div id="canvas"></div>
	</section>
</template>

<script>
	import ButtonWithIcon from "./ButtonWithIcon";
	export default {
		name: "abcjs-output",
		components: {ButtonWithIcon},
		props: {
			shorten: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		data() {
			return {
			}
		},
	}
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
}
</style>
