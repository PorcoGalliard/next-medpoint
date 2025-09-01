'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { APP_LOGIN } from '@/constants';
import { cookies } from 'next/headers';

export async function logoutAction() {

  try {
    const cookieStore = await cookies();

    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    cookieStore.delete('user_info');

  } catch (error) {
    console.error('Logout error:', error);
  }
  revalidatePath(APP_LOGIN, 'layout');
  redirect(APP_LOGIN);
}
