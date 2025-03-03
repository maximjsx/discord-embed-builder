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
            alt="Embed image"
            className="max-w-full rounded-md"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
