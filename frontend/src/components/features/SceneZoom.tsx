"use client";

import { useLayoutEffect, useRef } from "react";
import { SCENES, sceneObjectFor } from "./scenes";
import { SceneContext } from "./SceneSpot";
import styles from "./SceneZoom.module.css";

const ASPECT = 16 / 10;
const ZOOM_PADDING = 1.9;
const MIN_WIDTH = 300;

function corners(box: DOMRect, matrix: DOMMatrix) {
  return [
    new DOMPoint(box.x, box.y),
    new DOMPoint(box.x + box.width, box.y),
    new DOMPoint(box.x, box.y + box.height),
    new DOMPoint(box.x + box.width, box.y + box.height),
  ].map((point) => point.matrixTransform(matrix));
}

function clamp(start: number, size: number, total: number): number {
  if (size >= total) return (total - size) / 2;
  return Math.min(Math.max(start, 0), total - size);
}

export function SceneZoom({
  kind,
  term,
  onMissing,
}: {
  kind: keyof typeof SCENES;
  term: string;
  onMissing: () => void;
}) {
  const config = SCENES[kind];
  const { Scene } = config;
  const frame = useRef<HTMLDivElement>(null);
  const target = sceneObjectFor(config, term);

  useLayoutEffect(() => {
    const host = frame.current;
    const svg = host?.querySelector("svg");
    const spot = svg?.querySelector<SVGGraphicsElement>(`[aria-label="${CSS.escape(target)}"]`);
    const screen = svg?.getScreenCTM();
    const local = spot?.getScreenCTM();
    if (!host || !svg || !spot || !screen || !local) {
      onMissing();
      return;
    }
    svg.dataset.full ??= svg.getAttribute("viewBox") ?? "";
    const [, , fullWidth, fullHeight] = svg.dataset.full.split(/\s+/).map(Number);
    const points = corners(spot.getBBox() as DOMRect, screen.inverse().multiply(local));
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const left = Math.min(...xs);
    const top = Math.min(...ys);
    const boxWidth = Math.max(...xs) - left;
    const boxHeight = Math.max(...ys) - top;
    let width = Math.max(boxWidth * ZOOM_PADDING, MIN_WIDTH);
    let height = Math.max(boxHeight * ZOOM_PADDING, MIN_WIDTH / ASPECT);
    if (width / height > ASPECT) height = width / ASPECT;
    else width = height * ASPECT;
    const x = clamp(left + boxWidth / 2 - width / 2, width, fullWidth);
    const y = clamp(top + boxHeight / 2 - height / 2, height, fullHeight);
    svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    host.dataset.ready = "true";
  }, [target, onMissing]);

  return (
    <div ref={frame} className={styles.frame} aria-hidden="true">
      <SceneContext.Provider value={{ active: target, showLabels: false, standIns: {}, onSelect: () => {} }}>
        <Scene action={config.actions.has(term) ? term : null} />
      </SceneContext.Provider>
    </div>
  );
}
