<template>
  <div 
    class="card-premium h-full flex flex-col gap-6 cursor-pointer animate-slide-up group" 
    :style="{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }"
    @click="goToDetail"
  >
    <div class="flex justify-between items-start">
      <div 
        class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all duration-500"
        :class="typeStyles[note.type]"
      >
        <span class="text-sm leading-none">{{ typeIcons[note.type] }}</span>
        <span class="text-[10px] font-black uppercase tracking-widest">{{ note.type }}</span>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{{ formattedDate }}</span>
      </div>
    </div>
    
    <div class="flex flex-col gap-3">
      <h3 class="text-xl font-black tracking-tight text-primary leading-tight group-hover:text-accent transition-colors duration-500">
        {{ note.title || 'Untitled Thought' }}
      </h3>
      <p class="text-[15px] font-medium text-slate-500 leading-relaxed line-clamp-3">
        {{ note.content || 'This entry is awaiting your profound insights.' }}
      </p>
    </div>

    <div class="mt-auto flex flex-wrap gap-2 pt-4 border-t border-slate-50 opacity-60 group-hover:opacity-100 transition-opacity duration-500" v-if="note.tags.length">
      <span 
        v-for="tag in note.tags" 
        :key="tag" 
        class="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 transition-all hover:bg-primary hover:text-white"
      >
        #{{ tag }}
      </span>
    </div>

    <div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
      <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs shadow-lg">→</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { type Note } from '../types'
import { format } from 'date-fns'

const props = defineProps<{ 
  note: Note,
  index: number
}>()
const router = useRouter()

const formattedDate = computed(() => format(props.note.createdAt, 'MMM d'))

const typeStyles = {
  note: 'bg-indigo-50/50 text-indigo-600 border-indigo-100/50',
  link: 'bg-emerald-50/50 text-emerald-600 border-emerald-100/50',
  video: 'bg-rose-50/50 text-rose-600 border-rose-100/50'
}

const typeIcons = {
  note: '🗒️',
  link: '🔗',
  video: '📺'
}

const goToDetail = () => {
  router.push(`/note/${props.note.id}`)
}
</script>
