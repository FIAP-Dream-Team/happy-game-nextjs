import Link from "next/link";

import { PostItem } from "@privateComponents/PostItem";
import { FeedHeader } from "@privateComponents/FeedHeader";
import { listPostsForFeed } from "@/lib/posts";

export default async function FeedPage() {
  const posts = await listPostsForFeed();

  return (
    <div className="flex flex-col gap-10">
      <FeedHeader />
      <div
        id="tabpanel-popular"
        role="tabpanel"
        aria-labelledby="tab-popular"
        tabIndex={0}
        className="flex flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
      >
        {posts.length === 0 ? (
          <p className="rounded border border-border-primary bg-surface-primary p-6 text-center text-text-tertiary">
            Nenhum post ainda.{" "}
            <Link
              href="/feed/create"
              className="text-text-highlight-purple underline-offset-2 hover:underline"
            >
              Criar post
            </Link>
            .
          </p>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post.id}
              title={post.title}
              authorName={post.authorName}
              authorAvatarSrc={post.authorAvatarSrc}
              dateAndComments={post.dateAndComments}
              href={post.href}
            />
          ))
        )}
      </div>
    </div>
  );
}
