import { MetadataRoute } from 'next';
import { getPosts } from './lib/api';
import { API_URL } from './lib/constants';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ivargasm.com';

    // Rutas estáticas principales
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/sobre-mi`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/servicios`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/proyectos`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/perspectivas`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
    ];

    try {
        const posts = await getPosts(API_URL, true);
        const postUrls: MetadataRoute.Sitemap = posts
            .filter((post) => post.is_published && post.slug)
            .map((post) => ({
                url: `${baseUrl}/perspectivas/${post.slug}`,
                lastModified: new Date(post.updated_at || post.created_at),
                changeFrequency: 'monthly',
                priority: 0.8,
            }));

        return [...routes, ...postUrls];
    } catch (error) {
        console.error('Error generating dynamic sitemap for posts:', error);
        return routes;
    }
}
