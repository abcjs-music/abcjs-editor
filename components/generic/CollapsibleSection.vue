<template>
	<section>
		<ButtonTree :is-open="showContents" :label="title" :is-header2="isHeader2" :is-header3="isHeader3" @click="toggle" />
		<div v-if="showContents" class="help-section">
			<slot />
		</div>
	</section>
</template>

<script lang="ts" setup>
import ButtonTree from "../atoms/ButtonTree.vue";

const props = withDefaults(defineProps<{
	title: string;
	isOpen?: boolean;
	isHeader2?: boolean;
	isHeader3?: boolean;
}>(), {
	isOpen: false,
	isHeader2: false,
	isHeader3: false,
});

const emit = defineEmits<{
	(e: "click"): void;
}>();

const showContents = ref(false)

onMounted(() => {
	showContents.value = props.isOpen
})

watch(
	() => props.isOpen,
	() => {
		showContents.value = props.isOpen
	}
)

function toggle() {
	showContents.value = !showContents.value;
	emit("click");
}
</script>

<style scoped>
.help-section {
	background-color: #F3ECe2;
	margin: 0 5px 10px 15px;
	padding: 10px;
	box-shadow: 2px 2px 4px #bbbbbb, -1px -1px 1px #bbbbbb;
	max-width: 900px;
}
</style>
