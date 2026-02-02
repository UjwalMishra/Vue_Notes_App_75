import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type User } from '../types'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>({
        name: 'User',
        email: 'user@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    })
    const isAuthenticated = ref(true)

    const logout = () => {
        isAuthenticated.value = false
        user.value = null
    }

    return {
        user,
        isAuthenticated,
        logout
    }
}, {
    persist: true
})
