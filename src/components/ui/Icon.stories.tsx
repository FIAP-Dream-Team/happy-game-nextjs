import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "@components/ui/Icon";
import { Span } from "@components/ui/Typography";

const meta = {
  title: "UI/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "Home",
        "Rocket",
        "Gamepad2",
        "User",
        "Mail",
        "Check",
        "Menu",
        "ChevronDown",
      ],
    },
    size: { control: { type: "number", min: 16, max: 48 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "Rocket" },
};

export const Sizes: Story = {
  args: { name: "Rocket" },
  render: () => (
    <div className="flex items-center gap-6">
      <Icon name="Rocket" size={16} />
      <Icon name="Rocket" size={24} />
      <Icon name="Rocket" size={32} />
    </div>
  ),
};

export const AllIcons: Story = {
  args: { name: "Home" },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        ["Home", "Rocket", "Gamepad2", "User", "Mail", "Check", "Menu"] as const
      ).map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} />
          <Span variant="text4" className="text-text-secondary">
            {name}
          </Span>
        </div>
      ))}
    </div>
  ),
};
