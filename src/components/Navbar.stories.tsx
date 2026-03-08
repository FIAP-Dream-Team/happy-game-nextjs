import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "next/link";
import { Navbar } from "@components/Navbar";
import { Button } from "@components/ui/Button";
import { Icon } from "@components/ui/Icon";
import { NavigationButton } from "@components/ui/NavigationButton";

const meta = {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: (
      <Link href="/" className="text-lg font-semibold text-text-primary">
        Logo
      </Link>
    ),
    navItems: (
      <>
        <NavigationButton href="/feed" icon="Home" name="Feed" />
        <NavigationButton href="/acervo" icon="Gamepad2" name="Acervo" />
      </>
    ),
    rightActions: (
      <>
        <Button variant="secondary" size="medium">
          Perfil
        </Button>
        <Button
          variant="tertiary"
          size="medium"
          className="h-9 w-9 min-h-9 min-w-9 p-2"
        >
          <Icon name="Sun" size={20} />
        </Button>
      </>
    ),
  },
};

export const WithMobileMenu: Story = {
  args: {
    logo: (
      <Link href="/" className="text-lg font-semibold text-text-primary">
        App
      </Link>
    ),
    navItems: (
      <>
        <Link
          href="/"
          className="rounded px-3 py-2 text-sm text-text-primary hover:bg-bg-secondary"
        >
          Início
        </Link>
        <Link
          href="/sobre"
          className="rounded px-3 py-2 text-sm text-text-primary hover:bg-bg-secondary"
        >
          Sobre
        </Link>
      </>
    ),
    rightActions: (
      <Button variant="default" size="large">
        Entrar
      </Button>
    ),
    mobileRightActions: (
      <>
        <Button
          variant="tertiary"
          size="medium"
          className="h-9 w-9 min-h-9 min-w-9 p-2"
        >
          <Icon name="Menu" size={20} />
        </Button>
      </>
    ),
  },
};
