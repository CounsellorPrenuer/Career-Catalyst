import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
    RAZORPAY_KEY_ID: string
    RAZORPAY_KEY_SECRET: string
    RAZORPAY_WEBHOOK_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors())

app.get('/', (c) => c.text('Mentoria Payment Worker Active'))

app.post('/create-order', async (c) => {
    try {
        const { amount, currency = 'INR', receipt, notes } = await c.req.json()

        if (!amount) {
            return c.json({ error: 'Amount is required' }, 400)
        }

        const options = {
            amount: amount * 100, // Razorpay takes amount in paise
            currency,
            receipt,
            notes,
        }

        const key = c.env.RAZORPAY_KEY_ID
        const secret = c.env.RAZORPAY_KEY_SECRET
        const auth = btoa(`${key}:${secret}`)

        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(options)
        })

        const data = await response.json()

        if (!response.ok) {
            return c.json({ error: 'Razorpay Error', details: data }, response.status)
        }

        return c.json({
            id: data.id,
            currency: data.currency,
            amount: data.amount,
            key_id: key // Send back key_id so frontend doesn't need to hardcode it
        })

    } catch (err: any) {
        return c.json({ error: err.message }, 500)
    }
})

app.post('/verify-payment', async (c) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await c.req.json()

        const secret = c.env.RAZORPAY_KEY_SECRET

        // Validation logic
        const text = razorpay_order_id + "|" + razorpay_payment_id

        // Crypto API available in Workers
        const encoder = new TextEncoder()
        const keyData = encoder.encode(secret)
        const msgData = encoder.encode(text)

        const cryptoKey = await crypto.subtle.importKey(
            'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        )
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData)

        // Convert array buffer to hex string
        const hashArray = Array.from(new Uint8Array(signature));
        const generated_signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (generated_signature === razorpay_signature) {
            return c.json({ status: 'success', valid: true })
        } else {
            return c.json({ status: 'failure', valid: false }, 400)
        }

    } catch (err: any) {
        return c.json({ error: err.message }, 500)
    }
})

// POST callback for Razorpay full-page redirect checkout
app.post('/payment-callback', async (c) => {
    try {
        const formData = await c.req.parseBody()
        const razorpay_order_id = formData['razorpay_order_id'] as string
        const razorpay_payment_id = formData['razorpay_payment_id'] as string
        const razorpay_signature = formData['razorpay_signature'] as string

        const secret = c.env.RAZORPAY_KEY_SECRET
        const siteUrl = 'https://counsellorprenuer.github.io/Career-Catalyst'

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return c.redirect(`${siteUrl}/#/pricing?payment=failed&reason=missing_params`)
        }

        // Verify signature
        const text = razorpay_order_id + "|" + razorpay_payment_id
        const encoder = new TextEncoder()
        const keyData = encoder.encode(secret)
        const msgData = encoder.encode(text)

        const cryptoKey = await crypto.subtle.importKey(
            'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        )
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
        const hashArray = Array.from(new Uint8Array(signature))
        const generated_signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        if (generated_signature === razorpay_signature) {
            return c.redirect(`${siteUrl}/#/pricing?payment=success&payment_id=${razorpay_payment_id}&order_id=${razorpay_order_id}`)
        } else {
            return c.redirect(`${siteUrl}/#/pricing?payment=failed&reason=signature_mismatch`)
        }
    } catch (err: any) {
        const siteUrl = 'https://counsellorprenuer.github.io/Career-Catalyst'
        return c.redirect(`${siteUrl}/#/pricing?payment=failed&reason=server_error`)
    }
})

export default app
