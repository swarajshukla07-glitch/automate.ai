import React from 'react'
import { motion } from 'framer-motion'

const partners = [
  { icon: '🔍', name: 'Google' },
  { icon: '📘', name: 'Meta' },
  { icon: '🧠', name: 'OpenAI' },
  { icon: '⚡', name: 'n8n' },
  { icon: '💬', name: 'WhatsApp' },
  { icon: '🔗', name: 'GoHighLevel' },
  { icon: '📊', name: 'HubSpot' },
  { icon: '⚙️', name: 'Zapier' },
]

export default function TrustBar() {
  return (
    <div className="relative z-10 border-y" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(7,14,30,0.8)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-slate-500 flex-shrink-0">
            Integrated With
          </span>
          <div className="flex flex-wrap items-center gap-6">
            {partners.map(({ icon, name }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors duration-200 cursor-default"
              >
                <span className="text-base">{icon}</span>
                <span className="text-xs font-body font-semibold">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
