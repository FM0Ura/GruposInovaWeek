import { createClient } from '@supabase/supabase-js'

const supabaseUrl = '<YOUR-URL>'
const supabaseKey = '<YOUR-ANON-KEY>'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }