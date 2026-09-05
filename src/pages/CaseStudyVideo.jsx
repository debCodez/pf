import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

/* Restart / sound / enlarge (or minimize, once expanded), reused for both the
   inline preview and the enlarged modal — each passes its own video ref. */
function VideoControls({ videoRef, showRestart, hasSound, muted, setMuted, expanded, setExpanded }) {
  const restart = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play()
  }

  return (
    <div className="cs-video-controls">
      {showRestart && (
        <button type="button" className="cs-video-btn" onClick={restart} aria-label="Restart video">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      )}
      {hasSound && (
        <button
          type="button"
          className="cs-video-btn"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          aria-pressed={!muted}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
              <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="m16 9 5 6m0-6-5 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
              <path stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
            </svg>
          )}
        </button>
      )}
      <button
        type="button"
        className="cs-video-btn"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? 'Minimize video' : 'Enlarge video'}
      >
        {expanded ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7" />
          </svg>
        )}
      </button>
    </div>
  )
}

/*
 * Autoplaying case-study mockup video with sound/restart/enlarge controls.
 * Browsers only allow autoplay while muted, so it starts muted; the corner
 * button lets the viewer opt into sound. React doesn't reliably reflect the
 * `muted` prop onto the element, so we drive it through the ref.
 */
export default function CaseStudyVideo({ src, className = '', hasSound = true, showRestart = true, caption }) {
  const ref = useRef(null)
  const modalRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (ref.current) ref.current.muted = muted
  }, [muted])

  // Pauses the background preview while the modal is open so only one audio track plays.
  useEffect(() => {
    if (!ref.current) return
    if (expanded) {
      ref.current.pause()
    } else {
      ref.current.play().catch(() => {})
    }
  }, [expanded])

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
      <video
        ref={ref}
        src={src}
        className={`cs-mockup cs-mockup--clickable ${className}`.trim()}
        autoPlay
        loop
        muted
        playsInline
        onClick={() => setExpanded(true)}
      />
      {caption && <span className="cs-video-caption">{caption}</span>}

      <VideoControls
        videoRef={ref}
        showRestart={showRestart}
        hasSound={hasSound}
        muted={muted}
        setMuted={setMuted}
        expanded={false}
        setExpanded={setExpanded}
      />

      {expanded && createPortal(
        <div className="cs-video-overlay" onClick={() => setExpanded(false)}>
          <div className="cs-video-modal cs-video-modal--video" onClick={(e) => e.stopPropagation()}>
            <video
              ref={modalRef}
              src={src}
              className="cs-video-modal-video"
              autoPlay
              loop
              muted={muted}
              playsInline
            />
            <VideoControls
              videoRef={modalRef}
              showRestart={showRestart}
              hasSound={hasSound}
              muted={muted}
              setMuted={setMuted}
              expanded
              setExpanded={setExpanded}
            />
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
