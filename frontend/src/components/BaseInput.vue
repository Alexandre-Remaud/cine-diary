<script setup lang="ts">
import { computed, ref, watch, type Component } from 'vue'

const props = defineProps<{
  label?: string
  modelValue: string
  placeholder?: string
  type?: 'email' | 'password'
  error?: string | null
  disabled?: boolean
  icon?: Component
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

const internalValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
  },
)

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

const baseClasses =
  'block w-full rounded border px-3 py-2 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed pl-10'
const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-200'
const normalClasses = 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'

const classes = computed(() => [baseClasses, props.error ? errorClasses : normalClasses])
</script>

<template>
  <div class="flex flex-col gap-1 relative">
    <label v-if="label" :for="inputId" class="font-semibold">
      {{ label }}
    </label>

    <div class="relative">
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      />
      <input
        :id="inputId"
        :type="type || 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="classes"
        v-model="internalValue"
        @input="(e) => emit('input', e)"
        @focus="(e) => emit('focus', e)"
        @blur="(e) => emit('blur', e)"
      />
    </div>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>
