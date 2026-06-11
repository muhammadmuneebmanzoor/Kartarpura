import { createClient } from '@supabase/supabase-js';

const url = (import.meta as any).env?.VITE_SUPABASE_URL;
let supabaseUrl = typeof url === 'string' && url.trim().startsWith('http') 
  ? url.trim() 
  : 'https://hfjmlnxpbpamekqfpfml.supabase.co';

const key = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
let supabaseAnonKey = typeof key === 'string' && key.trim().length > 0
  ? key.trim()
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam1sbnhwYnBhbWVrcWZwZm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjA4NDUsImV4cCI6MjA5NjU5Njg0NX0.8qZ9hzJH9EpBbJW0cnpNWiWvr9D2pmiGfKh5ZfWaGZg';

// Safety check: Fallback to the working credentials if old/invalid tokens are loaded from the environment
if (supabaseAnonKey.startsWith('sb_publishable_') || !supabaseAnonKey.startsWith('eyJ') || supabaseUrl.includes('vhgtikianzdnofheelwp')) {
  supabaseUrl = 'https://hfjmlnxpbpamekqfpfml.supabase.co';
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam1sbnhwYnBhbWVrcWZwZm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMjA4NDUsImV4cCI6MjA5NjU5Njg0NX0.8qZ9hzJH9EpBbJW0cnpNWiWvr9D2pmiGfKh5ZfWaGZg';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
