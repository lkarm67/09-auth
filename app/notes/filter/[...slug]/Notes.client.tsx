"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { Pagination } from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loading from "../../../loading";
import css from "./NotesPage.module.css";
import Link from "next/link";

export default function NotesClient({ tag }: { tag: string | undefined }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearchQuery(value.trim());
  }, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", searchQuery, page, tag],
    queryFn: () => fetchNotes({ search: searchQuery || undefined, page, perPage: 12, tag }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast("No notes found for your query.");
    }
  }, [data]);

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <Toaster position="top-right" reverseOrder={false} />

        <SearchBox value={searchQuery} onSearch={debouncedSetSearchQuery} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loading />}
      {isError && <p>Error loading notes.</p>}

      {data && <NoteList notes={data.notes} />}

    </div>
  );
}
