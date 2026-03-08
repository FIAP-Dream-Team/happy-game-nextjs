import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "@components/ui/Textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "filled"] },
    placeholder: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Digite aqui..." },
};

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Textarea preenchido" },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Texto de exemplo em várias linhas.\nSegunda linha.",
  },
};
