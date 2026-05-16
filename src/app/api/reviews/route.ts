import { NextResponse } from 'next/server'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'

export async function GET(request: Request) {
  if (!isSupabaseConfigured) return NextResponse.json([])

  const { searchParams } = new URL(request.url)
  const bakery_id = searchParams.get('bakery_id')
  if (!bakery_id) return NextResponse.json({ error: 'bakery_id required' }, { status: 400 })

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('bakery_id', bakery_id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Not configured' }, { status: 503 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { bakery_id, rating, content, images } = await request.json()

  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', user.id)
    .single()

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      bakery_id,
      user_id: user.id,
      author_name: profile?.name ?? user.email!.split('@')[0],
      rating,
      content,
      images: images ?? [],
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await supabase.rpc('refresh_bakery_rating', { p_bakery_id: bakery_id })

  return NextResponse.json(data, { status: 201 })
}
