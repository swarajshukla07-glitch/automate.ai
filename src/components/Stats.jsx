import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { value: 312, suffix: '%', label: 'Average Lead Increase', desc: 'Within first 90 days' },
  { value: 24, suffix: '+', label: 'AI Workflows Deployed', desc: 'Across all clients' },
  { value: 90, suffix: '%', label: 'Client Satisfaction Rate', desc: 'Tracked & verified' },
  { value: 4.2, suffix: 'x', label: 'Avg. ROI Generated', desc: 'Per automation system' },
  { value: 7, suffix: '+', label: 'Years Experience', desc: 'In AI & automation' },
  { value: 40, suffix: '%', label: 'Ops Cost Reduction', desc: 'Through AI automation' },
]

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="relative z-10 py-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
          {stats.map(({ value, suffix, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center p-6 transition-all duration-300 group"
              style={{ background: 'rgba(3,7,18,0.6)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(14,165,233,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(3,7,18,0.6)'}
            >
              <div className="font-display font-black text-2xl md:text-3xl grad-text mb-1">
                {inView ? (
                  <CountUp end={value} decimals={value % 1 !== 0 ? 1 : 0} duration={2} delay={i * 0.1} suffix={suffix} />
                ) : `0${suffix}`}
              </div>
              <div className="font-body font-semibold text-xs text-white mb-0.5">{label}</div>
              <div className="font-body text-xs text-slate-500">{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
