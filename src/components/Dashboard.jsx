import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, Users, MessageSquare, Search, Zap, BarChart2 } from 'lucide-react'

const tabs = ['Overview', 'SEO', 'Leads', 'Automation']

const activityFeed = [
  { time: '2s ago', event: 'New lead captured — "Best plumber near me"', type: 'lead', color: '#10b981' },
  { time: '14s ago', event: 'AI responded to John M. — 90s response time', type: 'ai', color: '#0ea5e9' },
  { time: '1m ago', event: 'Email sequence triggered for 3 leads', type: 'email', color: '#a855f7' },
  { time: '3m ago', event: 'Google Business post published by AI', type: 'social', color: '#f59e0b' },
  { time: '5m ago', event: 'CRM deal updated — Stage: Qualified', type: 'crm', color: '#0ea5e9' },
  { time: '7m ago', event: 'Keyword rank improved: +4 positions', type: 'seo', color: '#10b981' },
]

export default function Dashboard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="section-tag justify-center">Live Platform</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              Your AI Growth<br /><span className="grad-text">Command Center</span>
            </h2>
            <p className="font-body text-slate-400 text-lg max-w-xl mx-auto">
              A unified dashboard where every AI system, lead, and metric lives in one place.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(14,165,233,0.2)', boxShadow: '0 0 80px rgba(14,165,233,0.08)' }}
        >
          {/* Dashboard toolbar */}
          <div className="flex items-center justify-between px-5 py-3"
            style={{ background: '#050c1a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-md text-xs text-slate-400"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
              nexusai.app/dashboard
            </div>
            <div className="flex items-center gap-2">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-3 py-1 rounded-lg text-xs font-body font-semibold transition-all duration-200"
                  style={{
                    background: activeTab === tab ? 'rgba(14,165,233,0.15)' : 'transparent',
                    color: activeTab === tab ? '#38bdf8' : '#64748b',
                    border: activeTab === tab ? '1px solid rgba(14,165,233,0.3)' : '1px solid transparent',
                  }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard body */}
          <div className="p-5 grid lg:grid-cols-3 gap-4" style={{ background: '#060d1b' }}>
            {/* Left: KPI cards + chart */}
            <div className="lg:col-span-2 space-y-4">
              {/* KPI row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Leads This Month', val: '2,847', change: '+24%', icon: Users, color: '#0ea5e9' },
                  { label: 'SEO Score', val: '84/100', change: '+12pts', icon: Search, color: '#a855f7' },
                  { label: 'AI Responses', val: '1,204', change: '+38%', icon: MessageSquare, color: '#10b981' },
                  { label: 'Conversions', val: '18.4%', change: '+6.2%', icon: TrendingUp, color: '#f59e0b' },
                ].map(({ label, val, change, icon: Icon, color }) => (
                  <div key={label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={14} style={{ color }} />
                      <span className="text-xs font-semibold text-green-neon">{change}</span>
                    </div>
                    <div className="font-display font-black text-base" style={{ color }}>{val}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight">{label}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-display font-bold uppercase tracking-widest text-slate-400">Lead Generation (30d)</span>
                  <BarChart2 size={14} className="text-slate-500" />
                </div>
                <div className="flex items-end gap-1 h-28">
                  {[28, 42, 35, 58, 47, 72, 65, 88, 74, 82, 91, 78, 95, 86, 102, 88, 74, 112, 98, 105, 88, 118, 104, 121, 108, 98, 131, 118, 124, 138].map((h, i) => {
                    const max = 138
                    return (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm cursor-pointer"
                        style={{ background: i > 24 ? 'linear-gradient(to top, #0ea5e9, #a855f7)' : 'rgba(255,255,255,0.08)', height: `${(h / max) * 100}%` }}
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ delay: i * 0.02 + 0.5 }}
                        title={`Day ${i + 1}: ${h} leads`}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between text-xs text-slate-600 mt-2">
                  <span>Apr 1</span><span>Apr 15</span><span>Apr 30</span>
                </div>
              </div>

              {/* Automation pipeline */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-3">Active Automations</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Lead Capture', count: 847, active: true },
                    { label: 'Email Sequences', count: 23, active: true },
                    { label: 'CRM Sync', count: 'Live', active: true },
                    { label: 'SEO Monitor', count: 'Tracking', active: true },
                  ].map(({ label, count, active }) => (
                    <div key={label} className="p-2.5 rounded-lg text-center" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
                        <span className="text-xs text-green-neon font-semibold">Active</span>
                      </div>
                      <div className="font-display font-bold text-sm text-white">{count}</div>
                      <div className="text-xs text-slate-500 leading-tight">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Activity feed */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl h-full" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={14} className="text-blue-light" />
                  <span className="text-xs font-display font-bold uppercase tracking-widest text-slate-400">Live Activity</span>
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
                </div>
                <div className="space-y-3">
                  {activityFeed.map(({ time, event, color }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.1 + 0.6 }}
                      className="flex gap-3 pb-3"
                      style={{ borderBottom: i < activityFeed.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: color }} />
                      <div>
                        <div className="text-xs text-slate-300 leading-snug">{event}</div>
                        <div className="text-xs text-slate-600 mt-0.5">{time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
