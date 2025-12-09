// =================================================================================
// ARCHIVO: app/(main)/perspectivas/[slug]/PostClientView.tsx 
// DESCRIPCIÓN: Este es un Componente de Cliente que se encarga de renderizar la UI.
// =================================================================================
'use client';

import Image from 'next/image';
import { PostResponse } from '@/app/lib/types';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import PostLikeButton from '@/app/components/PostLikeButton';
import PostComments from '@/app/components/PostComments';

interface PostClientViewProps {
    initialPost: PostResponse | null;
}

export default function PostClientView({ initialPost }: PostClientViewProps) {
    // Ya no necesitamos estados de carga o error, los datos vienen del servidor
    const post = initialPost;

    if (!post) {
        return <div className="text-center py-20">Artículo no encontrado.</div>;
    }

    return (
        <div className="relative overflow-hidden py-8 md:py-16">
            <div className="absolute inset-0 -z-20 bg-background"></div>
            <div className="absolute inset-0 -z-10 grid-background"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-secondary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

            <article className="relative max-w-4xl mx-auto px-4">
                <header className="text-center mb-12">
                    <p className="text-accent-secondary font-semibold mb-2">{post.category || 'General'}</p>
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary leading-tight">
                        {post.title}
                    </h1>
                    <p className="mt-4 text-md text-text-secondary">
                        Publicado el {new Date(post.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </header>

                <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden mb-12 border border-border-color">
                    <Image
                        src={post.imageUrl || 'https://placehold.co/1200x600/1A202C/FFFFFF?text=Artículo'}
                        alt={`Imagen de ${post.title}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                    <ReactMarkdown
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Botón de Like al final del artículo */}
                <div className="mt-12 flex justify-center">
                    <PostLikeButton postId={post.id} />
                </div>
            </article>

            {/* Sección de Comentarios */}
            <PostComments postId={post.id} />
        </div>
    );
}
