import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

// початковий стан чернетки
const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

type NoteDraft = typeof initialDraft;

type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (updatedDraft) =>
        set((state) => ({
          draft: { ...state.draft, ...updatedDraft },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", // ключ у localStorage
    }
  )
);
