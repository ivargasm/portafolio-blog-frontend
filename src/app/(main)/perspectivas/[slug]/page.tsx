// =================================================================================
// ARCHIVO: app/(main)/perspectivas/[slug]/page.tsx 
// DESCRIPCIÓN: Este archivo es un Componente de Servidor.
// Se encarga de generar el SEO y obtener los datos iniciales.
// =================================================================================

// Se asume que la estructura de carpetas es app/lib, app/types, etc.
// Ajusta estas rutas relativas si tu estructura es diferente.
import { getPostBySlug } from '@/app/lib/api';
import { PostResponse } from '@/app/lib/types';
import { API_URL } from '@/app/lib/constants';
import { Metadata } from 'next';
import PostClientView from './PostClientView';

interface ArticuloPageProps {
    params: Promise<{ slug: string }>;
}

// --- FUNCIÓN PARA SEO DINÁMICO (Se ejecuta en el servidor) ---
export async function generateMetadata({ params }: ArticuloPageProps): Promise<Metadata> {
    const { slug } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || API_URL;

    try {
        const post = await getPostBySlug(slug, apiUrl);
        return {
            title: `${post.title} | Ismael Vargas M.`,
            description: post.excerpt,
            openGraph: {
                title: post.title,
                description: post.excerpt || '',
                url: `https://ivargasm.com/perspectivas/${slug}`,
                images: [{ url: post.imageUrl || 'https://ivargasm.com/default-og-image.png', width: 1200, height: 630 }],
            },
        };
    } catch {
        return { title: 'Artículo no encontrado', description: 'El artículo que buscas no existe.' };
    }
}

// --- FUNCIÓN PARA OBTENER DATOS (Se ejecuta en el servidor) ---
async function getPostData(slug: string): Promise<PostResponse | null> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || API_URL;
    try {
        const post = await getPostBySlug(slug, apiUrl);
        return post;
    } catch (error) {
        console.error("Failed to fetch post data:", error);
        return null;
    }
}

// --- El componente principal de la página (Ahora es un Componente de Servidor) ---
export default async function ArticuloPage({ params }: ArticuloPageProps) {
    const { slug } = await params;
    const post = await getPostData(slug);

    // Pasamos los datos obtenidos en el servidor al componente de cliente
    return <PostClientView initialPost={post} />;
}
