<template>
	<div>
		<p>
			Chord symbols can be placed over the staff to indicate what chords the accompanist should play. These chords are
			played by the MIDI player, too. Chords are created by putting any string inside double quote marks. There is no error
			checking of these strings. They are just printed as is. Many common patterns are understood by the MIDI player.
		</p>
		<pre>{{ abcString }}</pre>
		<div id="help-chords-paper" />

		<p>Here's a list of the chord types that are understood by the playback system:</p>
		<table>
			<thead>
			<tr><th>Suffix</th><th>Meaning</th></tr>
			</thead>
			<tbody>
				<tr><td>(none) or M</td><td>Major chord</td></tr>
				<tr><td>maj7 or ∆7</td><td>Major seventh chord (Option + j)</td></tr>
				<tr><td>6</td><td>Major sixth chord</td></tr>
				<tr><td>7</td><td>Dominant seventh chord</td></tr>
				<tr><td>+</td><td>Augmented chord</td></tr>
				<tr><td>+7 or aug7 or 7#5 or 7+5</td><td>Augmented seventh chord</td></tr>
				<tr><td>- or m</td><td>Minor chord</td></tr>
				<tr><td>-6 or m6</td><td>Minor sixth chord</td></tr>
				<tr><td>-7 or m7</td><td>Minor seventh chord</td></tr>
				<tr><td>dim or °</td><td>Diminished chord (Option + Shift + 8)</td></tr>
				<tr><td>dim7 or °7</td><td>Diminished seventh chord</td></tr>
				<tr><td>ø7</td><td>Half-diminished seventh chord (Option + o)</td></tr>
				<tr><td>9</td><td>Ninth chord</td></tr>
				<tr><td>11</td><td>Eleventh chord</td></tr>
				<tr><td>13</td><td>Thirteenth chord</td></tr>
				<tr><td>7b9</td><td>Dominant seventh, flat nine chord</td></tr>
				<tr><td>7b5</td><td>Dominant seventh, flat five chord</td></tr>
				<tr><td>9#5 or 9+5</td><td>Dominant seventh, sharp five chord</td></tr>
				<tr><td>sus4</td><td>Sustained four chord</td></tr>
				<tr><td>7sus4</td><td>Dominant seventh, sustained four chord</td></tr>
				<tr><td>m7sus4</td><td>Minor seventh, sustained four chord</td></tr>
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
	name: "HelpAccompaniment",
	components: {
	},
	data() {
		return {
			abcString: `X:1
L:1/4
K:C
"A"A "Gm7"D "Bb°7"F "F#9"g|]`,
		};
	},
	mounted() {
		abcjs.renderAbc("help-chords-paper",
			this.abcString, {
				format: {
					gchordfont: "FreeSerif",
				},
			});
	},
};
</script>

<style scoped>

</style>
