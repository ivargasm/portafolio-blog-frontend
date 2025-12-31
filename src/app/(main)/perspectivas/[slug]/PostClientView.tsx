// =================================================================================
// ARCHIVO: app/(main)/perspectivas/[slug]/PostClientView.tsx 
// DESCRIPCIÓN: Este es un Componente de Cliente que se encarga de renderizar la UI.
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { PostResponse } from '@/app/lib/types';
import { getPosts } from '@/app/lib/api';
import { useAuthStore } from '@/app/store/Store';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import PostLikeButton from '@/app/components/PostLikeButton';
import PostComments from '@/app/components/PostComments';

interface PostClientViewProps {
    initialPost: PostResponse | null;
}

export default function PostClientView({ initialPost }: PostClientViewProps) {
    const apiUrl = useAuthStore((state) => state.url);
    const [relatedPosts, setRelatedPosts] = useState<PostResponse[]>([]);
    const post = initialPost;

    useEffect(() => {
        const fetchRelatedPosts = async () => {
            if (!post) return;
            try {
                const allPosts = await getPosts(apiUrl, true);
                // Filtrar posts de la misma categoría, excluyendo el actual
                const related = allPosts
                    .filter(p => p.category === post.category && p.id !== post.id)
                    .slice(0, 2);
                setRelatedPosts(related);
            } catch (error) {
                console.error("Failed to fetch related posts:", error);
            }
        };

        fetchRelatedPosts();
    }, [post, apiUrl]);

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Artículo no encontrado
                    </h1>
                    <Link href="/perspectivas" className="text-lg" style={{ color: 'var(--primary)' }}>
                        ← Volver al blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
            {/* Header del artículo */}
            <header className="relative py-12 md:py-20"
                style={{
                    background: 'linear-gradient(to bottom, var(--surface) 0%, var(--surface) 70%, var(--background) 100%)'
                }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <Link
                        href="/perspectivas"
                        className="inline-flex items-center gap-2 mb-8 text-sm font-medium hover:gap-3 transition-all"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al blog
                    </Link>

                    {/* Categoría */}
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                            {post.category || 'General'}
                        </span>
                    </div>

                    {/* Título */}
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                        style={{ color: 'var(--text-primary)' }}>
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}>
                            {post.excerpt}
                        </p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-6 text-sm"
                        style={{ color: 'var(--text-secondary)' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2"
                                style={{ borderColor: 'var(--primary)' }}>
                                <Image
                                    src="https://res.cloudinary.com/ivargasm/image/upload/v1756997966/ivargasm/yo_kn2ih3.jpg"
                                    alt="Ismael Vargas M."
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    Ismael Vargas M.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.created_at).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            8 min de lectura
                        </div>
                    </div>
                </div>
            </header>

            {/* Imagen destacada */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border"
                    style={{ borderColor: 'var(--border)' }}>
                    <Image
                        src={post.imageUrl || 'https://placehold.co/1200x600/8c2bee/FFFFFF?text=Artículo'}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Contenido principal */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-heading prose-headings:font-bold
                                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                                prose-a:no-underline hover:prose-a:underline
                                prose-code:bg-[var(--surface)] prose-code:px-2 prose-code:py-1 prose-code:rounded
                                prose-pre:bg-[#282c34] prose-pre:border prose-pre:border-[var(--border)]
                                prose-blockquote:border-l-4 prose-blockquote:border-[var(--primary)] prose-blockquote:pl-6 prose-blockquote:italic
                                prose-img:rounded-xl prose-img:shadow-lg"
                    style={{
                        color: 'var(--text-primary)',
                        '--tw-prose-links': 'var(--primary)',
                        '--tw-prose-bold': 'var(--text-primary)',
                        '--tw-prose-headings': 'var(--text-primary)',
                    } as React.CSSProperties}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Botón de Like */}
                <div className="mt-12 flex justify-center">
                    <PostLikeButton postId={post.id} />
                </div>
            </article>

            {/* Sección "Sobre el Autor" */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="p-8 rounded-2xl border"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2"
                                style={{ borderColor: 'var(--primary)' }}>
                                <Image
                                    src="https://res.cloudinary.com/ivargasm/image/upload/v1756997966/ivargasm/yo_kn2ih3.jpg"
                                    alt="Ismael Vargas M."
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-heading text-2xl font-bold mb-2"
                                style={{ color: 'var(--text-primary)' }}>
                                Sobre el Autor
                            </h3>
                            <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Ingeniero de Sistemas especializado en Datos y estudiante de Derecho.
                                Apasionado por construir soluciones LegalTech que combinen la precisión
                                técnica con el rigor analítico del derecho.
                            </p>
                            <Link
                                href="/sobre-mi"
                                className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                                style={{ color: 'var(--primary)' }}
                            >
                                Conocer más sobre mí →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artículos Relacionados */}
            {relatedPosts.length > 0 && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="font-heading text-3xl font-bold mb-8"
                        style={{ color: 'var(--text-primary)' }}>
                        Continúa Leyendo
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {relatedPosts.map((relatedPost) => (
                            <Link
                                key={relatedPost.id}
                                href={`/perspectivas/${relatedPost.slug}`}
                                className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)'
                                }}
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={relatedPost.imageUrl || 'https://placehold.co/600x400/8c2bee/FFFFFF?text=Artículo'}
                                        alt={relatedPost.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                                        style={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'white'
                                        }}>
                                        {relatedPost.category || 'General'}
                                    </span>
                                    <h3 className="font-heading text-xl font-bold mt-3 mb-2 group-hover:text-[var(--primary)] transition-colors"
                                        style={{ color: 'var(--text-primary)' }}>
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm line-clamp-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        {relatedPost.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Sección de Comentarios */}
            <PostComments postId={post.id} />
        </div>
    );
}
