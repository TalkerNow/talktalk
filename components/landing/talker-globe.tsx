"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function TalkerGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    const size = 500;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      mapBaseBrightness: 0,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.769, 0.247, 0.09],
      glowColor: [0.969, 0.965, 0.957],
      opacity: 0.7,
      markers: [],
      context: { alpha: true, premultipliedAlpha: true, antialias: true },
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-[500px] w-[500px] bg-transparent"
      style={{ backgroundColor: "transparent" }}
      width={1000}
      height={1000}
      aria-hidden
    />
  );
}
