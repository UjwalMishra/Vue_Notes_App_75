<template>
  <Transition name="toast">
    <div v-if="state.toast" class="fixed bottom-10 inset-x-6 flex justify-center z-[200] pointer-events-none">
      <div class="bg-black text-white px-8 py-4 rounded-full text-sm font-bold shadow-2xl flex items-center gap-3">
        <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
        {{ state.toast }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { state } from '../store';
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.toast-leave-active {
  transition: all 0.3s ease-in;
}
.toast-enter-from {
  transform: translateY(40px) scale(0.9);
  opacity: 0;
}
.toast-leave-to {
  transform: translateY(20px) scale(0.9);
  opacity: 0;
}
</style>
