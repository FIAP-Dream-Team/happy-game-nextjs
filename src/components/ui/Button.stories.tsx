import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@components/ui/Button";
import { Icon } from "@components/ui/Icon";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "tertiary"],
    },
    size: { control: "select", options: ["small", "medium", "large"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Button" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Tertiary" },
};

export const Small: Story = {
  args: { size: "small", children: "Small" },
};

export const Large: Story = {
  args: { size: "large", children: "Large" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="Rocket" size={20} />
        Com ícone
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};
