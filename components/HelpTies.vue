<template>
	<div>
		<p>Ties are between two notes of the same pitch. That means that it sounds as one note. Slurs are between two notes of
		different pitches. Ties and slurs looks the same but they are handled slightly different by the MIDI and animation routines.
		A tie is expressed by a hyphen between two notes. A slur is expressed by putting the notes to be slurred in parentheses.</p>
		<pre>{{abcString}}</pre>
		<div id="help-ties-paper"></div>
	</div>
</template>

<script>
	const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
	export default {
		name: "help-ties",
		data() {
			return {
				abcString: `X:1
L:1/8
K:C
(Ac) d-d| (Ac eg) ga- a-a|`,
			}
		},
		mounted() {
			abcjs.renderAbc("help-ties-paper", this.abcString);
		},
		components: {
		},
	};

</script>

<style scoped>

</style>
