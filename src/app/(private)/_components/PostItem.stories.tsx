import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PostItem } from "@privateComponents/PostItem";

const meta = {
  title: "Private/PostItem",
  component: PostItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    href: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[752px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Resident Evil requiem é o melhor jogo de 2026",
    authorName: "Technomancer",
    dateAndComments: "05 Mar - 13 Comentários",
    badges: ["Dicas", "Opinião"],
    href: "/feed/1",
  },
};

export const WithAvatar: Story = {
  args: {
    ...Default.args,
    authorAvatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=techno",
  },
};

export const AsLink: Story = {
  args: {
    ...Default.args,
    href: "/feed/1",
  },
};

export const NoBadges: Story = {
  args: {
    title: "Post sem badges",
    authorName: "User",
    dateAndComments: "01 Mar - 0 Comentários",
    href: "/feed/1",
  },
};
