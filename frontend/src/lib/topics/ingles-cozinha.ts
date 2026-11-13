import { TopicData } from "@/lib/types/topic";
import { pickVocabulary as pick } from "./vocabulary-pick";

export const inglesCozinha: TopicData = {
  slug: "cozinha",
  title: "Cozinha",
  subtitle: "Entre, mexa nas panelas e aprenda o inglês de cada canto",
  categorySlug: "vocabulario",
  accent: "#f59e0b",
  status: "em-construcao",
  scene: "kitchen",
  intro:
    "Uma cozinha pra explorar: clique nos objetos pra ver como se chamam e nos verbos pra ver a ação acontecendo.",
  sections: [
    {
      heading: "Fogão",
      body: "Panelas, bocas e o que acontece em cima do fogo.",
      reusesVocabulary: true,
      vocabList: pick(["stove", "cooker", "burner", "pot", "saucepan", "pan", "skillet", "kettle", "oil", "cook", "boil", "simmer", "fry", "stir", "drain"]),
    },
    {
      heading: "Forno",
      body: "O que vai pro calor seco, e quem vive disso.",
      reusesVocabulary: true,
      vocabList: pick(["oven", "microwave", "toaster", "tray", "preheat", "bake", "roast", "toast", "batter", "bread", "flour", "wheat", "baker", "bakery"]),
    },
    {
      heading: "Bancada",
      body: "Facas, tábua e todas as formas de cortar.",
      reusesVocabulary: true,
      vocabList: pick(["board", "knife", "cleaver", "slicer", "shears", "grater", "peeler", "blender", "juicer", "cut", "chop", "slice", "dice", "carve", "grate", "peel", "mix", "blend", "juice", "whisk", "roll"]),
    },
    {
      heading: "Prateleiras",
      body: "Louça, potes e jarras.",
      reusesVocabulary: true,
      vocabList: pick(["cupboard", "bowl", "plate", "dish", "jar", "container", "jug", "pitcher", "glass", "cup", "mug"]),
    },
    {
      heading: "Utensílios",
      body: "O que fica pendurado à mão.",
      reusesVocabulary: true,
      vocabList: pick(["fork", "spoon", "tablespoon", "teaspoon", "ladle", "scoop", "spatula", "tongs", "corkscrew", "chopsticks"]),
    },
    {
      heading: "Pia",
      body: "Torneira, louça e tudo que lava e seca.",
      reusesVocabulary: true,
      vocabList: pick(["sink", "faucet", "tap", "soap", "sponge", "dishwasher", "colander", "wash", "rinse", "dry"]),
    },
    {
      heading: "Cozinha e mesa",
      body: "O resto do cômodo e a hora de comer.",
      reusesVocabulary: true,
      vocabList: pick(["kitchen", "fridge", "freezer", "table", "towel", "cloth", "salt", "egg", "onion", "lettuce", "poultry", "oats", "margarine", "coffee", "dine", "serve", "meal", "lunch", "dinner"]),
    },
  ],
  relatedSlugs: ["verbos", "geral"],
};
