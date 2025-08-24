<template>
	<div class="cheatsheet">
		<h2>ABC Cheat Sheet</h2>
		<p class="cheat-info">
			These are some of the most common things that can be done with ABC. For all the details, see <a class="muted external-link" href="https://abcnotation.com/wiki/abc:standard" target="_blank">the full documentation.</a>
		</p>
		<CollapsibleSection title="Headers" :is-header3="true">
			<help-headers />
		</CollapsibleSection>
		<CollapsibleSection title="Pitches" :is-header3="true">
			<help-pitch />
		</CollapsibleSection>
		<CollapsibleSection title="Durations" :is-header3="true">
			<help-durations />
		</CollapsibleSection>
		<CollapsibleSection title="Bar Lines" :is-header3="true">
			<help-bar-lines />
		</CollapsibleSection>
		<CollapsibleSection title="Beaming" :is-header3="true">
			<help-beaming />
		</CollapsibleSection>
		<CollapsibleSection title="Ties and Slurs" :is-header3="true">
			<help-ties />
		</CollapsibleSection>
		<CollapsibleSection title="Accompaniment" :is-header3="true">
			<help-accompaniment />
		</CollapsibleSection>
		<CollapsibleSection title="Decorations" :is-header3="true">
			<help-decorations />
		</CollapsibleSection>
		<CollapsibleSection title="Grace Notes" :is-header3="true">
			<help-grace-notes />
		</CollapsibleSection>
		<CollapsibleSection title="Multiple Notes" :is-header3="true">
			<help-multiple-notes />
		</CollapsibleSection>
		<CollapsibleSection title="Lyrics" :is-header3="true">
			<help-lyrics />
		</CollapsibleSection>
		<CollapsibleSection title="Voices / Staves" :is-header3="true">
			<help-voices />
		</CollapsibleSection>
		<CollapsibleSection title="Comments" :is-header3="true">
			<help-comments />
		</CollapsibleSection>
	</div>
</template>

<script lang="ts" setup>
import CollapsibleSection from "~/components/generic/CollapsibleSection.vue";
</script>

<style scoped>
	.cheat-info {
		margin-right: 120px;
	}
</style>
