import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavigationButton } from "@components/ui/NavigationButton";

const meta = {
  title: "UI/NavigationButton",
  component: NavigationButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    href: { control: "text" },
    icon: { control: "select", options: ["Home", "Gamepad2", "User"] },
    name: { control: "text" },
  },
} satisfies Meta<typeof NavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: "/feed", icon: "Home", name: "Feed" },
};

export const Acervo: Story = {
  args: { href: "/acervo", icon: "Gamepad2", name: "Acervo" },
};

export const Group: Story = {
  args: { href: "/feed", icon: "Home", name: "Feed" },
  render: () => (
    <div className="flex gap-2">
      <NavigationButton href="/feed" icon="Home" name="Feed" />
      <NavigationButton
        href="/acervo"
        icon="Gamepad2"
        name="Acervo"
        className="bg-brand-purple-100 text-brand-purple-800 [&_span:first-child]:bg-brand-purple-100 [&_span:first-child]:text-brand-purple-800"
      />
    </div>
  ),
};
