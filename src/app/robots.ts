import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/dashboard', '/auth/', '/auth'],
            },
        ],
        sitemap: 'https://ivargasm.com/sitemap.xml',
    };
}
