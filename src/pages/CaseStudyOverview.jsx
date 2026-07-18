import { useNavigate } from 'react-router-dom'
import './CaseStudy.css'

const MOMENTS = [
  { label: 'Points on bill payment', path: '/case-study/vera-repayments' },
  { label: 'Redeeming reward points', path: '/case-study/redeem-points' },
  { label: 'Card issuance loading animation', path: '/case-study/card-issuance' },
]

export default function CaseStudyOverview() {
  const navigate = useNavigate()

  return (
    <div className="cs-page">
      <div className="cs-content">
        <p className="cs-overview-p">
          Vera is Zeta's near-prime credit card product for the US market, built around its
          flagship rewards programme. As a near-prime offering, Vera's biggest design challenge
          is not just rewarding spends, but also rewarding the right behaviours: on-time repayment
          often overlooked by traditional rewards structures.
        </p>
        <p className="cs-overview-p">
          I worked on multiple flows of this product, but the work I'm most proud of are the
          delight elements — the small, human moments layered into an otherwise functional,
          transactional product. The case study ahead walks through three such moments, each its
          own design problem in making a financial interaction feel less like a task and more like
          a relationship:
        </p>

        <ol className="cs-overview-list">
          {MOMENTS.map(({ label, path }) => (
            <li key={path}>
              <button className="cs-overview-link" onClick={() => navigate(path)}>
                {label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
