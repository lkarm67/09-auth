"use client";

import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { TAGS } from "@/types/note";
import type { SidebarTagsProps } from "@/types/note";

export default function SidebarNotes({ activeTag }: SidebarTagsProps) {
  return (
    <ul className={css.menuList}>
      {TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={`${css.menuLink} ${activeTag === tag ? css.active : ""}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
