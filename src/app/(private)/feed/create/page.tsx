"use client";

import * as React from "react";

import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export default function CreatePostPage() {
  const [content, setContent] = React.useState("");

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        variant="filled"
        placeholder="Escreva seu post aqui..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[340px]"
      />
      <div className="flex justify-end">
        <Button>Publicar</Button>
      </div>
    </div>
  );
}
