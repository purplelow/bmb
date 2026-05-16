import { create } from 'zustand'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  initialize: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  initialize: async () => {
    if (!isSupabaseConfigured) { set({ loading: false }); return }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      set({ user: null, isAuthenticated: false, loading: false })
      return
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, avatar_url')
      .eq('id', user.id)
      .single()
    set({
      user: {
        id: user.id,
        email: user.email!,
        name: profile?.name ?? user.email!.split('@')[0],
        avatar: profile?.avatar_url ?? undefined,
      },
      isAuthenticated: true,
      loading: false,
    })
  },

  logout: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null, isAuthenticated: false })
  },
}))
