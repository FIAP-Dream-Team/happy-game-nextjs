import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetacriticScore } from "@components/ui/MetacriticScore";

const meta = {
  title: "UI/MetacriticScore",
  component: MetacriticScore,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    score: { control: { type: "number", min: 0, max: 100 } },
    variant: { control: "select", options: ["good", "medium", "bad"] },
    size: { control: { type: "number", min: 40, max: 120 } },
  },
} satisfies Meta<typeof MetacriticScore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { score: 85 },
};

export const Good: Story = {
  args: { score: 90, variant: "good" },
};

export const Medium: Story = {
  args: { score: 65, variant: "medium" },
};

export const Bad: Story = {
  args: { score: 35, variant: "bad" },
};

export const AutoVariant: Story = {
  args: { score: 92 },
  render: () => (
    <div className="flex gap-4">
      <MetacriticScore score={92} />
      <MetacriticScore score={58} />
      <MetacriticScore score={22} />
    </div>
  ),
};
