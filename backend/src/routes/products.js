const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');

// GET: All Products (with filters)
router.get('/', async (req, res) => {
    const { category, type, minPrice, maxPrice, search, featured } = req.query;

    try {
        let query = supabaseAdmin
            .from('products')
            .select('*, categories(name, slug), shipping_options(charge)')
            .eq('is_active', true);

        // Apply Filters
        if (category) query = query.eq('category_id', category);
        if (type) query = query.eq('type', type);
        if (featured === 'true') query = query.eq('is_featured', true);
        if (minPrice) query = query.gte('selling_price', parseFloat(minPrice));
        if (maxPrice) query = query.lte('selling_price', parseFloat(maxPrice));
        if (search) query = query.ilike('name', `%${search}%`);

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Featured Products
router.get('/featured', async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('products')
            .select('*, categories(name)')
            .eq('is_active', true)
            .eq('is_featured', true)
            .limit(8);

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Product by Slug
router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const { data, error } = await supabaseAdmin
            .from('products')
            .select('*, categories(*), shipping_options(*)')
            .eq('slug', slug)
            .single();

        if (error || !data) return res.status(404).json({ error: 'Product not found' });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
