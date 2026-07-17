import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

export default function Lottie({ animationData, className, loop = true }) {
  const host = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: host.current,
      renderer: 'svg',
      loop,
      autoplay: true,
      animationData,
    })
    return () => anim.destroy()
  }, [animationData, loop])

  return <div ref={host} className={className} aria-hidden="true" />
}
