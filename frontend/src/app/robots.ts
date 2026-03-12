import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/account/', '/checkout/', '/order-confirmation/'],
        },
        sitemap: 'https://yellowlighthub.com/sitemap.xml',
    };
}
