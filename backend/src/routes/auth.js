const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');

// POST: Register User
router.post('/register', async (req, res) => {
    const { email, password, fullName, phone, address } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // 1. Sign up user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
            email,
            password,
        });

        if (authError) return res.status(400).json({ error: authError.message });

        // 2. Insert profile data into our custom 'users' table
        if (authData.user) {
            const { error: profileError } = await supabaseAdmin
                .from('users')
                .insert([
                    {
                        id: authData.user.id,
                        email,
                        full_name: fullName,
                        phone,
                        address,
                        role: 'customer',
                    },
                ]);

            if (profileError) {
                console.error('Profile Creation Error:', profileError);
                // Note: In a real app, you might want to rollback the auth user or notify admin
            }
        }

        res.status(201).json({ message: 'User registered successfully', user: authData.user });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST: Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return res.status(401).json({ error: error.message });

        res.json({ message: 'Login successful', session: data.session, user: data.user });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
