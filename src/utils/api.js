/**
 * API utility layer — live n8n webhook integration
 */

const WEBHOOK_URLS = {
  seoAnalysis: 'https://automatewithraj1.app.n8n.cloud/webhook-test/seo-analysis',
  strategyCall: import.meta.env.VITE_STRATEGY_WEBHOOK_URL || '',
}

/**
 * Map the n8n workflow response (Calculate SEO Scores output) to the shape
 * that SEOModal ResultsStep consumes.
 *
 * n8n shape (wrapped in { status, message, data: { ... } }):
 *   overall_seo_score, top_competitors[], seo_insights, keyword_analysis,
 *   recommendations[], seo_score_details { score, explanation, strengths, weaknesses }
 */
function transformN8nResponse(raw) {
  // Support both { status, data } wrapper and direct payload
  const d = raw?.data ?? raw

  const score = d?.overall_seo_score ?? d?.seo_score_estimate?.score ?? 50

  const scoreLabel =
    score >= 80 ? 'Excellent'
    : score >= 65 ? 'Good'
    : score >= 45 ? 'Needs Improvement'
    : 'Critical'

  // top_competitors → [{name, visibility, isYou}]
  const competitors = (d?.top_competitors ?? []).map(c => ({
    name: c.name ?? 'Competitor',
    visibility: Math.round((c.relevance_score ?? 5) * 10),
    isYou: false,
  }))

  // weaknesses become issues
  const issues = d?.seo_score_details?.weaknesses
    ?? d?.seo_score_estimate?.weaknesses
    ?? []

  // keyword_analysis already has { keyword, difficulty, opportunity } from the JS node
  const ka = d?.keyword_analysis ?? {}
  const keywords = {
    highIntent: (ka.high_intent ?? []).map(k => ({
      keyword: k.keyword,
      difficulty: k.difficulty ?? 50,
      opportunity: k.opportunity ?? 50,
    })),
    local: (ka.local ?? []).map(k => ({
      keyword: k.keyword,
      difficulty: k.difficulty ?? 50,
      opportunity: k.opportunity ?? 50,
    })),
    longTail: (ka.long_tail ?? []).map(k => ({
      keyword: k.keyword,
      difficulty: k.difficulty ?? 50,
      opportunity: k.opportunity ?? 50,
    })),
  }

  return {
    seoScore: score,
    scoreLabel,
    competitors,
    issues,
    keywords,
    recommendations: d?.recommendations ?? [],
    seoScoreDetails: d?.seo_score_details ?? d?.seo_score_estimate ?? null,
    seoInsights: d?.seo_insights ?? null,
  }
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
  const raw = Array.isArray(data) ? data[0] : data

  // Map n8n workflow output → SEOModal display format
  const result = transformN8nResponse(raw)

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
