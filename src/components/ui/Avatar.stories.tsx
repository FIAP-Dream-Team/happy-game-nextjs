import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@components/ui/Avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    size: { control: { type: "number", min: 24, max: 120 } },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    alt: "Avatar",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size={32} />
      <Avatar size={50} />
      <Avatar size={80} />
    </div>
  ),
};
