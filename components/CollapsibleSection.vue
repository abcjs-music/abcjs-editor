<template>
	<section>
		<button-tree :is-open="showContents" :label="title" :is-header2="isHeader2" :is-header3="isHeader3" @click="toggle" />
		<div v-if="showContents" class="help-section">
			<slot />
		</div>
	</section>
</template>

<script>
import ButtonTree from "./ButtonTree";

export default {
	name: "CollapsibleSection",
	components: { ButtonTree },
	props: {
		title: {
			type: String,
			required: true,
		},
		isOpen: {
			type: Boolean,
			required: false,
			default: false,
		},
		isHeader2: {
			type: Boolean,
			required: false,
			default: false,
		},
		isHeader3: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: ["click"],
	data() {
		return {
			showContents: false,
		};
	},
	watch: {
		isOpen() {
			this.showContents = this.isOpen;
		},
	},
	mounted() {
		this.showContents = this.isOpen;
	},
	methods: {
		toggle() {
			this.showContents = !this.showContents;
			this.$emit("click");
		},
	},
};
</script>

<style scoped>
	.help-section {
		background-color: #F3ECe2;
		margin: 0 5px 10px 15px;
		padding: 10px;
		box-shadow: 2px 2px 4px #bbbbbb, -1px -1px 1px #bbbbbb;
		max-width: 900px;
	}
</style>
