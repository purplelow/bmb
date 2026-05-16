import { NextResponse } from 'next/server'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Not configured' }, { status: 503 })

  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('bakeries')
    .select('*, menu_items(*), reviews(*)')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}
