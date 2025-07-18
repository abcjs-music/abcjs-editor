<template>
	<button class="link tree" @click="emit('click', $event)">
		<span :class="isHeader2 ? 'header' : ''">{{ isOpen ? '▼' : '►' }}</span>
		<h3 v-if="isHeader3">
			{{ label }}
		</h3>
		<h2 v-if="isHeader2">
			{{ label }}
		</h2>
		<span v-if="!isHeader2 && !isHeader3">{{ label }}</span>
	</button>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
	label: string;
	isOpen: boolean;
	isHeader2?: boolean;
	isHeader3?: boolean;
}>(), {
	isHeader2: false,
	isHeader3: false,
});

const emit = defineEmits<{
	(e: "click", ev: MouseEvent): void;
}>();
</script>

<style scoped>
.tree {
	margin-bottom: 10px;
	display: flex;
	align-items: center;
}
.tree:hover {
	cursor: pointer;
}
.header {
	color: #0098c4;
	font-size: 1.5em;
}
h2{
	display: inline-block;
	margin: 0;
}
</style>
