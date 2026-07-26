import './CaseStudy.css'
import CaseStudyVideo from './CaseStudyVideo.jsx'

export default function CaseStudyCardLoader() {
  return (
    <div className="cs-page">
      <div className="cs-content">

        <h2 className="cs-heading">Card Issuance: Designing for the Wait</h2>

        <p className="cs-body">
          Once a user completes Vera's 4-step application, there's a gap - the card gets issued,
          but behind the scenes, consumer details are still being sent across to a third party.
          That handshake takes anywhere from 3 to 15 seconds, and that variability was the actual
          design problem: how do you make an unpredictable wait feel intentional instead of broken?
        </p>
        <p className="cs-body">
          Instead of one loading state, we built three:
        </p>

        <CaseStudyVideo src="/loaderWeb.mp4" hasSound={false} />

        <ol className="cs-list">
          <li>
            <span className="cs-list-lead">Fixed open (5-6 sec)</span><br />
            Same for everyone. Buys real processing time, and sets the tone - the card
            "coming to life."
          </li>
          <li>
            <span className="cs-list-lead">Dynamic middle (up to 7 sec)</span><br />
            Absorbs the actual uncertainty. A looping animation that reads as progress, not a
            countdown - works whether the backend takes 2 seconds or 9.
          </li>
          <li>
            <span className="cs-list-lead">Resolved end + CTA</span><br />
            Issuance confirms. Animation resolves. User moves forward - no dead stop, no "done"
            screen with nowhere to go.
          </li>
        </ol>

        <p className="cs-body">
          <strong>Result:</strong> one continuous animation, fixed start and end, flexible middle.
          The wait disappears into the experience instead of sitting on top of it as lag.
        </p>

      </div>
    </div>
  )
}
