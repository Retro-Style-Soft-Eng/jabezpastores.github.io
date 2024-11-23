import { createClient } from '@supabase/supabase-js';

<<<<<<< HEAD
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
=======
const supabaseUrl = 'https://acdisgqdwzxffrlolqda.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZGlzZ3Fkd3p4ZmZybG9scWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzODg2OTYsImV4cCI6MjA0NTk2NDY5Nn0.Cw77QRM7mbVBoXg4HLtTYvg6zwzw4le3ZXiMU2BgRwc';
>>>>>>> 7a0dc75 (Recreated my-app into CRA as thesis-app)

export const supabase = createClient(supabaseUrl, supabaseKey);
