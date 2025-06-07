<template>
	<div :class="`grow-to-modal ${expandClass}`">
		<div class="mask" @click="forceClose" />
		<div :class="`${controlButtonClass} ${expandClass}`">
			<animated-hamburger ref="hamburger" :aria="aria" @click="toggle" />
		</div>
		<div :class="`body ${expandClass}`">
			<slot name="body" />
		</div>
	</div>
</template>

<script>
import AnimatedHamburger from "./AnimatedHamburger";

export default {
	name: "GrowToModal",
	components: { AnimatedHamburger },
	props: {
		aria: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			isExpanded: false,
		};
	},
	computed: {
		expandClass() {
			if (this.isExpanded)
				return "expanded";
			else
				return "collapsed";
		},
		buttonText() {
			if (this.isExpanded)
				return "Close";
			else
				return "Open";
		},
		controlButtonClass() {
			if (this.isExpanded)
				return "close";
			else
				return "open";
		},
	},
	methods: {
		toggle(state) {
			this.isExpanded = state.isOpen;
		},
		forceClose() {
			this.$refs.hamburger.forceClose();
			this.isExpanded = false;
		},
	},
};
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
