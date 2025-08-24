<template>
	<div>
		<p>
			The note durations are specified by a number or fraction after the note. The note length that corresponds to 1, or not
			specifying a duration is in the "L:" header field. A good strategy for choosing a value for the L: field is to see if there are
			more eight notes or quarter notes, and set the L: field to that.
		</p>
		<p>Note that "/2" can be abbreviated to "/"</p>
		<p>
			Triplets are indicated by starting the three notes with "(3". Note that the subject of triplets and other duples are
			complicated, so if you want to do anything more elaborate than that, see the official documentation, linked to above.
		</p>
		<p>The following example shows the way to get the different durations for both values of L:</p>
		<div id="help-duration-paper" />
	</div>
</template>

<script lang="ts" setup>
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
const abcString = `X:1
%%staffwidth 400
%%staffsep 3cm
%%scale .9
L:1/8
K:C
P:When using "L:1/8"
"_A/4"A/4 "_A/2"A/2 "_A/"A/ "_A3/4"A3/4 "_A"A "_A3/2"A3/2 "_A2"A2 "_A3"A3 "_A4"A4 "_A6"A6 "_A8"A8 "_A12"A12 |]
P:When using "L:1/4"
L:1/4
"_A/8"A/8 "_A/4"A/4 "_A3/8"A3/8 "_A/2"A/2 "_A/"A/ "_A3/4"A3/4 "_A"A "_A3/2"A3/2 "_A2"A2 "_A3"A3 "_A4"A4 "_A6"A6 |]
P:Rests
"_z/8"z/8 "_z/4"z/4 "_z3/8"z3/8 "_z/2"z/2 "_z/"z/ "_z3/4"z3/4 "_z"z "_z3/2"z3/2 "_z2"z2 "_z3"z3 "_z4"z4 "_z6"z6 |]
P:Triplets
"_(3A"(3A"_B"B"_c"c|"_(3F/"(3F/"_G/"G/"_A/"A/|`

onMounted(() => {
	if (abcjs) {
		abcjs.renderAbc("help-duration-paper", abcString);
	}
})
</script>

<style scoped>

</style>
