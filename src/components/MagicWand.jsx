import Lottie from "./Lottie";
import magicWand from "../assets/magic-wand.json";

/**
 * Design Bridge AI mark — the looping magic-wand Lottie animation.
 * Plain animation, no circle/badge behind it.
 *
 * size = rendered box in px.
 */
export default function MagicWand({ size = 42, className = "", style }) {
  return (
    <Lottie
      animationData={magicWand}
      loop
      autoplay
      size={size}
      className={className}
      style={{ flex: "none", ...style }}
    />
  );
}
