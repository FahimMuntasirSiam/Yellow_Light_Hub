const { supabaseAdmin } = require('../config/supabase');

const adminOnly = async (req, res, next) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('users')
            .select('role')
            .eq('id', userId)
            .single();

        if (error || !data || data.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admin access required' });
        }

        next();
    } catch (err) {
        res.status(500).json({ error: 'Internal server error during authorization' });
    }
};

module.exports = adminOnly;
