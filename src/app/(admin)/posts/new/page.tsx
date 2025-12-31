// =================================================================================
// ARCHIVO: app/(admin)/posts/new/page.tsx 
// DESCRIPCIÓN: Conecta el formulario a la API y maneja estados de carga/error.
// =================================================================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { createPost } from '@/app/lib/api';
import { PostCreatePayload } from '@/app/lib/types';
import { MarkdownEditor } from '@/app/components/ui/MarkdownEditor';

export default function NewPostPage() {
    const router = useRouter();
    const apiUrl = useAuthStore((state) => state.url);

    const [post, setPost] = useState<PostCreatePayload>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        toast.promise(
            createPost(post, apiUrl),
            {
                loading: 'Guardando post...',
                success: (newPost) => {
                    setTimeout(() => router.push('/dashboard'), 1000);
                    return `¡Post "${newPost.title}" creado con éxito!`;
                },
                error: (err) => `${err.message}`,
            }
        ).finally(() => {
            setIsLoading(false);
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setPost(prev => ({ ...prev, [id]: value }));

        if (id === 'title') {
            const newSlug = value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .slice(0, 50);
            setPost(prev => ({ ...prev, slug: newSlug }));
        }
    };

    const handleEditorChange = (value: string) => {
        setPost(prev => ({ ...prev, content: value }));
    };

    return (
        <div>
            <h1 className="font-heading text-3xl font-bold text-text-primary mb-6">Crear Nuevo Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Título</label>
                    <input
                        type="text" id="title" value={post.title} onChange={handleInputChange}
                        className="w-full p-2 bg-background border border-border-color rounded-md focus:ring-2 focus:ring-accent-primary" required
                    />
                </div>

                {/* Slug (URL) */}
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-text-secondary mb-1">URL (Slug)</label>
                    <input
                        type="text" id="slug" value={post.slug} onChange={handleInputChange}
                        className="w-full p-2 bg-background border border-border-color rounded-md focus:ring-2 focus:ring-accent-primary" required
                    />
                </div>

                {/* Categoria e Imagen URL en la misma fila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Categoría</label>
                        <select id="category" value={post.category} onChange={handleInputChange} className="w-full p-2 bg-background border border-border-color rounded-md">
                            <option>General</option>
                            <option>Ingeniería de Datos</option>
                            <option>Desarrollo de Software</option>
                            <option>Cumplimiento Normativo</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary mb-1">URL de la Imagen de Portada</label>
                        <input type="text" id="imageUrl" value={post.imageUrl} onChange={handleInputChange} className="w-full p-2 bg-background border border-border-color rounded-md" placeholder="https://res.cloudinary.com/..." />
                    </div>
                </div>

                {/* Extracto */}
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-text-secondary mb-1">Extracto (Resumen)</label>
                    <textarea
                        id="excerpt" rows={3} value={post.excerpt} onChange={handleInputChange}
                        className="w-full p-2 bg-background border border-border-color rounded-md focus:ring-2 focus:ring-accent-primary"
                    />
                </div>

                {/* Contenido Principal */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-text-secondary mb-1">Contenido (Markdown/HTML)</label>
                    <MarkdownEditor value={post.content} onChange={handleEditorChange} />
                </div>

                {/* Mensaje de Error */}
                {error && (
                    <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md">
                        <p><strong>Error:</strong> {error}</p>
                    </div>
                )}

                {/* Botón de Guardar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 font-semibold text-white bg-text-secondary rounded-md shadow-sm hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? 'Guardando...' : 'Guardar Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
