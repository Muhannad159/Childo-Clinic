import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gdadfmrglmyzijjelunt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkYWRmbXJnbG15emlqamVsdW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTE5NDYsImV4cCI6MjAwOTQ4Nzk0Nn0.AOsg0C79Zmf1xu3FaqD7cfBRISWe21ltGODOQIiXH2Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
