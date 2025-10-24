import { User } from '@/types/user';
import type { Note, NoteFormValues } from '../../types/note';
import nextServer from './api';

export interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

export type UserRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  avatar?: string;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<NotesHTTPResponse> => {
  const { data } = await nextServer.get<NotesHTTPResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: NoteFormValues): Promise<Note> => {
  const newNote: NoteFormValues = { title, content, tag };
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
};

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export const register = async (userData: UserRequest) => {
  const { data } = await nextServer.post<User>('/auth/register', userData);
  return data;
};

export const login = async (userData: UserRequest) => {
  const { data } = await nextServer.post<User>('/auth/login', userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};