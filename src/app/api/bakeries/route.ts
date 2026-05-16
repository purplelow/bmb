import { NextResponse } from 'next/server'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'

export async function GET(request: Request) {
  if (!isSupabaseConfigured) return NextResponse.json([])

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const query = searchParams.get('q')

  const supabase = await createClient()
  let builder = supabase
    .from('bakeries')
    .select('*, menu_items(*)')
    .order('rating', { ascending: false })

  if (category && category !== '전체') {
    builder = builder.eq('category', category)
  }
  if (query) {
    builder = builder.or(`name_ko.ilike.%${query}%,name.ilike.%${query}%`)
  }

  const { data, error } = await builder
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
