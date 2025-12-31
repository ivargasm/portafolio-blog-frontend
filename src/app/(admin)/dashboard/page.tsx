// =================================================================================
// ARCHIVO: app/(admin)/dashboard/page.tsx 
// DESCRIPCIÓN: Dashboard principal con métricas y gestión de posts.
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getPosts, updatePublishStatus, deletePost } from '@/app/lib/api';
import { PostResponse } from '@/app/lib/types';
import { Edit, Trash2, Eye, EyeOff, FileText, CheckCircle, Clock, Plus } from 'lucide-react';

export default function DashboardPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const fetchedPosts = await getPosts(apiUrl);
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
                        className="px-4 py-2 text-sm font-medium rounded-md"
                        style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
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
                                        getPosts(apiUrl).then(updatedPosts => setPosts(updatedPosts));
                                        return 'Post borrado con éxito.';
                                    },
                                    error: (err) => `Error: ${err.message}`,
                                }
                            );
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Cargando dashboard...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-medium text-red-500">Error: {error}</div>
            </div>
        );
    }

    const totalPosts = posts.length;
    const publishedPosts = posts.filter(p => p.is_published).length;
    const draftPosts = totalPosts - publishedPosts;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Dashboard
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        Gestiona tus posts y contenido
                    </p>
                </div>
                <Link
                    href="/posts/new"
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--primary)' }}
                >
                    <Plus size={20} />
                    Crear Nuevo Post
                </Link>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Posts */}
                <div className="p-6 rounded-2xl border"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: 'var(--primary)' }}>
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium px-3 py-1 rounded-full"
                            style={{ backgroundColor: 'var(--background)', color: 'var(--text-secondary)' }}>
                            Total
                        </span>
                    </div>
                    <h3 className="text-4xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {totalPosts}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Posts totales
                    </p>
                </div>

                {/* Published Posts */}
                <div className="p-6 rounded-2xl border"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                            Publicados
                        </span>
                    </div>
                    <h3 className="text-4xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {publishedPosts}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Posts publicados
                    </p>
                </div>

                {/* Draft Posts */}
                <div className="p-6 rounded-2xl border"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                            Borradores
                        </span>
                    </div>
                    <h3 className="text-4xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {draftPosts}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Posts en borrador
                    </p>
                </div>
            </div>

            {/* Posts Table */}
            <div className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h2 className="font-heading text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Todos los Posts
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y" style={{ borderColor: 'var(--border)' }}>
                        <thead style={{ backgroundColor: 'var(--background)' }}>
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Título
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Categoría
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Estado
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Fecha
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-[var(--background)] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                                {post.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm px-2 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: 'var(--primary)',
                                                    color: 'white'
                                                }}>
                                                {post.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleTogglePublish(post)}
                                                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer"
                                                style={{
                                                    backgroundColor: post.is_published ? '#10b981' : '#f59e0b',
                                                    color: 'white'
                                                }}
                                            >
                                                {post.is_published ? (
                                                    <>
                                                        <Eye className="w-3 h-3" />
                                                        Publicado
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff className="w-3 h-3" />
                                                        Borrador
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            {new Date(post.created_at).toLocaleDateString('es-MX')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/post/edit/${post.id}`}
                                                    className="p-2 rounded-lg transition-colors hover:bg-[var(--background)]"
                                                    style={{ color: 'var(--primary)' }}
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post)}
                                                    className="p-2 rounded-lg transition-colors hover:bg-red-50 text-red-500"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center" style={{ color: 'var(--text-secondary)' }}>
                                        No has creado ningún post todavía.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
