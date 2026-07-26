import { useRef, useState, useEffect } from 'react'

/*
 * Autoplaying case-study mockup video with a sound toggle.
 * Browsers only allow autoplay while muted, so it starts muted; the corner
 * button lets the viewer opt into sound. React doesn't reliably reflect the
 * `muted` prop onto the element, so we drive it through the ref.
 */
export default function CaseStudyVideo({ src, className = '', hasSound = true }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (ref.current) ref.current.muted = muted
  }, [muted])

  return (
    <div className="cs-video">
      <video
        ref={ref}
        src={src}
        className={`cs-mockup ${className}`.trim()}
        autoPlay
        loop
        muted
        playsInline
      />
      {hasSound && (
      <button
        type="button"
        className="cs-video-sound"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11 5 6.5 9H3v6h3.5L11 19V5Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              d="m16 9 5 6m0-6-5 6"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11 5 6.5 9H3v6h3.5L11 19V5Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"
            />
          </svg>
        )}
      </button>
      )}
    </div>
  )
}
