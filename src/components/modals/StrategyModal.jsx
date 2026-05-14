import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitStrategyCall } from '../../utils/api'

const initialForm = {
  name: '',
  email: '',
  businessType: '',
  monthlyRevenue: '',
  biggestChallenge: '',
  preferredCallTime: '',
  services: [],
}

const serviceOptions = [
  'AI Voice Agents', 'SEO Automation', 'CRM Automation', 'AI Customer Support',
  'Lead Generation', 'Workflow Automation', 'Email Automation', 'Communication Systems',
]

const businessTypes = [
  'HVAC / Plumbing / Electrical', 'Real Estate', 'Healthcare / Dental', 'Legal Services',
  'Restaurant / Food Service', 'Fitness / Wellness', 'Home Services', 'E-Commerce', 'Other',
]

const revenueRanges = [
  'Under $5K/month', '$5K–$15K/month', '$15K–$50K/month', '$50K–$150K/month', '$150K+/month',
]

const timeSlots = ['Mon–Wed 9–11am EST', 'Mon–Wed 2–4pm EST', 'Thu–Fri 10am–12pm EST', 'Thu–Fri 3–5pm EST', 'Flexible — any time']

function validate(form) {
  if (!form.name.trim()) return 'Please enter your name.'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
  if (!form.businessType) return 'Please select your business type.'
  if (!form.biggestChallenge.trim()) return 'Please describe your biggest challenge.'
  return null
}

export default function StrategyModal({ onClose }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const toggleService = (svc) => {
    setForm(p => ({
      ...p,
      services: p.services.includes(svc)
        ? p.services.filter(s => s !== svc)
        : [...p.services, svc],
    }))
  }

  const handleSubmit = async () => {
    const err = validate(form)
    if (err) { toast.error(err); return }

    setLoading(true)
    try {
      await submitStrategyCall(form)
      setSuccess(true)
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm font-body text-white placeholder-slate-600 outline-none transition-all duration-200"
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
  const inputFocus = (e) => { e.target.style.borderColor = 'rgba(14,165,233,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)' }
  const inputBlur = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: '#070e1e', border: '1px solid rgba(168,85,247,0.2)', boxShadow: '0 0 80px rgba(168,85,247,0.1)' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between px-6 py-5 rounded-t-2xl"
          style={{ background: '#070e1e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h2 className="font-display font-bold text-lg text-white">
              {success ? '🎉 You are Booked!' : '📅 Book Strategy Call'}
            </h2>
            <p className="font-body text-xs text-slate-500 mt-0.5">
              {success ? 'Your consultation is confirmed' : 'Free 30-min AI growth consultation — no obligation'}
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ml-4 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <X size={14} className="text-slate-400" />
          </button>
        </div>

        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #a855f7)', boxShadow: '0 0 40px rgba(14,165,233,0.4)' }}
                >
                  <CheckCircle size={36} className="text-white" />
                </motion.div>

                <h3 className="font-display font-black text-2xl text-white mb-3">Consultation Booked!</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                  We'll prepare a custom AI growth strategy for <strong className="text-white">{form.name.split(' ')[0]}'s</strong> business before your call.
                </p>

                <div className="text-left p-5 rounded-xl mb-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-xs font-display font-bold uppercase tracking-widest text-blue-light mb-4">What Happens Next</div>
                  {[
                    { icon: '📧', text: 'Confirmation email sent to your inbox within 5 minutes' },
                    { icon: '🧠', text: 'AI team prepares a custom growth analysis for your business' },
                    { icon: '📅', text: '30-min strategy call at your preferred time' },
                    { icon: '🚀', text: 'Receive your custom AI implementation roadmap' },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 py-2.5 border-b last:border-0"
                      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <span className="text-base">{step.icon}</span>
                      <span className="font-body text-sm text-slate-300">{step.text}</span>
                    </motion.div>
                  ))}
                </div>

                <button onClick={onClose} className="btn-primary w-full justify-center">
                  Close — See You On The Call!
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 font-body">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input className={inputClass} style={inputStyle} placeholder="John Smith" value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 font-body">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input type="email" className={inputClass} style={inputStyle} placeholder="john@business.com" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))} onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 font-body">
                      Business Type <span className="text-red-400">*</span>
                    </label>
                    <select className={inputClass} style={inputStyle} value={form.businessType}
                      onChange={e => setForm(p => ({ ...p, businessType: e.target.value }))} onFocus={inputFocus} onBlur={inputBlur}>
                      <option value="">Select your business type…</option>
                      {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Monthly Revenue */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 font-body">
                      Monthly Revenue Range
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {revenueRanges.map(r => (
                        <button key={r} type="button"
                          onClick={() => setForm(p => ({ ...p, monthlyRevenue: r }))}
                          className="px-3 py-1.5 rounded-lg text-xs font-body font-semibold transition-all duration-200"
                          style={{
                            background: form.monthlyRevenue === r ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.04)',
                            border: form.monthlyRevenue === r ? '1px solid rgba(14,165,233,0.45)' : '1px solid rgba(255,255,255,0.08)',
                            color: form.monthlyRevenue === r ? '#38bdf8' : '#64748b',
                          }}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Biggest Challenge */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 font-body">
                      Biggest Growth Challenge <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      className={inputClass} style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                      placeholder="Describe the biggest challenge currently limiting your business growth…"
                      value={form.biggestChallenge}
                      onChange={e => setForm(p => ({ ...p, biggestChallenge: e.target.value }))}
                      onFocus={inputFocus} onBlur={inputBlur}
                      rows={3}
                    />
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 font-body">
                      Interested Services
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceOptions.map(svc => {
                        const selected = form.services.includes(svc)
                        return (
                          <button key={svc} type="button" onClick={() => toggleService(svc)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-body font-medium text-left transition-all duration-200"
                            style={{
                              background: selected ? 'rgba(14,165,233,0.1)' : 'rgba(255,255,255,0.03)',
                              border: selected ? '1px solid rgba(14,165,233,0.4)' : '1px solid rgba(255,255,255,0.07)',
                              color: selected ? '#38bdf8' : '#64748b',
                            }}>
                            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                              style={{ background: selected ? '#0ea5e9' : 'rgba(255,255,255,0.06)', border: selected ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                              {selected && <span className="text-white text-xs font-bold">✓</span>}
                            </div>
                            {svc}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Preferred call time */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 font-body">
                      Preferred Call Time
                    </label>
                    <div className="space-y-1.5">
                      {timeSlots.map(slot => (
                        <button key={slot} type="button"
                          onClick={() => setForm(p => ({ ...p, preferredCallTime: slot }))}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-left transition-all duration-200"
                          style={{
                            background: form.preferredCallTime === slot ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.02)',
                            border: form.preferredCallTime === slot ? '1px solid rgba(14,165,233,0.35)' : '1px solid rgba(255,255,255,0.06)',
                            color: form.preferredCallTime === slot ? '#38bdf8' : '#94a3b8',
                          }}>
                          <Clock size={14} className="flex-shrink-0" style={{ color: form.preferredCallTime === slot ? '#0ea5e9' : '#475569' }} />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-primary w-full justify-center text-base py-4 mt-2"
                    style={{ background: 'linear-gradient(135deg, #a855f7, #0ea5e9)', opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      <><span className="spinner border-2 border-white/30 border-t-white rounded-full w-4 h-4" />Booking…</>
                    ) : (
                      <><Calendar size={18} /> Confirm Strategy Call — Free</>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-600 font-body">
                    No contracts. No pressure. 100% free consultation.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
