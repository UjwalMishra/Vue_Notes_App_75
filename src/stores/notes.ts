import { type Note } from '../types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<Note[]>([])
    const searchQuery = ref('')
    const debouncedSearchQuery = ref('')
    const timeout = ref<ReturnType<typeof setTimeout> | null>(null)

    const handleSearch = (q: string) => {
        searchQuery.value = q
        if (timeout.value) clearTimeout(timeout.value)
        timeout.value = setTimeout(() => {
            debouncedSearchQuery.value = q
        }, 300)
    }

    const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
        notes.value.unshift({
            ...note,
            id: uuidv4(),
            createdAt: Date.now()
        })
    }

    const updateNote = (id: string, updates: Partial<Note>) => {
        const index = notes.value.findIndex(n => n.id === id)
        if (index !== -1) {
            const existing = notes.value[index]
            if (existing) {
                notes.value[index] = {
                    ...existing,
                    ...updates,
                    id: existing.id,
                    title: updates.title ?? existing.title,
                    content: updates.content ?? existing.content,
                    type: updates.type ?? existing.type,
                    tags: updates.tags ?? existing.tags,
                    createdAt: existing.createdAt
                }
            }
        }
    }

    const deleteNote = (id: string) => {
        notes.value = notes.value.filter(n => n.id !== id)
    }

    const filteredNotes = computed(() => {
        const query = debouncedSearchQuery.value.toLowerCase().trim()
        if (!query) return notes.value

        return notes.value.filter(note =>
            note.type.toLowerCase() === query ||
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query) ||
            note.tags.some(tag => tag.toLowerCase().includes(query))
        )
    })

    const allTags = computed(() => {
        const tags = new Set<string>()
        notes.value.forEach(note => {
            note.tags.forEach(tag => tags.add(tag))
        })
        return Array.from(tags).sort()
    })

    return {
        notes,
        searchQuery,
        debouncedSearchQuery,
        handleSearch,
        addNote,
        updateNote,
        deleteNote,
        filteredNotes,
        allTags
    }
}, {
    persist: true
})
