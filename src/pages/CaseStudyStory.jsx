import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CaseStudyOverview from './CaseStudyOverview.jsx'
import CaseStudy from './CaseStudy.jsx'
import CaseStudyRedeem from './CaseStudyRedeem.jsx'
import CaseStudyCardLoader from './CaseStudyCardLoader.jsx'
import { SECTION_IDS, scrollToSection } from './caseStudySections.js'
import './CaseStudy.css'

/* Order matches SECTION_IDS and the sidebar's TABS. */
const PARTS = [CaseStudyOverview, CaseStudy, CaseStudyRedeem, CaseStudyCardLoader]

/* The whole Vera study reads as one continuous scroll; each part keeps its own
   component and is stacked here rather than living behind its own route. */
export default function CaseStudyStory() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const sectionRefs = useRef([])

  // A part waits, invisible, until its top reaches the upper quarter of the
  // screen — then it fades and slides into place, once. Nothing else is tied to
  // the scroll, so reading inside a part is ordinary scrolling.
  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean)
    const reveal = (el) => el.classList.add('cs-section--in')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(reveal)
      return
    }

    // The observed band is the top half of the viewport, so a part reveals as
    // its top crosses the middle of the screen — early enough that it is
    // already there as you arrive, without appearing at the bottom edge.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        reveal(e.target)
        io.unobserve(e.target)
      }),
      { rootMargin: '0px 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // The opening scroll cue retires as soon as the reader takes the hint. The
  // arriving scroll position settles a frame or two after mount (the route
  // change resets it), so re-check then — otherwise a stale offset from the
  // previous page hides the cue before it is ever seen.
  useEffect(() => {
    const sync = () => {
      document.documentElement.classList.toggle('cs-scrolled', window.scrollY > 8)
    }
    sync()
    const frame = requestAnimationFrame(sync)
    const settle = setTimeout(sync, 300)
    window.addEventListener('scroll', sync, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
      window.removeEventListener('scroll', sync)
      document.documentElement.classList.remove('cs-scrolled')
    }
  }, [])

  // Deep links (and the old per-part URLs, which redirect here with a hash)
  // land on the right section instead of the top.
  useEffect(() => {
    if (!hash) return
    scrollToSection(hash.slice(1), 'auto')
  }, [hash])

  return (
    <div className="cs-story">
      {PARTS.map((Part, i) => (
        <section
          className="cs-section"
          id={SECTION_IDS[i]}
          key={SECTION_IDS[i]}
          ref={(el) => { sectionRefs.current[i] = el }}
        >
          <Part />
        </section>
      ))}

      {/* End of the study: always just a way forward to the next project. */}
      <nav className="cs-story-nav">
        <div className="cs-story-nav-inner">
          <button
            className="cs-navlink"
            onClick={() => navigate('/case-study/interactions')}
          >
            Next project
          </button>
        </div>
      </nav>
    </div>
  )
}
