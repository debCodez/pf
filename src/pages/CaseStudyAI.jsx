import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import CaseStudyVideo from './CaseStudyVideo.jsx'
import './CaseStudy.css'

const PROJECTS = [
  {
    kind: 'Workflow and Product',
    body: 'Vibe-coded a functional prototype of our products to test interactions and design options. Builds were released to design and product stakeholders so they could try the experience on their own devices with each new release.',
    tools: 'Started with Figma Make — eventually moved to Flutter builds built with Cursor, Model: Composer 2.5.',
    video: '/ProtoSetup.mp4',
  },
  {
    kind: 'Website and Web-based Tool',
    body: 'Created a site for the marketing team — strategists, copywriters, etc. — combining a brand guideline site with a built-in tool to speed up post generation for an MVP product.',
    tools: 'Cursor, Model: Composer 2.5.',
    video: '/BrandSite.mp4',
    // Footage of a white UI — a black panel would frame it with hard bars.
    panel: 'cs-mockup--light',
  },
  {
    kind: 'Web-based Tool',
    body: 'Created an internal tool for designers to test their Lotties across various renderers before dev handoff.',
    tools: 'Claude Code.',
    video: '/LottiePreviewer.mp4',
    panel: 'cs-mockup--grey',
    link: {
      href: 'https://debcodez.github.io/lottie-previewer/',
      text: 'Feedback welcome — it is in the making',
    },
  },
]

export default function CaseStudyAI() {
  const navigate = useNavigate()

  return (
    <>
      <div className="cs-topbar">
        <button className="cs-back" onClick={() => navigate('/')} aria-label="Back to home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* No sidebar on this case study, so the content keeps the full width. */}
      <div className="cs-page cs-page--full">
        <div className="cs-content">
          <h1 className="cs-title">Design with AI</h1>
          {PROJECTS.map(({ kind, body, tools, video, image, alt, link, panel }, i) => (
            <Fragment key={kind}>
              <section className="cs-ai-project">
                {video && (
                  <CaseStudyVideo
                    src={video}
                    hasSound={false}
                    showRestart={false}
                    className={`cs-mockup--flush ${panel || ''}`.trim()}
                  />
                )}
                {image && (
                  <img src={image} alt={alt} className="cs-mockup cs-mockup--tight" />
                )}
                {/* Placeholder panel — swap for an image or video like the ones above. */}
                {!video && !image && <div className="cs-mockup" aria-hidden="true" />}
                <h2 className="cs-ai-kind">{kind}</h2>
                <p className="cs-body">{body}</p>
                <p className="cs-ai-tools">({tools})</p>
                {link && (
                  <a
                    className="cs-ai-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                )}
              </section>
              {i < PROJECTS.length - 1 && <hr className="cs-ai-divider" />}
            </Fragment>
          ))}

          {/* End of the last study: back to Interactions, or out to the landing page
              (last in the sequence, so Home stands in for Next). */}
          <nav className="cs-story-nav-inner cs-ai-nav">
            <button className="cs-navlink" onClick={() => navigate('/case-study/interactions')}>
              Prev
            </button>
            <button className="cs-navlink" onClick={() => navigate('/')}>
              Home
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
