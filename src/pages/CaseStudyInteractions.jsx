import { useNavigate } from 'react-router-dom'
import CaseStudyVideo from './CaseStudyVideo.jsx'
import './CaseStudy.css'

export default function CaseStudyInteractions() {
  const navigate = useNavigate()

  return (
    <>
      <div className="cs-topbar">
        <button className="cs-back" onClick={() => navigate('/')} aria-label="Back to home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* No sidebar on this case study, so the content keeps the full width. */}
      <div className="cs-page cs-page--full">
        <div className="cs-content">
          <h1 className="cs-title">Interactions</h1>

          <p className="cs-body">
            Lumen is for the subprime/near-prime UK market. Client wants it simple, minimal,
            functional, utilitarian. No unnecessary flourish.
          </p>

          <h2 className="cs-heading">1. Monthly Spend Limit</h2>
          <p className="cs-body">
            Lets users cap their own card spend so they can keep usage in check.
          </p>
          <ul className="cs-list">
            <li>
              <strong>Hypothesis:</strong> users think in whole numbers. Granular control
              (decimals, sliders, fine increments) is overkill, keep the input dead simple.
            </li>
            <li>
              <strong>Edge case to handle:</strong> if a user's already spent up to their limit
              within the current billing cycle, the UI needs to make that obvious. Further
              transactions won't go through, and that shouldn't be a surprise.
            </li>
          </ul>

          <CaseStudyVideo src="/SpendLimit.mp4" hasSound={false} />

          <h2 className="cs-heading">2. Credit Limit Increase Offer</h2>
          <p className="cs-body">
            Eligible users get a nudge to accept or decline a CL increase, giving them more room
            on their card.
          </p>
          <ul className="cs-list">
            <li>
              <strong>Design goal:</strong> just enough delight that it feels like good news,
              without going bling. Needs to stay within Lumen's restrained style, celebratory but
              not flashy.
            </li>
          </ul>

          <CaseStudyVideo src="/Lumen-CLI.mp4" hasSound={false} />

          <nav className="cs-story-nav-inner cs-ai-nav">
            <button className="cs-navlink" onClick={() => navigate('/case-study/design-with-ai')}>
              Next project
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
