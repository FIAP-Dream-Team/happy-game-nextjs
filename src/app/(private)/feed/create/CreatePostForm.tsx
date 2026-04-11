"use client";

import * as React from "react";

import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

import { createPost, type CreatePostState } from "./actions";

const initialState: CreatePostState = { error: null };

export function CreatePostForm() {
  const [state, formAction, pending] = React.useActionState(
    createPost,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Textarea
        variant="filled"
        name="content"
        required
        minLength={1}
        placeholder="Escreva seu post aqui..."
        className="min-h-[340px]"
        disabled={pending}
        aria-invalid={!!state.error}
        aria-describedby={state.error ? "create-post-error" : undefined}
      />
      {state.error ? (
        <p
          id="create-post-error"
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Publicando…" : "Publicar"}
        </Button>
      </div>
    </form>
  );
}
