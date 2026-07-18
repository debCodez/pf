import { usePageTransition } from './PageTransition.jsx'
import './App.css'

const EXPERIENCE = [
  { role: 'Zeta UX Designer - II', date: 'Dec 2024 – Present' },
  { role: 'CodeChef Product Designer', date: 'April 2023 – Dec 2024 · 1yr 9 mos' },
  { role: 'Groww Graphic Design Intern', date: 'Sep 2022 – Feb 2023 · 6 mos' },
]

function App() {
  const go = usePageTransition()

  return (
    <div className="landing">
      <header className="landing-bar" />

      <main className="landing-main">
        <section className="intro">
          <h1 className="intro-title">Hello. I'm Deb</h1>
          <div className="intro-body">
            <p>I'm a product designer with 3 years of experience, working on 0 → 1 projects as well as products focused on growth experiments.</p>
            <p>I dive in first, figure it out along the way. I ask around, pull in the right people, solve things together.</p>
            <p>I believe in good storytelling. And in making experiences fun and immersive.<br />
            I love visual and motion-heavy craft. Always up for learning a new tool if the problem needs it.</p>
          </div>
        </section>

        <section className="projects">
          <article
            className="project-card project-card--clickable"
            onClick={() => go('/case-study/overview')}
          >
            <div className="project-text">
              <h2 className="project-title">Design for Delight</h2>
              <p className="project-desc">Enhanced the experience of rewards module for a US credit card app for near prime and prime users.</p>
            </div>
            <div className="project-media" />
          </article>

          <article
            className="project-card project-card--clickable"
            onClick={() => window.open('https://medium.com/@debrupanag/how-a-product-idea-nearly-doubled-the-chances-of-conversions-for-revenue-for-an-ed-tech-platform-b7ed758fe544?sharedUserId=debrupanag', '_blank', 'noopener,noreferrer')}
          >
            <div className="project-text">
              <h2 className="project-title">Design for Revenue</h2>
              <p className="project-desc">How Data-Driven Productisation Led to 2X Conversions in Ed-Tech Revenue Funnel</p>
            </div>
            <div className="project-media" />
          </article>
        </section>

        <section className="experience">
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
