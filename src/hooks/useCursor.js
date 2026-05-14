import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const moveCursor = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`
    }

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`
      requestAnimationFrame(animRing)
    }

    document.addEventListener('mousemove', moveCursor)
    animRing()

    // Hover effect on buttons/links
    const handleHoverIn = () => cursor.style.transform += ' scale(2)'
    const handleHoverOut = () => {}
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
    }
  }, [])
}
