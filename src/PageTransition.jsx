import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PageTransition.css'

const SLIDE_MS = 550 // white sheet clip open / close (must match CSS transition)
const HOLD_MS = 500 // how long the bare shader + loader stays visible
const DISSOLVE_OUT_MS = 300 // fade of the landing content at the start (must match CSS)
const DISSOLVE_MS = 650 // fade of the white to reveal the case study

const raf2 = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn))

const TransitionContext = createContext(() => {})

export const usePageTransition = () => useContext(TransitionContext)

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(false) // white sheet mounted
  const [behind, setBehind] = useState(false) // sheet under the landing content (opening phase)
  const [revealed, setRevealed] = useState(false) // sheet clipped open -> shader visible
  const [sealed, setSealed] = useState(false) // sheet closed to FULL white (covers the peeks too)
  const [loading, setLoading] = useState(false) // spinner shown
  const [dissolve, setDissolve] = useState(false) // white fading out -> case study dissolves in
  const busy = useRef(false)

  const go = useCallback((to) => {
    if (busy.current) return
    busy.current = true

    // 0. Mount the sheet behind the landing content, taking over the white
    //    surface, and start dissolving the content out. The collapse (1) and the
    //    dissolve run together from here — neither waits on the other.
    document.body.classList.add('landing-dissolving')
    setActive(true)
    setBehind(true)
    setRevealed(false)
    setSealed(false)
    setLoading(false)
    setDissolve(false)

    // 1. The shader peeks expand from the edges toward the center, immediately.
    raf2(() => setRevealed(true))

    // 2. Once the content has faded, hide the landing and bring the sheet back
    //    on top — by now it is the only thing painting, so nothing moves.
    setTimeout(() => {
      document.body.classList.remove('landing-dissolving')
      document.body.classList.add('is-transitioning')
      setBehind(false)
    }, DISSOLVE_OUT_MS)

    // 3. Loader over the bare shader.
    setTimeout(() => setLoading(true), SLIDE_MS)

    // 4. After the shader holds, close the sheet to full white (peeks too).
    setTimeout(() => {
      setLoading(false)
      setRevealed(false)
      setSealed(true)
      setTimeout(() => {
        navigate(to) // case study mounts behind the full white
        // 5. Slow dissolve: fade the white out so the case study content appears.
        raf2(() => setDissolve(true))
        setTimeout(() => {
          setActive(false)
          setSealed(false)
          setDissolve(false)
          document.body.classList.remove('is-transitioning')
          busy.current = false
        }, DISSOLVE_MS + 50)
      }, SLIDE_MS)
    }, SLIDE_MS + HOLD_MS)
  }, [navigate])

  useEffect(() => () => {
    document.body.classList.remove('is-transitioning')
    document.body.classList.remove('landing-dissolving')
  }, [])

  const cls = [
    'transition-cover',
    behind && 'transition-cover--behind',
    revealed && 'transition-cover--revealed',
    sealed && 'transition-cover--sealed',
    loading && 'transition-cover--loading',
    dissolve && 'transition-cover--dissolve',
  ].filter(Boolean).join(' ')

  return (
    <TransitionContext.Provider value={go}>
      {children}
      {active && (
        <div className={cls} aria-hidden="true">
          <div className="transition-sheet" />
          <div className="transition-loader">
            <span className="transition-spinner" />
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  )
}
