import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<{ priceId?: string; locale?: string }>(event)

  if (!body.priceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Stripe priceId'
    })
  }

  if (!config.stripeSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing STRIPE_SECRET_KEY'
    })
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2025-02-24.acacia'
  })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: body.priceId, quantity: 1 }],
    locale: body.locale === 'fr' ? 'fr' : 'en',
    success_url: `${config.public.siteUrl}/?checkout=success`,
    cancel_url: `${config.public.siteUrl}/?checkout=cancelled`
  })

  return {
    sessionId: session.id,
    url: session.url
  }
})
