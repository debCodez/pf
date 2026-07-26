import './ShaderBackground.css'

// One full-screen solid layer that lives behind everything. The white page
// content sits above it; areas left transparent (top bar, footer) reveal it.
export default function ShaderBackground() {
  return <div className="shader-bg" aria-hidden="true" />
}
