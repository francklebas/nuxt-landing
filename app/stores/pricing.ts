import { defineStore } from 'pinia'

type BillingCycle = 'monthly' | 'yearly'

type PricingTier = {
  id: 'starter' | 'pro' | 'enterprise'
  highlighted: boolean
  prices: Record<BillingCycle, number>
  stripePriceIds: Record<BillingCycle, string>
}

export const usePricingStore = defineStore('pricing', {
  state: () => ({
    billingCycle: 'monthly' as BillingCycle,
    tiers: [
      {
        id: 'starter',
        highlighted: false,
        prices: { monthly: 19, yearly: 15 },
        stripePriceIds: {
          monthly: 'price_starter_monthly',
          yearly: 'price_starter_yearly'
        }
      },
      {
        id: 'pro',
        highlighted: true,
        prices: { monthly: 49, yearly: 39 },
        stripePriceIds: {
          monthly: 'price_pro_monthly',
          yearly: 'price_pro_yearly'
        }
      },
      {
        id: 'enterprise',
        highlighted: false,
        prices: { monthly: 129, yearly: 109 },
        stripePriceIds: {
          monthly: 'price_enterprise_monthly',
          yearly: 'price_enterprise_yearly'
        }
      }
    ] as PricingTier[]
  }),
  actions: {
    setBillingCycle(cycle: BillingCycle) {
      this.billingCycle = cycle
    },
    getTierById(tierId: string) {
      return this.tiers.find((tier) => tier.id === tierId)
    }
  }
})
