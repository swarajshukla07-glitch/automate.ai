import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, Linkedin } from 'lucide-react'

const typingPhrases = [
  'Generate More Leads',
  'Automate Follow-Ups',
  'Dominate Local SEO',
  'Scale 24/7 with AI',
]

export default function Hero({ onSEO, onStrategy }) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed,   setDisplayed]   = useState('')
  const [typing,      setTyping]       = useState(true)

  useEffect(() => {
    const phrase = typingPhrases[phraseIndex]
    let i = typing ? 0 : phrase.length
    const interval = setInterval(() => {
      if (typing) {
        i++
        setDisplayed(phrase.slice(0, i))
        if (i >= phrase.length) { clearInterval(interval); setTimeout(() => setTyping(false), 1800) }
      } else {
        i--
        setDisplayed(phrase.slice(0, i))
        if (i <= 0) { clearInterval(interval); setTimeout(() => { setPhraseIndex(p => (p + 1) % typingPhrases.length); setTyping(true) }, 200) }
      }
    }, typing ? 60 : 35)
    return () => clearInterval(interval)
  }, [phraseIndex, typing])

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-100" />
      <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.08) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left content ── */}
          <div>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-6"
              style={{ background:'rgba(14,165,233,0.1)', border:'1px solid rgba(14,165,233,0.3)', color:'#38bdf8' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-light animate-pulse" />
              AI Growth Infrastructure · New Delhi, India
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight mb-6">
              AI Systems That<br />
              <span className="grad-text">{displayed}</span>
              <span className="animate-pulse text-blue-light">|</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-[500px]">
              Hi, I'm <strong className="text-white">Swaraj Shukla</strong> — Performance Marketer & Automation Specialist with 7 years driving digital growth across Meta, Google, and AI automation platforms.
            </motion.p>

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }}
              className="flex flex-wrap gap-4 mb-10">
              <button onClick={onSEO} className="btn-primary text-sm">
                <Zap size={16} /> Get Free SEO Analysis
              </button>
              <button onClick={onStrategy} className="btn-secondary text-sm">
                <Play size={14} className="fill-current" /> Book Strategy Call
              </button>
              <a
                href="https://www.linkedin.com/in/swaraj-shukla-automatewithraj"
                target="_blank" rel="noopener noreferrer"
                className="btn-secondary text-sm"
                style={{ borderColor:'rgba(10,102,194,0.5)', color:'#38bdf8' }}>
                <Linkedin size={14} /> LinkedIn
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.5 }}
              className="flex flex-wrap gap-6">
              {[
                { val:'7+',  label:'Years Experience'    },
                { val:'24',  label:'n8n Workflows Built' },
                { val:'5',   label:'Team Led'            },
                { val:'90%', label:'CSAT Rate'           },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div className="font-display font-black text-xl grad-text">{val}</div>
                  <div className="text-xs text-slate-500 font-body">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile photo + floating cards ── */}
          <div className="hidden lg:flex justify-center relative">
            {/* Glow behind photo */}
            <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl"
              style={{ background:'radial-gradient(circle,rgba(14,165,233,0.35),rgba(168,85,247,0.25))' }} />

            {/* Photo */}
            <motion.div
              initial={{ opacity:0, scale:0.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.8, delay:0.3 }}
              className="relative z-10"
            >
              <div className="relative w-80 h-80 rounded-2xl overflow-hidden"
                style={{ border:'2px solid rgba(14,165,233,0.3)', boxShadow:'0 0 60px rgba(14,165,233,0.15)' }}>
                <img src="/swaraj.png" alt="Swaraj Shukla — AutomatewithRaj"
                  className="w-full h-full object-cover object-top" />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24"
                  style={{ background:'linear-gradient(to top,rgba(3,7,18,0.8),transparent)' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display font-bold text-white text-sm">Swaraj Shukla</div>
                  <div className="text-xs text-slate-400">Performance Marketer & AI Automation Specialist</div>
                </div>
              </div>

              {/* Floating badge — LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/swaraj-shukla-automatewithraj"
                target="_blank" rel="noopener noreferrer"
                className="absolute -top-4 -right-10 flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
                style={{ background:'rgba(10,102,194,0.15)', border:'1px solid rgba(10,102,194,0.4)', backdropFilter:'blur(10px)' }}
                animate={{ y:[0,-6,0] }}
                transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
              >
                <Linkedin size={14} style={{ color:'#38bdf8' }} />
                <span className="text-xs font-semibold text-blue-light">Connect on LinkedIn</span>
              </motion.a>

              {/* Floating badge — New Delhi */}
              <motion.div
                className="absolute -bottom-4 -left-10 flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background:'rgba(168,85,247,0.12)', border:'1px solid rgba(168,85,247,0.3)', backdropFilter:'blur(10px)' }}
                animate={{ y:[0,6,0] }}
                transition={{ duration:4, repeat:Infinity, ease:'easeInOut', delay:1 }}
              >
                <span className="text-sm">📍</span>
                <span className="text-xs font-semibold text-purple-light">New Delhi, India</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
