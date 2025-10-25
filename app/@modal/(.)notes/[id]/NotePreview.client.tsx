"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import { Modal } from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id!),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <p>Loading note...</p>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <p>Error loading note. Please try again.</p>
          <button onClick={handleClose} className={css.backBtn}>← Back</button>
        </div>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
          <p>Note not found.</p>
          <button onClick={handleClose} className={css.backBtn}>← Back</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
          <button onClick={handleClose} className={css.backBtn}>← Back</button>
        </div>
      </div>
    </Modal>
  );
}
