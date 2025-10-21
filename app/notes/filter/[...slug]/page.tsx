import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug[0]} Notes`,
    description: `Notes tagged with "${slug[0]}"`,
    openGraph: {
      title: `${slug[0]} Notes`,
      description: `Notes tagged with "${slug[0]}"`,
      url: `https://08-zustand-two-alpha.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
