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

import { Card, CardHeader, CardBody } from "@heroui/card";

export default function EmbedPreview({ data }) {
  return (
    <Card
      className="bg-gray-800 border-l-4 w-full"
      style={{ borderLeftColor: "#5865F2" }}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-lg text-white">
          {data.title || "A title"}
        </h4>
      </CardHeader>
      <CardBody className="py-2 px-4">
        <p className="whitespace-pre-wrap text-gray-300">
          {data.description || "A description"}
        </p>

        <div className="mt-3">
          <img
            src={data.image || "https://imgur.com/1ee3OEt.gif"}
            alt="Preview"
            className="max-w-full rounded-md"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
