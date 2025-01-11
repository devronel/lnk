import { useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import './Tiptop.css'

/*
    Extension array
*/
const TIPTOP_EXTENSIONS = [
    StarterKit,
    Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ['http', 'https'],
        HTMLAttributes: {
            class: 'text-blue-500 cursor-pointer'
        }
    }),
    Placeholder.configure({
        placeholder: "What's on your mind?"
    })
]

const Tiptop = ({ content, setContent, setErrors }) => {
    let editor = useEditor({
        extensions: TIPTOP_EXTENSIONS,
        editorProps: {
            attributes: {
                class: 'text-sm min-h-[150px] text-left'
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
            {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="bubble-menu p-1 flex items-center gap-1 bg-lnk-dark-gray rounded-md">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`${editor.isActive('bold') ? 'font-bold text-lnk-orange' : 'text-lnk-white'} text-sm p-1`}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`${editor.isActive('italic') ? 'font-bold text-lnk-orange' : 'text-lnk-white'} italic text-sm p-1`}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`${editor.isActive('strike') ? 'font-bold text-lnk-orange' : 'text-lnk-white'} text-sm p-1`}
                    >
                        Strike
                    </button>
                </div>
            </BubbleMenu>}
            <EditorContent className="parent py-1 px-2 rounded-md border border-lnk-gray min-h-[150px]" editor={editor} />
        </>
    )
}

export default Tiptop