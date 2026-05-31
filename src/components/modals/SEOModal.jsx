import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, AlertTriangle, ChevronRight, Lock, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitSEOAnalysis } from '../../utils/api'

const scanMessages = [
  'Connecting to AI analysis engine...',
  'Scanning competitor landscape...',
  'Analyzing search visibility...',
  'Detecting keyword opportunities...',
  'Evaluating local authority signals...',
  'Calculating overall SEO score...',
  'Mapping automation gaps...',
  'Generating AI recommendations...',
  'Finalizing your audit report...',
]

const initialForm = {
  name: '',
  businessName: '',
  website: '',
  email: '',
  phone: '',
  googleBusinessProfile: '',
}

function validate(form) {
  if (!form.name.trim()) return 'Please enter your name.'
  if (!form.businessName.trim()) return 'Please enter your business name.'
  if (!form.website.trim()) return 'Please enter your website URL.'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    return 'Please enter a valid email.'
  return null
}

// ── STEP 1: Form ──────────────────────────────────────────────
function FormStep({ form, setForm, onSubmit, loading }) {
  const fields = [
    { key: 'name',                  label: 'Your Name',                   placeholder: 'John Smith',               required: true,  type: 'text'  },
    { key: 'businessName',          label: 'Business Name',               placeholder: 'Apex Services LLC',         required: true,  type: 'text'  },
    { key: 'website',               label: 'Website URL',                 placeholder: 'https://yourwebsite.com',   required: true,  type: 'text'  },
    { key: 'email',                 label: 'Email Address',               placeholder: 'john@business.com',         required: true,  type: 'email' },
    { key: 'phone',                 label: 'Phone Number',                placeholder: '+1 (555) 000-0000',         required: false, type: 'tel'   },
    { key: 'googleBusinessProfile', label: 'Google Business Profile Link',placeholder: 'maps.google.com/...',       required: false, type: 'text'  },
  ]

  const focus = e => { e.target.style.borderColor = 'rgba(14,165,233,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)' }
  const blur  = e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {fields.map(({ key, label, placeholder, required, type }) => (
          <div key={key} className={key === 'googleBusinessProfile' || key === 'website' ? 'sm:col-span-2' : ''}>
            <label className="block text-xs font-body font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
              type={type}
              value={form[key]}
              onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl text-sm font-body text-white placeholder-slate-600 outline-none transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onFocus={focus} onBlur={blur}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="btn-primary w-full justify-center text-base py-4"
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading
          ? <><span className="spinner border-2 border-white/30 border-t-white rounded-full w-4 h-4" />Submitting...</>
          : <><Zap size={18} />Analyze My Business</>}
      </button>
      <p className="text-xs text-slate-600 text-center mt-3 font-body">
        Free analysis — no credit card required.
      </p>
    </div>
  )
}

// ── STEP 2: Loading ───────────────────────────────────────────
function LoadingStep({ progress, msgIndex }) {
  return (
    <div className="text-center py-8">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="34" fill="none"
            stroke="url(#loadGrad)" strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.136} 213.6`}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dasharray 0.3s ease' }}
          />
          <defs>
            <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-black text-base grad-text">{Math.round(progress)}%</span>
        </div>
      </div>

      <h3 className="font-display font-bold text-lg text-white mb-2">AI Analyzing Your Business</h3>
      <p className="font-body text-sm text-slate-400 mb-6 h-5">{scanMessages[msgIndex] || 'Processing...'}</p>

      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {[
          { label: 'Competitors Scanned', val: Math.floor(progress / 4) },
          { label: 'Keywords Found',      val: Math.floor(progress * 0.47) },
        ].map(({ label, val }) => (
          <div key={label} className="p-3 rounded-xl text-center"
            style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.15)' }}>
            <div className="font-display font-black text-lg grad-text">{val}</div>
            <div className="text-xs text-slate-500 font-body">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── STEP 3: Results (driven by n8n data) ──────────────────────
function ResultsStep({ bizName, seoData, onSwitchToStrategy }) {
  // Pull from n8n response with sensible fallbacks
  const score           = seoData?.seoScore       ?? 64
  const scoreLabel      = seoData?.scoreLabel      ?? 'Needs Improvement'
  const competitors     = seoData?.competitors     ?? [
    { name: bizName || 'Your Business', visibility: score, isYou: true },
    { name: 'Competitor A',             visibility: 91 },
    { name: 'Competitor B',             visibility: 78 },
  ]
  const issues          = seoData?.issues?.length
    ? seoData.issues
    : [
        'Weak local search visibility signals',
        'Missing schema markup',
        'Low domain authority vs. competitors',
        'Poor keyword targeting on key pages',
        'Lead response time exceeds 4 hours',
      ]
  const keywords        = seoData?.keywords        ?? {}
  const highIntent      = keywords.highIntent?.length ? keywords.highIntent : [{ keyword: '[service] near me',    difficulty: 42, opportunity: 91 }]
  const local           = keywords.local?.length      ? keywords.local      : [{ keyword: 'best [service] [city]', difficulty: 51, opportunity: 87 }]
  const longTail        = keywords.longTail?.length   ? keywords.longTail   : [{ keyword: '[service] for [niche]', difficulty: 22, opportunity: 89 }]
  const recommendations = seoData?.recommendations ?? []
  const scoreDetails    = seoData?.seoScoreDetails ?? null

  // Score color
  const scoreColor = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  const circumference = 2 * Math.PI * 60
  const dashArray = `${(score / 100) * circumference} ${circumference}`

  return (
    <div>
      {/* ── Score ring ── */}
      <div className="text-center mb-6">
        <div className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: '#38bdf8' }}>
          AI SEO Score
        </div>
        <div className="relative w-36 h-36 mx-auto mb-3">
          <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
            <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
            <circle
              cx="70" cy="70" r="60" fill="none"
              stroke="url(#resGrad)" strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={dashArray}
            />
            <defs>
              <linearGradient id="resGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-black text-4xl grad-text">{score}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: score >= 75 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            border:     score >= 75 ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(239,68,68,0.25)',
            color:      scoreColor,
          }}>
          {score >= 75 ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
          {scoreLabel}
        </div>
      </div>

      {/* ── Score explanation ── */}
      {scoreDetails?.explanation && (
        <div className="mb-4 px-4 py-3 rounded-xl text-xs text-slate-400 font-body"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {scoreDetails.explanation}
        </div>
      )}

      {/* ── Competitor comparison ── */}
      <div className="p-4 rounded-xl mb-4"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-xs font-display font-bold uppercase tracking-widest mb-3" style={{ color: '#38bdf8' }}>
          Competitor Visibility
        </div>
        {[{ name: bizName || 'Your Business', visibility: score, isYou: true }, ...competitors.filter(c => !c.isYou)].map(({ name, visibility, isYou }) => (
          <div key={name} className="flex items-center gap-3 mb-2">
            <span className="text-xs w-28 flex-shrink-0"
              style={{ color: isYou ? '#38bdf8' : '#64748b', fontWeight: isYou ? 700 : 400 }}>
              {name}
            </span>
            <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: isYou ? 'linear-gradient(90deg,#0ea5e9,#a855f7)' : 'linear-gradient(90deg,#475569,#334155)' }}
                initial={{ width: 0 }}
                animate={{ width: `${visibility}%` }}
                transition={{ duration: 1 }} />
            </div>
            <span className="text-xs font-semibold w-8 text-right"
              style={{ color: isYou ? '#38bdf8' : '#64748b' }}>
              {visibility}%
            </span>
          </div>
        ))}
      </div>

      {/* ── Issues ── */}
      {issues.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-display font-bold uppercase tracking-widest text-red-400 mb-2">
            ⚠ Issues Detected
          </div>
          <div className="space-y-1.5">
            {issues.map((issue, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-body text-red-300"
                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}>
                <AlertTriangle size={11} className="flex-shrink-0" />
                {issue}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Keywords ── */}
      <div className="mb-4">
        <div className="text-xs font-display font-bold uppercase tracking-widest mb-2" style={{ color: '#38bdf8' }}>
          Keyword Opportunities
        </div>
        <div className="grid grid-cols-1 gap-2">
          {highIntent.length > 0 && (
            <div>
              <div className="text-xs text-slate-500 mb-1.5 font-semibold">High Intent</div>
              {highIntent.map(({ keyword, difficulty, opportunity }, i) => (
                <div key={i} className="p-2.5 rounded-lg mb-1.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-xs font-semibold text-white mb-1.5">{keyword}</div>
                  <div className="flex gap-1.5">
                    <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
                      Difficulty: {difficulty}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      Opportunity: {opportunity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {local.length > 0 && (
            <div>
              <div className="text-xs text-slate-500 mb-1.5 font-semibold">Local Search</div>
              {local.map(({ keyword, difficulty, opportunity }, i) => (
                <div key={i} className="p-2.5 rounded-lg mb-1.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-xs font-semibold text-white mb-1.5">{keyword}</div>
                  <div className="flex gap-1.5">
                    <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
                      Difficulty: {difficulty}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      Opportunity: {opportunity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {longTail.length > 0 && (
            <div className="relative">
              <div className="text-xs text-slate-500 mb-1.5 font-semibold">Long-Tail Opportunities</div>
              <div style={{ filter: 'blur(4px)', pointerEvents: 'none', opacity: 0.5 }}>
                {longTail.map(({ keyword, difficulty, opportunity }, i) => (
                  <div key={i} className="p-2.5 rounded-lg mb-1.5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="text-xs font-semibold text-white mb-1.5">{keyword}</div>
                    <div className="flex gap-1.5">
                      <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                        style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
                        Difficulty: {difficulty}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                        Opportunity: {opportunity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl py-3"
                style={{ background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(6px)', border: '1px solid rgba(14,165,233,0.2)' }}>
                <Lock size={14} className="text-blue-light mb-1" />
                <p className="text-xs text-slate-400 text-center">Full keyword list locked — book a call to unlock</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── AI Recommendations ── */}
      {recommendations.length > 0 && (
        <div className="mb-5">
          <div className="text-xs font-display font-bold uppercase tracking-widest mb-2" style={{ color: '#10b981' }}>
            AI Recommendations
          </div>
          <div className="space-y-1.5">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg text-xs font-body text-slate-300"
                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <CheckCircle size={11} className="text-green-neon flex-shrink-0 mt-0.5" />
                {rec}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Post-audit CTA ── */}
      <div className="p-5 rounded-xl text-center"
        style={{ background: 'linear-gradient(135deg,rgba(14,165,233,0.08),rgba(168,85,247,0.08))', border: '1px solid rgba(14,165,233,0.2)' }}>
        <div className="font-display font-bold text-base text-white mb-2">
          Want Us To Fix All of This For You?
        </div>
        <p className="font-body text-xs text-slate-400 mb-4">
          Book a free 30-min strategy call. We will present a custom AI growth plan for your business.
        </p>
        <button onClick={onSwitchToStrategy} className="btn-primary w-full justify-center">
          Book Strategy Call - Free <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ── MAIN MODAL ────────────────────────────────────────────────
export default function SEOModal({ onClose, onSwitchToStrategy }) {
  const [step,     setStep]     = useState('form')
  const [form,     setForm]     = useState(initialForm)
  const [loading,  setLoading]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [seoData,  setSeoData]  = useState(null)

  const handleSubmit = async () => {
    const err = validate(form)
    if (err) { toast.error(err); return }

    setLoading(true)
    setStep('loading')
    setProgress(0)
    setMsgIndex(0)

    let prog = 0
    let msg  = 0
    const progInterval = setInterval(() => {
      prog = Math.min(prog + 0.8, 90)
      setProgress(prog)
    }, 40)
    const msgInterval = setInterval(() => {
      msg = Math.min(msg + 1, scanMessages.length - 1)
      setMsgIndex(msg)
    }, 600)

    try {
      const result = await submitSEOAnalysis(form)
      clearInterval(progInterval)
      clearInterval(msgInterval)
      setProgress(100)
      setSeoData(result.data)
      setTimeout(() => { setStep('results'); setLoading(false) }, 500)
    } catch (err) {
      clearInterval(progInterval)
      clearInterval(msgInterval)
      console.error('[NexusAI] n8n error:', err)
      toast.error('Analysis failed. Please check your n8n webhook and try again.')
      setStep('form')
      setLoading(false)
      setProgress(0)
    }
  }

  const titles = {
    form:    { title: 'Free AI SEO Audit',         sub: 'Enterprise-grade AI analysis in 60 seconds' },
    loading: { title: 'AI Analyzing Your Business', sub: 'Running 9-point SEO intelligence scan...'   },
    results: { title: 'Your AI SEO Report',         sub: `Audit complete for ${form.businessName || 'your business'}` },
  }
  const { title, sub } = titles[step]

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: '#070e1e', border: '1px solid rgba(14,165,233,0.2)', boxShadow: '0 0 80px rgba(14,165,233,0.12)' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between px-6 py-5 rounded-t-2xl"
          style={{ background: '#070e1e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h2 className="font-display font-bold text-lg text-white">{title}</h2>
            <p className="font-body text-xs text-slate-500 mt-0.5">{sub}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ml-4 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <X size={14} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            {step === 'form' && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FormStep form={form} setForm={setForm} onSubmit={handleSubmit} loading={loading} />
              </motion.div>
            )}
            {step === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LoadingStep progress={progress} msgIndex={msgIndex} />
              </motion.div>
            )}
            {step === 'results' && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ResultsStep
                  bizName={form.businessName}
                  seoData={seoData}
                  onSwitchToStrategy={onSwitchToStrategy}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
