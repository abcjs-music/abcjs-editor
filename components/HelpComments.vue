<template>
	<div>
		<p>Anything after a single percent sign (%) on a line is ignored. That means you can freely add comments about your
			tune to make it easier to read.</p>
		<p>A tune ends when the first blank line is encountered, but if you'd like to use a blank line, the next best thing is
		a line that contains only a percent sign.</p>
		<p>If a line starts with two percent signs (%%) what follows is a formatting directive. There are many of these. See the
		full documentation for more details.</p>
		<pre>{{abcString}}</pre>
		<div id="help-comments-paper"></div>

	</div>
</template>

<script>
	// @nuxt3 MIGRATION:
	//const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
	import abcjsDefaultExport from 'abcjs';
	const abcjs = process.browser ? abcjsDefaultExport : null;
	export default {
		name: "help-comments",
		data() {
			return {
				abcString: `X:1
%%leftmargin 100
L:1/4
% This line is ignored
K:C
%
% This is part of a C-scale.
%
cdef|] % This text is ignored, too.`,
			}
		},
		mounted() {
			abcjs.renderAbc("help-comments-paper", this.abcString);
		},
		components: {
		},
	};

</script>

<style scoped>

</style>
