import css from "./layoutNotes.module.css";

type NotesFilterLayoutProps = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};
export default function NotesFilterLayout({ children, sidebar }: NotesFilterLayoutProps) {
    return (
        <section className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
        </section>
    );
}
