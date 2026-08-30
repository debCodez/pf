import { useEffect, useState } from 'react'
import { usePageTransition } from './PageTransition.jsx'
import { RESUME_URL } from './ResumeLink.jsx'
import shot1 from './assets/Shot1.png'
import shot2 from './assets/Shot2.png'
import shot3 from './assets/Shot3.png'
import shot4 from './assets/Shot4.png'
import featureDefault from './assets/Default.png'
import interactionsDefault from './assets/Default-2.png'
import aiDefault from './assets/Default-3.png'
import revenueDefault from './assets/Default-4.png'
import profilePic from './assets/profile.png'
import './App.css'

/* The resting frame sits at index 0; hovering flips through the shots that follow it. */
const DELIGHT_SHOTS = [shot1, shot2, shot3, shot4]
const FEATURE_FRAMES = [featureDefault, ...DELIGHT_SHOTS]
const FRAME_MS = 300
const START_DELAY_MS = 500

/* Drives a hover flipbook: holds on the resting frame briefly after the pointer
   arrives, then cycles the shots that follow it. Leaving resets to the rest frame. */
function useFlipbook(shotCount) {
  const [hovering, setHovering] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!hovering) {
      setPlaying(false)
      setFrame(0)
      return
    }
    let interval
    const start = setTimeout(() => {
      setPlaying(true)
      interval = setInterval(() => setFrame((f) => (f + 1) % shotCount), FRAME_MS)
    }, START_DELAY_MS)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [hovering, shotCount])

  // Index into the frames array: 0 is the resting frame, 1+ are the shots.
  const activeFrame = playing ? frame + 1 : 0
  return { hovering, setHovering, activeFrame }
}

/* Tracks pointer position for the "View case study" ghost cursor: a label that
   follows the pointer while it's over a case-study card. */
function useGhostCursor() {
  const [state, setState] = useState({ active: false, x: 0, y: 0 })
  return {
    ...state,
    // Syncs position on the same event so the pill never shows at a stale spot
    // left over from whichever card the pointer was over before this one.
    show: (e) => setState((s) => ({ ...s, active: true, x: e.clientX, y: e.clientY })),
    hide: () => setState((s) => ({ ...s, active: false })),
    move: (e) => setState((s) => ({ ...s, x: e.clientX, y: e.clientY })),
  }
}

const EXPERIENCE = [
  { role: 'Zeta UX Designer - II', date: 'July 2026 – Present' },
  { role: 'Zeta UX Designer - I', date: 'Dec 2024 – July 2026 · 1yr 7 mos' },
  { role: 'CodeChef Product Designer', date: 'April 2023 – Dec 2024 · 1yr 9 mos' },
  { role: 'Groww Graphic Design Intern', date: 'Sep 2022 – Feb 2023 · 6 mos' },
]

const EMAIL = 'debrupanag003@gmail.com'

const QUICK_LINKS = [
  { label: EMAIL, copy: EMAIL },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/debrupa-nag/' },
]

function App() {
  const go = usePageTransition()
  const feature = useFlipbook(DELIGHT_SHOTS.length)
  const ghost = useGhostCursor()
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 1500)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="landing">
      <header className="landing-bar" />

      <a className="resume-cta" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
        Resume
      </a>

      <main className="landing-main">
        <section className="intro">
          <img className="profile-pic" src={profilePic} alt="Debrupa Nag" />
          <h1 className="intro-title">Debrupa Nag</h1>
          <div className="intro-body">
            <p>I am a product designer at <a className="inline-link" href="https://www.zeta.tech/us/" target="_blank" rel="noopener noreferrer">Zeta</a>. 3 years in, split between 0→1 builds and growth-focused work.
            <br /><br />
            Good storytelling makes me happy. So does making things fun and immersive.<br />
            Visual, motion-heavy craft is where I live. New tool, new problem? I'm in.</p>
          </div>
        </section>

        <p className="project-eyebrow feature-eyebrow">SELECTED WORKS</p>

        <section className="feature">
          <article
            className="feature-card"
            onClick={() => go('/case-study')}
            onMouseEnter={(e) => { feature.setHovering(true); ghost.show(e) }}
            onMouseMove={ghost.move}
            onMouseLeave={() => { feature.setHovering(false); ghost.hide() }}
          >
            <div className="feature-card-media feature-card-media--stack">
              {FEATURE_FRAMES.map((src, i) => (
                <img
                  key={src}
                  className="feature-card-phone"
                  src={src}
                  alt=""
                  loading="lazy"
                  style={{ opacity: i === feature.activeFrame ? 1 : 0 }}
                />
              ))}
            </div>
            <div className="feature-card-text">
              <p className="feature-card-title">Design for delight</p>
              <p className="feature-card-desc">Bunch of fire and forget animations for credit card rewards modules</p>
            </div>
          </article>

          <article
            className="feature-card"
            onClick={() => go('/case-study/interactions')}
            onMouseEnter={ghost.show}
            onMouseMove={ghost.move}
            onMouseLeave={ghost.hide}
          >
            <div className="feature-card-media">
              <img className="feature-card-phone" src={interactionsDefault} alt="" loading="lazy" />
            </div>
            <div className="feature-card-text">
              <p className="feature-card-title">Interactions</p>
              <p className="feature-card-desc">Designing fintech features with user control in mind</p>
            </div>
          </article>

          <article
            className="feature-card"
            onClick={() => go('/case-study/design-with-ai')}
            onMouseEnter={ghost.show}
            onMouseMove={ghost.move}
            onMouseLeave={ghost.hide}
          >
            <div className="feature-card-media">
              <img className="feature-card-phone" src={aiDefault} alt="" loading="lazy" />
            </div>
            <div className="feature-card-text">
              <p className="feature-card-title">Design with AI</p>
              <p className="feature-card-desc">Designing AI-driven workflows and internal tools that speed up how teams get work done.</p>
            </div>
          </article>

          <article
            className="feature-card"
            onClick={() => window.open('https://medium.com/@debrupanag/how-a-product-idea-nearly-doubled-the-chances-of-conversions-for-revenue-for-an-ed-tech-platform-b7ed758fe544?sharedUserId=debrupanag', '_blank', 'noopener,noreferrer')}
            onMouseEnter={ghost.show}
            onMouseMove={ghost.move}
            onMouseLeave={ghost.hide}
          >
            <div className="feature-card-media">
              <img className="feature-card-phone" src={revenueDefault} alt="" loading="lazy" />
            </div>
            <div className="feature-card-text">
              <p className="feature-card-title">Design for Revenue</p>
              <p className="feature-card-desc">How Data-Driven Productisation Led to 2X Conversions in Ed-Tech Revenue Funnel</p>
            </div>
          </article>
        </section>

        <section className="experience">
          <p className="project-eyebrow exp-eyebrow">WORK EXPERIENCE</p>
          {EXPERIENCE.map(({ role, date }) => (
            <div className="exp-row" key={role}>
              <span className="exp-role">{role}</span>
              <span className="exp-date">{date}</span>
            </div>
          ))}
        </section>

        <section className="experience quicklinks">
          <p className="project-eyebrow exp-eyebrow">QUICK LINKS</p>
          <div className="quicklink-row">
            {QUICK_LINKS.map(({ label, href, copy }, i) => (
              <span key={label}>
                {i > 0 && <span className="quicklink-sep" aria-hidden="true">|</span>}
                {copy ? (
                  <button type="button" className="quicklink quicklink--copy" onClick={copyEmail}>
                    {label}
                    {emailCopied ? (
                      <svg className="quicklink-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg className="quicklink-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                    <span className="quicklink-tooltip" role="tooltip">
                      {emailCopied ? 'Copied!' : 'Copy to clipboard'}
                    </span>
                  </button>
                ) : (
                  <a
                    className="quicklink"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                )}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="landing-footer" />

      <div className="ghost-cursor" style={{ transform: `translate(${ghost.x + 16}px, ${ghost.y}px)` }}>
        <div className={`ghost-cursor-pill${ghost.active ? ' ghost-cursor-pill--active' : ''}`}>
          <p className="ghost-cursor-label">View case study</p>
          <svg className="ghost-cursor-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M10.5 7H21V17.5M21 7L7.29167 20.7083" stroke="white" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App
