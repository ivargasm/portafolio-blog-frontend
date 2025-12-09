'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Trash2, CheckCircle, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { getAllCommentsAdmin, approveComment, deleteCommentAdmin } from '@/app/lib/api';
import { API_URL } from '@/app/lib/constants';
import { PostCommentResponse } from '@/app/lib/types';

export default function CommentsManagement() {
    const [comments, setComments] = useState<PostCommentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all');

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {
        try {
            setIsLoading(true);
            const response = await getAllCommentsAdmin(API_URL);

            setComments(response);
        } catch (error) {
            toast.error('Error al cargar los comentarios');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (commentId: number) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await approveComment(commentId, true, API_URL);

            toast.success('Comentario aprobado');
            loadComments();
        } catch {
            toast.error('Error al aprobar el comentario');
        }
    };

    const handleReject = async (commentId: number) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await approveComment(commentId, false, API_URL);

            toast.success('Comentario rechazado');
            loadComments();
        } catch {
            toast.error('Error al rechazar el comentario');
        }
    };

    const handleDelete = async (commentId: number) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await deleteCommentAdmin(commentId, API_URL);

            toast.success('Comentario eliminado');
            loadComments();
        } catch {
            toast.error('Error al eliminar el comentario');
        }
    };

    const filteredComments = comments.filter(comment => {
        const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.author_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' ? true :
            filterStatus === 'approved' ? comment.is_approved :
                !comment.is_approved;

        return matchesSearch && matchesFilter && !comment.is_deleted;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-8 h-8 text-accent-primary" />
                <h1 className="text-3xl font-bold">Gestión de Comentarios</h1>
            </div>

            {/* Filtros */}
            <div className="rounded-lg pt-2 pb-2 mb-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por contenido o autor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-4 py-2 rounded-lg transition-colors ${filterStatus === 'all'
                                ? 'bg-accent-primary text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFilterStatus('approved')}
                            className={`px-4 py-2 rounded-lg transition-colors ${filterStatus === 'approved'
                                ? 'bg-accent-primary text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            Aprobados
                        </button>
                        <button
                            onClick={() => setFilterStatus('pending')}
                            className={`px-4 py-2 rounded-lg transition-colors ${filterStatus === 'pending'
                                ? 'bg-accent-primary text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            Pendientes
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de comentarios */}
            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredComments.length === 0 ? (
                <div className="text-center py-12 rounded-lg">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">No se encontraron comentarios</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {comment.author_name || 'Anónimo'}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${comment.is_approved
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                            {comment.is_approved ? 'Aprobado' : 'Pendiente'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {comment.author_email || 'Sin email'} • {formatDate(comment.created_at)}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap">
                                {comment.content}
                            </p>

                            <div className="flex gap-2">
                                {!comment.is_approved && (
                                    <button
                                        onClick={() => handleApprove(comment.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Aprobar
                                    </button>
                                )}
                                {comment.is_approved && (
                                    <button
                                        onClick={() => handleReject(comment.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Rechazar
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
