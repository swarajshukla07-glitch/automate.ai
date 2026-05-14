import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import ProblemSolution from './components/ProblemSolution'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Dashboard from './components/Dashboard'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import SEOModal from './components/modals/SEOModal'
import StrategyModal from './components/modals/StrategyModal'
import Particles from './components/Particles'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useCursor } from './hooks/useCursor'

export default function App() {
  const [seoModalOpen,      setSeoModalOpen]      = useState(false)
  const [strategyModalOpen, setStrategyModalOpen] = useState(false)

  useScrollProgress()
  useCursor()

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { setSeoModalOpen(false); setStrategyModalOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (seoModalOpen || strategyModalOpen) ? 'hidden' : ''
  }, [seoModalOpen, strategyModalOpen])

  const openSEO      = () => setSeoModalOpen(true)
  const openStrategy = () => setStrategyModalOpen(true)

  return (
    <>
      <div id="scroll-progress" />
      <div id="cursor" />
      <div id="cursor-ring" />

      <Toaster position="top-right" toastOptions={{
        style: { background:'#0a1628', color:'#e2e8f0', border:'1px solid rgba(14,165,233,0.3)', borderRadius:'12px', fontSize:'0.875rem' },
      }} />

      <Particles />

      <Navbar onSEO={openSEO} onStrategy={openStrategy} />

      <main>
        <Hero       onSEO={openSEO} onStrategy={openStrategy} />
        <TrustBar />
        <Stats />
        <About />
        <Services />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Dashboard />
        <Testimonials />
        <FAQ />
        <FinalCTA onSEO={openSEO} onStrategy={openStrategy} />
      </main>

      <Footer />

      {seoModalOpen && (
        <SEOModal onClose={() => setSeoModalOpen(false)}
          onSwitchToStrategy={() => { setSeoModalOpen(false); openStrategy() }} />
      )}
      {strategyModalOpen && (
        <StrategyModal onClose={() => setStrategyModalOpen(false)} />
      )}
    </>
  )
}
