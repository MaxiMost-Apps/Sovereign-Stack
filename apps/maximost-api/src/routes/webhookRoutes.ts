import { Hono } from 'hono';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

const webhookRoutes = new Hono();

// Initialize Stripe
// @ts-ignore: Version mismatch with types, ignoring to use latest known or fallback
const stripe = new Stripe(config.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-12-18.acacia' as any, // Forcing known good version or ignoring TS check
});

webhookRoutes.post('/stripe', async (c) => {
    const signature = c.req.header('stripe-signature');

    if (!signature || !config.STRIPE_WEBHOOK_SECRET) {
        return c.json({ error: 'Missing signature or webhook secret' }, 400);
    }

    let event: Stripe.Event;

    try {
        // Hono's text() method consumes the stream, but that's what we want for signature verification
        // We use clone() if we needed it later, but here we just need the raw text
        const body = await c.req.raw.clone().text();
        event = stripe.webhooks.constructEvent(body, signature, config.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        console.error(`⚠️  Webhook signature verification failed.`, err.message);
        return c.json({ error: 'Webhook signature verification failed' }, 400);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            await handleCheckoutSessionCompleted(session);
            break;
        default:
            // Unhandled event type
            console.log(`Unhandled event type ${event.type}`);
    }

    return c.json({ received: true });
});

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const userId = session.client_reference_id;
    // Retrieve the line items to find the price/product
    // Or if we passed the price_id in metadata, that works too.
    // Usually, we check line_items or the mode/setup.
    // For simplicity, let's assume one main product per checkout or use session.metadata if setup that way.
    // Better: Retrieve the session with line_items expanded if needed, but often checking metadata is easier.
    // Assumption: The backend logic creating the checkout session puts the Tier in metadata or we check the price ID.

    // User logic: "Map Stripe Product IDs to these tiers."
    // Since we don't have the line items in the basic session object reliably without expansion,
    // we'll rely on the standard Stripe behavior or assume 'price_id' logic if available.
    // However, the session object itself doesn't strictly contain the Price ID at the top level.
    // We will attempt to use metadata if available, or fetch line items.

    // For this sprint, let's assume we can map based on an assumption or fetch line items.
    // Let's fetch line items to be safe.

    if (!userId) {
        console.error('No client_reference_id found in session');
        return;
    }

    try {
        // We need to fetch the session again with line_items expanded to be sure,
        // OR simpler: just trust the implementation will use metadata.
        // Let's go with fetching line items for robustness.
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const priceId = lineItems.data[0]?.price?.id;

        let newTier = 'initiate';
        let isVanguard = false;

        // Determine Tier based on Price ID (Assuming config holds these IDs)
        // Note: Prices: Monthly $14.99, Yearly $149.99, Vanguard $199, Sovereign $499
        if (priceId === config.STRIPE_PRICE_ID_MONTHLY || priceId === config.STRIPE_PRICE_ID_YEARLY) {
            newTier = 'operator';
        } else if (priceId === config.STRIPE_PRICE_ID_VANGUARD) {
            newTier = 'vanguard';
            isVanguard = true;
        } else if (priceId === config.STRIPE_PRICE_ID_SOVEREIGN) {
            newTier = 'sovereign'; // Anchor/Whale Tier
            isVanguard = true; // Sovereign Elite includes Vanguard benefits
        }

        if (newTier !== 'initiate') {
             const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

             const updateData: any = { membership_tier: newTier };
             if (isVanguard) {
                 updateData.is_vanguard = true;
             }

             const { error } = await supabase
                .from('profiles')
                .update(updateData)
                .eq('id', userId);

             if (error) {
                 console.error('Error updating membership tier:', error);
             } else {
                 console.log(`Updated user ${userId} to tier ${newTier}`);

                 // Scholarship Logic for Vanguard and Sovereign ($199 or $499)
                 if (isVanguard) {
                     // Create a scholarship row
                     const { error: scholarError } = await supabase.from('scholarships').insert({
                         status: 'available',
                         source_purchase_id: session.id,
                         sponsor_id: userId, // Optional, linking back to purchaser
                         // granted_to_user_id will be filled when assigned
                     });

                     if (scholarError) console.error('Error creating scholarship:', scholarError);
                 }
             }
        }

    } catch (error) {
        console.error('Error processing checkout session:', error);
    }
}

// POST /api/webhooks/sentry - Nerve Center: Forward Critical Errors
webhookRoutes.post('/sentry', async (c) => {
    // 1. Authenticate Source (SENTRY_SECRET Handshake)
    const secret = c.req.header('SENTRY_SECRET');
    if (!secret || secret !== config.SENTRY_WEBHOOK_SECRET) {
        return c.json({ error: 'Unauthorized: Invalid Sentry Secret' }, 401);
    }

    // 2. Parse Payload
    let payload;
    try {
        payload = await c.req.json();
    } catch (e) {
        return c.json({ error: 'Invalid JSON' }, 400);
    }

    const { level, message, event_id, platform } = payload;

    // Filter: Only care about 'error' or 'fatal' (or 'critical' as requested)
    // Sentry levels: fatal, error, warning, info, debug
    if (level === 'error' || level === 'fatal' || level === 'critical') {
        const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

        const { error } = await supabase
            .from('system_events')
            .insert({
                type: 'sentry_alert',
                payload: payload,
                severity: level,
                source: 'sentry'
            });

        if (error) {
            console.error('Failed to log Sentry event to Nerve Center:', error);
            // Don't fail the webhook response, Sentry doesn't care.
        } else {
            console.log(`logged Sentry ${level} event: ${event_id}`);
        }
    }

    return c.json({ received: true });
});

export default webhookRoutes;
