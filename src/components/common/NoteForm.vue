<template>
  <div class="flex flex-col gap-10">
    <input 
      v-model="formData.title" 
      type="text" 
      placeholder="Give it a name..." 
      class="text-[32px] font-black border-none rounded-none p-0 focus:ring-0 outline-none transition-all placeholder:text-slate-100 text-primary bg-transparent"
      autofocus
    >
    
    <div class="flex flex-wrap gap-4">
      <div class="relative group">
        <select v-model="formData.type" class="bg-slate-50 border border-border px-5 py-3 rounded-xl font-bold text-sm appearance-none pr-10 outline-none focus:border-accent group-hover:bg-white transition-all">
          <option value="note">Text Note</option>
          <option value="link">Web Link</option>
          <option value="video">Video URL</option>
        </select>
        <span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] opacity-40">▼</span>
      </div>
      
      <BaseInput 
        v-if="formData.type !== 'note'" 
        v-model="formData.url" 
        placeholder="Paste the URL here..." 
        class="flex-1"
      />
    </div>

    <BaseInput 
      v-model="formData.content" 
      placeholder="What's on your mind? Start writing here..." 
      type="textarea"
      class="!h-48"
    />
    
    <BaseInput 
      v-model="tagsInput" 
      placeholder="Tags, separated, by, commas" 
      icon="#"
    />

    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4">
      <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Press ⌘ + Enter to save</span>
      <BaseButton class="w-full sm:w-auto min-w-[200px]" @click="handleSubmit">
        {{ initialData ? 'Update Knowledge' : 'Commit to Brain' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import { type Note } from '../../types'

const props = defineProps<{
  initialData?: Partial<Note>
}>()

const emit = defineEmits(['save'])

const formData = reactive({
  title: props.initialData?.title || '',
  type: (props.initialData?.type || 'note') as 'note' | 'link' | 'video',
  url: props.initialData?.url || '',
  content: props.initialData?.content || '',
})

const tagsInput = ref(props.initialData?.tags?.join(', ') || '')

const handleSubmit = () => {
  if (!formData.title) return
  
  const tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t)
  emit('save', {
    ...formData,
    tags
  })
}
</script>
