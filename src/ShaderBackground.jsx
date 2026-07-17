import { Warp } from '@paper-design/shaders-react'
import { WARP_PROPS } from './shaderConfig'
import './ShaderBackground.css'

// One full-screen shader that lives behind everything. The white page content
// sits above it; areas left transparent (top bar, footer) reveal it.
export default function ShaderBackground() {
  return (
    <div className="shader-bg" aria-hidden="true">
      <Warp className="shader-fill" {...WARP_PROPS} />
    </div>
  )
}
