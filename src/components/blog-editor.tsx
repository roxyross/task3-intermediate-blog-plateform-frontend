"use client"

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  ImageIcon,
  Undo,
  Redo,
  Code
} from "lucide-react";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("ENTER_IMAGE_URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 border-b border-white/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("bold") ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("italic") ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("heading", { level: 1 }) ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("heading", { level: 2 }) ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("bulletList") ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("orderedList") ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("blockquote") ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <Quote className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-primary/10 transition-all ${editor.isActive("codeBlock") ? "text-primary glass" : "text-muted-foreground"}`}
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        onClick={addImage}
        className="p-2 rounded hover:bg-primary/10 transition-all text-muted-foreground"
      >
        <ImageIcon className="w-4 h-4" />
      </button>
      <div className="flex-grow" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-primary/10 transition-all text-muted-foreground"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-primary/10 transition-all text-muted-foreground"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export function BlogEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-primary max-w-none p-6 min-h-[400px] focus:outline-none",
      },
    },
  });

  return (
    <div className="glass neon-border rounded-xl overflow-hidden min-h-[500px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
