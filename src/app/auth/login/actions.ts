'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { APP_DASHBOARD } from '@/constants';

export async function loginAction(formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  let response;
  let result;

  try {
    response = await fetch('http://127.0.0.1:8002/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect('/auth/login?error=invalid_credentials');
      } else {
        redirect('/error');
      }
      return;
    }

    result = await response.json();
    
  } catch (error) {
    console.error('Login API error:', error);
    redirect('/error');
    return;
  }

  try {
    const cookieStore = await cookies();
    
    if (result.access_token) {
      cookieStore.set('access_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }

    if (result.refresh_token) {
      cookieStore.set('refresh_token', result.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    if (result.user) {
      cookieStore.set('user_info', JSON.stringify(result.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }

  } catch (error) {
    console.error('Cookie setting error:', error);
    redirect('/error');
    return;
  }

  revalidatePath(APP_DASHBOARD, 'layout');
  redirect(APP_DASHBOARD);
}
