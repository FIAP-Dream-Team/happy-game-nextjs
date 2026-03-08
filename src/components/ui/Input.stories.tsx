import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@components/ui/Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "filled"] },
    size: { control: "select", options: ["medium", "large"] },
    placeholder: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Placeholder" },
};

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled input" },
};

export const Large: Story = {
  args: { size: "large", placeholder: "Large input" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
};
