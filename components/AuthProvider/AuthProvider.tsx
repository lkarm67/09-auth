'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getMeClient } from '@/lib/api/clientApi';
import Loader from '../Loader/Loader';
import type { User } from '@/types/user';

interface AuthProviderProps {
  children: ReactNode;
}

// Маршрути авторизації та приватні маршрути
const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PRIVATE_ROUTES = ['/profile'];

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [, setUser] = useState<User | null>(null); // user поки не використовується у JSX
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await getMeClient();
        setUser(me);

        // Якщо авторизований і намагається зайти на auth route
        if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
          router.replace('/');
        }
      } catch {
        setUser(null);

        // Якщо неавторизований і на приватній сторінці
        if (PRIVATE_ROUTES.some(route => pathname.startsWith(route))) {
          router.replace('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) return <Loader />;

  return <>{children}</>;
}
