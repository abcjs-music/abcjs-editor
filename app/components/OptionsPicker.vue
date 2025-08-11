<template>
	<div>
		<h2>Options for rendering</h2>
		<p>This is a collection of some of the most useful options. If you would like another option here, let me know by using the link in the footer.</p>
		<div class="options-container">
			<section>
				<h3>Input Options</h3>
				<AnimatedButton id="useSyntaxHighlighting" el="checkbox" label="Use Syntax Highlighting" :check-value="abcStore.syntaxHighlighting" @checked="abcStore.setSyntaxHighlighting($event)"/>
				<label>Font Size: <input name="fontSize" :value="abcStore.fontSize" @input="abcStore.setFontSize(parseInt($event.target.value,10))" type="number" min="8" max="30"></label>
			</section>
			<section>
				<h3>Synth Options</h3>
				<AnimatedButton id="swingPlayback" el="checkbox" label="Swing" :check-value="abcStore.swingPlayback" @checked="abcStore.setSwingPlayback($event)"/>
			</section>
		</div>

	</div>
</template>

<script lang="ts" setup>
import AnimatedButton from "~/components/atoms/AnimatedButton.vue";
import {useAbcStore} from "~/store/abcStore";

const abcStore = useAbcStore();

</script>

<style scoped>
.options-container {
	display: flex;
	flex-wrap: wrap;
	column-gap: 20px;

	section {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		max-width: 350px;
		padding: 10px;
		background: lightcyan;
	}
	label {
		font-size: 18px;
	}
	input {
		font-size: 1em;
	}
}
</style>
