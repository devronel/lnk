import Link from "@tiptap/extension-link"
import StarterKit from "@tiptap/starter-kit"
import { EditorContent, useEditor } from "@tiptap/react"

const TiptopView = ({ content }) => {
    let editor = useEditor({
        content: content,
        editable: false,
        editorProps: {
            attributes: {
                class: 'text-sm'
            }
        },
        extensions: [StarterKit, Link.configure({
            openOnClick: true,
            autolink: true,
            protocols: ['http', 'https'],
            HTMLAttributes: {
                class: 'text-blue-500 cursor-pointer hover:underline'
            }
        })]
    })

    return <EditorContent editor={editor} />
}

export default TiptopView