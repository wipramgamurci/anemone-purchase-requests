<script setup lang="ts">
import type { PaymentMethod } from "~/types/order";

const props = defineProps<{
  methods: PaymentMethod[];
  modelValue: string;
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
    :color="'primary'"
    class="w-full"
  />
</template>
