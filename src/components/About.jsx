import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

const experience = [
  {
    company: 'Growthify Media',
    role: 'Senior Automation Executive',
    period: 'Jan 2025 – Jul 2025',
    color: '#0ea5e9',
    points: [
      'Led automation for WhatsApp, email & CRM to support Meta & Google ad funnels',
      'Built and optimised landing pages to boost conversions and reduce CPL',
      'Managed a 5-member team ensuring timely campaign delivery',
    ],
  },
  {
    company: 'Concentrix — Client: Meta',
    role: 'Senior Consultant',
    period: 'Nov 2023 – Sep 2024',
    color: '#a855f7',
    points: [
      'Assisted advertisers to create, publish and run ads on Meta Platform',
      'Strategised and improved client ad campaigns for better ROI',
      'Reporting and analysis of ad data across accounts',
    ],
  },
  {
    company: 'Teleperformance — Client: Google',
    role: 'Account Management — Google AdWords',
    period: 'Dec 2017 – Feb 2021',
    color: '#10b981',
    points: [
      'Provided technical assistance to Google AdWords clients',
      'Maintained 90% customer satisfaction and 75% retention rate',
      'Managed and processed client data through CRM systems',
    ],
  },
]

const skills = [
  'Meta Ads', 'Google AdWords', 'n8n Automation', 'Landing Page Optimisation',
  'WhatsApp Marketing', 'CRM Management', 'Lead Nurturing', 'Power BI & Excel',
  'Funnel Design', 'Performance Analytics', 'AI Workflow Design', 'Zapier / Pabbly',
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative z-10 py-24" style={{ background:'rgba(7,14,30,0.8)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div ref={ref} className="mb-16">
          <motion.div initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.5 }}>
            <span className="section-tag">About Me</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              The Person Behind<br /><span className="grad-text">AutomatewithRaj</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Bio + contact */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6 }}>

            {/* Photo + name card */}
            <div className="flex items-center gap-5 mb-8 p-5 rounded-2xl"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(14,165,233,0.2)' }}>
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                style={{ border:'2px solid rgba(14,165,233,0.3)' }}>
                <img src="/swaraj.png" alt="Swaraj Shukla"
                  className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="font-display font-black text-xl text-white">Swaraj Shukla</div>
                <div className="text-sm text-blue-light font-semibold">Performance Marketer & Automation Specialist</div>
                <a href="https://www.linkedin.com/in/swaraj-shukla-automatewithraj"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs text-slate-400 hover:text-blue-light transition-colors">
                  <Linkedin size={12} /> Connect on LinkedIn <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Bio */}
            <p className="font-body text-slate-300 leading-relaxed mb-6 text-base">
              With <strong className="text-white">7 years of experience</strong> in digital marketing and automation, I work as a Senior Automation Executive leading a team of 5. I manage landing page creation, WhatsApp and email marketing automation, and lead nurturing strategies aligned with Meta and Google ads.
            </p>
            <p className="font-body text-slate-400 leading-relaxed mb-8 text-sm">
              Previously at <strong className="text-slate-300">Concentrix</strong> supporting Meta advertisers and <strong className="text-slate-300">Teleperformance</strong> managing Google AdWords accounts. I have also freelanced for public figures and organisations, managing social media presence and Meta Ads growth.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              {[
                { icon: Mail,    text:'swaraj.shukla07@gmail.com',  href:'mailto:swaraj.shukla07@gmail.com' },
                { icon: Phone,   text:'+91 40489739',               href:'tel:+9140489739' },
                { icon: MapPin,  text:'New Delhi, India — 110068',  href:null },
                { icon: Linkedin,text:'LinkedIn — AutomatewithRaj', href:'https://www.linkedin.com/in/swaraj-shukla-automatewithraj' },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text}>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-light transition-colors">
                      <Icon size={14} className="text-blue-light flex-shrink-0" />
                      {text}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Icon size={14} className="text-blue-light flex-shrink-0" />
                      {text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-500 mb-3">Core Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-lg text-xs font-body font-semibold"
                    style={{ background:'rgba(14,165,233,0.08)', border:'1px solid rgba(14,165,233,0.2)', color:'#38bdf8' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Experience timeline */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.2 }}>
            <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-500 mb-6">Work Experience</div>
            <div className="space-y-5">
              {experience.map(({ company, role, period, color, points }, i) => (
                <motion.div key={company}
                  initial={{ opacity:0, y:20 }}
                  animate={inView ? { opacity:1, y:0 } : {}}
                  transition={{ delay:i * 0.15, duration:0.5 }}
                  className="p-5 rounded-2xl transition-all duration-300"
                  style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${color}22` }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${color}50`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${color}22`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-display font-bold text-sm text-white">{company}</div>
                      <div className="text-xs font-semibold mt-0.5" style={{ color }}>{role}</div>
                    </div>
                    <span className="text-xs text-slate-500 font-body flex-shrink-0 mt-0.5">{period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-400 font-body">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* LinkedIn CTA */}
            <motion.a
              href="https://www.linkedin.com/in/swaraj-shukla-automatewithraj"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity:0, y:10 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.6, duration:0.5 }}
              className="mt-6 flex items-center justify-center gap-3 w-full py-4 rounded-xl font-display font-bold text-sm transition-all duration-300"
              style={{ background:'rgba(10,102,194,0.1)', border:'1px solid rgba(10,102,194,0.35)', color:'#38bdf8' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(10,102,194,0.2)'; e.currentTarget.style.borderColor='rgba(10,102,194,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(10,102,194,0.1)'; e.currentTarget.style.borderColor='rgba(10,102,194,0.35)' }}
            >
              <Linkedin size={18} />
              View Full Profile on LinkedIn
              <ExternalLink size={14} />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
