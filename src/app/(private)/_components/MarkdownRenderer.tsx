import React, { PropsWithChildren } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { H4, Paragraph, H3, H2 } from "@/components/ui/Typography";

const MemoizedMarkdown = React.memo(Markdown);

const components = {
  a: (props: PropsWithChildren<{ href?: string }>) => (
    <a
      className="text-url underline"
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  ),
  h1: (props: PropsWithChildren) => <H4 weight="bold">{props.children}</H4>,
  h2: (props: PropsWithChildren) => <H2 weight="bold">{props.children}</H2>,
  h3: (props: PropsWithChildren) => <H3>{props.children}</H3>,
  img: ({ ...props }) => (
    <img {...props} className="inline-block h-auto w-full" />
  ),
  ol: (props: PropsWithChildren) => (
    <ol className="ml-4 list-decimal">{props.children}</ol>
  ),
  p: (props: PropsWithChildren) => <Paragraph>{props.children}</Paragraph>,
  ul: (props: PropsWithChildren) => (
    <ul className="ml-4 list-disc">{props.children}</ul>
  ),
};

export const MarkdownRenderer = ({ content }: { content: string }) => {
  const plugins = [remarkGfm, remarkBreaks];
  return (
    <MemoizedMarkdown components={components} remarkPlugins={plugins}>
      {content}
    </MemoizedMarkdown>
  );
};
