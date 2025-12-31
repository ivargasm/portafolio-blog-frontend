'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface CommentFormProps {
    postId: number;
    parentCommentId?: number;
    onSubmit: (content: string, authorName?: string, authorEmail?: string) => Promise<void>;
    onCancel?: () => void;
    placeholder?: string;
}

export default function CommentForm({
    postId,
    parentCommentId,
    onSubmit,
    onCancel,
    placeholder = 'Escribe tu comentario...'
}: CommentFormProps) {
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('CommentForm mounted/updated', { postId, parentCommentId });
    }, [postId, parentCommentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('CommentForm submit triggered', {
            postId,
            parentCommentId,
            contentLength: content.trim().length,
            nameLength: authorName.trim().length,
            email: authorEmail.trim(),
            isSubmitting
        });

        if (isSubmitting) {
            console.log('Already submitting, ignoring...');
            return;
        }

        if (!content.trim()) {
            setError('El comentario no puede estar vacío');
            return;
        }

        if (content.trim().length < 10) {
            setError('El comentario debe tener al menos 10 caracteres');
            return;
        }

        if (!authorName.trim()) {
            setError('Por favor ingresa tu nombre');
            return;
        }

        if (authorName.trim().length < 2) {
            setError('El nombre debe tener al menos 2 caracteres');
            return;
        }

        if (!authorEmail.trim()) {
            setError('Por favor ingresa tu email');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(authorEmail.trim())) {
            setError('Por favor ingresa un email válido (ejemplo: tu@email.com)');
            return;
        }

        console.log('All validations passed, calling onSubmit...');
        setIsSubmitting(true);
        setError('');

        try {
            await onSubmit(content, authorName, authorEmail);
            console.log('onSubmit completed successfully');
            setContent('');
            setAuthorName('');
            setAuthorEmail('');
        } catch (err: unknown) {
            console.error('Error in onSubmit:', err);
            setError(err instanceof Error ? err.message : 'Error al enviar el comentario');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor={`authorName-${parentCommentId || 'main'}`} className="block text-sm font-medium text-text-secondary mb-1">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        id={`authorName-${parentCommentId || 'main'}`}
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border-color bg-foreground/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        placeholder="Tu nombre"
                        disabled={isSubmitting}
                        minLength={2}
                    />
                </div>
                <div>
                    <label htmlFor={`authorEmail-${parentCommentId || 'main'}`} className="block text-sm font-medium text-text-secondary mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        id={`authorEmail-${parentCommentId || 'main'}`}
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border-color bg-foreground/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        placeholder="tu@email.com"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div>
                <label htmlFor={`content-${parentCommentId || 'main'}`} className="block text-sm font-medium text-text-secondary mb-1">
                    Comentario *
                </label>
                <textarea
                    id={`content-${parentCommentId || 'main'}`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={parentCommentId ? 3 : 4}
                    className="w-full px-4 py-3 rounded-lg border border-border-color bg-foreground/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
                    placeholder={placeholder}
                    disabled={isSubmitting}
                    maxLength={5000}
                    minLength={10}
                />
                <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-text-secondary">
                        {content.length}/5000 caracteres (mínimo 10)
                    </span>
                </div>
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex gap-2 justify-end">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg border border-border-color text-text-secondary hover:bg-foreground/20 transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting || content.trim().length < 10 || authorName.trim().length < 2 || !authorEmail.trim()}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'var(--primary)' }}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>{parentCommentId ? 'Responder' : 'Comentar'}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
