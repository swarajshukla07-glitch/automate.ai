import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, Check, AlertTriangle, Zap } from 'lucide-react'

const problems = [
  { icon: '😤', title: 'Losing Leads to Competitors', desc: 'Potential customers are choosing faster-responding competitors before you even know they exist.' },
  { icon: '⏳', title: 'Slow Response Times', desc: 'Average businesses respond to leads in 4+ hours. By then, 78% have already chosen someone else.' },
  { icon: '🌫️', title: 'Poor Online Visibility', desc: 'Without optimized SEO and local presence, high-intent buyers simply never find your business.' },
  { icon: '🐌', title: 'Manual Operations', desc: 'Your team wastes 60%+ of their day on repetitive tasks AI can handle in seconds.' },
]

const solutions = [
  { icon: '⚡', title: 'AI-Instant Lead Response', desc: 'Our AI systems respond to every lead in under 90 seconds — 24/7, 365 days a year, no exceptions.' },
  { icon: '📈', title: 'Automated SEO Growth', desc: 'AI continuously monitors, optimizes, and builds your search visibility without ongoing manual effort.' },
  { icon: '🤖', title: 'Full Workflow Automation', desc: 'Eliminate repetitive tasks entirely. Your team focuses on high-value work while AI handles the rest.' },
  { icon: '🎯', title: 'Smart Lead Nurturing', desc: 'Multi-channel AI sequences keep every lead warm and moving toward conversion automatically.' },
]

export default function ProblemSolution() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative z-10 py-24" style={{ background: 'rgba(7,14,30,0.7)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="section-tag justify-center">The Reality</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              Why Most Businesses<br /><span className="grad-text-reverse">Are Stuck & Falling Behind</span>
            </h2>
            <p className="font-body text-slate-400 text-lg max-w-xl mx-auto">
              These four silent problems cost local businesses thousands in lost revenue every month.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Problems */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <AlertTriangle size={16} className="text-red-400" />
              </div>
              <span className="font-display font-bold text-red-400 uppercase tracking-wider text-sm">Without AI Systems</span>
            </div>
            <div className="space-y-3">
              {problems.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex gap-4 p-4 rounded-xl transition-all duration-300"
                  style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <div className="font-display font-bold text-sm text-white mb-1 flex items-center gap-2">
                      <X size={12} className="text-red-400 flex-shrink-0" />
                      {title}
                    </div>
                    <p className="font-body text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider arrow on desktop */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #a855f7)' }}
            >
              <Zap size={20} className="text-white" />
            </motion.div>
          </div>

          {/* Solutions */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <Zap size={16} className="text-green-neon" />
              </div>
              <span className="font-display font-bold text-green-neon uppercase tracking-wider text-sm">With NexusAI Systems</span>
            </div>
            <div className="space-y-3">
              {solutions.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12 + 0.3, duration: 0.5 }}
                  className="flex gap-4 p-4 rounded-xl transition-all duration-300"
                  style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)' }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <div className="font-display font-bold text-sm text-white mb-1 flex items-center gap-2">
                      <Check size={12} className="text-green-neon flex-shrink-0" />
                      {title}
                    </div>
                    <p className="font-body text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
