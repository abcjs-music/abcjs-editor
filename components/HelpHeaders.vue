<template>
	<div>
		<p>
			Each tune needs to start off with a set of headers. See the full documentation for a detailed discussion of what
			headers are possible. Described below are the most used header elements. Headers always start with a capital
			letter as the first character on a line and a colon as the second letter.
		</p>
		<p>Header fields that appear before any of the music:</p>
		<table>
			<thead>
				<tr><th>Field</th><th>Typical Value</th><th>Meaning</th></tr>
			</thead>
			<tbody>
				<tr><td>X:</td><td>1</td><td>Must be the first line of each tune. The value it is given is not used anywhere.</td></tr>
				<tr><td>T:</td><td>Twinkle, Twinkle</td><td>This appears as a large title on top of the music.</td></tr>
				<tr><td>C:</td><td>Anonymous</td><td>This appears on top of the music on the right side.</td></tr>
				<tr><td>L:</td><td>1/4 or 1/8</td><td>Which duration is the default. Typically this is either a quarter note or an eighth note.</td></tr>
				<tr><td>M:</td><td>2/4, 3/4, 4/4, 6/8, C,  or C|</td><td>A time signature. Typical ones are shown, but there are many that are accepted.</td></tr>
				<tr><td>Q:</td><td>1/4=120</td><td>The tempo of the piece. Typically the beat is chosen for before the equal sign, and the beats per minute is chosen to the right of the equal sign.</td></tr>
				<tr><td>K:</td><td>D or Dm</td><td>The key, starting with a letter from A to G, then possibly having an "m" to indicate a minor key. Note that many other modes and many other parameters are accepted on this line, so see the full documentation.</td></tr>
			</tbody>
		</table>
		<pre>{{ abcString }}</pre>
		<div id="help-header-paper" />

		<p>Header fields that are interspersed in the music:</p>
		<table>
			<thead>
				<tr><th>Field</th><th>Typical Value</th><th>Meaning</th></tr>
			</thead>
			<tbody>
				<tr><td>V:</td><td>alto</td><td>See the section on voices for more details.</td></tr>
				<tr><td>P:</td><td>Chorus</td><td>This will be printed between staves and can be any string you like.</td></tr>
			</tbody>
		</table>
	</div>
</template>

<script>
// @nuxt3 MIGRATION:
// const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
export default {
	name: "HelpHeaders",
	components: {
	},
	data() {
		return {
			abcString: `X:1
T:Twinkle, Twinkle
C:Anonymous
L:1/4
M:4/4
Q:1/4=120
K:D
DDAA|BBA2|]`,
		};
	},
	mounted() {
		abcjs.renderAbc("help-header-paper", this.abcString);
	},
};
</script>

<style scoped>

</style>
