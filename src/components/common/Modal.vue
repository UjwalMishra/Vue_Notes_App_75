<template>
  <transition name="command-palette">
    <div v-if="show" class="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-6" @click.self="$emit('close')">
      <div class="bg-white w-full max-w-[640px] rounded-[32px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col animate-slide-up">
        <div class="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div class="flex items-center gap-3">
            <span v-if="icon" class="text-xl">{{ icon }}</span>
            <h2 class="text-lg font-black tracking-tight text-primary">{{ title }}</h2>
          </div>
          <button class="w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center cursor-pointer text-sm hover:border-black transition-all hover:bg-slate-50" @click="$emit('close')">✕</button>
        </div>
        
        <div class="p-8 lg:p-12">
          <slot />
        </div>

        <div v-if="$slots.footer" class="p-8 border-t border-slate-50 bg-slate-50/50">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  icon?: string
}>()

defineEmits(['close'])
</script>
