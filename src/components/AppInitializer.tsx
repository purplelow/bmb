'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useBakeryStore } from '@/store/useBakeryStore'
import { isSupabaseConfigured } from '@/lib/supabase/client'

export function AppInitializer() {
  const initialize = useAuthStore((s) => s.initialize)
  const fetchBakeries = useBakeryStore((s) => s.fetchBakeries)
  const fetchFavorites = useBakeryStore((s) => s.fetchFavorites)

  useEffect(() => {
    if (isSupabaseConfigured) {
      initialize().then(() => fetchFavorites())
    }
    fetchBakeries()
  }, [initialize, fetchBakeries, fetchFavorites])

  return null
}
