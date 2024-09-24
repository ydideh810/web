"use client";

import { FC, useState } from "react";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import ThemeToggle from "./themeToggle";
import { Session } from "next-auth";
import Icons from "@/components/icons";
import NavItem, { type Item } from "@/components/navItem";
import NextLink from "next/link";
import SvgLogo from "./main/logo";
import { BsGithub } from "react-icons/bs";

interface Props {
  active?: string;
  items?: Item[];
  session: Session | null;
  children?: React.ReactNode;
  path?: string;
  disabled?: boolean;
  className?: string;
}

const initialItems: Props["items"] = [
  { name: "Home", href: "/", type: "link" },
  { name: "Dashboard", href: "https://web-8pvm.vercel.app/login", type: "link" },
  { name: "Pricing", href: "/pricing", type: "link" },
  {
    name: "Docs",
    href: "https://docs.scoopika.com",
    type: "link",
    target: "_blank",
  },
  {
    name: "Blog",
    href: "https://blog.scoopika.com",
    type: "link",
    target: "_blank",
  },
];

const Navbar: FC<Props> = ({
  items,
  active,
  session,
  children,
  path,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!items) {
    items = initialItems;
  }

  return (
    <NextNavbar
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
      className={`fixed bg-transparent border-b-0 z-40 ${className || ""}`}
      classNames={{
        wrapper: "min-w-full justify-between",
        content: "",
      }}
    >
      <NavbarContent>
        <div className="flex items-center h-full w-full">
          <NavbarBrand
            className="mr-6"
            as={NextLink}
            href={path ? `/${path}` : "/"}
          >
            <div className="flex items-center text-sm">
              <div className="w-9 h-9 overflow-hidden rounded-xl flex items-center justify-center pt-1">
                <SvgLogo />
              </div>
              <div className="font-semibold ml-3 text-red-800">NIDDAM-HUB</div>
            </div>
          </NavbarBrand>
        </div>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="hidden sm:flex items-center justify-center w-full gap-4">
          {items?.length &&
            items.map((item) => (
              <NavbarItem key={`nav-item-${item.name}`}>
                <NavItem
                  item={item}
                  active={active}
                  className={
                    className === "dark" ? "text-white" : "dark:text-white"
                  }
                />
              </NavbarItem>
            ))}
        </div>
        {children && children}
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          size="sm"
          isIconOnly
          startContent={<BsGithub size={18} />}
          variant="light"
          className="border"
          as={Link}
          href="https://github.com/web"
          target="_blank"
        />
        {!session ? (
          <Button
            color="primary"
            size="sm"
            endContent={<Icons.ChevronRIghtIcon size={18} />}
            className="font-semibold hidden sm:flex"
            as={Link}
            href="https://web-8pvm.vercel.app/login"
          >
            Log in
          </Button>
        ) : (
          <Button
            color="primary"
            size="sm"
            endContent={<Icons.ChevronRIghtIcon size={18} />}
            className="font-semibold"
            as={Link}
            href="https://web-8pvm.vercel.app/"
          >
            App
          </Button>
        )}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        {items?.length &&
          items.map((item) => (
            <NavbarItem key={`nav-item-${item.name}`}>
              <Button
                as={Link}
                size="sm"
                color="default"
                variant="light"
                href={item.href}
                className="text-[0.85rem] w-full border-t-1 rounded-none border-black/10 dark:border-border"
              >
                {item.name}
              </Button>
            </NavbarItem>
          ))}
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>
      </NavbarMenu>
    </NextNavbar>
  );
};

export { type Props };
export default Navbar;
