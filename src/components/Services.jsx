import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bot, Search, Share2, Filter, MessageSquare, UserCheck, Globe, Target } from 'lucide-react'

const services = [
  {
    icon: Bot,
    num: '01',
    title: 'AI Automation Systems',
    desc: 'End-to-end workflow automation — from lead capture to CRM updates — running 24/7 without human intervention.',
    tags: ['n8n', 'Zapier', 'Make'],
    color: '#0ea5e9',
  },
  {
    icon: Search,
    num: '02',
    title: 'SEO Intelligence',
    desc: 'AI-powered audits, competitor mapping, keyword gap analysis, and local search optimization for sustainable visibility.',
    tags: ['Local SEO', 'GMB', 'Technical'],
    color: '#a855f7',
  },
  {
    icon: Share2,
    num: '03',
    title: 'Social Media Automation',
    desc: 'AI content generation, smart scheduling, engagement monitoring, and multi-platform publishing — fully automated.',
    tags: ['Content AI', 'Scheduling', 'Analytics'],
    color: '#10b981',
  },
  {
    icon: Filter,
    num: '04',
    title: 'Funnel & CRM Systems',
    desc: 'High-converting sales funnels connected to automated CRM pipelines, follow-up sequences, and deal tracking.',
    tags: ['GoHighLevel', 'HubSpot', 'Funnels'],
    color: '#f59e0b',
  },
  {
    icon: MessageSquare,
    num: '05',
    title: 'AI Chatbots & Voice',
    desc: 'Custom AI assistants that qualify leads, answer questions, book appointments, and handle support around the clock.',
    tags: ['GPT-4', 'Voiceflow', 'WhatsApp'],
    color: '#0ea5e9',
  },
  {
    icon: UserCheck,
    num: '06',
    title: 'Lead Nurturing AI',
    desc: 'Intelligent multi-channel follow-up sequences — email, SMS, WhatsApp — triggered by behavior and timing.',
    tags: ['Email AI', 'SMS', 'Sequences'],
    color: '#a855f7',
  },
  {
    icon: Globe,
    num: '07',
    title: 'Website Development',
    desc: 'High-performance, conversion-focused websites with integrated AI chat, lead capture, and analytics built in.',
    tags: ['React', 'Next.js', 'Webflow'],
    color: '#10b981',
  },
  {
    icon: Target,
    num: '08',
    title: 'Paid Ads Automation',
    desc: 'AI-assisted campaign management across Google and Meta, with automated bid optimization and performance reporting.',
    tags: ['Google Ads', 'Meta Ads', 'AI Bids'],
    color: '#f59e0b',
  },
]

function ServiceCard({ service, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
      className="glass-card p-6 rounded-2xl cursor-default relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${service.color}44`}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at top left, ${service.color}08, transparent 60%)` }} />

      <span className="font-display text-xs font-bold tracking-widest mb-4 block" style={{ color: `${service.color}66` }}>
        {service.num}
      </span>

      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
        <Icon size={20} style={{ color: service.color }} />
      </div>

      <h3 className="font-display font-bold text-base mb-2 text-white">{service.title}</h3>
      <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">{service.desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {service.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-body font-semibold"
            style={{ background: `${service.color}12`, border: `1px solid ${service.color}25`, color: service.color }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
        style={{ color: service.color }}>
        ↗
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="section-tag justify-center">Our Systems</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              AI Infrastructure Built To<br /><span className="grad-text">Scale Your Business</span>
            </h2>
            <p className="font-body text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Eight interconnected AI systems — each engineered to replace manual work with intelligent automation.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
