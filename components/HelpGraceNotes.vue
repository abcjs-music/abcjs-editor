<template>
	<div>
		<p>Grace notes are represented by notes inside of curly braces. They are attached to a following note and printed small.</p>
		<pre>{{ abcString }}</pre>
		<div id="help-grace-paper" />
	</div>
</template>

<script>
// @nuxt3 MIGRATION:
// const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
export default {
	name: "HelpGraceNotes",
	components: {
	},
	data() {
		return {
			abcString: `X:1
L:1/4
K:C
{g}A3 A{g}AA|{cAGAG}A3 {g}A{d}A{e}A|]`,
		};
	},
	mounted() {
		abcjs.renderAbc("help-grace-paper", this.abcString);
	},
};
</script>

<style scoped>

</style>
