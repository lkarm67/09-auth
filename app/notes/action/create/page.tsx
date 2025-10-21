import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'

export const metadata: Metadata = {
    title: 'Create Note',
    description: 'Create a new note',
    openGraph: {
      title: 'Creating Note',
      description: 'Create a new note',
      url: 'https://08-zustand-two-alpha.vercel.app/notes/create',
      images: [
        { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
      ],
    }
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
          <NoteForm />
      </div>
    </main>

  );
}
