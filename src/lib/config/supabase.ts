import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://oxygjfspzdwweruudajt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94eWdqZnNwemR3d2VydXVkYWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODk4NzYsImV4cCI6MjA2NjM2NTg3Nn0.VWgrp5r2NXgK6lfyHBBhX7Zw1EF8Y8ORrve3uyYlnE0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for better TypeScript support
export type AuthError = {
  message: string;
  status?: number;
};

export type AuthResponse = {
  user: any;
  session: any;
  error: AuthError | null;
};