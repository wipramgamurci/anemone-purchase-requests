<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
  }>(),
  {
    modelValue: 1,
    min: 1,
    max: Infinity,
    disabled: false,
    size: "sm",
    class: "",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

function update(value: number) {
  const next = Math.min(Math.max(value, props.min), props.max);
  emit("update:modelValue", next);
}
</script>

<template>
  <UInputNumber
    :model-value="modelValue"
    :min="min"
    :max="Number.isFinite(max) ? max : undefined"
    :disabled="disabled"
    :size="size"
    :class="class"
    @update:model-value="update"
  />
</template>
