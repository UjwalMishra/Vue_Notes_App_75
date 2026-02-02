export interface Note {
    id: string
    title: string
    content: string
    url?: string
    type: 'note' | 'link' | 'video'
    tags: string[]
    createdAt: number
}

export interface User {
    name: string
    email: string
    avatar: string
}
