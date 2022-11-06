<template>
	<div>
		<p>There are many possibilities for using multiple voices. See the full documentation if the following use cases don't
		fit your needs.</p>
		<p>There are three elements involved. There is the "%%staves" directive for specifying which voices go in which staff,
		the "V:" field in the header for defining the voices, and the "V:" field in the body for specifying which voice a line of music goes with.</p>
		<p>It is easy to make mistakes and mis-align your music when using multiple voices. Make sure each voice has the correct
		number of beats and the same bar lines and repeat marks.</p>
		<h3>Piano</h3>
		<p>A piano score has two staves and two voices: left hand and right hand. There is a brace connecting the two staves. The
		top staff is treble clef and the bottom staff is bass clef. Here's a simple example of setting that up:</p>
		<pre>{{abcPiano}}</pre>
		<div id="help-piano-paper"></div>
		<h3>Multiple Instrument Score</h3>
		<p>If all instruments go on separate staves, then the "%%staves" directive is not needed.</p>
		<p>Note that you can write the music in concert pitch but have it appear for Bb or Eb instruments by using the "score=_B"
		or "score=_E" option. (You may change the octave that it transposes to by using a lower case "_b" or "_e".)</p>
		<pre>{{abcScore}}</pre>
		<div id="help-score-paper"></div>
		<h3>Four-part Harmony, two staves</h3>
		<p>Sometimes parts should be on the same staff. In four-part harmony, typically there are two staves and two voices
		on each staff.</p>
		<pre>{{abcHarmony}}</pre>
		<div id="help-harmony-paper"></div>
	</div>
</template>

<script>
	const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
	export default {
		name: "help-voices",
		data() {
			return {
				abcPiano: `X:1
M:4/4
T:Piano
L:1/4
%%staves {(RH) (LH)}
V:RH clef=treble
V:LH clef=bass
K:C
V: RH
ABcd | [ce]2 [ce]2 | [df]2 [df]2| [ce]4:|]
V: LH
A,2 E,2 | A,2 E,2 | D,2 A,2 | A, G, F, E, :|]`,
				abcScore: `X: 1
T: Score
M: 4/4
L: 1/4
V: Cl name="Clarinet" score=_B
V: Vi name="Violin"
V: Tr name="Trombone" clef=bass
K: Emin
V: Cl
EFGA|Bcde|edcB|AGFE|]
V: Vi
EFGA|Bcde|edcB|AGFE|]
V: Tr
E,F,G,A,|B,c,d,e,|e,d,c,B,|A,G,F,E,|]`,
				abcHarmony: `X:1
T:Zocharti Loch
C:Louis Lewandowski (1821-1894)
M:C
Q:1/4=76
%%staves (T1 T2) (B1 B2)
V:T1  clef=treble-8  name="Tenore I"   snm="T.I"
V:T2  clef=treble-8  name="Tenore II"  snm="T.II"
V:B1  clef=bass      name="Basso I"    snm="B.I"
V:B2  clef=bass      name="Basso II"   snm="B.II"
K:Gm
%            End of header, start of tune body:
% 1
[V:T1]  B2c2 d2g2  | f6e2      | d2c2 d2e2 | d4 c2z2 |
[V:T2]  (G2A2 B2e2)  | d6c2      | (B2A2 B2)c2 | B4 A2z2 |
[V:B1]       z8      | z2f,,2 g,,2a,,2 | b,,2z2 z2 e,,2  | f,,4 f,,2z2 |
[V:B2]       x8      |     x8    |      x8     |    x8   |
% 5
[V:T1]  (B2c2 d2g2)  | f8        | d3c (d2fe)  | H d6    ||
[V:T2]       z8      |     z8    | B3A (B2c2)  | A6    ||
[V:B1]  (d,,2f,,2 b,,2e,2) | d,8       | g,,3g,,  g,,4     | H^f,,6    ||
[V:B2]       x8      | z2B,,2 c,,2d,,2 | e,,3e,, (d,,2c,,2)  | d,,6    ||`,
			}
		},
		mounted() {
			abcjs.renderAbc("help-piano-paper", this.abcPiano);
			abcjs.renderAbc("help-score-paper", this.abcScore);
			abcjs.renderAbc("help-harmony-paper", this.abcHarmony);
		},
		components: {
		},
	};

</script>

<style scoped>

</style>
