<template>
	<div>
		<p>
			Lyrics can appear under the notes by interweaving a separate line that starts with "w:". That is, create a line of music
			like you normally do, then have a line that starts with "w:" and put the lyrics there. Each word of the lyrics corresponds
			to a note in the music.
		</p>
		<p>
			If that were all you could do with lyrics, that would be pretty limiting. In songs, there is not a one-to-one correspondence
			between words and notes: words have more than one syllable and each syllable is a note, and sometimes a syllable is stretched
			over more than one note.
		</p>
		<p>The following chart shows how the following problems are taken care of:</p>
		<table>
			<thead>
				<tr><th>Character</th><th>Meaning</th></tr>
			</thead>
			<tbody>
				<tr><td>- </td><td>(hyphen) break between syllables within a word</td></tr>
				<tr><td>_ </td><td>(underscore) previous syllable is to be held for an extra note</td></tr>
				<tr><td>* </td><td>one note is skipped (i.e. * is equivalent to a blank syllable)</td></tr>
				<tr><td>~ </td><td>appears as a space; aligns multiple words under one note</td></tr>
				<tr><td>\-</td><td>appears as hyphen; aligns multiple syllables under one note</td></tr>
				<tr><td>| </td><td>advances to the next bar</td></tr>
			</tbody>
		</table>
		<pre>{{ abcString }}</pre>
		<div id="help-lyrics-paper" />
	</div>
</template>

<script lang="ts" setup>
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
const abcString = `X:1
L:1/4
K:C
A A A A| A A A A | A A A A |]
w:word syll-a-ble syll-a--ble time__  of~the~day`

onMounted(() => {
	abcjs.renderAbc("help-lyrics-paper", abcString);
})
</script>

<style scoped>

</style>
