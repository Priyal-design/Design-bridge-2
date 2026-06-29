/**
 * "Design Bridge" wordmark with the diagonal navy→blue split treatment
 * from the brand reference (Container.jpg). The blue band sweeps across
 * the middle of the letters via a clipped overlay layer.
 *
 * size = font-size in px. Inherits the heading font.
 */
export default function Wordmark({ size = 22, style, className }) {
  const base = {
    position: "relative",
    display: "inline-block",
    fontFamily: "var(--font-head)",
    fontWeight: 800,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    whiteSpace: "nowrap",
    color: "var(--ink)",
    ...style,
  };

  // Diagonal blue band clipped across the wordmark's vertical middle.
  const overlay = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(100deg, #2f6bff 0%, #4b6bff 50%, #6a5cff 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    clipPath: "polygon(18% 38%, 100% 12%, 100% 70%, 18% 96%)",
    pointerEvents: "none",
  };

  return (
    <span className={className} style={base}>
      Design&nbsp;Bridge
      <span aria-hidden="true" style={overlay}>
        Design&nbsp;Bridge
      </span>
    </span>
  );
}
