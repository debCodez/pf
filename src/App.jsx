import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import smiley from './assets/smiley.svg'

const STICKY_TOP = 72

function App() {
  const cardRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    const cards = cardRefs.current
    const html = document.documentElement
    let animating = false
    let wheelTimer = null
    let lastDeltaY = 0
    let peakDeltaY = 0
    let touchStartY = 0
    let currentIdx = 0

    // Compute once at mount — snap points don't change
    const snapPoints = [...document.querySelectorAll('.snap-anchor')].map(el =>
      Math.max(0, el.offsetTop - STICKY_TOP)
    )

    const snapTo = (target) => {
      animating = true
      html.style.scrollSnapType = 'none'
      const start = window.scrollY
      const dist = target - start
      const duration = 120
      const t0 = performance.now()
      const tick = (now) => {
        const t = Math.min((now - t0) / duration, 1)
        window.scrollTo(0, start + dist * (1 - Math.pow(1 - t, 6)))
        if (t < 1) requestAnimationFrame(tick)
        else { animating = false; html.style.scrollSnapType = '' }
      }
      requestAnimationFrame(tick)
    }

    const onWheel = (e) => {
      e.preventDefault()
      if (animating) return
      const min = snapPoints[0] ?? 0
      const max = snapPoints[snapPoints.length - 1] ?? 0
      window.scrollTo(0, Math.max(min, Math.min(max, window.scrollY + e.deltaY)))
      lastDeltaY = e.deltaY
      peakDeltaY = Math.max(peakDeltaY, Math.abs(e.deltaY))
      clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => {
        const dir = lastDeltaY > 0 ? 1 : -1
        const isJerk = peakDeltaY > 400
        const next = isJerk
          ? (dir > 0 ? snapPoints.length - 1 : 0)
          : Math.max(0, Math.min(snapPoints.length - 1, currentIdx + dir))
        peakDeltaY = 0
        currentIdx = next
        snapTo(snapPoints[next])
      }, 60)
    }

    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const onTouchEnd = (e) => {
      if (animating) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) < 5) return
      const dir = dy > 0 ? 1 : -1
      const next = Math.max(0, Math.min(snapPoints.length - 1, currentIdx + dir))
      currentIdx = next
      snapTo(snapPoints[next])
    }

    // progress for card i: 0 when it's the active card, 1 when the next card fully covers it
    const onScroll = () => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        const progress = Math.max(0, Math.min(1,
          (window.scrollY - snapPoints[i]) / (snapPoints[i + 1] - snapPoints[i])
        ))
        card.style.transform = `scale(${1 - progress * 0.15})`
        card.style.opacity = 1 - progress
      })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      clearTimeout(wheelTimer)
    }
  }, [])

  return (
    <div className="page">
      <div className="snap-anchor" />
      <div className="card" style={{ zIndex: 1 }} ref={el => cardRefs.current[0] = el}>
        <div className="content">
          <img src={smiley} alt="" className="wave" />
          <h1 className="heading">
            Hello <br />
            I'm Deb
          </h1>
          <div className="body">
            <p>I'm a product designer with 3 years of experience, currently working on 0 → 1 projects as well as products focused on growth experiments.</p>
            <p>I dive in first, figure it out along the way. I ask around, pull in the right people, solve things together.</p>
            <p>I believe in good storytelling. And in making experiences fun and immersive.<br />
            I love visual and motion-heavy craft. Always up for learning a new tool if the problem needs it.</p>
          </div>
        </div>
      </div>
      <div className="card-spacer" />
      <div className="snap-anchor" />
      <div
        className="card card--clickable"
        style={{ zIndex: 2 }}
        ref={el => cardRefs.current[1] = el}
        onClick={() => navigate('/case-study/vera-repayments')}
      >
        <p className="prompt-text">
          Users earn points for repaying credit card bills. Make it delightful.
        </p>
      </div>
      <div className="card-spacer" />
      <div className="snap-anchor" />
      <div
        className="card"
        style={{ zIndex: 3 }}
        ref={el => cardRefs.current[2] = el}
      >
        <p className="prompt-text">
          Redeeming points takes time. Make the wait enjoyable.
        </p>
      </div>
    </div>
  )
}

export default App
