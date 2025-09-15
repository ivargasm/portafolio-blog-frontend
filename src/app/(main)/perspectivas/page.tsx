// =================================================================================
// ARCHIVO: app/(main)/perspectivas/page.tsx (ACTUALIZADO)
// DESCRIPCIÓN: Obtiene los posts publicados desde la API y los muestra.
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/app/store/Store';
import { getPosts } from '@/app/lib/api';
import { PostResponse } from '@/app/lib/types';

export default function PerspectivasPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <header className="text-center mb-16">
                <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary">
                    Perspectivas
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                    Análisis y reflexiones en la intersección de la tecnología, los datos y el marco legal.
                </p>
            </header>

            {isLoading && <div className="text-center">Cargando artículos...</div>}
            {error && <div className="text-center text-red-500">Error: {error}</div>}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link href={`/perspectivas/${post.slug}`} key={post.slug} className="group flex flex-col bg-background border border-border-color rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        // Usaremos una imagen placeholder si el post no tiene una definida
                                        src={post.imageUrl || 'https://placehold.co/600x400/1A202C/FFFFFF?text=Artículo'}
                                        alt={`Imagen de ${post.title}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-accent-secondary font-semibold mb-2">
                                        <span>{post.category || 'General'}</span>
                                    </div>
                                    <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 text-text-secondary text-sm flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-border-color text-xs text-text-secondary font-medium">
                                        {/* Podríamos añadir el tiempo de lectura en el futuro */}
                                        Publicado el {new Date(post.created_at).toLocaleDateString('es-MX')}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-text-secondary">Aún no hay artículos publicados.</p>
                    )}
                </div>
            )}
        </div>
    );
}
