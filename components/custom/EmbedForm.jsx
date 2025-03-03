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

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { PopoverContent, PopoverTrigger, Popover } from "@heroui/popover";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState } from "react";
import ColorPicker from "@/components/custom/ColorPicker";

export default function EmbedForm({ embedData, onChange }) {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          id="title"
          label="Title"
          labelPlacement="inside"
          value={embedData.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="A title"
          className="w-full"
        />
      </div>

      <div>
        <Textarea
          id="description"
          label="Description"
          labelPlacement="inside"
          value={embedData.description}
          onChange={(e) => {
            onChange("description", e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          placeholder="A description"
          autoResize
        />
      </div>

      <div>
        <Input
          id="image"
          label="Image URL"
          labelPlacement="inside"
          value={embedData.image}
          onChange={(e) => onChange("image", e.target.value)}
          placeholder="https://domain.com/cooldude.gif"
          className="w-full"
        />
      </div>

      <Input
        id="url"
        label="URL (title link)"
        labelPlacement="inside"
        value={embedData.url}
        onChange={(e) => onChange("url", e.target.value)}
        placeholder="Soon! (Doesn't do anything yet)"
        className="w-full"
      />

      <div>
        <label htmlFor="colorPicker" className="block text-sm mb-1">
          Color
        </label>
        <div className="flex gap-2 items-center">
          <div
            className="w-10 h-10 rounded border border-gray-600 cursor-pointer"
            style={{ backgroundColor: embedData.color || "#5865F2" }}
            role="button"
            tabIndex={0}
            id="colorPicker"
            aria-label="Open color picker"
            onClick={() => setColorPickerOpen(true)}
          />
          <Input
            value={embedData.color || "#5865F2"}
            onChange={(e) => onChange("color", e.target.value)}
            placeholder="#5865F2"
            className="w-32"
          />
          <Popover isOpen={colorPickerOpen} onOpenChange={setColorPickerOpen}>
            <PopoverTrigger>
              <Button>Pick Color</Button>
            </PopoverTrigger>
            <PopoverContent>
              <ColorPicker
                color={embedData.color || "#5865F2"}
                onChange={(color) => {
                  onChange("color", color);
                  setColorPickerOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Accordion>
        <AccordionItem title="Author">
          <div className="flex flex-col gap-4 mt-2">
            <Input
              id="authorName"
              label="Author Name"
              labelPlacement="inside"
              value={embedData.authorName}
              onChange={(e) => onChange("authorName", e.target.value)}
              placeholder="Author name"
              className="w-full"
            />

            <Input
              id="authorUrl"
              label="Author URL"
              labelPlacement="inside"
              value={embedData.authorUrl}
              onChange={(e) => onChange("authorUrl", e.target.value)}
              placeholder="https://example.com"
              className="w-full"
            />
          </div>
        </AccordionItem>

        <AccordionItem title="Provider">
          <div className="flex flex-col gap-4 mt-2">
            <Input
              id="providerName"
              label="Provider Name"
              labelPlacement="inside"
              value={embedData.providerName}
              onChange={(e) => onChange("providerName", e.target.value)}
              placeholder="Provider name"
              className="w-full"
            />

            <Input
              id="providerUrl"
              label="Provider URL"
              labelPlacement="inside"
              value={embedData.providerUrl}
              onChange={(e) => onChange("providerUrl", e.target.value)}
              placeholder="https://example.com"
              className="w-full"
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}