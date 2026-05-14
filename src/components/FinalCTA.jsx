import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, Calendar, ArrowRight } from 'lucide-react'

export default function FinalCTA({ onSEO, onStrategy }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="relative z-10 py-24 overflow-hidden" style={{ background: 'rgba(7,14,30,0.9)' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag justify-center mb-6">Get Started Today</span>

          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
            Ready To Build Your<br />
            <span className="grad-text">AI Growth Infrastructure?</span>
          </h2>

          <p className="font-body text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Start with a free AI SEO analysis or book a 30-minute strategy call. We'll show you exactly what's possible for your business — no pressure, no obligation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={onSEO} className="btn-primary text-base px-8 py-4">
              <Zap size={18} />
              Get Free AI SEO Audit
              <ArrowRight size={16} />
            </button>
            <button onClick={onStrategy} className="btn-secondary text-base px-8 py-4">
              <Calendar size={18} />
              Book Strategy Call
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {['No contracts required', 'Live in 14 days', '90-day satisfaction guarantee', 'US-based support'].map(item => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-neon" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
