import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link, Brain, Rocket } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Link,
    title: 'Connect Your Business',
    desc: 'We audit your current systems, connect your tools, and map every touchpoint where AI can take over — from your CRM to your Google Business Profile.',
    details: ['Free AI audit & system review', 'Tool & API connections set up', 'Custom automation blueprint created'],
    color: '#0ea5e9',
  },
  {
    num: '02',
    icon: Brain,
    title: 'AI Analyzes & Configures',
    desc: 'Our AI engine scans your competitive landscape, keyword opportunities, lead flow gaps, and operational bottlenecks to build your custom growth system.',
    details: ['Competitor & keyword intelligence', 'Lead flow gap analysis', 'Automation workflows configured'],
    color: '#a855f7',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Automation Starts Scaling',
    desc: 'Your AI systems go live. Lead responses automated, SEO improving, content publishing, CRM updating — while your team focuses on closing and delivery.',
    details: ['24/7 AI systems live', 'Weekly performance reports', 'Ongoing optimization & scaling'],
    color: '#10b981',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="how-it-works" className="relative z-10 py-24" style={{ background: 'rgba(7,14,30,0.7)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="section-tag justify-center">The Process</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              From Day One to<br /><span className="grad-text">Full AI Scale in 3 Steps</span>
            </h2>
            <p className="font-body text-slate-400 text-lg max-w-xl mx-auto">
              Most clients have AI systems live within 14 days. Here's exactly how it works.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), rgba(168,85,247,0.3), transparent)' }} />

          {steps.map(({ num, icon: Icon, title, desc, details, color }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative"
            >
              {/* Step number circle */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display font-black text-sm relative z-10"
                  style={{ background: `${color}18`, border: `2px solid ${color}50`, color }}>
                  {num}
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={18} style={{ color }} />
                </div>
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-3">{title}</h3>
              <p className="font-body text-sm text-slate-400 leading-relaxed mb-5">{desc}</p>

              <ul className="space-y-2">
                {details.map(d => (
                  <li key={d} className="flex items-center gap-2 text-xs font-body text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Timeline callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl"
            style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.2)' }}>
            <Rocket size={18} className="text-blue-light" />
            <span className="font-body text-sm text-slate-300">
              Most clients are <strong className="text-white">live within 14 days</strong> — from strategy call to automated AI systems running.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
