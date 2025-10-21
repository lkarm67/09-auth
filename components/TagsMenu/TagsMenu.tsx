'use client';

import { useState } from "react";
import Link from "next/link";
import type { TagsProps } from "@/types/note";
import { TAGS } from "@/types/note";
import css from "./TagsMenu.module.css";

export default function TagsMenu({ activeTag, setActiveTag }: TagsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen(prev => !prev)}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={`${css.menuLink} ${activeTag === tag ? css.active : ""}`}
                onClick={() => {
                  setActiveTag(tag);
                  setIsOpen(false);
                }}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
