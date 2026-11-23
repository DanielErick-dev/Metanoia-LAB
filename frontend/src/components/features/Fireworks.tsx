"use client";

import { RefObject, useEffect, useRef } from "react";

interface Rocket {
  x: number;
  y: number;
  vy: number;
  peak: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
}

const MIN_GUTTER = 150;
const GRAVITY = 0.035;
const DRAG = 0.985;

function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function Fireworks({
  trigger,
  anchor,
  colors,
}: {
  trigger: number;
  anchor: RefObject<HTMLElement | null>;
  colors: string[];
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const rockets = useRef<Rocket[]>([]);
  const sparks = useRef<Spark[]>([]);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useEffect(() => {
    if (trigger === 0) return;
    const el = canvas.current;
    const box = anchor.current?.getBoundingClientRect();
    if (!el || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const left = box.left;
    const right = width - box.right;
    if (Math.min(left, right) < MIN_GUTTER) return;

    const ratio = window.devicePixelRatio || 1;
    if (el.width !== width * ratio || el.height !== height * ratio) {
      el.width = width * ratio;
      el.height = height * ratio;
    }
    const ctx = el.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const pick = () => colors[Math.floor(Math.random() * colors.length)];
    const launch = (x: number) =>
      rockets.current.push({ x, y: height + 10, vy: random(-9.5, -8), peak: random(height * 0.22, height * 0.42), color: pick() });

    launch(random(left * 0.3, left * 0.7));
    const delayed = window.setTimeout(() => {
      launch(box.right + random(right * 0.3, right * 0.7));
      if (!frame.current) frame.current = requestAnimationFrame(tick);
    }, 220);

    function explode(rocket: Rocket) {
      const count = 26;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + random(-0.08, 0.08);
        const speed = random(1.2, 2.6);
        const max = random(50, 78);
        sparks.current.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: max,
          max,
          size: random(1.4, 2.3),
          color: Math.random() < 0.7 ? rocket.color : pick(),
        });
      }
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      rockets.current = rockets.current.filter((rocket) => {
        rocket.y += rocket.vy;
        rocket.vy *= 0.985;
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = rocket.color;
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.25;
        ctx.fillRect(rocket.x - 0.6, rocket.y, 1.2, 14);
        if (rocket.y <= rocket.peak) {
          explode(rocket);
          return false;
        }
        return true;
      });

      sparks.current = sparks.current.filter((spark) => {
        spark.vx *= DRAG;
        spark.vy = spark.vy * DRAG + GRAVITY;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life -= 1;
        ctx.globalAlpha = Math.pow(spark.life / spark.max, 1.4) * 0.85;
        ctx.fillStyle = spark.color;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
        return spark.life > 0;
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (rockets.current.length === 0 && sparks.current.length === 0) {
        ctx.clearRect(0, 0, width, height);
        frame.current = 0;
        return;
      }
      frame.current = requestAnimationFrame(tick);
    }

    if (!frame.current) frame.current = requestAnimationFrame(tick);
    return () => window.clearTimeout(delayed);
  }, [trigger, anchor, colors]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
