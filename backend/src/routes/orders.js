const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');
const { Resend } = require('resend');

// Initialize Resend (Use env variable in real app)
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * CREATE NEW ORDER
 * POST /api/orders
 */
router.post('/', async (req, res) => {
    try {
        const {
            fullName, phone, email, items, subtotal,
            shipping_cost, total, payment_method, shipping_address, notes
        } = req.body;

        const orderNumber = `YLH-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 100)}`;

        // 1. Create the Order
        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert([{
                user_id: req.user?.id || null, // Optional if not logged in
                order_number: orderNumber,
                status: 'pending',
                subtotal,
                shipping_cost,
                total,
                payment_method,
                payment_status: 'pending',
                shipping_address,
                notes,
                email, // Store email even for guests
                fullName,
                phone
            }])
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create Order Items
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
            product_snapshot: {
                name: item.name,
                thumbnail_url: item.image,
                type: item.type || 'physical',
                slug: item.slug
            }
        }));

        const { error: itemsError } = await supabaseAdmin
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // 3. Update Stock Levels
        for (const item of items) {
            await supabaseAdmin.rpc('decrement_stock', {
                row_id: item.id,
                amount: item.quantity
            });
        }

        // 4. Send Confirmation Email
        await sendOrderEmail(order, items);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderId: order.id,
            orderNumber: order.order_number
        });

    } catch (err) {
        console.error('Order Error:', err);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

/**
 * GET ORDERS BY USER EMAIL
 * GET /api/orders/user/:email
 */
router.get('/user/:email', async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*, order_items(*)')
            .eq('email', req.params.email)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

/**
 * GET ORDER BY ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*, order_items(*)')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Order not found' });
    }
});

// Helper: Send Order Email
async function sendOrderEmail(order, items) {
    if (!process.env.RESEND_API_KEY) return;

    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                <div style="font-weight: bold; color: #1e3a8a;">${item.name}</div>
                <div style="font-size: 11px; color: #94a3b8;">Qty: ${item.quantity}</div>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: bold;">
                ৳${(item.price * item.quantity).toLocaleString()}
            </td>
        </tr>
    `).join('');

    try {
        await resend.emails.send({
            from: 'YellowLight Hub <orders@yellowlighthub.com>',
            to: order.email,
            subject: `Order Confirmed: #${order.order_number}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
                    <div style="background: #1e3a8a; padding: 40px; text-align: center; border-radius: 20px 20px 0 0;">
                        <h1 style="color: #eab308; margin: 0; font-size: 28px;">Order Confirmed!</h1>
                        <p style="color: #ffffff; margin-top: 10px; opacity: 0.8;">Thank you for shopping with YellowLight Hub.</p>
                    </div>
                    <div style="background: #ffffff; padding: 40px; border: 1px solid #f0f0f0; border-top: none; border-radius: 0 0 20px 20px;">
                        <div style="margin-bottom: 30px;">
                            <h2 style="font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Order Details</h2>
                            <p style="font-weight: bold; font-size: 18px; margin: 5px 0;">Order #${order.order_number}</p>
                            <p style="font-size: 12px; color: #64748b;">Placed on ${new Date().toLocaleDateString()}</p>
                        </div>

                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                            ${itemsHtml}
                            <tr>
                                <td style="padding: 20px 0 5px; font-weight: bold;">Subtotal</td>
                                <td style="padding: 20px 0 5px; text-align: right; font-weight: bold;">৳${order.subtotal.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px 0; color: #64748b;">Shipping</td>
                                <td style="padding: 5px 0; text-align: right; color: #64748b;">৳${order.shipping_cost.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 20px 0; font-size: 20px; font-weight: 800; color: #1e3a8a;">Total</td>
                                <td style="padding: 20px 0; text-align: right; font-size: 20px; font-weight: 800; color: #1e3a8a;">৳${order.total.toLocaleString()}</td>
                            </tr>
                        </table>

                        <div style="background: #f8fafc; padding: 25px; border-radius: 15px; margin-bottom: 30px;">
                            <h3 style="font-size: 12px; color: #94a3b8; text-transform: uppercase; margin: 0 0 10px;">Delivery Address</h3>
                            <p style="margin: 0; font-weight: bold; line-height: 1.5;">
                                ${order.fullName}<br/>
                                ${order.shipping_address.address}, ${order.shipping_address.district}<br/>
                                Phone: ${order.phone}
                            </p>
                        </div>

                        <div style="text-align: center; border-top: 1px solid #f0f0f0; padding-top: 30px;">
                            <p style="font-size: 12px; color: #94a3b8; font-style: italic;">YellowLight Hub - Bangladesh's Trusted Tech Store</p>
                        </div>
                    </div>
                </div>
            `
        });
    } catch (err) {
        console.error('Email error:', err);
    }
}

module.exports = router;
