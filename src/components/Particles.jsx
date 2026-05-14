import React, { useEffect, useRef } from 'react'

export default function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const count = 40
    const particles = []

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const size = Math.random() * 3 + 1
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 20}%;
        animation-duration: ${8 + Math.random() * 15}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${0.3 + Math.random() * 0.4};
        background: ${Math.random() > 0.5 ? 'rgba(14,165,233,0.6)' : 'rgba(168,85,247,0.5)'};
      `
      container.appendChild(p)
      particles.push(p)
    }

    return () => particles.forEach(p => p.remove())
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  )
}
