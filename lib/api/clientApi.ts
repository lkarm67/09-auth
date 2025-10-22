'use client';

import type { Note, CreateNoteParams } from "@/types/note";
import api from "./api";
import type { User } from "@/types/user";

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  console.log("Fetching notes with params:", params);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const registerUser = async (userData: { email: string; password: string }): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', userData);
  return data;
};

export const loginUser = async (credentials: { email: string; password: string }): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', credentials);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<{ authenticated: boolean }> => {
  const { data } = await api.get<{ authenticated: boolean }>('/auth/check');
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export const updateMe = async (updateData: UpdateUserData): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', updateData);
  return data;
};
