"use client";

import { useState } from "react";
import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";

const Header = () => {
  const [activeTag, setActiveTag] = useState("");

  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">Home</Link>
          </li>
          <li>
            <TagsMenu activeTag={activeTag} setActiveTag={setActiveTag} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
