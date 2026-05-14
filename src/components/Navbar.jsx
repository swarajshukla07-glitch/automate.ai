import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Services',    href: '#services'      },
  { label: 'About',       href: '#about'         },
  { label: 'Results',     href: '#testimonials'  },
  { label: 'How It Works',href: '#how-it-works'  },
  { label: 'FAQ',         href: '#faq'           },
]

export default function Navbar({ onSEO, onStrategy }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:   scrolled ? 'rgba(3,7,18,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#0ea5e9,#a855f7)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight grad-text">
                AutomateWith
              </span>
              <span className="font-display font-bold text-lg tracking-tight text-white">Raj</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                className="text-sm font-body font-medium text-slate-400 hover:text-white transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onSEO} className="btn-secondary text-sm px-5 py-2.5">
              Free SEO Audit
            </button>
            <button onClick={onStrategy} className="btn-primary text-sm px-5 py-2.5">
              Book Strategy Call
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(7,14,30,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <a key={link.label} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body font-medium text-slate-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <button onClick={() => { onSEO(); setMobileOpen(false) }} className="btn-secondary w-full justify-center">Free SEO Audit</button>
                <button onClick={() => { onStrategy(); setMobileOpen(false) }} className="btn-primary w-full justify-center">Book Strategy Call</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
