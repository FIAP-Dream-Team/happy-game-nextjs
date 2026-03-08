import { PostItem } from "@privateComponents/PostItem";
import { FeedHeader } from "@privateComponents/FeedHeader";

export default function FeedPage() {
  return (
    <div className="flex flex-col gap-10">
      <FeedHeader />
      <div className="flex flex-col gap-4">
        <PostItem
          title="Resident Evil requiem é o melhor jogo de 2026"
          authorName="Technomancer"
          dateAndComments="05 Mar - 13 Comentários"
          badges={["Dicas", "Opinião"]}
          href="/feed/1"
        />
        <PostItem
          title="Resident Evil requiem é o melhor jogo de 2026"
          authorName="Technomancer"
          dateAndComments="05 Mar - 13 Comentários"
          badges={["Dicas", "Opinião"]}
          href="/feed/1"
        />
      </div>
    </div>
  );
}
