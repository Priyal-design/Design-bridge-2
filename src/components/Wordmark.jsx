import logo from "../assets/design-bridge-logo.svg";
import logoDark from "../images/logo_dark_mode.svg";

/**
 * "Design Bridge" logo. Renders the brand SVG, swapping to the dark-mode
 * variant automatically when the OS/browser prefers a dark color scheme.
 *
 * size = rendered height in px. The SVG keeps its native aspect ratio.
 */
export default function Wordmark({ size = 32, style, className }) {
  return (
    <picture>
      <source srcSet={logoDark} media="(prefers-color-scheme: dark)" />
      <img
        className={className}
        src={logo}
        alt="Design Bridge"
        style={{
          height: size,
          width: "auto",
          display: "inline-block",
          ...style,
        }}
      />
    </picture>
  );
}
