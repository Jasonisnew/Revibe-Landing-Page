// ============================================
// SUPABASE CONFIGURATION
// ============================================

// Supabase credentials
const SUPABASE_URL = 'https://ojwowinfsuorubyeyhqd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd293aW5mc3VvcnVieWV5aHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNzE5MzUsImV4cCI6MjA4MjY0NzkzNX0.bQD89gN65ILrNbDipmibBmDk6ujGEMEAEwdTpHSewUs';

// Initialize Supabase client using the global supabase object from CDN
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

