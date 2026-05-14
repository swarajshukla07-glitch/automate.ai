import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus Rodriguez',
    role: 'CEO, Apex Property Management',
    initials: 'MR',
    gradFrom: '#0ea5e9',
    gradTo: '#a855f7',
    stars: 5,
    quote: 'Within 60 days our lead response time dropped from 4+ hours to under 90 seconds. The AI voice agent handles qualification around the clock — we closed 3 enterprise contracts in the first month alone. The ROI was immediate.',
    metrics: ['3x Lead Response Speed', '+312% Lead Volume', '$84K Revenue Added'],
  },
  {
    name: 'Sofia Larsen',
    role: 'Director of Growth, BrightEdge E-Commerce',
    initials: 'SL',
    gradFrom: '#a855f7',
    gradTo: '#10b981',
    stars: 5,
    quote: "The SEO intelligence system found 47 keyword opportunities our internal team had completely missed for two years. Organic traffic is up 180% in 5 months and the automation paid for itself within the first 3 weeks.",
    metrics: ['+180% Organic Traffic', '47 New Keyword Wins', '3-Week ROI'],
  },
  {
    name: 'David Chen',
    role: 'Owner, Premier HVAC Services',
    initials: 'DC',
    gradFrom: '#10b981',
    gradTo: '#0ea5e9',
    stars: 5,
    quote: "We were losing leads every night and weekend. NexusAI set up an AI system that answers, qualifies, and books appointments 24/7. Our no-show rate dropped 40% and our team just shows up to jobs — no more chasing leads.",
    metrics: ['24/7 Lead Handling', '-40% No-Show Rate', '2.1x Booking Rate'],
  },
  {
    name: 'Amanda Williams',
    role: 'Marketing Director, Coastal Dental Group',
    initials: 'AW',
    gradFrom: '#f59e0b',
    gradTo: '#a855f7',
    stars: 5,
    quote: "The CRM automation and follow-up sequences alone saved us 15 hours per week. Our front desk can now focus on patients instead of manually following up. Google Business ranking jumped from page 3 to top 3 in our city.",
    metrics: ['15 hrs/wk Saved', 'Page 3 → Top 3 Local', '-60% Admin Workload'],
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(c => (c + 1) % testimonials.length)
  const t = testimonials[current]

  return (
    <section id="testimonials" className="relative z-10 py-24" style={{ background: 'rgba(7,14,30,0.7)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="section-tag justify-center">Client Results</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              Real Businesses,<br /><span className="grad-text">Measurable AI Results</span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 md:p-10 rounded-2xl relative" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="font-body text-lg text-slate-200 leading-relaxed italic mb-8"
              >
                &ldquo;{t.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            {/* Metrics */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`metrics-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {t.metrics.map(m => (
                  <span key={m} className="px-3 py-1.5 rounded-lg text-xs font-body font-semibold text-green-neon"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                    ✓ {m}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm text-white"
                    style={{ background: `linear-gradient(135deg, ${t.gradFrom}, ${t.gradTo})` }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white">{t.name}</div>
                    <div className="font-body text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button onClick={prev} className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(14,165,233,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                    <ChevronLeft size={16} className="text-slate-400" />
                  </button>
                  <button onClick={next} className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(14,165,233,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current ? 'linear-gradient(90deg, #0ea5e9, #a855f7)' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
