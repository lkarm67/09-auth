'use client';

import css from './SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';

// 👇 Типобезпечний селектор для обходу помилки TS з подвійними дужками
const useAuthStoreSelector = useAuthStore as unknown as <T>(
  selector: (state: {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    clearIsAuthenticated: () => void;
  }) => T
) => T;

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStoreSelector((state) => state.setUser); // ✅ без помилки 2554
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await login({ email, password }); // має повертати User
      setUser(user); // ✅ без помилки "boolean → User"
      router.push('/profile');
    } catch (err) {
      console.error(err);
      setError('Login failed. Try again.');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <h1 className={css.formTitle}>Sign in</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
