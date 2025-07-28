<template>
	<div :class="`code-input-wrapper ${theme}`">
		<ClientOnly>
			<code-input
				ref="elem"
				:name="name"
				:value="value"
				:aria-label="ariaLabel"
				:style="{ fontSize: fontSize + 'px' }"
				spellcheck="false"
				@input="emit('input', $event.target.value)"
				@code-input_load="loaded"
			></code-input>
		</ClientOnly>
	</div>
</template>

<script lang="ts" setup>
import hljs from "highlight.js/lib/core";
import highlightAbc from "highlightjs-abc"
import {sleep} from "~/helpers/sleep";

const emit = defineEmits<{
	(e: "input", value: string): void;
	(e: "ready", textarea: HTMLElement): void;
}>();

const props = defineProps<{
	theme: string;
	value: string;
	name: string;
	ariaLabel: string;
	fontSize: number;
}>();

const elem = ref()

onBeforeMount(async () => {
	if (import.meta.browser) {
		const codeInput = await import("@webcoder49/code-input");
		const Template = (await import("@webcoder49/code-input/templates/hljs.mjs")).default;
		hljs.registerLanguage("abc", highlightAbc);
		codeInput.registerTemplate("hljs", new Template(hljs, []));
	}
})

function loaded() {
	const ta = elem.value.querySelector('textarea')
	emit("ready", ta)
}
</script>

<style>
.code-input-wrapper {
	background: white;
	border: 1px solid #bbbbbb;
}
code-input {
	resize: both;
}

code-input textarea::selection {
	background: #6781ef;
	color: #ffffff;
}

</style>
