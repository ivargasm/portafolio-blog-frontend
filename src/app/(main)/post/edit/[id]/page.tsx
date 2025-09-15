// =================================================================================
// ARCHIVO: app/(admin)/posts/edit/[id]/page.tsx 
// DESCRIPCIÓN: Formulario para editar un post existente.
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getPostById, updatePost } from '@/app/lib/api';
import { PostUpdatePayload } from '@/app/lib/types';
import { MarkdownEditor } from '@/app/components/ui/MarkdownEditor';

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = Number(params.id);

    const apiUrl = useAuthStore((state) => state.url);

    const [post, setPost] = useState<PostUpdatePayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (postId && apiUrl) {
            toast.promise(
                getPostById(postId, apiUrl),
                {
                    loading: 'Cargando datos del post...',
                    success: (data) => {
                        setPost(data);
                        return 'Datos cargados.';
                    },
                    error: 'No se pudieron cargar los datos.',
                }
            ).finally(() => setIsLoading(false));
        }
    }, [postId, apiUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        setIsSaving(true);
        toast.promise(
            updatePost(postId, post, apiUrl),
            {
                loading: 'Actualizando post...',
                success: () => {
                    setTimeout(() => router.push('/dashboard'), 1000);
                    return 'Post actualizado con éxito.';
                },
                error: (err) => err.message,
            }
        ).finally(() => setIsSaving(false));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setPost(prev => prev ? { ...prev, [id]: value } : null);
    };

    const handleEditorChange = (value: string) => {
        setPost(prev => ({ ...prev, content: value }));
    };

    if (isLoading) return <div>Cargando editor...</div>;
    if (!post) return <div>No se encontró el post.</div>;

    return (
        <div className='max-w-[80%] mx-auto'>
            <h1 className="font-heading text-3xl font-bold text-text-primary mb-6">Editar Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Reutilizamos la misma estructura de formulario de NewPostPage */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Título</label>
                    <input type="text" id="title" value={post.title || ''} onChange={handleInputChange} className="w-full p-2 bg-background border border-border-color rounded-md" required />
                </div>
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-text-secondary mb-1">URL (Slug)</label>
                    <input type="text" id="slug" value={post.slug || ''} onChange={handleInputChange} className="w-full p-2 bg-background border border-border-color rounded-md" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Categoría</label>
                        <select id="category" value={post.category || 'General'} onChange={handleInputChange} className="w-full p-2 bg-background border border-border-color rounded-md">
                            <option>General</option>
                            <option>Ingeniería de Datos</option>
                            <option>Desarrollo de Software</option>
                            <option>Cumplimiento Normativo</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary mb-1">URL de la Imagen de Portada</label>
                        <input type="text" id="imageUrl" value={post.imageUrl || ''} onChange={handleInputChange} className="w-full p-2 bg-background border border-border-color rounded-md" />
                    </div>
                </div>
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-text-secondary mb-1">Extracto (Resumen)</label>
                    <textarea id="excerpt" rows={3} value={post.excerpt || ''} onChange={handleInputChange} className="w-full p-2 bg-background border border-border-color rounded-md" />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-text-secondary mb-1">Contenido (Markdown)</label>
                    <MarkdownEditor value={post.content || ''} onChange={handleEditorChange} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={isSaving} className="px-6 py-2 font-semibold text-white bg-accent-primary rounded-md shadow-sm hover:bg-opacity-90 disabled:bg-gray-400">
                        {isSaving ? 'Guardando Cambios...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}
