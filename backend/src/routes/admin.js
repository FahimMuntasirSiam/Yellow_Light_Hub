const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const upload = require('../middleware/upload');

// Apply Admin protection to all routes in this file
router.use(authMiddleware, adminOnly);

// --- PRODUCT MANAGEMENT ---

// POST: Create Product
router.post('/products', upload.array('images', 5), async (req, res) => {
    try {
        const productData = JSON.parse(req.body.data); // Expecting JSON data in 'data' field
        const files = req.files;

        // Handle Image Uploads to Supabase Storage
        const uploadedImages = [];
        if (files && files.length > 0) {
            for (const file of files) {
                const fileName = `${Date.now()}-${file.originalname}`;
                const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
                    .from('products')
                    .upload(fileName, file.buffer, { contentType: file.mimetype });

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabaseAdmin.storage
                    .from('products')
                    .getPublicUrl(fileName);

                uploadedImages.push(publicUrlData.publicUrl);
            }
        }

        const { data, error } = await supabaseAdmin
            .from('products')
            .insert([{
                ...productData,
                images: uploadedImages.length > 0 ? uploadedImages : productData.images || [],
                thumbnail_url: uploadedImages[0] || productData.thumbnail_url
            }])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH: Update Product
router.patch('/products/:id', async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('products')
            .update(req.body)
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Product
router.delete('/products/:id', async (req, res) => {
    try {
        const { error } = await supabaseAdmin.from('products').delete().eq('id', req.params.id);
        if (error) throw error;
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ORDER MANAGEMENT ---

// GET: All Orders
router.get('/orders', async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*, users(full_name, email)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH: Update Order Status
router.patch('/orders/:id/status', async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .update({ status: req.body.status })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DASHBOARD STATS ---

// GET: Stats
router.get('/stats', async (req, res) => {
    try {
        const { count: productsCount } = await supabaseAdmin.from('products').select('*', { count: 'exact', head: true });
        const { count: ordersCount } = await supabaseAdmin.from('orders').select('*', { count: 'exact', head: true });

        const { data: salesData, error: salesError } = await supabaseAdmin.from('orders').select('total');
        if (salesError) throw salesError;

        const totalSales = salesData.reduce((sum, order) => sum + parseFloat(order.total), 0);

        res.json({
            totalProducts: productsCount,
            totalOrders: ordersCount,
            totalSales: totalSales.toFixed(2)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
