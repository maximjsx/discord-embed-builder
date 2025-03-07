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
  const format = searchParams.get("format");

  if (format === "json") {
    const authorName = searchParams.get("author_name") || "";
    const authorUrl = searchParams.get("author_url") || "";
    const providerName = searchParams.get("provider_name") || "";
    const providerUrl = searchParams.get("provider_url") || "";
    const title = searchParams.get("t") || searchParams.get("title") || "";
    const description =
      searchParams.get("d") || searchParams.get("description") || "";

    const jsonResponse = {
      type: "rich",
      version: "1.0",
      title: title,
      author_name: authorName,
      author_url: authorUrl,
      provider_name: providerName,
      provider_url: providerUrl,
      description: description,
    };

    return NextResponse.json(jsonResponse);
  }

  let title = "",
    description = "",
    image = "",
    color = "",
    authorName = "",
    authorUrl = "",
    providerName = "",
    providerUrl = "",
    largeImage = false;

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
        color = parsedData.c || "#5865F2";
        authorName = parsedData.an || "";
        authorUrl = parsedData.au || "";
        providerName = parsedData.pn || "";
        providerUrl = parsedData.pu || "";
        largeImage = parsedData.li || false;
      }
    } catch (error) {
      console.error("Error decoding data:", error);
    }
  } else {
    title = searchParams.get("t") || searchParams.get("title") || "";
    description =
      searchParams.get("d") || searchParams.get("description") || "";
    image = searchParams.get("i") || searchParams.get("image") || "";
    color = searchParams.get("c") || searchParams.get("color") || "#5865F2";
    authorName = searchParams.get("author_name") || "";
    authorUrl = searchParams.get("author_url") || "";
    providerName = searchParams.get("provider_name") || "";
    providerUrl = searchParams.get("provider_url") || "";
    largeImage = searchParams.get("large_image") === "true";
  }

  const currentUrl = new URL(request.url);
  const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;
  const oembedUrl = `${baseUrl}/api/embed?format=json&t=${encodeURIComponent(title)}&d=${encodeURIComponent(description)}&author_name=${encodeURIComponent(authorName)}&author_url=${encodeURIComponent(authorUrl)}&provider_name=${encodeURIComponent(providerName)}&provider_url=${encodeURIComponent(providerUrl)}`;

  const html = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || "Discord Embed"}</title>
  
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${image}">
  <meta property="theme-color" content="${color}">
  <link type="application/json+oembed" href="${oembedUrl}" />

  ${
    largeImage
      ? `
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@maxim_jsx">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
  `
      : ""
  }
  <link type="application/json+oembed" href="${oembedUrl}" />
  
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
      display: flex;
    }
    
    .embed-content {
      flex-grow: 1;
    }
    
    .embed-provider {
      font-size: 0.7rem;
      margin-bottom: 4px;
      color: #a0a0a0;
    }
    
    .embed-author {
      font-size: 0.95rem;
      font-weight: bold;
      margin-bottom: 4px;
      color: #ffffff;
    }
    
    .embed-title {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 8px;
    }
    
    .embed-title a {
      color: #00aff4;
    }
    
    .embed-description {
      font-size: 0.95rem;
      white-space: pre-wrap;
      color: #a0a0a0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .embed-image-container {
      margin-left: 16px;
      flex-shrink: 0;
      max-width: 30%;
    }
    
    .embed-image {
      max-width: 100%;
      max-height: 140px;
      border-radius: 4px;
    }

        .embed-large-image {
      width: 100%;
      max-height: 300px;
      border-radius: 4px;
      margin-top: 8px;
      object-fit: cover;
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
        <div class="embed-content">
          ${
            providerName
              ? `<div class="embed-provider">
              ${
                providerUrl
                  ? `<a href="${providerUrl}" target="_blank">${providerName}</a>`
                  : `<span>${providerName}</span>`
              }
            </div>`
              : ""
          }
          ${
            authorName
              ? `<div class="embed-author">
              ${
                authorUrl
                  ? `<a href="${authorUrl}" target="_blank">${authorName}</a>`
                  : `<span>${authorName}</span>`
              }
            </div>`
              : ""
          }
          ${
            title
              ? `<div class="embed-title">
              <a href="/">${title}</a>
            </div>`
              : ""
          }
          ${description ? `<div class="embed-description">${description}</div>` : ""}
          
          ${
            image && largeImage
              ? `<div>
                <img src="${image}" alt="Large embed" class="embed-large-image">
              </div>`
              : ""
          }
        </div>
        ${
          image && !largeImage
            ? `<div class="embed-image-container">
            <img src="${image}" alt="Small" class="embed-image">
          </div>`
            : ""
        }
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
