<template>
	<div :class="wrapperClass">
		<input type="checkbox" v-model="dataModel" :id="id" :disabled="disabled">
		<label
			:for="id"
			tabindex="0"
			@keyup.enter.self.stop="toggle"
			@keyup.space.self.stop="toggle"
			@keydown.space.prevent="swallow"
			@keydown.tab="($event.shiftKey) ? $emit('shift-tab') : $emit('tab')"
			:title="disabled ? disabledMessage : ''"
		>
			{{label}}
		</label>
	</div>
</template>

<script>
// @Store MIGRATION to Pinia
import { useAbcStore } from "../store/abcStore";
export default {
	// @Store MIGRATION to Pinia
	setup() {
		const abcStore = useAbcStore();
		return {
			abcStore,
		}
	},
	name: "check-box",
	// @vue3 MIGRATION: requires emits:
	emits: ["shift-tab", "tab"], // TODO review if this is really needed
	props: {
		label: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		action: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		disabledMessage: {
			type: String,
			default: '',
			required: false,
		},
		type: {
			type: String,
			default: '',
			required: false,
		}
	},
	computed: {
		dataModel: {
			get() {
				// @Store MIGRATION to Pinia
				//return this.$store.getters[this.id]; },
				return this.abcStore[this.id]; },
			set(value) {
				// Called when the user clicks with mouse
				this.saveData(value);
			}
		},
		wrapperClass() {
			let cls = [ 'check-box'];
			if (this.type)
				cls.push(this.type);
			return cls.join(" ");
		},
	},
	methods: {
		toggle() {
			// Called when user clicks with keyboard
			if (!this.disabled)
				// @Store MIGRATION to Pinia
				//this.saveData(!this.$store.getters[this.id]);
				this.saveData(!this.abcStore[this.id]);
		},
		swallow() {
			// this keeps the page from scrolling when the space key is pressed.
		},
		saveData(value) {
			// @Store MIGRATION to Pinia
			//this.$store.dispatch(this.action, value);
			this.abcStore[this.action](value);
		},
	},
};
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
