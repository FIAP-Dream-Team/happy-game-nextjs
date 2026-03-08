import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FrameIcon } from "@components/ui/FrameIcon";

const meta = {
  title: "UI/FrameIcon",
  component: FrameIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["Home", "Rocket", "Gamepad2", "Trophy"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "neutral"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof FrameIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "Gamepad2" },
};

export const Variants: Story = {
  args: { name: "Rocket" },
  render: () => (
    <div className="flex items-center gap-4">
      <FrameIcon name="Rocket" variant="primary" />
      <FrameIcon name="Rocket" variant="secondary" />
      <FrameIcon name="Rocket" variant="tertiary" />
      <FrameIcon name="Rocket" variant="neutral" />
    </div>
  ),
};

export const Sizes: Story = {
  args: { name: "Trophy" },
  render: () => (
    <div className="flex items-center gap-4">
      <FrameIcon name="Trophy" size="sm" />
      <FrameIcon name="Trophy" size="md" />
      <FrameIcon name="Trophy" size="lg" />
    </div>
  ),
};
