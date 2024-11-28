import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import './Tiptop.css'
import { useEffect } from "react";

/*
    Extension array
*/
const TIPTOP_EXTENSIONS = [StarterKit, Link.configure({
    openOnClick: false,
    autolink: true,
    protocols: ['http', 'https'],
    HTMLAttributes: {
        class: 'text-blue-500 cursor-pointer'
    }
})]

const Tiptop = ({ content, setContent, setErrors }) => {
    let editor = useEditor({
        extensions: TIPTOP_EXTENSIONS,
        editorProps: {
            attributes: {
                class: 'text-sm min-h-[150px]'
            }
        },
        content: content.content,
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

    useEffect(() => {
        if (content.content === '') {
            editor.commands.setContent('')
        } else {
            setErrors([])
        }
    }, [content.content])

    return (
        <>
            <EditorContent className="parent py-1 px-2 rounded-md border border-lnk-gray min-h-[150px]" editor={editor} />
        </>
    )
}

export default Tiptop