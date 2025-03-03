/*
 * Embed Builder
 * Copyright (c) 2025. Maxim.jsx
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Source: <https://github.com/maximjsx/discord-embed-builder>
 * contact@maximjsx.com
 */

"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { useTheme } from "next-themes";
import { MoonFilledIcon, SunFilledIcon, GithubIcon } from "@/components/icons";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <HeroNavbar isBordered>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          Discord Embed Builder
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="mr-2"
            isIconOnly
            variant="light"
            aria-label="GitHub"
            onPress={() => {
              window.open(
                "https://github.com/maximjsx/discord-embed-builder",
                "_blank",
                "noopener,noreferrer"
              );
            }}>
            <GithubIcon className="h-5 w-5" />
          </Button>
          <Button
            isIconOnly
            variant="light"
            aria-label="Toggle theme"
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? (
              <MoonFilledIcon className="h-5 w-5" />
            ) : (
              <SunFilledIcon className="h-5 w-5" />
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
