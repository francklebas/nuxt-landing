<template>
  <div class="page-shell">
    <NuxtRouteAnnouncer />

    <div class="ambient ambient-top" aria-hidden="true" />
    <div class="ambient ambient-bottom" aria-hidden="true" />

    <header class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
      <div class="flex items-center gap-3">
        <div class="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <span class="font-display text-xl font-bold">{ }</span>
        </div>
        <div>
          <p class="font-display text-lg font-semibold">CodePilot AI</p>
          <p class="text-xs uppercase tracking-[0.24em] text-white/60">Ship faster</p>
        </div>
      </div>

      <nav class="hidden items-center gap-8 text-sm text-white/75 md:flex">
        <a href="#features" class="transition hover:text-white">{{ t('nav.features') }}</a>
        <a href="#pricing" class="transition hover:text-white">{{ t('nav.pricing') }}</a>
        <a href="#cta" class="transition hover:text-white">{{ t('nav.getStarted') }}</a>
      </nav>

      <div class="flex items-center gap-2 rounded-full bg-white/10 p-1 ring-1 ring-white/20 backdrop-blur">
        <button
          v-for="choice in localeChoices"
          :key="choice"
          type="button"
          class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition"
          :class="locale === choice ? 'bg-white text-slate-900' : 'text-white/70 hover:text-white'"
          @click="setLocale(choice)"
        >
          {{ choice }}
        </button>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl px-6 pb-16 md:px-10 md:pb-24">
      <section class="grid gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:grid-cols-2 md:p-12">
        <div class="space-y-8">
          <span class="inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
            {{ t('hero.badge') }}
          </span>

          <div class="space-y-5">
            <h1 class="font-display text-4xl font-bold leading-tight md:text-6xl">
              {{ t('hero.title') }}
            </h1>
            <p class="max-w-xl text-base text-white/80 md:text-lg">
              {{ t('hero.subtitle') }}
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <button type="button" class="btn-primary" @click="scrollToPricing">
              {{ t('hero.primaryCta') }}
            </button>
            <a href="#features" class="btn-secondary">
              {{ t('hero.secondaryCta') }}
            </a>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div v-for="item in heroStats" :key="item.label" class="stat-card">
              <p class="font-display text-2xl font-semibold">{{ item.value }}</p>
              <p class="text-xs uppercase tracking-[0.16em] text-white/65">{{ item.label }}</p>
            </div>
          </div>
        </div>

        <div class="relative flex items-center justify-center">
          <img
            src="/images/ai-hero.svg"
            alt="AI generated coding dashboard concept"
            class="hero-image"
            loading="lazy"
          >
          <div class="floating-chip left-4 top-6">
            <p class="text-xs uppercase tracking-widest text-cyan-200">AI Pair Mode</p>
            <p class="font-semibold">{{ t('hero.chipOne') }}</p>
          </div>
          <div class="floating-chip -bottom-4 right-6">
            <p class="text-xs uppercase tracking-widest text-cyan-200">Live Diff</p>
            <p class="font-semibold">{{ t('hero.chipTwo') }}</p>
          </div>
        </div>
      </section>

      <section id="features" class="mt-20 space-y-8">
        <div class="space-y-3 text-center">
          <p class="text-xs uppercase tracking-[0.28em] text-cyan-200/80">{{ t('features.kicker') }}</p>
          <h2 class="font-display text-3xl font-semibold md:text-5xl">{{ t('features.title') }}</h2>
          <p class="mx-auto max-w-3xl text-white/75">{{ t('features.subtitle') }}</p>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <article v-for="feature in featureCards" :key="feature.title" class="feature-card">
            <img :src="feature.image" :alt="feature.title" class="feature-image" loading="lazy">
            <h3 class="font-display mt-5 text-2xl font-semibold">{{ feature.title }}</h3>
            <p class="mt-3 text-sm text-white/75">{{ feature.description }}</p>
          </article>
        </div>
      </section>

      <section id="pricing" class="mt-20 rounded-3xl border border-white/10 bg-slate-900/45 p-6 backdrop-blur md:p-10">
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.28em] text-cyan-200/80">{{ t('pricing.kicker') }}</p>
            <h2 class="font-display mt-2 text-3xl font-semibold md:text-5xl">{{ t('pricing.title') }}</h2>
            <p class="mt-3 max-w-2xl text-white/75">{{ t('pricing.subtitle') }}</p>
          </div>

          <div class="inline-flex rounded-full border border-white/20 bg-white/5 p-1">
            <button
              type="button"
              class="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition"
              :class="billingCycle === 'monthly' ? 'bg-white text-slate-900' : 'text-white/70'"
              @click="pricingStore.setBillingCycle('monthly')"
            >
              {{ t('pricing.monthly') }}
            </button>
            <button
              type="button"
              class="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition"
              :class="billingCycle === 'yearly' ? 'bg-white text-slate-900' : 'text-white/70'"
              @click="pricingStore.setBillingCycle('yearly')"
            >
              {{ t('pricing.yearly') }}
            </button>
          </div>
        </div>

        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <article
            v-for="tier in pricingStore.tiers"
            :key="tier.id"
            class="pricing-card"
            :class="{ 'pricing-card-featured': tier.highlighted }"
          >
            <p class="text-xs uppercase tracking-[0.2em] text-cyan-100/90">{{ t(`pricing.tiers.${tier.id}.label`) }}</p>
            <h3 class="font-display mt-3 text-2xl font-semibold">{{ t(`pricing.tiers.${tier.id}.name`) }}</h3>
            <p class="mt-3 text-sm text-white/75">{{ t(`pricing.tiers.${tier.id}.description`) }}</p>
            <p class="mt-6 font-display text-4xl font-semibold">
              {{ formatPrice(tier.prices[billingCycle]) }}
              <span class="text-base font-medium text-white/60">/{{ t(`pricing.${billingCycle}Short`) }}</span>
            </p>

            <ul class="mt-6 space-y-2 text-sm text-white/80">
              <li v-for="feature in tierFeatures(tier.id)" :key="feature" class="flex items-center gap-2">
                <span class="text-cyan-200">+</span>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <button
              type="button"
              class="mt-8 w-full rounded-xl border border-cyan-200/40 bg-cyan-300/20 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-70"
              :disabled="checkoutLoading"
              @click="checkoutTier(tier.id)"
            >
              {{ checkoutLoading && selectedTierId === tier.id ? t('pricing.processing') : t('pricing.cta') }}
            </button>
          </article>
        </div>

        <p v-if="checkoutError" class="mt-4 text-sm text-rose-300">{{ checkoutError }}</p>
      </section>

      <section id="cta" class="mt-20 rounded-3xl border border-cyan-100/20 bg-cyan-200/10 p-6 md:p-10">
        <div class="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 class="font-display text-3xl font-semibold md:text-5xl">{{ t('cta.title') }}</h2>
            <p class="mt-4 max-w-xl text-white/80">{{ t('cta.subtitle') }}</p>
          </div>

          <form class="space-y-3" @submit.prevent="joinWaitlist">
            <label class="text-sm text-white/70" for="email">{{ t('cta.label') }}</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full rounded-xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white outline-none ring-cyan-200 transition focus:ring"
              :placeholder="t('cta.placeholder')"
            >
            <button type="submit" class="btn-primary w-full" :disabled="waitlistLoading">
              {{ waitlistLoading ? t('cta.loading') : t('cta.button') }}
            </button>
            <p v-if="waitlistMessage" class="text-sm text-cyan-100">{{ waitlistMessage }}</p>
          </form>
        </div>
      </section>
    </main>

    <footer class="mx-auto w-full max-w-6xl border-t border-white/10 px-6 py-8 text-sm text-white/60 md:px-10">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>{{ t('footer.copy') }}</p>
        <p>{{ t('footer.tagline') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePricingStore } from '~/stores/pricing'

const { t, tm, rt, locale, setLocale } = useI18n()
const pricingStore = usePricingStore()
const route = useRoute()
const { billingCycle } = storeToRefs(pricingStore)
const { startCheckout, loading: checkoutLoading, error: checkoutError, selectedTierId } = useStripeCheckout()
const config = useRuntimeConfig()

const localeChoices = ['fr', 'en']
const email = ref('')
const waitlistLoading = ref(false)
const waitlistMessage = ref('')
const hasSupabaseConfig = computed(() => Boolean(config.public.supabase.url && config.public.supabase.key))

const syncLocaleFromPath = async () => {
  const targetLocale = route.path.startsWith('/en') ? 'en' : 'fr'
  if (locale.value !== targetLocale) {
    await setLocale(targetLocale)
  }
}

await syncLocaleFromPath()

watch(
  () => route.path,
  () => {
    void syncLocaleFromPath()
  }
)

const heroStats = computed(() => [
  { value: '12k+', label: t('hero.stats.projects') },
  { value: '96%', label: t('hero.stats.delivery') },
  { value: '3.4x', label: t('hero.stats.speed') }
])

const featureCards = computed(() => [
  {
    title: t('features.cards.agents.title'),
    description: t('features.cards.agents.description'),
    image: '/images/ai-agents.svg'
  },
  {
    title: t('features.cards.context.title'),
    description: t('features.cards.context.description'),
    image: '/images/ai-context.svg'
  },
  {
    title: t('features.cards.deploy.title'),
    description: t('features.cards.deploy.description'),
    image: '/images/ai-deploy.svg'
  }
])

const formatPrice = (amount: number) =>
  new Intl.NumberFormat(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount)

const checkoutTier = async (tierId: string) => {
  await startCheckout(tierId, billingCycle.value, locale.value)
}

const tierFeatures = (tierId: string) => {
  const messages = tm(`pricing.tiers.${tierId}.features`) as unknown[]
  return messages.map((message) => rt(message))
}

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}

const joinWaitlist = async () => {
  waitlistMessage.value = ''
  waitlistLoading.value = true

  if (!hasSupabaseConfig.value) {
    waitlistMessage.value = t('cta.error')
    waitlistLoading.value = false
    return
  }

  try {
    const supabase = useSupabaseClient()
    const { error } = await supabase.from('waitlist').insert({
      email: email.value,
      locale: locale.value
    })

    if (error) {
      waitlistMessage.value = t('cta.error')
      return
    }

    waitlistMessage.value = t('cta.success')
    email.value = ''
  } catch {
    waitlistMessage.value = t('cta.error')
  } finally {
    waitlistLoading.value = false
  }
}
</script>
