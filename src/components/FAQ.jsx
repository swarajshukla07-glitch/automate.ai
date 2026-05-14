import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How quickly can you get AI systems live for my business?',
    a: 'Most clients have core AI systems live within 14 days of their strategy call. The onboarding process includes an audit, tool connections, workflow configuration, and testing — all handled by our team. More complex multi-system setups typically take 21–30 days.',
  },
  {
    q: 'Do I need any technical knowledge to use your systems?',
    a: 'Zero. Our systems are built and managed entirely by our team. You receive a simple dashboard to monitor performance and results. If something needs adjusting, you contact us — we handle everything technical on the backend.',
  },
  {
    q: 'What types of businesses do you work best with?',
    a: 'We specialize in local and service-based businesses in the US — contractors, healthcare, dental, legal, real estate, HVAC, cleaning services, auto, fitness studios, restaurants, and e-commerce. If your business generates leads and serves customers, we can automate and scale it.',
  },
  {
    q: 'How does the free SEO analysis work?',
    a: 'You submit your business details and we run a full AI-powered audit of your search visibility, competitor landscape, keyword opportunities, local SEO signals, and Google Business Profile performance. Results are delivered as an interactive report with specific, actionable recommendations.',
  },
  {
    q: 'What CRM and tools do you integrate with?',
    a: 'We integrate with GoHighLevel, HubSpot, Salesforce, Pipedrive, Zoho, Monday.com, and 50+ other platforms via native integrations, n8n, Make, and Zapier webhooks. If you use it, we can likely connect it.',
  },
  {
    q: 'What does AI lead response actually look like?',
    a: 'When a lead comes in — from your website, Google Business, Facebook, or a call — our AI systems respond within 90 seconds via SMS, email, or WhatsApp. The AI qualifies the lead, answers common questions, and books appointments directly into your calendar. No human needed.',
  },
  {
    q: 'How is this different from hiring a marketing agency?',
    a: 'Traditional agencies execute tasks manually and bill hourly — they stop when you stop paying. Our AI systems run continuously, scale automatically, and improve over time. You own the workflows. Think of us as infrastructure, not a retainer service.',
  },
  {
    q: 'What\'s the investment / pricing model?',
    a: 'We offer custom pricing based on your business size, systems required, and automation scope. Most clients invest between $1,500–$5,000 for setup and $500–$2,000/month for management and optimization. Book a strategy call to get a custom quote for your specific situation.',
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        border: open ? '1px solid rgba(14,165,233,0.3)' : '1px solid rgba(255,255,255,0.07)',
        background: open ? 'rgba(14,165,233,0.04)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-display font-bold text-sm md:text-base text-white">{q}</span>
        <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.05)',
            border: open ? '1px solid rgba(14,165,233,0.3)' : '1px solid rgba(255,255,255,0.08)',
          }}>
          {open
            ? <Minus size={14} className="text-blue-light" />
            : <Plus size={14} className="text-slate-400" />}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p className="px-5 pb-5 font-body text-sm text-slate-400 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  )
}

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="faq" className="relative z-10 py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="section-tag justify-center">FAQ</span>
            <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-4">
              Questions? <span className="grad-text">We Have Answers.</span>
            </h2>
            <p className="font-body text-slate-400">Everything you need to know about our AI systems and process.</p>
          </motion.div>
        </div>

        {inView && (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
