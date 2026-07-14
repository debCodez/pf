import './CaseStudy.css'

export default function CaseStudyCardLoader() {
  return (
    <div className="cs-page">
      <div className="cs-content">

        <video
          src="/cardloader.mp4"
          className="cs-mockup"
          autoPlay
          loop
          muted
          playsInline
        />

      </div>
    </div>
  )
}
