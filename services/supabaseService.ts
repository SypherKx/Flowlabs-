import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// In production, these should be in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL: Supabase environment variables are missing. Check your .env file.');
}

// Use fallbacks to prevent top-level crash if env vars are missing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Auth functions
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange: (callback: (user: any) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
  }
};

// Database functions for Leads
export const db = {
  leads: {
    getAll: async () => {
      try {
        // RLS will automatically filter by auth.uid() = user_id
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Supabase error fetching leads:', error);
          throw error;
        }

        console.log('✅ Leads fetched successfully:', data?.length || 0, 'leads found');
        console.log('📊 Lead data:', data);
        return data;
      } catch (error) {
        console.error('❌ Exception in getAll:', error);
        throw error;
      }
    },

    create: async (lead: any) => {
      try {
        console.log('📝 Creating lead with payload:', { ...lead, user_id: '***' });

        const { data, error } = await supabase
          .from('leads')
          .insert([lead])
          .select()
          .single();

        if (error) {
          console.error('❌ Supabase error creating lead:', error);
          throw error;
        }

        console.log('✅ Lead created successfully:', data);
        return data;
      } catch (error) {
        console.error('❌ Exception in create:', error);
        throw error;
      }
    },

    update: async (id: string, updates: any) => {
      try {
        console.log('✏️ Updating lead:', id, 'with:', updates);

        const { data, error } = await supabase
          .from('leads')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('❌ Supabase error updating lead:', error);
          throw error;
        }

        console.log('✅ Lead updated successfully:', data);
        return data;
      } catch (error) {
        console.error('❌ Exception in update:', error);
        throw error;
      }
    },

    delete: async (id: string) => {
      try {
        console.log('🗑️ Deleting lead:', id);

        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('❌ Supabase error deleting lead:', error);
          throw error;
        }

        console.log('✅ Lead deleted successfully');
      } catch (error) {
        console.error('❌ Exception in delete:', error);
        throw error;
      }
    }
  },

  clients: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    create: async (client: any) => {
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  },

  logs: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('automation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },

    create: async (log: any) => {
      const { data, error } = await supabase
        .from('automation_logs')
        .insert([log])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  settings: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found" error
      return data;
    },

    upsert: async (userId: string, settings: any) => {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({ user_id: userId, ...settings })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
};
