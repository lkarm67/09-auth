'use client';

import css from './SignUpPage.module.css';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { register as registerUser } from '@/lib/api/clientApi'; // 🔹 імпорт з правильним іменем
import { useAuthStore } from '@/stores/authStore'; // 🔹 глобальне сховище автентифікації

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser); // функція для оновлення глобального стану
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await registerUser({ email, password }); // 🔹 отримуємо користувача
      setUser(user); // 🔹 зберігаємо у глобальному стані
      router.push('/profile');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Try again.');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
