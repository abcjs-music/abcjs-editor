<template>
	<div>
		<p>Grace notes are represented by notes inside of curly braces. They are attached to a following note and printed small.</p>
		<pre>{{ abcString }}</pre>
		<div id="help-grace-paper" />
	</div>
</template>

<script lang="ts" setup>
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
const abcString = `X:1
L:1/4
K:C
{g}A3 A{g}AA|{cAGAG}A3 {g}A{d}A{e}A|]`

onMounted(() => {
	if (abcjs) {
		abcjs.renderAbc("help-grace-paper", abcString);
	}
})
</script>

<style scoped>

</style>
