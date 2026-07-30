import './CaseStudy.css'
import CaseStudyVideo from './CaseStudyVideo.jsx'

export default function CaseStudyRedeem() {
  return (
    <div className="cs-page">
      <div className="cs-content">

        <div className="cs-brief">
          <span className="cs-quote">&ldquo;</span>
          <p className="cs-brief-text">
            Redeeming reward points take time to process. Make the wait feel delightful. Not like a friction.
          </p>
        </div>

        <CaseStudyVideo src="/RedemptionFinal.mp4" />

        <h2 className="cs-heading">Backstory &amp; Process</h2>

        <p className="cs-body">
          The redemption animation followed a very similar path - story first, visuals next, then animation.
        </p>
        <p className="cs-body">
          We had a first version ready. But when we looked at it more closely, we ran into a practical problem.
          There's a waiting period in the redemption flow - the app needs a few seconds to process the redeemed money.
        </p>

        <CaseStudyVideo src="/olditr.mp4" hasSound={false} caption="Old version" />

        <p className="cs-body">
          Our animation wasn't built around that, so it ended up feeling awkward for the user rather than smooth.
        </p>
        <p className="cs-body">
          So we went back to the drawing board and thought about how to design around that waiting time -{' '}
          <em><strong>make it feel like part of the experience rather than a pause</strong></em>.
        </p>
        <p className="cs-body">
          We also looked at how some other apps handle similar moments and took a few cues from there.
          Once we had a direction that felt right, we put together some visual frames for the team to review.
          After that, we built the full animation and stitched the whole flow together with sound and haptics.
        </p>

      </div>
    </div>
  )
}
