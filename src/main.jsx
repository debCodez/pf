import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CaseStudyStory from './pages/CaseStudyStory.jsx'
import CaseStudyLayout from './pages/CaseStudyLayout.jsx'
import CaseStudyAI from './pages/CaseStudyAI.jsx'
import CaseStudyInteractions from './pages/CaseStudyInteractions.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import ShaderBackground from './ShaderBackground.jsx'
import { PageTransitionProvider } from './PageTransition.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ShaderBackground />
      <PageTransitionProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route element={<CaseStudyLayout />}>
            <Route path="/case-study" element={<CaseStudyStory />} />
          </Route>
          {/* The study used to be four routes; keep those URLs working by
              sending them to their section of the single scroll. */}
          <Route path="/case-study/overview" element={<Navigate to="/case-study" replace />} />
          <Route path="/case-study/vera-repayments" element={<Navigate to="/case-study#vera-repayments" replace />} />
          <Route path="/case-study/redeem-points" element={<Navigate to="/case-study#redeem-points" replace />} />
          <Route path="/case-study/card-issuance" element={<Navigate to="/case-study#card-issuance" replace />} />
          <Route path="/case-study/design-with-ai" element={<CaseStudyAI />} />
          <Route path="/case-study/interactions" element={<CaseStudyInteractions />} />
        </Routes>
      </PageTransitionProvider>
    </BrowserRouter>
  </StrictMode>,
)
