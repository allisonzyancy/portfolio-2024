'use client';

import useMousePosition from "@/utils/useMousePos";
import { useMemo } from "react";

const Spotlight = ():JSX.Element => {
  const mousePosition = useMousePosition();

  const spotlight = useMemo(() => {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{ background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 40, 145, 0.15), transparent 80%)` }}
      />
    )
  }, [ mousePosition.x, mousePosition.y ])

  return spotlight;
}

export default Spotlight;
