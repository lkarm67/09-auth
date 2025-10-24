import nextServer from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

// Отримуємо кукі для передачі в заголовках
const getAuthHeaders = async () => {
  // Динамічно імпортуємо next/headers під час виклику, щоб цей модуль не залежав статично від серверного API (уникає помилок збірки)
  const { cookies } = await import('next/headers');
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
  return { Cookie: cookieHeader };
};

// ======================================
// Нотатки
// ======================================

export const fetchNotes = async (p0: { page: number; perPage: number; tag: string | undefined; }): Promise<Note[]> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<Note[]>('/notes', { headers, params: p0 });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, { headers });
  return data;
};

// ======================================
// Користувач
// ======================================

export const getMeServer = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<User>('/users/me', { headers });
  return data;
};

// ======================================
// Перевірка сесії
// ======================================

export const checkServerSession = async () => {
  const headers = await getAuthHeaders();
  const response = await nextServer.get<{ authenticated: boolean }>('/auth/session', { headers });

  return response;
};
