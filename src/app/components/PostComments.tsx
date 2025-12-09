'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare } from 'lucide-react';
import { PostCommentWithReplies } from '@/app/lib/types';
import { getPostComments, createComment, updateComment, deleteComment } from '@/app/lib/api';
import { API_URL } from '@/app/lib/constants';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface PostCommentsProps {
    postId: number;
}

export default function PostComments({ postId }: PostCommentsProps) {
    const [comments, setComments] = useState<PostCommentWithReplies[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Cargar comentarios
    const loadComments = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getPostComments(postId, API_URL);
            setComments(data);
            setError('');
        } catch (err: unknown) {
            setError('Error al cargar los comentarios');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    // Crear comentario principal
    const handleCreateComment = async (content: string, authorName?: string, authorEmail?: string) => {
        try {
            const newComment = await createComment(
                {
                    post_id: postId,
                    content,
                    author_name: authorName,
                    author_email: authorEmail,
                },
                API_URL
            );

            // Guardar el edit_token en localStorage
            if (newComment.edit_token) {
                localStorage.setItem(`comment_token_${newComment.id}`, newComment.edit_token);
            }

            // Recargar comentarios
            await loadComments();
        } catch (err: unknown) {
            throw new Error(err instanceof Error ? err.message : 'Error al crear el comentario');
        }
    };

    // Crear respuesta a un comentario
    const handleReply = async (
        content: string,
        parentId: number,
        authorName?: string,
        authorEmail?: string
    ) => {
        console.log('PostComments.handleReply called', {
            content,
            parentId,
            authorName,
            authorEmail,
            postId
        });

        try {
            const newComment = await createComment(
                {
                    post_id: postId,
                    content,
                    parent_comment_id: parentId,
                    author_name: authorName,
                    author_email: authorEmail,
                },
                API_URL
            );

            console.log('Reply created successfully:', newComment);

            // Guardar el edit_token en localStorage
            if (newComment.edit_token) {
                localStorage.setItem(`comment_token_${newComment.id}`, newComment.edit_token);
                console.log('Edit token saved for new reply:', newComment.id);
            }

            // Recargar comentarios
            await loadComments();
        } catch (err: unknown) {
            console.error('Error creating reply:', err);
            throw new Error(err instanceof Error ? err.message : 'Error al crear la respuesta');
        }
    };

    // Editar comentario
    const handleEdit = async (commentId: number, content: string, editToken: string) => {
        try {
            await updateComment(commentId, { content, edit_token: editToken }, API_URL);
            // Recargar comentarios
            await loadComments();
        } catch (err: unknown) {
            throw new Error(err instanceof Error ? err.message : 'Error al editar el comentario');
        }
    };

    // Eliminar comentario
    const handleDelete = async (commentId: number, editToken?: string) => {
        try {
            await deleteComment(commentId, { edit_token: editToken }, API_URL);
            // Eliminar el token del localStorage
            localStorage.removeItem(`comment_token_${commentId}`);
            // Recargar comentarios
            await loadComments();
        } catch (err: unknown) {
            throw new Error(err instanceof Error ? err.message : 'Error al eliminar el comentario');
        }
    };

    return (
        <div className="mt-16 max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6 text-accent-primary" />
                <h2 className="text-2xl font-bold text-text-primary">
                    Comentarios ({comments.length})
                </h2>
            </div>

            {/* Formulario para nuevo comentario */}
            <div className="mb-8 rounded-lg p-6 border border-border-color bg-foreground/20">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Deja tu comentario
                </h3>
                <CommentForm
                    postId={postId}
                    onSubmit={handleCreateComment}
                    placeholder="Comparte tu opinión sobre este artículo..."
                />
            </div>

            {/* Lista de comentarios */}
            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : error ? (
                <div className="text-center py-12 text-red-600 dark:text-red-400">
                    {error}
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-12 text-text-secondary">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Sé el primero en comentar</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            onReply={handleReply}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
