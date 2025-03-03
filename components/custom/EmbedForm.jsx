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
import { Textarea } from "@heroui/input";

export default function EmbedForm({ embedData, onChange }) {
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
          placeholder="https://domain.com/image.png"
          className="w-full"
        />
      </div>
    </div>
  );
}
