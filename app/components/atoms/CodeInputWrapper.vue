<template>
	<ClientOnly>
		<code-input
			ref="elem"
			:name="name"
			:value="value"
			:aria-label="ariaLabel"
			:style="{ fontSize: fontSize + 'px' }"
			spellcheck="false"
			@input="emit('input', $event.target.value)"
		></code-input>
	</ClientOnly>
</template>

<script lang="ts" setup>
import hljs from "highlight.js/lib/core";
import highlightAbc from "highlightjs-abc"
import {sleep} from "~/helpers/sleep";

const emit = defineEmits<{
	(e: "input", value: string): void;
	(e: "ready"): void;
}>();

const props = defineProps<{
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

onMounted(async() => {
	let ta : HTMLElement | null = null
	while (!ta) {
		if (elem.value) {
			ta = elem.value.querySelector('textarea')
		}
		if (!ta)
			await sleep(1)
	}
	emit("ready")
})
</script>
