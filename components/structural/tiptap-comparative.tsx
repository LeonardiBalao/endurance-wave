"use client";

import "./tiptap.css";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import sanitizeHtml from "sanitize-html";
import Underline from "@tiptap/extension-underline";
import {
  useEditor,
  EditorContent,
  TiptapEditorHTMLElement,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  BoldIcon,
  Heading2,
  Heading2Icon,
  Heading3,
  Highlighter,
  Italic,
  ParkingSquareIcon,
  Strikethrough,
  UnderlineIcon,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { useFormContext } from "react-hook-form";

export default function TiptapComparative({ val }: { val: string }) {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        levels: [2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    editorProps: {
      attributes: {
        class: "min-h-[180px] border rounded-lg p-2",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const content = sanitizeHtml(editor.getHTML());
      setValue("comparative", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    content: `${val}`,
  });

  return (
    <>
      {editor && (
        <div className="control-group">
          <div className="button-group flex gap-4">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              <Heading2 size={14} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              <Heading3 size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive("paragraph") ? "is-active" : ""}
            >
              <ParkingSquareIcon size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <BoldIcon size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <Italic size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <Strikethrough size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "is-active" : ""}
            >
              <Highlighter size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "is-active" : ""
              }
            >
              <AlignLeft size={14} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "is-active" : ""
              }
            >
              <AlignCenter size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "is-active" : ""
              }
            >
              <AlignRight size={14} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={
                editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
              }
            >
              <AlignJustify size={14} />
            </button>
          </div>
        </div>
      )}
      <EditorContent editor={editor} />
    </>
  );
}
