import { useEffect, useRef } from "react";
import lottie from "lottie-web";

/**
 * Thin React wrapper around lottie-web.
 * Loads a Bodymovin/Lottie JSON and plays it inside a div.
 */
export default function Lottie({
  animationData,
  loop = false,
  autoplay = true,
  size = 160,
  style,
  className,
}) {
  const host = useRef(null);

  useEffect(() => {
    if (!host.current) return;
    const anim = lottie.loadAnimation({
      container: host.current,
      renderer: "svg",
      loop,
      autoplay,
      animationData,
    });
    return () => anim.destroy();
  }, [animationData, loop, autoplay]);

  return (
    <div
      ref={host}
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  );
}
