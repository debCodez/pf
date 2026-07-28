import { useEffect, useState } from 'react'
import { usePageTransition } from './PageTransition.jsx'
import ResumeLink from './ResumeLink.jsx'
import cover from './assets/cover2.png'
import cover3 from './assets/cover3.png'
import coverAi from './assets/card-ring.png'
import shot1 from './assets/Shot1.png'
import shot2 from './assets/Shot2.png'
import shot3 from './assets/Shot3.png'
import shot4 from './assets/Shot4.png'
import './App.css'

/* The cover rests at index 0; hovering flips through the shots that follow it. */
const DELIGHT_SHOTS = [shot1, shot2, shot3, shot4]
const DELIGHT_FRAMES = [cover, ...DELIGHT_SHOTS]
const FRAME_MS = 300
const START_DELAY_MS = 500

const EXPERIENCE = [
  { role: 'Zeta UX Designer - I', date: 'Dec 2024 – Present' },
  { role: 'CodeChef Product Designer', date: 'April 2023 – Dec 2024 · 1yr 9 mos' },
  { role: 'Groww Graphic Design Intern', date: 'Sep 2022 – Feb 2023 · 6 mos' },
]

function App() {
  const go = usePageTransition()
  const [hovering, setHovering] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [frame, setFrame] = useState(0)

  // The cover holds briefly after the pointer arrives, then the shots cycle.
  // Leaving resets everything back to the cover.
  useEffect(() => {
    if (!hovering) {
      setPlaying(false)
      setFrame(0)
      return
    }
    let interval
    const start = setTimeout(() => {
      setPlaying(true)
      interval = setInterval(
        () => setFrame((f) => (f + 1) % DELIGHT_SHOTS.length),
        FRAME_MS,
      )
    }, START_DELAY_MS)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [hovering])

  // Index into DELIGHT_FRAMES: 0 is the cover, 1+ are the shots.
  const activeFrame = playing ? frame + 1 : 0

  return (
    <div className="landing">
      <header className="landing-bar">
        <ResumeLink className="landing-resume" />
      </header>

      <main className="landing-main">
        <section className="intro">
          <h1 className="intro-title">Debrupa Nag</h1>
          <div className="intro-body">
            <p>I'm a product designer currently working at Zeta. I have 3 years of experience, working on 0 → 1 projects as well as products focused on growth experiments.</p>
            <p>I dive in first, figure it out along the way. I ask around, pull in the right people, solve things together.</p>
            <p>I believe in good storytelling. And in making experiences fun and immersive.<br />
            I love visual and motion-heavy craft. Always up for learning a new tool if the problem needs it.</p>
          </div>
        </section>

        <section className="projects">
          <article
            className="project-card project-card--clickable"
            onClick={() => go('/case-study/overview')}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="project-text">
              <p className="project-eyebrow">CASE STUDY #1<span className="eyebrow-sep">•</span>ZETA</p>
              <h2 className="project-title">Design for Delight</h2>
              <p className="project-desc">Enhanced the experience of rewards module for a US credit card app for near prime and prime users.</p>
            </div>
            {/* All frames stay mounted so swapping never waits on a fetch. */}
            <div className="project-media project-media--stack">
              {DELIGHT_FRAMES.map((src, i) => (
                <img
                  key={src}
                  className="project-media-img"
                  src={src}
                  alt=""
                  loading="lazy"
                  style={{ opacity: i === activeFrame ? 1 : 0 }}
                />
              ))}
            </div>
          </article>

          <article
            className="project-card project-card--clickable"
            onClick={() => window.open('https://medium.com/@debrupanag/how-a-product-idea-nearly-doubled-the-chances-of-conversions-for-revenue-for-an-ed-tech-platform-b7ed758fe544?sharedUserId=debrupanag', '_blank', 'noopener,noreferrer')}
          >
            <div className="project-text">
              <p className="project-eyebrow">CASE STUDY #2<span className="eyebrow-sep">•</span>CODECHEF</p>
              <h2 className="project-title">Design for Revenue</h2>
              <p className="project-desc">How Data-Driven Productisation Led to 2X Conversions in Ed-Tech Revenue Funnel</p>
            </div>
            <div className="project-media">
              <img className="project-media-img" src={cover3} alt="" loading="lazy" />
            </div>
          </article>

          <article
            className="project-card project-card--clickable"
            onClick={() => go('/case-study/design-with-ai')}
          >
            <div className="project-text">
              <p className="project-eyebrow">CASE STUDY #3<span className="eyebrow-sep">•</span>ZETA</p>
              <h2 className="project-title">Design with AI</h2>
              <p className="project-desc">Designing AI-driven workflows and internal tools that speed up how teams get work done.</p>
            </div>
            <div className="project-media">
              <img className="project-media-img" src={coverAi} alt="" loading="lazy" />
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
      </main>

      <footer className="landing-footer" />
    </div>
  )
}

export default App
