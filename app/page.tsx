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

import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { Switch } from "@heroui/switch";
import EmbedForm from "@/components/custom/EmbedForm";
import EmbedPreview from "@/components/custom/EmbedPreview";
import { CheckIcon, CopyIcon, RefreshIcon } from "@/components/icons";
import { compressToBase64 } from "lz-string";

export default function Home() {
  const [embedData, setEmbedData] = useState({
    title: "",
    description: "",
    image: "",
    color: "",
    authorName: "",
    authorUrl: "",
    providerName: "",
    providerUrl: "",
    largeImage: false,
  });

  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [encryptUrl, setEncryptUrl] = useState(false);
  const [hideUrl, setHideURL] = useState(false);
  const [hideUrlText, setHideUrlText] = useState("");

  useEffect(() => {
    const baseUrl =
      typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}/api/embed`
        : "/api/embed";

    const hide = hideUrl
      ? hideUrlText +
        "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||"
      : "";

    if (encryptUrl) {
      const compressedData = compressToBase64(
        JSON.stringify({
          t: embedData.title,
          d: embedData.description,
          i: embedData.image,
          c: embedData.color,
          an: embedData.authorName,
          au: embedData.authorUrl,
          pn: embedData.providerName,
          pu: embedData.providerUrl,
          li: embedData.largeImage,
        })
      );
      setGeneratedUrl(
        `${hide + baseUrl}?data=${encodeURIComponent(compressedData)}`
      );
    } else {
      const params = new URLSearchParams();
      if (embedData.title) params.append("t", embedData.title);
      if (embedData.description) params.append("d", embedData.description);
      if (embedData.image) params.append("i", embedData.image);
      if (embedData.color) params.append("c", embedData.color);
      if (embedData.authorName) params.append("an", embedData.authorName);
      if (embedData.authorUrl) params.append("au", embedData.authorUrl);
      if (embedData.providerName) params.append("pn", embedData.providerName);
      if (embedData.providerUrl) params.append("pu", embedData.providerUrl);
      setGeneratedUrl(`${hide + baseUrl}?${params.toString()}`);
      if (embedData.largeImage)
        params.append("li", String(embedData.largeImage));
      setGeneratedUrl(`${hide + baseUrl}?${params.toString()}`);
    }
  }, [embedData, encryptUrl, hideUrlText, hideUrl]);

  const handleChange = (field: string, value: string | boolean) => {
    setEmbedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleReset = () => {
    setEmbedData({
      title: "",
      description: "",
      image: "",
      color: "",
      authorName: "",
      authorUrl: "",
      providerName: "",
      providerUrl: "",
      largeImage: false,
    });
    setHideUrlText("");
    setHideURL(false);
    setEncryptUrl(false);
  };

  return (
    <div className="py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Discord Embed Builder</h1>
        <p className="text-default-600 max-w-2xl mx-auto">
          Create custom Discord embeds and share them with a simple link.
          <br /> Just copy the text at the bottom and paste it in Discord! No
          bots or webhooks required!
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Embed Options</h2>
              <EmbedForm embedData={embedData} onChange={handleChange} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <EmbedPreview data={embedData} />
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Share Your Embed</h2>

            <div className="mb-4 flex flex-col gap-4">
              <div>
                <Tooltip content="If enabled, all parameters like title and description are encoded into an unreadable string.">
                  <Switch
                    id="encryptUrl"
                    isSelected={encryptUrl}
                    onValueChange={setEncryptUrl}>
                    Hide parameters in URL
                  </Switch>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Enabling this option adds a long string to the URL, causing a glitch that makes the URL invisible in your Discord message.">
                  <Switch
                    id="hideUrl"
                    isSelected={hideUrl}
                    onValueChange={setHideURL}>
                    Hide URL in chat message
                  </Switch>
                </Tooltip>
                {hideUrl && (
                  <div className="mt-2 mb-5">
                    <Textarea
                      id="urlReplacement"
                      label="URL replacement"
                      labelPlacement="inside"
                      value={hideUrlText}
                      onChange={(e) => {
                        setHideUrlText(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      placeholder="Custom text to display instead of URL"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <Tooltip content="Paste this entire string into Discord">
                <Input
                  value={generatedUrl}
                  readOnly
                  className="flex-grow"
                  size="lg"
                />
              </Tooltip>
              <Tooltip content={copied ? "Copied!" : "Copy to clipboard"}>
                <Button
                  color="primary"
                  onPress={handleCopy}
                  className="min-w-[100px] h-[var(--input-height-lg)]">
                  {copied ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </Tooltip>
            </div>

            <div className="flex justify-center">
              <Button
                variant="flat"
                color="danger"
                onPress={handleReset}
                startContent={<RefreshIcon className="h-4 w-4" />}>
                Reset
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
