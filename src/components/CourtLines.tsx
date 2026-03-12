// ITF standard court dimensions, precisely scaled to the SVG viewBox.
// Doubles: 23.77m × 10.97m | Singles: 8.23m wide | Service line: 6.4m from net
export default function CourtLines() {
  return (
    <div className="court-lines" aria-hidden="true">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Doubles outer boundary ── */}
        <rect x="120" y="60" width="1200" height="780" fill="none" stroke="white" strokeWidth="2.5" />

        {/* ── Singles sidelines (1.37m inset each side) ── */}
        <line x1="269.9" y1="60"  x2="269.9" y2="840" stroke="white" strokeWidth="1.8" />
        <line x1="1170.1" y1="60" x2="1170.1" y2="840" stroke="white" strokeWidth="1.8" />

        {/* ── Net (centre of court) ── */}
        <line x1="120" y1="450" x2="1320" y2="450" stroke="white" strokeWidth="2.5" />

        {/* ── Service lines (6.4m from net each side) ── */}
        <line x1="269.9" y1="240"  x2="1170.1" y2="240"  stroke="white" strokeWidth="1.8" />
        <line x1="269.9" y1="660"  x2="1170.1" y2="660"  stroke="white" strokeWidth="1.8" />

        {/* ── Centre service line (net to each service line) ── */}
        <line x1="720" y1="240" x2="720" y2="450" stroke="white" strokeWidth="1.8" />
        <line x1="720" y1="450" x2="720" y2="660" stroke="white" strokeWidth="1.8" />

        {/* ── Centre marks on baselines ── */}
        <line x1="720" y1="60"  x2="720" y2="75"  stroke="white" strokeWidth="2.5" />
        <line x1="720" y1="825" x2="720" y2="840" stroke="white" strokeWidth="2.5" />

        {/* ── Net post indicators ── */}
        <line x1="120"  y1="445" x2="120"  y2="455" stroke="white" strokeWidth="4" />
        <line x1="1320" y1="445" x2="1320" y2="455" stroke="white" strokeWidth="4" />
      </svg>
    </div>
  );
}