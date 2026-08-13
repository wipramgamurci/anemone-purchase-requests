<script setup lang="ts">
import type { PaymentMethod } from "~/types/order";

const props = defineProps<{
  methods: PaymentMethod[];
  modelValue: string;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const selected = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<template>
  <URadioGroup
    v-model="selected"
    :items="methods"
    :color="color ?? 'primary'"
    variant="card"
    class="w-full"
  />
</template>