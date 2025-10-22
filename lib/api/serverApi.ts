// lib/api/serverApi.ts
import { cookies } from 'next/headers';
import api from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

// Отримуємо кукі для передачі в заголовках
const getAuthHeaders = () => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
  return { Cookie: cookieHeader };
};

// ======================================
// Нотатки
// ======================================

export const fetchNotes = async (): Promise<Note[]> => {
  const headers = getAuthHeaders();
  const { data } = await api.get<Note[]>('/notes', { headers });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, { headers });
  return data;
};

// ======================================
// Користувач
// ======================================

export const getMe = async (): Promise<User> => {
  const headers = getAuthHeaders();
  const { data } = await api.get<User>('/users/me', { headers });
  return data;
};

// ======================================
// Перевірка сесії
// ======================================

export const checkServerSession = async (): Promise<{ authenticated: boolean }> => {
  const cookieStore = await cookies();
  const { data } = await api.get<{ authenticated: boolean }>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data; // тепер тип співпадає з Promise<{ authenticated: boolean }>
};
