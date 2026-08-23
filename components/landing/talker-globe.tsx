"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const INK: [number, number, number] = [0.067, 0.067, 0.067];
const RUST: [number, number, number] = [0.769, 0.247, 0.09];

export function TalkerGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let frame = 0;
    const size = 500;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.22,
      dark: 0,
      diffuse: 1.15,
      mapSamples: 18000,
      mapBrightness: 4.2,
      baseColor: INK,
      markerColor: RUST,
      glowColor: RUST,
      markers: [
        { location: [48.86, 2.35], size: 0.035 },
        { location: [40.71, -74.01], size: 0.03 },
        { location: [1.35, 103.82], size: 0.028 },
      ],
    });

    const tick = () => {
      phi += 0.0022;
      globe.update({ phi });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-[500px] w-[500px]"
      width={1000}
      height={1000}
      aria-hidden
    />
  );
}
