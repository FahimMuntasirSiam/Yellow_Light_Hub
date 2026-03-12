import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://yellowlighthub.com';

    // Fetch all products
    const { data: products } = await supabase
        .from('products')
        .select('slug, type, updated_at')
        .eq('is_active', true);

    // Fetch all categories
    const { data: categories } = await supabase
        .from('categories')
        .select('slug, type');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productUrls = (products || []).map((p: any) => ({
        url: `${baseUrl}/products/${p.type}/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const categoryUrls = (categories || []).map((c: any) => ({
        url: `${baseUrl}/products/${c.type}?category=${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products/physical`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products/digital`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...productUrls,
        ...categoryUrls,
    ];
}
