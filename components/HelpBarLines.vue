<template>
	<div>
		<p>Many different styles of bar lines are possible. First and second endings are also possible. A chart follows with all
		of the commonly used bar lines.</p>
		<table>
			<tr><th>Bar</th><th>Meaning</th></tr>
			<tr><td>|  	</td><td>bar line</td></tr>
			<tr><td>|] 	</td><td>thin-thick double bar line</td></tr>
			<tr><td>|| 	</td><td>thin-thin double bar line</td></tr>
			<tr><td>[| 	</td><td>thick-thin double bar line</td></tr>
			<tr><td>|: 	</td><td>start of repeated section</td></tr>
			<tr><td>:| 	</td><td>end of repeated section</td></tr>
			<tr><td>:: 	</td><td>start & end of two repeated sections</td></tr>
			<tr><td>|1	</td><td>start of first ending</td></tr>
			<tr><td>:|2	</td><td>start of second ending</td></tr>
		</table>
		<div id="help-bar-lines-paper"></div>
	</div>
</template>

<script>
	const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
	export default {
		name: "help-bar-lines",
		data() {
			return {
				abcString: `X:1
%%staffwidth 400
L:1
K:C
A | A || A |] A [| A |: A :| A :: A |1 A :|2 A |]`,
			}
		},
		mounted() {
			abcjs.renderAbc("help-bar-lines-paper", this.abcString);
		},
		components: {
		},
	};

</script>

<style scoped>

</style>
