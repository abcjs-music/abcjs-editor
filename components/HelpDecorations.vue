<template>
	<div>
		<p>
			There are many possible extra symbols that can be added. A few of the most popular ones are demonstrated below.
			See the full documentation if you don't see one you want to use.
		</p>
		<pre>{{ abcString }}</pre>
		<div id="help-decorations-paper" />
	</div>
</template>

<script>
// @nuxt3 MIGRATION:
// const abcjs = process.browser ? require('abcjs') : null; // This requires document and window, so can't be used on the server side.
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
export default {
	name: "HelpDecorations",
	components: {
	},
	data() {
		return {
			abcString: `X:1
L:1/4
K:C
.C !tenuto!D !marcato!E !>!F | ~G HA TB2 |
!pppp!c !ppp!d !pp!e !p!f | !mp!g !mf!a !f!b !ff!a | !fff!g !ffff!f !sfz!e2 |]`,
		};
	},
	mounted() {
		abcjs.renderAbc("help-decorations-paper", this.abcString);
	},
};
</script>

<style scoped>

</style>
