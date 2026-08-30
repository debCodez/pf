import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

/* Static case-study mockup image with an enlarge control, mirroring
   CaseStudyVideo's modal (same frame, overlay, and expand/minimize icon). */
export default function CaseStudyImage({ src, alt = '', className = '' }) {
  const [expanded, setExpanded] = useState(false)

  // Locks background scroll while the modal is open, and lets Escape close it.
  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => { if (e.key === 'Escape') setExpanded(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [expanded])

  return (
    <div className="cs-video">
      <img
        src={src}
        alt={alt}
        className={`cs-mockup cs-mockup--clickable ${className}`.trim()}
        onClick={() => setExpanded(true)}
      />

      <div className="cs-video-controls">
        <button type="button" className="cs-video-btn" onClick={() => setExpanded(true)} aria-label="Enlarge image">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7" />
          </svg>
        </button>
      </div>

      {expanded && createPortal(
        <div className="cs-video-overlay" onClick={() => setExpanded(false)}>
          <div className="cs-video-modal cs-video-modal--scroll" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt} className="cs-image-modal-img" />
            <button
              type="button"
              className="cs-image-modal-close"
              onClick={() => setExpanded(false)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
