// =================================================================================
// ARCHIVO: app/components/ui/MarkdownEditor.tsx
// DESCRIPCIÓN: Componente reutilizable para el editor de Markdown.
// =================================================================================
'use client';

import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css"; // Importamos los estilos del editor
import { useMemo } from 'react';

// Hacemos una importación dinámica del editor para asegurarnos
// de que solo se cargue en el lado del cliente.
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
    // Opciones para personalizar el editor.
    // Puedes ver más opciones en la documentación de EasyMDE.
    const options = useMemo(() => {
        return {
            autofocus: false,
            spellChecker: false,
            toolbar: [
                "bold",
                "italic",
                "heading",
                "|",
                "quote",
                "unordered-list",
                "ordered-list",
                "|",
                "link",
                "image",
                "|",
                "code",
                "table",
                "|",
                "preview",
                "side-by-side",
                "fullscreen",
                "|",
                "guide"
            ] as const,
        };
    }, []);

    return (
        <div className="prose dark:prose-invert max-w-none">
            <SimpleMDE
                value={value}
                onChange={onChange}
                options={options}
            />
        </div>
    );
};
