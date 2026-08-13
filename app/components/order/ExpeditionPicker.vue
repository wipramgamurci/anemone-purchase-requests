<script setup lang="ts">
import type { Expedition } from "~/types/order";
import { formatRp } from "~/utils/format";

const props = defineProps<{
  expeditions: Expedition[];
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
  <USelect
    v-model="selected"
    :items="
      expeditions.map((e) => ({
        label: `${e.label} - ${formatRp(e.cost)}`,
        value: e.id,
      }))
    "
    color="primary"
    class="w-full"
  />
</template>
