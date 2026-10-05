import type { CSSProperties } from "react";

const COLORS = ["#b23a4c", "#8e2638", "#e8a598", "#d9b27c", "#1d1b19", "#f3d9d4"];
const PIECES = 38;

// Deterministic pseudo-random in [0, 1) so render stays pure.
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const pieces = Array.from({ length: PIECES }, (_, i) => {
  const round = rand(i + 7) > 0.7;
  return {
    left: `${4 + rand(i + 1) * 92}%`,
    width: round ? 7 : 5 + rand(i + 2) * 4,
    height: round ? 7 : 9 + rand(i + 3) * 6,
    radius: round ? "999px" : "2px",
    color: COLORS[i % COLORS.length],
    style: {
      "--drift": `${(rand(i + 4) - 0.5) * 140}px`,
      "--spin": `${(rand(i + 5) > 0.5 ? 1 : -1) * (360 + rand(i + 6) * 540)}deg`,
      "--duration": `${1.9 + rand(i + 8) * 1.3}s`,
      "--delay": `${rand(i + 9) * 0.35}s`,
    } as CSSProperties,
  };
});

export function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece, i) => (
        <span
          key={i}
          className="confetti-piece absolute -top-4"
          style={{
            ...piece.style,
            left: piece.left,
            width: piece.width,
            height: piece.height,
            borderRadius: piece.radius,
            background: piece.color,
          }}
        />
      ))}
    </div>
  );
}
