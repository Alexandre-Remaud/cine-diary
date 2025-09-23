<script setup lang="ts">
import { computed, type Component } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  to?: string
  'aria-label'?: string
  'aria-expanded'?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'text' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: Component
  iconPosition?: 'left' | 'right'
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-semibold rounded transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses: Record<string, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  text: 'bg-transparent text-blue-500 hover:underline',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const classes = computed(() => [
  baseClasses,
  variantClasses[props.variant || 'primary'],
  sizeClasses[props.size || 'md'],
])
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :aria-label="props['aria-label']"
    :aria-expanded="props['aria-expanded']"
    :type="type || 'button'"
    :disabled="disabled || loading"
    :class="classes"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="flex items-center gap-2">
      <svg
        class="animate-spin h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4z"
        />
      </svg>
      <slot name="loading">Chargement...</slot>
    </span>

    <template v-else>
      <component v-if="icon && iconPosition !== 'right'" :is="icon" class="w-5 h-5" />

      <slot />

      <component v-if="icon && iconPosition === 'right'" :is="icon" class="w-5 h-5" />
    </template>
  </component>
</template>
