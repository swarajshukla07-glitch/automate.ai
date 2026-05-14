/**
 * API utility layer — live n8n webhook integration
 */

const WEBHOOK_URLS = {
  seoAnalysis: 'https://adlyst.app.n8n.cloud/webhook-test/seo-analysis',
  strategyCall: import.meta.env.VITE_STRATEGY_WEBHOOK_URL || '',
}

/**
 * Submit SEO Analysis form to n8n
 *
 * Expected n8n response shape:
 * {
 *   seoScore: 64,
 *   scoreLabel: "Needs Improvement",
 *   competitors: [{ name: "Competitor A", visibility: 91 }],
 *   issues: ["Weak local visibility", "Missing schema markup"],
 *   keywords: {
 *     highIntent: [{ keyword: "plumber near me", difficulty: 42, opportunity: 91 }],
 *     local:      [{ keyword: "plumber delhi", difficulty: 28, opportunity: 94 }],
 *     longTail:   [{ keyword: "affordable plumber", difficulty: 18, opportunity: 96 }]
 *   },
 *   recommendations: ["Add schema markup", "Improve local citations"]
 * }
 */
export async function submitSEOAnalysis(formData) {
  const payload = {
    type: 'seo_analysis_request',
    timestamp: new Date().toISOString(),
    source: 'website_hero_cta',
    name: formData.name,
    businessName: formData.businessName,
    website: formData.website,
    email: formData.email,
    phone: formData.phone || '',
    googleBusinessProfile: formData.googleBusinessProfile || '',
  }

  console.log('[NexusAI] Sending to n8n:', payload)

  const response = await fetch(WEBHOOK_URLS.seoAnalysis, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`n8n webhook error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  console.log('[NexusAI] n8n response:', data)

  // n8n sometimes wraps response in an array
  const result = Array.isArray(data) ? data[0] : data

  return { success: true, data: result }
}

/**
 * Submit Strategy Call booking form
 */
export async function submitStrategyCall(formData) {
  const payload = {
    type: 'strategy_call_booking',
    timestamp: new Date().toISOString(),
    name: formData.name,
    email: formData.email,
    businessType: formData.businessType,
    monthlyRevenue: formData.monthlyRevenue,
    biggestChallenge: formData.biggestChallenge,
    preferredCallTime: formData.preferredCallTime,
    services: formData.services || [],
  }

  if (WEBHOOK_URLS.strategyCall) {
    const response = await fetch(WEBHOOK_URLS.strategyCall, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Strategy call submission failed')
  } else {
    await new Promise(resolve => setTimeout(resolve, 1200))
  }

  console.log('[NexusAI] Strategy call submitted:', payload)
  return { success: true }
}

export default { submitSEOAnalysis, submitStrategyCall }
