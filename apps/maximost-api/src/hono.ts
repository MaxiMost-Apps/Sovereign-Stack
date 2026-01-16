import { SupabaseClient, User } from '@supabase/supabase-js';

export interface EnrichedUser extends User {
  profile: {
    role: 'user' | 'admin' | 'ROOT_ADMIN';
    membership_tier: 'initiate' | 'operator' | 'sovereign' | 'architect' | 'vanguard';
    neural_config?: any;
    callsign?: string;
    display_name?: string;
    full_name?: string;
    timezone?: string;
    tier_name?: string; // Add tier_name to match DB schema usage
    is_vanguard?: boolean; // Add is_vanguard as requested
  };
}

export type AppEnv = {
  Variables: {
    user: EnrichedUser;
    supabase: SupabaseClient;
  };
};
