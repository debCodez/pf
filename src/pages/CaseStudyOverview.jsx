import { scrollToSection } from './caseStudySections.js'
import './CaseStudy.css'

const MOMENTS = [
  { label: 'Points on bill payment', id: 'vera-repayments' },
  { label: 'Redeeming reward points', id: 'redeem-points' },
  { label: 'Card issuance loading animation', id: 'card-issuance' },
]

export default function CaseStudyOverview() {
  return (
    <div className="cs-page">
      <div className="cs-content">
        <p className="cs-overview-p">
          Vera is Zeta's prime credit card product for the US market, built around its
          flagship rewards programme. As a prime offering, Vera's biggest design challenge
          is not just rewarding spends, but also rewarding the right behaviours: on-time repayment
          often overlooked by traditional rewards structures.
        </p>
        <p className="cs-overview-p">
          I worked on multiple flows of this product, but the work I'm most proud of are the
          delight elements - the small, human moments layered into an otherwise functional,
          transactional product. The case study ahead walks through three such moments, each its
          own design problem in making a financial interaction feel less like a task and more like
          a relationship:
        </p>

        <ol className="cs-overview-list">
          {MOMENTS.map(({ label, id }) => (
            <li key={id}>
              <button className="cs-overview-link" onClick={() => scrollToSection(id)}>
                {label}
              </button>
            </li>
          ))}
        </ol>

        {/* Only cue on the study's opening screen: says "keep going" without
            naming a destination, since the list above already does that. */}
        <button
          className="cs-scroll-cue"
          onClick={() => scrollToSection(MOMENTS[0].id)}
          aria-label="Scroll to the first part"
        >
          {/* Three stacked chevrons, each lighter and a beat later than the one
              above it, so the eye is drawn downward. */}
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              className="cs-scroll-cue-chevron"
              style={{ animationDelay: `${i * 0.14}s`, opacity: 1 - i * 0.22 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9.5 12 15.5 18 9.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </button>
      </div>
    </div>
  )
}
