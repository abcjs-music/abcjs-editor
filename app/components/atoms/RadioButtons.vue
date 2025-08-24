<template>
	<div class="radio-buttons">
		<label
			v-for="button in options" :key="button.value"
			@keydown.space.prevent="swallow"
			@keydown.tab="($event.shiftKey) ? emit('shift-tab', $event) : emit('tab', $event)"
		>
			<input :name="id" :value="button.value" v-model="picked" type="radio">
			{{ button.label }}
		</label>
	</div>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
	options: Array<{ label: string, value: string }>;
	id: string;
	value: string;
}>(), {
});

const emit = defineEmits<{
	(e: "input", value: string): void;
	(e: "shift-tab", ev: KeyboardEvent): void;
	(e: "tab", ev: KeyboardEvent): void;
}>();

const picked = ref('')

watch(
	() => props.value,
	() => {
		picked.value = props.value
	}
)

watch(
	() => picked.value,
	() => {
		emit('input', picked.value)
	}
)

onMounted(() => {
	picked.value = props.value
})

function swallow() {
	// this keeps the page from scrolling when the space key is pressed.
}

</script>

<style scoped>
.radio-buttons {
	border: 1px solid #0074db;
	border-radius: 6px;
	padding: 15px;
	background: white;
	display: flex;
	flex-direction: column;
	row-gap: 10px;
}
label {
	font-size: 18px;

}
</style>
