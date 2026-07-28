export const RESUME_URL = 'https://tinyurl.com/Debrupa-resume-2026'

/* Shared so the landing header and the case-study topbar can't drift apart. */
export default function ResumeLink({ className }) {
  return (
    <a
      className={className}
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>
  )
}
