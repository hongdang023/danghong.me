import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

const ADMIN_EMAIL = 'dangtuyethong2324@gmail.com';

export async function getAdminSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return { user, isAdmin: user?.email === ADMIN_EMAIL };
}

/** Call this at the top of any admin Server Component to guard the route. */
export async function requireAdmin() {
  const { user, isAdmin } = await getAdminSession();
  if (!user || !isAdmin) {
    redirect('/');
  }
  return user;
}
