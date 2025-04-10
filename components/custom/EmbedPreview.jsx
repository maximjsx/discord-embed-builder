import { Card } from "@heroui/card";

export default function EmbedPreview({ data }) {
  return (
    <Card
      className="bg-gray-800 border-l-4 w-full"
      style={{ borderLeftColor: data.color || "#5865F2" }}>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex-grow">
            {data.providerName && (
              <div className="px-4 pt-3 text-xs text-gray-400">
                {data.providerUrl ? (
                  <a
                    href={data.providerUrl}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer">
                    {data.providerName}
                  </a>
                ) : (
                  <span>{data.providerName}</span>
                )}
              </div>
            )}

            {data.authorName && (
              <div className="px-4 pt-2 text-base font-bold text-white">
                {data.authorUrl ? (
                  <a
                    href={data.authorUrl}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer">
                    {data.authorName}
                  </a>
                ) : (
                  <span>{data.authorName}</span>
                )}
              </div>
            )}

            <div className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-lg">
                <a
                  href={"/"}
                  className="text-blue-400 hover:underline"
                  rel="noopener noreferrer">
                  {data.title || "A title"}
                </a>
              </h4>
            </div>

            <div className="py-2 px-4">
              <p className="whitespace-pre-wrap text-gray-300 text-base">
                {data.description || "A description"}
              </p>
            </div>
          </div>

          {!data.largeImage && (
            <div className="p-3 flex-shrink-0" style={{ maxWidth: "30%" }}>
              <img
                src={
                  data.image ||
                  ""
                }
                alt="Thumbnail"
                className="rounded-md object-cover"
                style={{ maxHeight: "140px", maxWidth: "100%" }}
              />
            </div>
          )}
        </div>

        {data.largeImage && (
          <div className="px-4 pb-4">
            <img
              src={
                data.image ||
                "https://media1.tenor.com/m/p-rnE8Gy6ccAAAAd/indian-guy-funny-indian-guy.gif"
              }
              alt="Large"
              className="rounded-md w-full object-cover"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
