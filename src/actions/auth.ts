'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { APP_LOGIN } from '@/constants';

export async function logoutAction() {
  const supabase = await createClient();

  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  revalidatePath(APP_LOGIN, 'layout');
  redirect(APP_LOGIN);
}
