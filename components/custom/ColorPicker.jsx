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

import { useState, useEffect } from "react";

export default function ColorPicker({ color, onChange }) {
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const discordColors = [
    "#5865F2",
    "#57F287",
    "#FEE75C",
    "#EB459E",
    "#ED4245",
    "#FFFFFF",
    "#000000",
    "#738ADB",
    "#1E1F22",
    "#2B2D31",
    "#313338",
    "#F2F3F5",
  ];

  return (
    <div className="p-3">
      <div className="mb-3">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => {
            setCurrentColor(e.target.value);
            onChange(e.target.value);
          }}
          className="w-full h-10 rounded"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {discordColors.map((clr) => (
          <div
            key={clr}
            className="w-8 h-8 rounded cursor-pointer border border-gray-700 hover:border-white"
            style={{ backgroundColor: clr }}
            role="button"
            tabIndex={0}
            aria-label="Open color picker"
            onClick={() => {
              setCurrentColor(clr);
              onChange(clr);
            }}
          />
        ))}
      </div>
    </div>
  );
}
