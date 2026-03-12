const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');

// GET: All Categories
router.get('/', async (req, res) => {
    const { type } = req.query;

    try {
        let query = supabaseAdmin.from('categories').select('*');

        if (type) {
            query = query.eq('type', type);
        }

        const { data, error } = await query;
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
