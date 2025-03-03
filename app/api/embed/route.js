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

import { NextResponse } from "next/server";
import { decompressFromBase64 } from "lz-string";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  let title = "",
    description = "",
    image = "";

  const encryptedData = searchParams.get("data");
  if (encryptedData) {
    try {
      const decodedData = decompressFromBase64(
        decodeURIComponent(encryptedData)
      );
      if (decodedData) {
        const parsedData = JSON.parse(decodedData);
        title = parsedData.t || "";
        description = parsedData.d || "";
        image = parsedData.i || "";
      }
    } catch (error) {
      console.error("Error decoding data:", error);
    }
  } else {
    title = searchParams.get("t") || searchParams.get("title") || "";
    description =
      searchParams.get("d") || searchParams.get("description") || "";
    image = searchParams.get("i") || searchParams.get("image") || "";
  }

  const color = "#5865F2";

  const html = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || "Discord Embed"}</title>
  
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="theme-color" content="${color}">
  ${image ? `<meta property="og:image" content="${image}">` : ""}
  <meta property="og:type" content="website">
  
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
      background-color: #000000;
      color: #FFFFFF;
    }
    
    .embed-container {
      border-left: 4px solid ${color};
      background-color: #1F2937;
      border-radius: 4px;
      padding: 16px;
      color: #dcddde;
      margin: 20px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .embed-title {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 8px;
      color: #FFFFFF;
    }
    
    .embed-description {
      white-space: pre-wrap;
      color: #dcddde;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .embed-image {
      max-width: 100%;
      max-height: 300px;
      border-radius: 4px;
      margin-top: 16px;
    }
    
    .info-box {
      background-color: #27272A;
      border-radius: 4px;
      padding: 16px;
      margin: 20px 0;
    }
    
    a {
      color: #00aff4;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .card {
      background-color: #18181B;
      border-radius: 8px;
      padding: 1.5rem;
      margin-top: 2rem;
    }
    
    h2 {
      margin-top: 0;
      color: #FFFFFF;
    }
    
    footer {
      text-align: center;
      margin-top: 2rem;
      padding: 1rem 0;
      color: #888;
    }
  </style>
</head>
<body>
  <main class="container">
    <div class="card">
      <h2>Discord Embed Builder</h2>
      <div class="info-box">
        <p>This URL is designed to be shared on Discord to display an embed. Send this link directly in a Discord chat to see the result.</p>
        <p><a href="/">Create your own embed</a></p>
      </div>
      
      <h2>Preview</h2>
      <div class="embed-container">
        ${title ? `<div class="embed-title">${title}</div>` : ""}
        ${description ? `<div class="embed-description">${description}</div>` : ""}
        ${image ? `<img src="${image}" alt="Embed image" class="embed-image">` : ""}
      </div>
    </div>
  </main>
  
  <footer>
    <div>© ${new Date().getFullYear()} Maxim.jsx - All rights reserved</div>
  </footer>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
