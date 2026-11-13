import { ComponentType } from "react";
import { TopicData } from "@/lib/types/topic";
import { ChurchScene } from "./ChurchScene";
import { KitchenScene } from "./KitchenScene";
import { SceneProps } from "./SceneSpot";

export interface SceneConfig {
  Scene: ComponentType<SceneProps>;
  ariaAreas: string;
  firstWord: string;
  hint: string;
  actions: Set<string>;
  standIns: Record<string, string>;
  actionPlaces: Record<string, string>;
}

export const SCENES: Record<NonNullable<TopicData["scene"]>, SceneConfig> = {
  kitchen: {
    Scene: KitchenScene,
    ariaAreas: "Áreas da cozinha",
    firstWord: "stir",
    hint: "Os verbos marcados com ▸ fazem a cozinha funcionar.",
    actions: new Set([
      "cook",
      "boil",
      "simmer",
      "fry",
      "stir",
      "drain",
      "preheat",
      "bake",
      "roast",
      "microwave",
      "cut",
      "chop",
      "slice",
      "dice",
      "carve",
      "serve",
      "wash",
      "rinse",
      "toast",
      "blend",
    ]),
    standIns: {
      cooker: "stove",
      skillet: "pan",
      tap: "faucet",
      dry: "towel",
      mix: "bowl",
      grate: "grater",
      peel: "peeler",
      dine: "plate",
    },
    actionPlaces: {
      cook: "pot",
      boil: "pot",
      simmer: "pot",
      stir: "pot",
      drain: "pot",
      fry: "pan",
      preheat: "oven",
      bake: "oven",
      roast: "oven",
      batter: "oven",
      bread: "oven",
      cut: "knife",
      chop: "knife",
      slice: "knife",
      dice: "knife",
      carve: "knife",
      serve: "slicer",
      wash: "sink",
      rinse: "faucet",
      blend: "blender",
    },
  },
  church: {
    Scene: ChurchScene,
    ariaAreas: "Áreas da igreja",
    firstWord: "preach",
    hint: "As palavras marcadas com ▸ dão vida ao culto.",
    actions: new Set([
      "preach",
      "preaching",
      "sermon",
      "sing",
      "congregation",
      "welcome",
      "minister",
      "pastor",
      "ceremony",
      "wedding",
      "faith",
      "anoint",
      "anointment",
      "church",
      "Sunday",
      "church leader",
    ]),
    standIns: { preach: "preacher", preaching: "preacher", welcome: "minister", leader: "church leader" },
    actionPlaces: {},
  },
};

export function sceneObjectFor(config: SceneConfig, term: string): string {
  return config.standIns[term] ?? config.actionPlaces[term] ?? term;
}
