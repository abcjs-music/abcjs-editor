<template>
	<button :class="`animated-hamburger btn ${isOpen ? 'active' : ''}`" :aria-label="aria" @click="toggle">
		<span />
	</button>
</template>

<script>
export default {
	name: "AnimatedHamburger",
	props: {
		aria: {
			type: String,
			required: true,
		},
	},
	emits: ["click"],
	data() {
		return {
			isOpen: false,
		};
	},
	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
			this.$emit("click", { isOpen: this.isOpen });
		},
		forceClose() {
			this.isOpen = false;
		},
	},
};
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
