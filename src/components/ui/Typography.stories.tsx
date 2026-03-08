import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { H1, H2, H3, H4, Paragraph, Span } from "@components/ui/Typography";

const meta = {
  title: "UI/Typography",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
    </div>
  ),
};

export const ParagraphExample: StoryObj = {
  render: () => (
    <div className="max-w-md space-y-2">
      <Paragraph>
        Este é um parágrafo usando o estilo text2 (default). O componente
        Paragraph usa a variante text2 com peso regular.
      </Paragraph>
      <Paragraph>
        Segundo parágrafo para demonstrar o espaçamento entre blocos.
      </Paragraph>
    </div>
  ),
};

export const SpanExample: StoryObj = {
  render: () => (
    <div className="max-w-md">
      <Paragraph>
        Texto com <Span>span inline</Span> no meio e mais{" "}
        <Span>outro span</Span>.
      </Paragraph>
    </div>
  ),
};

export const AllTextStyles: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <div>
        <Span variant="text4" className="text-text-tertiary">
          Display / Headings
        </Span>
        <H1 className="mt-1">Display 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
      </div>
      <div>
        <Span variant="text4" className="text-text-tertiary">
          Body text
        </Span>
        <Paragraph className="mt-1">
          Paragraph (text2) – corpo de texto padrão para leitura.
        </Paragraph>
        <Span>Span (text2) – para trechos inline.</Span>
      </div>
    </div>
  ),
};
