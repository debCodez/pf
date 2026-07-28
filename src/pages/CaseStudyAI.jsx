import { useNavigate } from 'react-router-dom'
import ResumeLink from '../ResumeLink.jsx'
import './CaseStudy.css'

const PROJECTS = [
  {
    kind: 'Workflow and Product',
    body: 'Vibe-coded a functional prototype of our products to test interactions and design options. Builds were released to design and product stakeholders so they could try the experience on their own devices with each new release.',
    tools: 'Started with Figma Make — eventually moved to Flutter builds built with Cursor, Model: Composer 2.5.',
  },
  {
    kind: 'Website and Web-based Tool',
    body: 'Created a site for the marketing team — strategists, copywriters, etc. — combining a brand guideline site with a built-in tool to speed up post generation for an MVP product.',
    tools: 'Cursor, Model: Composer 2.5.',
  },
  {
    kind: 'Web-based Tool',
    body: 'Created an internal tool for designers to test their Lotties across various renderers before dev handoff.',
    tools: 'Claude Code.',
  },
]

export default function CaseStudyAI() {
  const navigate = useNavigate()

  return (
    <>
      <div className="cs-topbar">
        <button className="cs-back" onClick={() => navigate('/')} aria-label="Back to home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <ResumeLink className="cs-resume" />
      </div>

      {/* No sidebar on this case study, so the content keeps the full width. */}
      <div className="cs-page cs-page--full">
        <div className="cs-content">
          {PROJECTS.map(({ kind, body, tools }) => (
            <section className="cs-ai-project" key={kind}>
              {/* Placeholder panel — swap for an <img className="cs-mockup" /> */}
              <div className="cs-mockup" aria-hidden="true" />
              <h2 className="cs-ai-kind">{kind}</h2>
              <p className="cs-body">{body}</p>
              <p className="cs-ai-tools">({tools})</p>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
