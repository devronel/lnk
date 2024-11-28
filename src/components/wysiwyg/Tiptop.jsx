import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import './Tiptop.css'

/*
    Extension array
*/
const TIPTOP_EXTENSIONS = [StarterKit, Link.configure({
    openOnClick: true,
    autolink: true,
    protocols: ['http', 'https'],
    HTMLAttributes: {
        class: 'text-blue-500 cursor-pointer'
    }
})]

const Tiptop = ({ content, setContent }) => {
    let editor = useEditor({
        extensions: TIPTOP_EXTENSIONS,
        content: content.post,
        onUpdate: ({ editor }) => {
            if (editor.getHTML() === "<p></p>") {
                setContent({
                    ...content,
                    content: ''
                })
            } else {
                setContent({
                    ...content,
                    content: editor.getHTML()
                })
            }
        }
    })

    return (
        <>
            <EditorContent className="parent py-1 px-2 rounded-md border border-lnk-gray min-h-[150px]" editor={editor} />
        </>
    )
}

export default Tiptop