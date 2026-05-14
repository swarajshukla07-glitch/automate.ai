import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart3, Brain, FileText, Link2, Share, CalendarClock, Sparkles } from 'lucide-react'

const features = [
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Live dashboards tracking leads, conversions, SEO performance, and automation activity across every channel.', color: '#0ea5e9' },
  { icon: Brain, title: 'AI Insights Engine', desc: 'Proactive AI recommendations that identify opportunities, flag issues, and suggest optimizations automatically.', color: '#a855f7' },
  { icon: FileText, title: 'Automated Reporting', desc: 'Weekly AI-generated reports delivered to your inbox — no manual data pulling or spreadsheets required.', color: '#10b981' },
  { icon: Link2, title: 'CRM Integrations', desc: 'Deep integration with GoHighLevel, HubSpot, Salesforce, and 50+ tools via native connectors and webhooks.', color: '#f59e0b' },
  { icon: Share, title: 'Social Integrations', desc: 'Cross-platform social automation across Instagram, Facebook, LinkedIn, and Google Business Profile.', color: '#0ea5e9' },
  { icon: CalendarClock, title: 'Smart Scheduling', desc: 'AI-powered appointment booking with automatic reminders, follow-ups, and calendar management.', color: '#a855f7' },
  { icon: Sparkles, title: 'AI Content Generation', desc: 'Blog posts, social captions, email sequences, and ad copy — generated and published automatically at scale.', color: '#10b981' },
]

export default function Features() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="section-tag">Platform Features</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-3">
                  Everything You Need<br /><span className="grad-text">In One AI Stack</span>
                </h2>
                <p className="font-body text-slate-400 text-lg max-w-lg">Seven core capabilities working together as your complete AI growth platform.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large featured card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2 glass-card p-8 rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            style={{ minHeight: 280, borderColor: 'rgba(14,165,233,0.2)', background: 'rgba(14,165,233,0.04)' }}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)' }}>
                <BarChart3 size={28} className="text-blue-light" />
              </div>
              <h3 className="font-display font-black text-xl text-white mb-3">Real-Time Analytics Dashboard</h3>
              <p className="font-body text-slate-400 leading-relaxed">Live visibility into every metric that matters — leads, conversions, SEO scores, automation triggers, and revenue impact — updated in real time without manual reporting.</p>
            </div>
            {/* Mini chart visual */}
            <div className="mt-6 flex items-end gap-1 h-16">
              {[40, 55, 38, 72, 61, 85, 74, 92, 68, 88, 95, 78].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ background: 'linear-gradient(to top, #0ea5e9, #a855f7)', height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ delay: i * 0.05 + 0.5, duration: 0.4 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Rest of features */}
          {features.slice(1).map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: (i + 1) * 0.08, duration: 0.5 }}
              className="glass-card p-6 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={e => e.currentTarget.style.borderColor = `${color}35`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <h3 className="font-display font-bold text-sm text-white mb-2">{title}</h3>
              <p className="font-body text-xs text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
