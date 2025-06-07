<template>
	<div>
		<p>
			There are a couple of ways to represent multiple notes that are playing at the same time. If the notes are from different
			voices then see the section on voices. If the notes come from the same instrument (like a piano or guitar), they can
			be formed by putting the notes that should be stacked inside square brackets.
		</p>
		<pre>{{ abcString }}</pre>
		<div id="help-multiple-paper" />
	</div>
</template>

<script>
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
export default {
	name: "HelpMultipleNotes",
	components: {
	},
	data() {
		return {
			abcString: `X:1
L:1/8
K:C
[CEGc] [C2G2] [CE][DF]|[D2F2][EG][FA] [A4d4]|]`,
		};
	},
	mounted() {
		abcjs.renderAbc("help-multiple-paper", this.abcString);
	},
};
</script>

<style scoped>

</style>
