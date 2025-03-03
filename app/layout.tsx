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

import "@/styles/globals.css";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { DiscordIcon } from "@/components/icons";

export const metadata = {
  title: "Discord Embed Builder",
  description:
    "Create custom Discord embeds easily and share them with a simple link",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-1 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center py-3 gap-2">
              <div className="flex items-center gap-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://github.com/maximjsx/discord-embed-builder">
                  <span className="text-default-600">GitHub Repository</span>
                </Link>
                <span className="text-default-400">|</span>
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://dsc.gg/maximjsx">
                  <DiscordIcon className="h-4 w-4" />
                  <span className="text-default-600">Join our Discord</span>
                </Link>
              </div>
              <div className="text-default-500 text-sm">
                © {new Date().getFullYear()} Maxim.jsx - All rights reserved
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
