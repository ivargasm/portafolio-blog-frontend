// =================================================================================
// ARCHIVO: app/(admin)/dashboard/page.tsx 
// DESCRIPCIÓN: Añade la funcionalidad para publicar/despublicar posts.
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getPosts, updatePublishStatus, deletePost } from '@/app/lib/api';
import { PostResponse } from '@/app/lib/types';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function DashboardPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const fetchedPosts = await getPosts(apiUrl); // Obtiene todos los posts
                setPosts(fetchedPosts);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido.');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [apiUrl]);

    const handleTogglePublish = async (post: PostResponse) => {
        const newStatus = !post.is_published;

        toast.promise(
            updatePublishStatus(post.id, newStatus, apiUrl),
            {
                loading: newStatus ? 'Publicando post...' : 'Ocultando post...',
                success: (updatedPost) => {
                    // Actualiza el estado localmente para reflejar el cambio al instante
                    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
                    return `Post ${newStatus ? 'publicado' : 'ocultado'} con éxito.`;
                },
                error: (err) => `Error: ${err.message}`,
            }
        );
    };

    const handleDelete = (postToDelete: PostResponse) => {
        toast((t) => (
            <div className="flex flex-col gap-4">
                <p>¿Seguro que quieres borrar el post <strong>{postToDelete.title}</strong>? Esta acción no se puede deshacer.</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 text-sm font-medium bg-border-color rounded-md cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            toast.promise(
                                deletePost(postToDelete.id, apiUrl),
                                {
                                    loading: 'Borrando post...',
                                    success: () => {
                                        // Refresca los posts después de borrar, pero fuera del callback
                                        getPosts(apiUrl).then(updatedPosts => setPosts(updatedPosts));
                                        return 'Post borrado con éxito.';
                                    },
                                    error: (err) => `Error: ${err.message}`,
                                }
                            );
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md cursor-pointer"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
    };

    if (isLoading) return <div>Cargando posts...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-heading text-3xl font-bold text-text-primary">Dashboard</h1>
                <Link href="/posts/new" className="px-4 py-2 font-semibold text-white bg-accent-primary rounded-md shadow-sm hover:bg-opacity-90 transition-colors">
                    Crear Nuevo Post
                </Link>
            </div>

            <div className="bg-background border border-border-color rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-border-color">
                    <thead className="bg-border-color/50 dark:bg-border-color/20">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Fecha</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-text-primary">{post.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => handleTogglePublish(post)} className="flex items-center gap-2 cursor-pointer">
                                            {post.is_published ? (
                                                <>
                                                    <ToggleRight className="h-6 w-6 text-green-500" />
                                                    <span className="text-xs text-green-500 font-semibold">Publicado</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ToggleLeft className="h-6 w-6 text-text-secondary" />
                                                    <span className="text-xs text-text-secondary font-semibold">Borrador</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        {new Date(post.created_at).toLocaleDateString('es-MX')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <Link href={`/post/edit/${post.id}`} className="inline-block text-accent-primary hover:text-accent-primary/80 cursor-pointer">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(post)} className="text-red-500 hover:text-red-400 cursor-pointer"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={4} className="px-6 py-4 text-center text-text-secondary">No has creado ningún post todavía.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
