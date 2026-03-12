const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

// GET: Reviews for a Product
router.get('/product/:productId', async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('reviews')
            .select('*, users(full_name)')
            .eq('product_id', req.params.productId)
            .eq('is_approved', true) // Only show approved reviews
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Add Review (Requires Auth)
router.post('/', authMiddleware, async (req, res) => {
    const { productId, rating, title, body } = req.body;

    if (!productId || !rating) {
        return res.status(400).json({ error: 'Product ID and rating are required' });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('reviews')
            .insert([
                {
                    product_id: productId,
                    user_id: req.user.id,
                    rating,
                    title,
                    body,
                    is_approved: false, // Default to unapproved for moderation
                },
            ])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ message: 'Review submitted for moderation', review: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
