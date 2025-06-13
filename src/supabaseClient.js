import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jbbhyunfbzjfexhjuzrt.supabase.co"; // ganti dengan project URL-mu
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiYmh5dW5mYnpqZmV4aGp1enJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjEzNzQsImV4cCI6MjA2NDc5NzM3NH0.dwa61gZnWMPcLZrqMtlFDDLLkcM9HZTsQInfFYsyz3A"; // ganti dengan anon public API key dari Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
