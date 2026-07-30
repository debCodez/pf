/* The parts of the Vera study, in reading order. Ids double as scroll targets
   for the sidebar and as the scroll-spy keys that drive the active tab; labels
   are shared by the sidebar and the end-of-section cue. Kept apart from the
   components so the story, the layout and the overview list can all reach them
   without an import cycle. */
export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'vera-repayments', label: 'Points on bill payment' },
  { id: 'redeem-points', label: 'Redeeming reward points' },
  { id: 'card-issuance', label: 'Card issuance loading' },
]

export const SECTION_IDS = SECTIONS.map((s) => s.id)

export function scrollToSection(id, behavior = 'smooth') {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior, block: 'start' })
}
