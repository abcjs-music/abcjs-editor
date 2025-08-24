<template>
	<div>
		<p>
			Beaming is done whenever possible. So whenever there are more than one note that is shorter than a quarter note,
			they will be beamed together. If you don't want beaming, then you can break the beam with a space between notes. That
			is, there is no beaming done over a space.
		</p>
		<pre>{{ abcString }}</pre>
		<div id="help-beaming-paper" />
	</div>
</template>

<script lang="ts" setup>
import abcjsDefaultExport from "abcjs";

const abcjs = import.meta.browser ? abcjsDefaultExport : null;
const abcString = `X:1
L:1/8
K:C
A B c d AB cd ABcd|`

onMounted(() => {
	if (abcjs) {
		abcjs.renderAbc("help-beaming-paper", abcString);
	}
})
</script>

<style scoped>

</style>
