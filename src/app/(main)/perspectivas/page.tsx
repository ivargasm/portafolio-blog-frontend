// =================================================================================
// ARCHIVO: app/(main)/perspectivas/page.tsx (ACTUALIZADO)
// DESCRIPCIÓN: Obtiene los posts publicados desde la API y los muestra.
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/app/store/Store';
import { getPosts } from '@/app/lib/api';
import { PostResponse } from '@/app/lib/types';

export default function PerspectivasPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

    useEffect(() => {
        const fetchPublishedPosts = async () => {
            try {
                setIsLoading(true);
                // Llamamos a la API pidiendo solo los posts publicados
                const fetchedPosts = await getPosts(apiUrl, true);

                // Filtramos de nuevo en el frontend como medida de seguridad.
                const publishedPosts = fetchedPosts.filter(post => post.is_published);
                setPosts(publishedPosts);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            } finally {
                setIsLoading(false);
            }
        };

        // Solo hacemos la llamada si apiUrl está disponible
        if (apiUrl) {
            fetchPublishedPosts();
        }
    }, [apiUrl]);

    // Obtener categorías únicas
    const categories = ['Todos', ...Array.from(new Set(posts.map(p => p.category || 'General')))];

    // Filtrar posts
    const filteredPosts = selectedCategory === 'Todos'
        ? posts
        : posts.filter(p => (p.category || 'General') === selectedCategory);

    // Post destacado (el más reciente)
    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Cargando artículos...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-medium text-red-500">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                {/* Fondo con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)]"></div>

                {/* Patrón de puntos sutil */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                            <Sparkles className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                EL BLOG
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
                            Código, Datos y <span style={{ color: 'var(--primary)' }}>Justicia</span>
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                            Un punto de encuentro entre la lógica algorítmica y el razonamiento jurídico. Aquí exploro desde{' '}
                            <strong style={{ color: 'var(--primary)' }}>arquitecturas de datos y optimización en Python</strong>,
                            hasta estrategias de <strong style={{ color: 'var(--primary)' }}>LegalTech</strong> y análisis práctico de la normativa laboral.
                        </p>

                        {/* Filtros de categoría */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="px-5 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                                    style={{
                                        backgroundColor: selectedCategory === category ? 'var(--primary)' : 'var(--surface)',
                                        color: selectedCategory === category ? 'white' : 'var(--text-primary)',
                                        border: `1px solid ${selectedCategory === category ? 'var(--primary)' : 'var(--border)'}`
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-24" style={{ backgroundColor: 'var(--background)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                                No hay artículos en esta categoría.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {/* Post Destacado */}
                            {featuredPost && (
                                <Link
                                    href={`/perspectivas/${featuredPost.slug}`}
                                    className="block relative rounded-2xl overflow-hidden border group"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                                >
                                    <div className="grid lg:grid-cols-2 gap-0">
                                        {/* Imagen */}
                                        <div className="relative aspect-video lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                                            <Image
                                                src={featuredPost.imageUrl || 'https://placehold.co/600x400/8c2bee/FFFFFF?text=Artículo'}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                                                    style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                                    {featuredPost.category || 'General'}
                                                </span>
                                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                    {new Date(featuredPost.created_at).toLocaleDateString('es-MX', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                    • 8 min de lectura
                                                </span>
                                            </div>

                                            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors"
                                                style={{ color: 'var(--text-primary)' }}>
                                                {featuredPost.title}
                                            </h2>

                                            <p className="text-lg mb-6 leading-relaxed"
                                                style={{ color: 'var(--text-secondary)' }}>
                                                {featuredPost.excerpt}
                                            </p>

                                            {/* Botón */}
                                            <div className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all w-fit"
                                                style={{ color: 'var(--primary)' }}>
                                                Leer Artículo Completo
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Grid de otros posts */}
                            {otherPosts.length > 0 && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {otherPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/perspectivas/${post.slug}`}
                                            className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                            style={{
                                                backgroundColor: 'var(--surface)',
                                                borderColor: 'var(--border)'
                                            }}
                                        >
                                            {/* Imagen */}
                                            <div className="relative aspect-video overflow-hidden">
                                                <Image
                                                    src={post.imageUrl || 'https://placehold.co/600x400/8c2bee/FFFFFF?text=Artículo'}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>

                                            {/* Contenido */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                                                        style={{
                                                            backgroundColor: 'var(--primary)',
                                                            color: 'white'
                                                        }}>
                                                        {post.category || 'General'}
                                                    </span>
                                                </div>

                                                <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors"
                                                    style={{ color: 'var(--text-primary)' }}>
                                                    {post.title}
                                                </h3>

                                                <p className="text-sm mb-4 flex-grow line-clamp-3"
                                                    style={{ color: 'var(--text-secondary)' }}>
                                                    {post.excerpt}
                                                </p>

                                                {/* Metadata */}
                                                <div className="flex items-center gap-4 text-xs pt-4 border-t"
                                                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.created_at).toLocaleDateString('es-MX', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        8 min
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
