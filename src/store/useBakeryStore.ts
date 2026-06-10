import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'

export interface MenuItem {
  id: string
  name: string
  name_ko: string
  // 기존 컴포넌트 호환
  nameKo: string
  price: number
  image: string
  is_new?: boolean
  is_best?: boolean
  isNew?: boolean
  isBest?: boolean
}

export interface Review {
  id: string
  author_name: string
  // 기존 컴포넌트 호환
  author: string
  avatar?: string
  rating: number
  content: string
  created_at: string
  date: string
  images?: string[]
}

export interface Bakery {
  id: string
  name: string
  name_ko: string
  // 기존 컴포넌트 호환
  nameKo: string
  description: string
  short_desc: string
  shortDesc: string
  image: string
  images: string[]
  rating: number
  review_count: number
  reviewCount: number
  location: string
  address: string
  tags: string[]
  category: string
  isFavorite: boolean
  is_open: boolean
  isOpen: boolean
  open_time: string
  openTime: string
  close_time: string
  closeTime: string
  phone: string
  website: string
  price_range: '₩' | '₩₩' | '₩₩₩'
  priceRange: '₩' | '₩₩' | '₩₩₩'
  menu_items?: MenuItem[]
  menu?: MenuItem[]
  reviews?: Review[]
  waitTime?: number
  wait_time?: number
  distance?: string
}

// DB row → Bakery 변환 (camelCase 호환 유지)
function normalize(row: Record<string, unknown>, favoriteIds: Set<string>): Bakery {
  const items = ((row.menu_items ?? []) as Record<string, unknown>[]).map((m) => ({
    ...(m as object),
    nameKo: m.name_ko as string,
    isNew: m.is_new as boolean,
    isBest: m.is_best as boolean,
  })) as MenuItem[]

  const reviews = ((row.reviews ?? []) as Record<string, unknown>[]).map((r) => ({
    ...(r as object),
    author: r.author_name as string,
    date: new Date(r.created_at as string).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
  })) as Review[]

  return {
    ...(row as object),
    nameKo: row.name_ko as string,
    shortDesc: row.short_desc as string,
    reviewCount: row.review_count as number,
    isOpen: row.is_open as boolean,
    openTime: row.open_time as string,
    closeTime: row.close_time as string,
    priceRange: row.price_range as '₩' | '₩₩' | '₩₩₩',
    waitTime: row.wait_time as number,
    isFavorite: favoriteIds.has(row.id as string),
    menu_items: items,
    menu: items,
    reviews,
  } as Bakery
}

interface BakeryState {
  bakeries: Bakery[]
  favoriteIds: Set<string>
  searchQuery: string
  selectedCategory: string
  loading: boolean
  fetchBakeries: (opts?: { category?: string; q?: string }) => Promise<void>
  fetchFavorites: () => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  toggleFavorite: (id: string) => Promise<void>
}

export const CATEGORIES = ['전체', '크루아상', '소금빵', '케이크', '도넛', '식빵', '베이글']

export const useBakeryStore = create<BakeryState>((set, get) => ({
  bakeries: [],
  favoriteIds: new Set(),
  searchQuery: '',
  selectedCategory: '전체',
  loading: false,

  fetchBakeries: async (opts = {}) => {
    set({ loading: true })
    const supabase = createClient()
    let query = supabase
      .from('bakeries')
      .select('*, menu_items(*)')
      .order('rating', { ascending: false })

    if (opts.category && opts.category !== '전체') query = query.eq('category', opts.category)
    if (opts.q) query = query.or(`name_ko.ilike.%${opts.q}%,name.ilike.%${opts.q}%`)

    const { data } = await query
    const { favoriteIds } = get()
    set({
      bakeries: (data ?? []).map((r) => normalize(r as Record<string, unknown>, favoriteIds)),
      loading: false,
    })
  },

  fetchFavorites: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('favorites').select('bakery_id').eq('user_id', user.id)
    const ids = new Set((data ?? []).map((f) => f.bakery_id))
    set({ favoriteIds: ids, bakeries: get().bakeries.map((b) => ({ ...b, isFavorite: ids.has(b.id) })) })
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  toggleFavorite: async (id) => {
    const { favoriteIds } = get()
    const isFav = favoriteIds.has(id)
    const next = new Set(favoriteIds)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (isFav) {
      next.delete(id)
      supabase.from('favorites').delete().eq('user_id', user.id).eq('bakery_id', id).then(() => {})
    } else {
      next.add(id)
      supabase.from('favorites').insert({ user_id: user.id, bakery_id: id }).then(() => {})
    }
    set({ favoriteIds: next, bakeries: get().bakeries.map((b) => ({ ...b, isFavorite: b.id === id ? !isFav : b.isFavorite })) })
  },
}))
