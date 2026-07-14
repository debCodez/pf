import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import CaseStudyRedeem from './pages/CaseStudyRedeem.jsx'
import CaseStudyCardLoader from './pages/CaseStudyCardLoader.jsx'
import CaseStudyLayout from './pages/CaseStudyLayout.jsx'
import ScrollToTop from './ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<CaseStudyLayout />}>
          <Route path="/case-study/vera-repayments" element={<CaseStudy />} />
          <Route path="/case-study/redeem-points" element={<CaseStudyRedeem />} />
          <Route path="/case-study/card-issuance" element={<CaseStudyCardLoader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
