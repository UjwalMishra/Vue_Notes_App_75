<template>
  <button 
    :class="[
      'font-bold text-sm cursor-pointer transition-all duration-300 rounded-xl px-6 py-3',
      variant === 'primary' ? 'bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 shadow-lg' : '',
      variant === 'secondary' ? 'bg-white border border-border text-slate-500 hover:bg-slate-50 hover:border-slate-300' : '',
      variant === 'danger' ? 'bg-white border border-border text-red-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100' : '',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})
</script>
