import { useRef, useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { SECTIONS as TABS, SECTION_IDS, scrollToSection } from './caseStudySections.js'
import './CaseStudy.css'

export default function CaseStudyLayout() {
  const navigate = useNavigate()
  const itemRefs = useRef([])
  const dotRef = useRef(null)
  const dotAnimRef = useRef(null)
  const currentPosRef = useRef(null)
  const [dotPos, setDotPos] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const activeIdxRef = useRef(activeIdx)
  activeIdxRef.current = activeIdx

  // Scroll spy: the section whose top most recently crossed the reading line
  // owns the sidebar's active state.
  useEffect(() => {
    const READ_LINE = 0.35 // fraction of the viewport height
    const onScroll = () => {
      const line = window.innerHeight * READ_LINE
      let idx = 0
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) idx = i
      })
      setActiveIdx(idx)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = itemRefs.current[activeIdx]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const targetPos = { top: rect.top + rect.height / 2, left: rect.right + 12 }

    if (!currentPosRef.current) {
      // First render — place dot instantly, no animation
      currentPosRef.current = targetPos
      setDotPos(targetPos)
      return
    }

    const startPos = currentPosRef.current
    currentPosRef.current = targetPos
    setDotPos(targetPos)

    const dot = dotRef.current
    if (!dot) return

    if (dotAnimRef.current) dotAnimRef.current.cancel()

    const dy = targetPos.top - startPos.top
    const dx = targetPos.left - startPos.left
    const arcBulge = Math.min(Math.abs(dy) * 0.5, 24) // how far right the arc swings

    const STEPS = 30
    const keyframes = Array.from({ length: STEPS + 1 }, (_, i) => {
      const t = i / STEPS
      const arc = arcBulge * 4 * t * (1 - t) // parabola: 0 → peak at t=0.5 → 0
      return {
        top: `${startPos.top + dy * t}px`,
        left: `${startPos.left + dx * t + arc}px`,
        transform: 'translateY(-50%)',
      }
    })

    dotAnimRef.current = dot.animate(keyframes, {
      duration: 500,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards',
    })
  }, [activeIdx])

  // The dot is anchored to the active label's measured right edge. That
  // measurement is only correct once the web fonts have swapped in (they widen
  // the text) and after any resize — otherwise the dot lands on top of the text.
  // Mount-only: re-snapping on tab change would cancel the arc animation the
  // other effect just started, so this reads the active tab from a ref instead.
  useEffect(() => {
    const snap = () => {
      const el = itemRefs.current[activeIdxRef.current]
      const dot = dotRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const pos = { top: rect.top + rect.height / 2, left: rect.right + 12 }
      currentPosRef.current = pos
      if (dot) {
        dot.style.top = `${pos.top}px`
        dot.style.left = `${pos.left}px`
      }
      setDotPos(pos)
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(snap)
    window.addEventListener('resize', snap)
    return () => window.removeEventListener('resize', snap)
  }, [])

  return (
    <>
      <div className="cs-topbar">
        <button className="cs-back" onClick={() => navigate('/')} aria-label="Back to home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <span className="cs-sidebar-divider" aria-hidden="true" />
      <nav className="cs-sidebar">
        {TABS.map((tab, idx) => (
          <span
            key={tab.label}
            ref={el => itemRefs.current[idx] = el}
            className={`cs-sidebar-item${idx === activeIdx ? ' cs-sidebar-item--active' : ''}`}
            onClick={() => { if (idx !== activeIdx) scrollToSection(tab.id) }}
            style={{ cursor: idx !== activeIdx ? 'pointer' : 'default' }}
          >
            {tab.label}
          </span>
        ))}
      </nav>
      {dotPos && (
        <span
          ref={dotRef}
          className="cs-sidebar-dot"
          style={{ top: dotPos.top, left: dotPos.left }}
          aria-hidden="true"
        />
      )}
      <Outlet />
    </>
  )
}
