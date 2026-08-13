<script setup lang="ts">
import type { CartItem } from "~/types/order";
import { formatRp } from "~/utils/format";

const props = defineProps<{
  item: CartItem;
  max?: number;
}>();

const emit = defineEmits<{
  remove: [id: number];
  "update:qty": [id: number, qty: number];
}>();

const stepper = computed({
  get: () => props.item.qty,
  set: (value: number) => emit("update:qty", props.item.id, value),
});
</script>

<template>
  <div class="flex items-start justify-between gap-3 py-3">
    <div class="min-w-0">
      <p class="truncate font-medium text-default">
        {{ item.name }}
      </p>
      <p class="text-xs text-muted">
        {{ item.qty }} x {{ formatRp(item.price) }}
      </p>
      <p class="mt-1 font-bold text-highlighted">
        {{ formatRp(item.price * item.qty) }}
      </p>
    </div>
    <div class="flex items-center gap-1">
      <QuantityStepper
        v-model="stepper"
        :min="1"
        :max="max ?? Infinity"
        class="w-22"
      />
      <UButton
        icon="lucide:trash-2"
        color="error"
        variant="ghost"
        size="xs"
        square
        aria-label="Hapus item"
        @click="emit('remove', item.id)"
      />
    </div>
  </div>
</template>