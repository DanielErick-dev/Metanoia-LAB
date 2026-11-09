"use client";

import { createContext, useContext } from "react";
import shared from "./Scene.module.css";

export interface SceneProps {
  action: string | null;
}

interface SceneState {
  active: string | null;
  showLabels: boolean;
  standIns: Record<string, string>;
  onSelect: (term: string) => void;
}

export const SceneContext = createContext<SceneState>({
  active: null,
  showLabels: true,
  standIns: {},
  onSelect: () => {},
});

export function SceneSpot({
  term,
  labelX,
  labelY,
  children,
}: {
  term: string;
  labelX: number;
  labelY: number;
  children: React.ReactNode;
}) {
  const { active, showLabels, standIns, onSelect } = useContext(SceneContext);
  const isActive = active === term || (active !== null && standIns[active] === term);
  return (
    <g
      className={shared.spot}
      data-active={isActive}
      role="button"
      tabIndex={0}
      aria-label={term}
      aria-pressed={isActive}
      onClick={() => onSelect(term)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(term);
        }
      }}
    >
      {children}
      {showLabels && (
        <text className={shared.label} x={labelX} y={labelY}>
          {term}
        </text>
      )}
    </g>
  );
}
