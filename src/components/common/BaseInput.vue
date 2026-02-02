<template>
  <div class="flex flex-col gap-2 w-full">
    <label v-if="label" class="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">
      {{ label }}
    </label>
    <div class="relative group">
      <div v-if="icon" class="absolute left-5 top-1/2 -translate-y-1/2 text-lg pointer-events-none opacity-40 group-focus-within:opacity-100 transition-opacity">
        {{ icon }}
      </div>
      <textarea 
        v-if="type === 'textarea'"
        v-model="model"
        :placeholder="placeholder"
        :class="[
          'input-modern resize-none',
          $attrs.class
        ]"
        v-bind="{ ...$attrs, class: null }"
      ></textarea>
      <input 
        v-else
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :class="[
          'input-modern',
          icon ? 'pl-14' : '',
          $attrs.class
        ]"
        v-bind="{ ...$attrs, class: null }"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

interface Props {
  label?: string
  placeholder?: string
  type?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text'
})
</script>
