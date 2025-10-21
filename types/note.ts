export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export const TAGS = ["All", "Work", "Todo", "Personal", "Meeting", "Shopping"];

export interface TagsProps {
  activeTag: string;
  setActiveTag: (tag: string) => void;
}

export interface SidebarTagsProps {
  activeTag: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string; 
    updatedAt: string;
    tag: NoteTag;
  }

  export interface CreateNoteParams {
    title: string;
    content: string;
    tag: NoteTag;
  }