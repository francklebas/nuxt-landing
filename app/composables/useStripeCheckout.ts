import { loadStripe } from '@stripe/stripe-js'
import { usePricingStore } from '~/stores/pricing'

type BillingCycle = 'monthly' | 'yearly'

export const useStripeCheckout = () => {
  const pricingStore = usePricingStore()
  const config = useRuntimeConfig()

  const loading = ref(false)
  const error = ref('')
  const selectedTierId = ref('')

  const startCheckout = async (tierId: string, billingCycle: BillingCycle, locale: string) => {
    loading.value = true
    error.value = ''
    selectedTierId.value = tierId

    try {
      const tier = pricingStore.getTierById(tierId)

      if (!tier) {
        throw new Error('Tier not found')
      }

      if (!config.public.stripePublishableKey) {
        throw new Error('Missing Stripe publishable key')
      }

      const stripe = await loadStripe(String(config.public.stripePublishableKey))

      if (!stripe) {
        throw new Error('Stripe could not initialize')
      }

      const response = await $fetch<{ url?: string }>('/api/stripe/checkout', {
        method: 'POST',
        body: {
          priceId: tier.stripePriceIds[billingCycle],
          locale
        }
      })

      if (!response.url) {
        throw new Error('Stripe checkout URL is missing')
      }

      await navigateTo(response.url, { external: true })
    } catch (caughtError) {
      error.value = caughtError instanceof Error ? caughtError.message : 'Checkout error'
    } finally {
      loading.value = false
    }
  }

  return {
    startCheckout,
    loading,
    error,
    selectedTierId
  }
}
