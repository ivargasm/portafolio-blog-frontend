'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';
import { PostCommentWithReplies } from '@/app/lib/types';
import { toast } from 'sonner';

interface CommentItemProps {
    comment: PostCommentWithReplies;
    postId: number;
    onReply: (content: string, parentId: number, authorName?: string, authorEmail?: string) => Promise<void>;
    onEdit: (commentId: number, content: string, editToken: string) => Promise<void>;
    onDelete: (commentId: number, editToken?: string) => Promise<void>;
}

export default function CommentItem({
    comment,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReply,
    onEdit,
    onDelete
}: CommentItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [showMenu, setShowMenu] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(`comment_token_${comment.id}`);
            setCanEdit(!!token);
        }
    }, [comment.id]);

    const getEditToken = (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(`comment_token_${comment.id}`);
    };

    const handleEdit = async () => {
        const editToken = getEditToken();

        if (!editToken) {
            toast.error('No tienes permiso para editar este comentario');
            return;
        }

        if (editContent.trim().length < 10) {
            toast.error('El comentario debe tener al menos 10 caracteres');
            return;
        }

        try {
            await onEdit(comment.id, editContent, editToken);
            setIsEditing(false);
            toast.success('Comentario editado exitosamente');
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Error al editar el comentario');
        }
    };

    const handleDelete = async () => {
        const editToken = getEditToken();

        try {
            await onDelete(comment.id, editToken || undefined);
            toast.success('Comentario eliminado exitosamente');
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Error al eliminar el comentario');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-foreground/40 rounded-lg p-4 border border-border-color">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-text-primary">
                            {comment.author_name || 'Usuario'}
                        </span>
                        {comment.updated_at && comment.updated_at !== comment.created_at && (
                            <span className="text-xs text-text-secondary">(editado)</span>
                        )}
                    </div>
                    <span className="text-xs text-text-secondary">
                        {formatDate(comment.created_at)}
                    </span>
                </div>

                {canEdit && (
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1 hover:bg-background rounded-full transition-colors"
                            type="button"
                        >
                            <MoreVertical className="w-4 h-4 text-text-secondary" />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-1 bg-background border border-border-color rounded-lg shadow-lg z-10 min-w-[120px]">
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setShowMenu(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-background-secondary transition-colors"
                                    type="button"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Editar
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete();
                                        setShowMenu(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-2">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border-color bg-foreground/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
                        rows={3}
                        maxLength={5000}
                        minLength={10}
                    />
                    <div className="text-xs text-text-secondary mb-2">
                        {editContent.length}/5000 caracteres (mínimo 10)
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setEditContent(comment.content);
                            }}
                            className="px-3 py-1 text-sm rounded-lg border border-border-color text-text-secondary hover:bg-background-secondary transition-colors"
                            type="button"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleEdit}
                            disabled={editContent.trim().length < 10}
                            className="px-3 py-1 text-sm rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-text-primary whitespace-pre-wrap break-words">
                    {comment.content}
                </p>
            )}
        </div>
    );
}
