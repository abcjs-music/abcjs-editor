<template>
	<div>
		<p>Grace notes are represented by notes inside of curly braces. They are attached to a following note and printed small.</p>
		<pre>{{abcString}}</pre>
		<div id="help-grace-paper"></div>

	</div>
</template>

<script>
	const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
	export default {
		name: "help-grace-notes",
		data() {
			return {
				abcString: `X:1
L:1/4
K:C
{g}A3 A{g}AA|{cAGAG}A3 {g}A{d}A{e}A|]`,
			}
		},
		mounted() {
			abcjs.renderAbc("help-grace-paper", this.abcString);
		},
		components: {
		},
	};

</script>

<style scoped>

</style>
