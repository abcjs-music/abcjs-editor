<template>
	<div class="cheatsheet">
		<h2>ABC Cheat Sheet</h2>
		<p class="cheat-info">
			These are some of the most common things that can be done with ABC. For all the details, see <a class="muted external-link" href="http://abcnotation.com/wiki/abc:standard" target="_blank">the full documentation.</a>
		</p>
		<collapsible-section title="Headers" :is-header3="true">
			<help-headers />
		</collapsible-section>
		<collapsible-section title="Pitches" :is-header3="true">
			<help-pitch />
		</collapsible-section>
		<collapsible-section title="Durations" :is-header3="true">
			<help-durations />
		</collapsible-section>
		<collapsible-section title="Bar Lines" :is-header3="true">
			<help-bar-lines />
		</collapsible-section>
		<collapsible-section title="Beaming" :is-header3="true">
			<help-beaming />
		</collapsible-section>
		<collapsible-section title="Ties and Slurs" :is-header3="true">
			<help-ties />
		</collapsible-section>
		<collapsible-section title="Accompaniment" :is-header3="true">
			<help-accompaniment />
		</collapsible-section>
		<collapsible-section title="Decorations" :is-header3="true">
			<help-decorations />
		</collapsible-section>
		<collapsible-section title="Grace Notes" :is-header3="true">
			<help-grace-notes />
		</collapsible-section>
		<collapsible-section title="Multiple Notes" :is-header3="true">
			<help-multiple-notes />
		</collapsible-section>
		<collapsible-section title="Lyrics" :is-header3="true">
			<help-lyrics />
		</collapsible-section>
		<collapsible-section title="Voices / Staves" :is-header3="true">
			<help-voices />
		</collapsible-section>
		<collapsible-section title="Comments" :is-header3="true">
			<help-comments />
		</collapsible-section>
	</div>
</template>

<script>
import CollapsibleSection from "./CollapsibleSection";
import HelpPitch from "./HelpPitch";
import HelpHeaders from "./HelpHeaders";
import HelpDurations from "./HelpDurations";
import HelpBarLines from "./HelpBarLines";
import HelpBeaming from "./HelpBeaming";
import HelpTies from "./HelpTies";
import HelpAccompaniment from "./HelpAccompaniment";
import HelpDecorations from "./HelpDecorations";
import HelpGraceNotes from "./HelpGraceNotes";
import HelpMultipleNotes from "./HelpMultipleNotes";
import HelpLyrics from "./HelpLyrics";
import HelpVoices from "./HelpVoices";
import HelpComments from "./HelpComments";

export default {
	components: {
		HelpComments,
		HelpVoices,
		HelpLyrics,
		HelpMultipleNotes,
		HelpGraceNotes,
		HelpDecorations,
		HelpAccompaniment,
		HelpTies,
		HelpBeaming,
		HelpBarLines,
		HelpDurations,
		HelpHeaders,
		CollapsibleSection,
		HelpPitch,
	},
	data() {
		return {
		};
	},
};
</script>

<style scoped>
	.cheat-info {
		margin-right: 120px;
	}
</style>
