import './CaseStudy.css'
import CaseStudyVideo from './CaseStudyVideo.jsx'
import CaseStudyImage from './CaseStudyImage.jsx'
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.1.png'

export default function CaseStudy() {
  return (
    <div className="cs-page">
      <div className="cs-content">

        <div className="cs-brief">
          <span className="cs-quote">&ldquo;</span>
          <p className="cs-brief-text">
            When users repay their credit card bill, they earn reward points.
            Make this experience delightful
          </p>
        </div>

        <CaseStudyVideo src="/RepaymentFinal.mp4" />

        <h2 className="cs-heading">Backstory &amp; Process</h2>

        <p className="cs-body">
          For repayments, I started with a simple observation: Users come to the app once a month
          to pay their bill. That's really the one moment where we can remind them about the rewards
          they're earning. So we wanted to make that moment count.
        </p>
        <p className="cs-body">
          Our first idea was to animate around the reward programme logo. We even mocked it.
        </p>

        <CaseStudyVideo src="/RepaymentItr1-hq.mp4" hasSound={false} />

        <p className="cs-body">But, there were problems</p>

        <CaseStudyImage src={img1} alt="App screen - revised concept" className="cs-mockup--tight cs-mockup--tall" />
        <CaseStudyImage src={img2} alt="App screen - revised concept 2" className="cs-mockup--tight cs-mockup--tall" />

        <p className="cs-body">
          But when we looked at it, something felt off. It wasn't really showing the user what
          they actually care about.
        </p>
        <ol className="cs-list">
          <li>How many points do I have, and</li>
          <li>How did this payment just make that number go up.</li>
        </ol>
        <p className="cs-body">So we scrapped the first cut and started fresh with a clearer storyboard.</p>

        

        <p className="cs-body">
          The new version walks the user through it simply. You had this many points, you made a
          payment, the 1X programme gave you a bonus, and now you have 5,000 more points than before.
        </p>
        <p className="cs-body">
          Once we locked in the story, we tried out a few different visual layouts to see which one
          told it best. We refined the look, built out the full animation, and then put together a
          few key frames to walk the team through the idea before final sign-off.
        </p>

        <CaseStudyImage src={img3} alt="App screen - final design" className="cs-mockup--tall" />

      </div>
    </div>
  )
}
