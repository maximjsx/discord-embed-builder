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
