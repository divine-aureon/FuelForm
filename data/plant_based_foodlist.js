const foodList = [
    {
      name: "Spinach (raw)",
      category: "Vegetables",
      servingSize: "100g",
      calories: 23,
      macros: {
        protein: 2.9,
        fat: 0.4,
        carbs: 3.6
      },
      nutrients: {
        vitaminK1: 483, // mcg
        folate: 194,    // mcg
        iron: 2.7,      // mg
        magnesium: 79,  // mg
        vitaminA: 469,  // mcg RAE
        fiber: 2.2,     // g
        protein: 2.9    // g
      },
      tags: ["leafy green", "iron-rich", "alkalizing"]
    },
    {
      name: "Broccoli (steamed)",
      category: "Vegetables",
      servingSize: "100g",
      calories: 35,
      macros: {
        protein: 2.4,
        fat: 0.4,
        carbs: 7.2
      },
      nutrients: {
        vitaminC: 89,   // mg
        vitaminK1: 102, // mcg
        folate: 63,     // mcg
        potassium: 316, // mg
        fiber: 3.3,     // g
        calcium: 40     // mg
      },
      tags: ["cruciferous", "immune-boost", "fiber-rich"]
    },
    {
      name: "Sweet Potato (baked, skin on)",
      category: "Root Vegetables",
      servingSize: "100g",
      calories: 90,
      macros: {
        protein: 2.0,
        fat: 0.2,
        carbs: 21.3
      },
      nutrients: {
        vitaminA: 961,  // mcg RAE
        vitaminC: 19.6, // mg
        potassium: 475, // mg
        fiber: 3.3,     // g
        manganese: 0.5  // mg
      },
      tags: ["complex-carb", "gut-friendly", "beta-carotene"]
    },
    {
      name: "Carrots (raw)",
      category: "Vegetables",
      servingSize: "100g",
      calories: 41,
      macros: {
        protein: 0.9,
        fat: 0.2,
        carbs: 9.6
      },
      nutrients: {
        vitaminA: 835,  // mcg RAE
        vitaminK1: 13.2, // mcg
        fiber: 2.8,     // g
        potassium: 320  // mg
      },
      tags: ["snackable", "eye-health", "antioxidant"]
    },
    {
      name: "Blueberries",
      category: "Fruits",
      servingSize: "100g",
      calories: 57,
      macros: {
        protein: 0.7,
        fat: 0.3,
        carbs: 14.5
      },
      nutrients: {
        vitaminC: 9.7,  // mg
        fiber: 2.4,     // g
        manganese: 0.3, // mg
        vitaminK1: 19.3 // mcg
      },
      tags: ["antioxidant-rich", "brain-food", "low-glycemic"]
    },
    {
      name: "Kale (raw)",
      category: "Vegetables",
      servingSize: "100g",
      calories: 49,
      macros: {
        protein: 4.3,
        fat: 0.9,
        carbs: 8.8
      },
      nutrients: {
        vitaminK1: 817, // mcg
        vitaminC: 120,  // mg
        calcium: 150,   // mg
        vitaminA: 681,  // mcg RAE
        fiber: 3.6      // g
      },
      tags: ["leafy green", "detox-support", "superfood"]
    },
    {
      name: "Avocado",
      category: "Fruits",
      servingSize: "100g",
      calories: 160,
      macros: {
        protein: 2.0,
        fat: 15.0,
        carbs: 9.0
      },
      nutrients: {
        fiber: 6.7,       // g
        potassium: 485,   // mg
        folate: 81,       // mcg
        vitaminK1: 21,    // mcg
        vitaminC: 10      // mg
      },
      tags: ["healthy fat", "heart-health", "keto-friendly"]
    },
    {
      name: "Quinoa (cooked)",
      category: "Grains",
      servingSize: "100g",
      calories: 120,
      macros: {
        protein: 4.1,
        fat: 1.9,
        carbs: 21.3
      },
      nutrients: {
        magnesium: 64,   // mg
        folate: 42,      // mcg
        iron: 1.5,       // mg
        phosphorus: 152, // mg
        protein: 4.1     // g
      },
      tags: ["complete protein", "gluten-free", "energy"]
    },
    {
      name: "Lentils (cooked)",
      category: "Legumes",
      servingSize: "100g",
      calories: 116,
      macros: {
        protein: 9.0,
        fat: 0.4,
        carbs: 20.1
      },
      nutrients: {
        folate: 181,     // mcg
        iron: 3.3,       // mg
        magnesium: 36,   // mg
        fiber: 7.9,      // g
        protein: 9       // g
      },
      tags: ["plant protein", "fiber-rich", "blood-builder"]
    },
    {
      name: "Chia Seeds",
      category: "Seeds",
      servingSize: "100g",
      calories: 486,
      macros: {
        protein: 16.5,
        fat: 30.7,
        carbs: 42.1
      },
      nutrients: {
        omega3_ALA: 17.8, // g
        fiber: 34.4,      // g
        calcium: 631,     // mg
        magnesium: 335,   // mg
        protein: 16.5     // g
      },
      tags: ["omega-3", "hydrating", "satiety"]
    },
    {
        name: "Almonds",
        category: "Nuts",
        servingSize: "100g",
        calories: 579,
        macros: {
            protein: 21.2,
            fat: 49.9,
            carbs: 21.6
          },
        nutrients: {
          vitaminE: 25.6,   // mg
          magnesium: 268,   // mg
          calcium: 269,     // mg
          iron: 3.7,        // mg
          fiber: 12.5,      // g
          protein: 21.2     // g
        },
        tags: ["healthy fat", "brain-support", "snackable"]
      },
      {
        name: "Garlic (raw)",
        category: "Vegetables",
        servingSize: "100g",
        calories: 149,
        macros: {
            protein: 6.4,
            fat: 0.5,
            carbs: 33.1
          },
        nutrients: {
          manganese: 1.7,    // mg
          vitaminC: 31.2,    // mg
          selenium: 14.2,    // mcg
          calcium: 181,      // mg
          fiber: 2.1         // g
        },
        tags: ["immune-booster", "detox", "antimicrobial"]
      },
      {
        name: "Pumpkin Seeds",
        category: "Seeds",
        servingSize: "100g",
        calories: 559,
        macros: {
            protein: 30.2,
            fat: 49.1,
            carbs: 10.7
          },
        nutrients: {
          magnesium: 592,   // mg
          zinc: 7.8,        // mg
          iron: 8.8,        // mg
          protein: 30,      // g
          fiber: 6          // g
        },
        tags: ["testosterone-support", "mineral-dense", "satiety"]
      },
      {
        name: "Oats (rolled, dry)",
        category: "Grains",
        servingSize: "100g",
        calories: 389,
        macros: {
            protein: 16.9,
            fat: 6.9,
            carbs: 66.3
          },
        nutrients: {
          fiber: 10.6,      // g
          iron: 4.3,        // mg
          magnesium: 138,   // mg
          zinc: 3.6,        // mg
          protein: 16.9     // g
        },
        tags: ["energy", "blood sugar balance", "prebiotic"]
      },
      {
        name: "Banana",
        category: "Fruits",
        servingSize: "100g",
        calories: 89,
        macros: {
            protein: 1.1,
            fat: 0.3,
            carbs: 22.8
          },
        nutrients: {
          potassium: 358,   // mg
          vitaminB6: 0.4,   // mg
          vitaminC: 8.7,    // mg
          magnesium: 27,    // mg
          fiber: 2.6        // g
        },
        tags: ["energy boost", "digestive aid", "potassium-rich"]
      },
      {
        name: "Beets (cooked)",
        category: "Root Vegetables",
        servingSize: "100g",
        calories: 44,
        macros: {
            protein: 1.6,
            fat: 0.2,
            carbs: 9.6
          },
        nutrients: {
          folate: 109,      // mcg
          manganese: 0.3,   // mg
          potassium: 305,   // mg
          vitaminC: 3.6,    // mg
          fiber: 2          // g
        },
        tags: ["blood flow", "detox", "stamina"]
      },
      {
        name: "Red Bell Pepper (raw)",
        category: "Vegetables",
        servingSize: "100g",
        calories: 31,
        macros: {
            protein: 1.0,
            fat: 0.3,
            carbs: 6.0
          },
        nutrients: {
          vitaminC: 127.7,  // mg
          vitaminA: 157,    // mcg
          vitaminB6: 0.3,   // mg
          folate: 46,       // mcg
          fiber: 2.1        // g
        },
        tags: ["antioxidant", "skin-health", "hydrating"]
      },
      {
        name: "Brown Rice (cooked)",
        category: "Grains",
        servingSize: "100g",
        calories: 123,
        macros: {
            protein: 2.6,
            fat: 1.0,
            carbs: 25.6
          },
        nutrients: {
          magnesium: 39,    // mg
          selenium: 9.8,    // mcg
          phosphorus: 103,  // mg
          fiber: 1.6,       // g
          protein: 2.6      // g
        },
        tags: ["complex-carb", "stable energy", "mineral-support"]
      },
      {
        name: "Strawberries",
        category: "Fruits",
        servingSize: "100g",
        calories: 32,
        macros: {
            protein: 0.7,
            fat: 0.3,
            carbs: 7.7
          },
        nutrients: {
          vitaminC: 58.8,   // mg
          folate: 24,       // mcg
          manganese: 0.4,   // mg
          fiber: 2.0        // g
        },
        tags: ["antioxidant", "cooling", "skin-brightening"]
      },
      {
        name: "Tomatoes (raw)",
        category: "Fruits",
        servingSize: "100g",
        calories: 18,
        macros: {
            protein: 0.9,
            fat: 0.2,
            carbs: 3.9
          },
        nutrients: {
          vitaminC: 13.7,   // mg
          potassium: 237,   // mg
          lycopene: 2573,   // mcg
          vitaminK1: 7.9    // mcg
        },
        tags: ["anti-inflammatory", "heart-health", "hydrating"]
      },
      {
        name: "Cabbage (raw)",
        category: "Vegetables",
        servingSize: "100g",
        calories: 25,
        macros: {
            protein: 1.3,
            fat: 0.1,
            carbs: 5.8
          },
        nutrients: {
          vitaminC: 36.6,   // mg
          vitaminK1: 76,    // mcg
          folate: 43,       // mcg
          fiber: 2.5        // g
        },
        tags: ["digestive", "cancer-fighting", "budget-friendly"]
      },
      {
        name: "Cauliflower (raw)",
        category: "Vegetables",
        servingSize: "100g",
        calories: 25,
        macros: {
            protein: 1.9,
            fat: 0.3,
            carbs: 4.9
          },
        nutrients: {
          vitaminC: 48.2,   // mg
          vitaminK1: 15.5,  // mcg
          folate: 57,       // mcg
          choline: 44.3     // mg
        },
        tags: ["detox", "low-carb", "versatile"]
      },
  {
    name: "Pineapple",
    category: "Fruits",
    servingSize: "100g",
    calories: 50,
    macros: {
        protein: 0.5,
        fat: 0.1,
        carbs: 13.1
      },
    nutrients: {
      vitaminC: 47.8, // mg
      manganese: 1.3, // mg
      fiber: 1.4      // g
    },
    tags: ["digestive", "anti-inflammatory", "tropical"]
  },
  {
    name: "Brussels Sprouts (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 43,
    macros: {
        protein: 3.4,
        fat: 0.3,
        carbs: 8.9
      },
    nutrients: {
      vitaminK1: 140, // mcg
      vitaminC: 85,   // mg
      folate: 61,     // mcg
      fiber: 3.8      // g
    },
    tags: ["cruciferous", "detox", "cancer-fighting"]
  },
  {
    name: "Asparagus (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
        protein: 2.2,
        fat: 0.2,
        carbs: 3.9
      },
    nutrients: {
      folate: 149,     // mcg
      vitaminK1: 41.6, // mcg
      fiber: 2.1,      // g
      vitaminC: 7.7    // mg
    },
    tags: ["diuretic", "gut-friendly", "spring veggie"]
  },
  {
    name: "Green Peas (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 84,
    macros: {
        protein: 5.4,
        fat: 0.4,
        carbs: 14.5
      },
    nutrients: {
      fiber: 5.7,      // g
      protein: 5.4,    // g
      vitaminK1: 24.8, // mcg
      vitaminC: 14.2   // mg
    },
    tags: ["sweet legume", "muscle support", "fiber-rich"]
  },
  {
    name: "Black Beans (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 132,
    macros: {
        protein: 8.9,
        fat: 0.5,
        carbs: 23.7
      },
    nutrients: {
      folate: 149,   // mcg
      iron: 2.1,     // mg
      magnesium: 70, // mg
      fiber: 8.7,    // g
      protein: 8.9   // g
    },
    tags: ["plant protein", "blood sugar balance", "stamina"]
  },
  {
    name: "Edamame (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 121,
    macros: {
        protein: 11.9,
        fat: 5.2,
        carbs: 8.9
      },
    nutrients: {
      folate: 311,    // mcg
      iron: 2.3,      // mg
      magnesium: 61,  // mg
      vitaminK1: 26.7,// mcg
      protein: 11.9   // g
    },
    tags: ["estrogen balance", "plant protein", "bone health"]
  },
  {
    name: "Green Apple",
    category: "Fruits",
    servingSize: "100g",
    calories: 52,
    macros: {
        protein: 0.3,
        fat: 0.2,
        carbs: 13.8
      },
    nutrients: {
      vitaminC: 4.6,  // mg
      fiber: 2.4,     // g
      potassium: 107  // mg
    },
    tags: ["gut-friendly", "hydrating", "antioxidant"]
  },
  {
    name: "Grapefruit (pink)",
    category: "Fruits",
    servingSize: "100g",
    calories: 42,
    macros: {
        protein: 0.8,
        fat: 0.1,
        carbs: 10.7
      },
    nutrients: {
      vitaminC: 31.2, // mg
      vitaminA: 58,   // mcg
      fiber: 1.6      // g
    },
    tags: ["metabolism boost", "cleansing", "low-cal"]
  },
  {
    name: "Pomegranate Seeds",
    category: "Fruits",
    servingSize: "100g",
    calories: 83,
    macros: {
        protein: 1.7,
        fat: 1.2,
        carbs: 18.7
      },
    nutrients: {
      vitaminC: 10.2,  // mg
      potassium: 236, // mg
      fiber: 4.0      // g
    },
    tags: ["circulation", "antioxidant-rich", "skin"]
  },
  {
    name: "Blackberries",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
        protein: 1.4,
        fat: 0.5,
        carbs: 9.6
      },
    nutrients: {
      vitaminC: 21,    // mg
      fiber: 5.3,      // g
      manganese: 0.6   // mg
    },
    tags: ["antioxidant-rich", "low-glycemic", "brain health"]
  },
  {
    name: "Barley (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 123,
    macros: {
        protein: 2.3,
        fat: 0.4,
        carbs: 28.2
      },
    nutrients: {
      fiber: 3.8,      // g
      selenium: 13.5,  // mcg
      magnesium: 22,   // mg
      phosphorus: 54   // mg
    },
    tags: ["cholesterol-lowering", "prebiotic", "ancient grain"]
  },
  {
    name: "Buckwheat (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 92,
    macros: {
        protein: 3.4,
        fat: 0.6,
        carbs: 19.9
      },
    nutrients: {
      magnesium: 51,    // mg
      phosphorus: 70,   // mg
      fiber: 1.3,       // g
      protein: 3.4      // g
    },
    tags: ["gluten-free", "antioxidant", "vascular support"]
  },
  {
    name: "Coconut Meat (raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 354,
    macros: {
        protein: 3.3,
        fat: 33.5,
        carbs: 15.2
      },
    nutrients: {
      iron: 2.4,       // mg
      manganese: 1.5,  // mg
      fiber: 9.0,      // g
      potassium: 356   // mg
    },
    tags: ["healthy fat", "energy dense", "tropical"]
  },
  {
    name: "Dates",
    category: "Fruits",
    servingSize: "100g",
    calories: 277,
    macros: {
        protein: 2.5,
        fat: 0.2,
        carbs: 75.0
      },
    nutrients: {
      potassium: 656, // mg
      magnesium: 54,  // mg
      fiber: 6.7,     // g
      vitaminB6: 0.2  // mg
    },
    tags: ["natural sweetener", "energy", "high potassium"]
  },
  {
    name: "Figs (raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 74,
    macros: {
        protein: 0.8,
        fat: 0.3,
        carbs: 19.2
      },
    nutrients: {
      calcium: 35,     // mg
      potassium: 232,  // mg
      fiber: 2.9       // g
    },
    tags: ["gut-soothing", "mineral-rich", "sugar-balanced"]
  },
  {
    name: "Hemp Seeds",
    category: "Seeds",
    servingSize: "100g",
    calories: 553,
    macros: {
        protein: 31.6,
        fat: 48.8,
        carbs: 8.7
      },
    nutrients: {
      protein: 31.6,    // g
      magnesium: 483,   // mg
      zinc: 7,          // mg
      omega3_ALA: 8.7   // g
    },
    tags: ["vegan protein", "omega-balanced", "anti-inflammatory"]
  },
  {
    name: "Walnuts",
    category: "Nuts",
    servingSize: "100g",
    calories: 654,
    macros: {
        protein: 15.2,
        fat: 65.2,
        carbs: 13.7
      },
    nutrients: {
      omega3_ALA: 9.1,  // g
      copper: 1.6,      // mg
      magnesium: 158,   // mg
      protein: 15.2     // g
    },
    tags: ["brain food", "omega-rich", "anti-inflammatory"]
  },
  {
    name: "Brazil Nuts",
    category: "Nuts",
    servingSize: "100g",
    calories: 659,
    macros: {
        protein: 14.3,
        fat: 66.4,
        carbs: 12.3
      },
    nutrients: {
      selenium: 1917,   // mcg
      magnesium: 376,   // mg
      zinc: 4.1,        // mg
      protein: 14.3     // g
    },
    tags: ["thyroid support", "hormone balance", "rich in selenium"]
  },
  {
    name: "Cashews",
    category: "Nuts",
    servingSize: "100g",
    calories: 553,
    macros: {
        protein: 18.2,
        fat: 43.9,
        carbs: 30.2
      },
    nutrients: {
      iron: 6.7,       // mg
      magnesium: 292,  // mg
      zinc: 5.8,       // mg
      protein: 18.2    // g
    },
    tags: ["mineral-dense", "creamy texture", "versatile"]
  },
  {
    name: "Sunflower Seeds",
    category: "Seeds",
    servingSize: "100g",
    calories: 584,
    macros: {
        protein: 20.8,
        fat: 51.5,
        carbs: 20.0
      },
    nutrients: {
      vitaminE: 35.2, // mg
      selenium: 53,   // mcg
      magnesium: 325, // mg
      protein: 20.8   // g
    },
    tags: ["vitamin E", "nervous system", "immune support"]
  },
  {
    name: "Cucumber (with skin)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 15,
    macros: {
        protein: 0.7,
        fat: 0.1,
        carbs: 3.6
      },
    nutrients: {
      vitaminK1: 16.4, // mcg
      potassium: 147,  // mg
      fiber: 0.5       // g
    },
    tags: ["hydration", "cooling", "alkalizing"]
  },
  {
    name: "Zucchini (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 17,
    macros: {
        protein: 1.2,
        fat: 0.4,
        carbs: 3.1
      },
    nutrients: {
      vitaminC: 17.9, // mg
      potassium: 261, // mg
      fiber: 1.1      // g
    },
    tags: ["low-calorie", "digestive support", "light veggie"]
  },
  {
    name: "Celery",
    category: "Vegetables",
    servingSize: "100g",
    calories: 16,
    macros: {
        protein: 0.7,
        fat: 0.2,
        carbs: 3.0
      },
    nutrients: {
      vitaminK1: 29.3, // mcg
      potassium: 260,  // mg
      fiber: 1.6       // g
    },
    tags: ["hydrating", "crunchy", "cleansing"]
  },
  {
    name: "Kiwi",
    category: "Fruits",
    servingSize: "100g",
    calories: 41,
    macros: {
      protein: 0.8,
      fat: 0.4,
      carbs: 10.0
    },
    nutrients: {
      vitaminC: 92.7,   // mg
      vitaminK1: 40.3,  // mcg
      fiber: 2.1,       // g
      potassium: 312,   // mg
      folate: 25        // mcg
    },
    tags: ["immune boost", "digestive", "bright skin"]
  },
  {
    name: "Tempeh",
    category: "Legumes",
    servingSize: "100g",
    calories: 192,
    macros: {
      protein: 19.0,
      fat: 11.0,
      carbs: 7.0
    },
    nutrients: {
      iron: 2.7,        // mg
      calcium: 111,     // mg
      fiber: 0,         // g
      magnesium: 81,    // mg
      protein: 19.0     // g
    },
    tags: ["fermented", "high protein", "gut-friendly"]
  },
  {
    name: "Parsnips",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 75,
    macros: {
      protein: 1.2,
      fat: 0.3,
      carbs: 18.0
    },
    nutrients: {
      fiber: 4.9,       // g
      vitaminC: 17,     // mg
      folate: 67,       // mcg
      potassium: 375,   // mg
      manganese: 0.6    // mg
    },
    tags: ["winter veggie", "sweet root", "fiber-rich"]
  },
  {
    name: "Mulberries",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 1.4,
      fat: 0.4,
      carbs: 9.8
    },
    nutrients: {
      vitaminC: 36.4,   // mg
      iron: 1.9,        // mg
      fiber: 1.7,       // g
      vitaminK1: 7.8,   // mcg
      potassium: 194    // mg
    },
    tags: ["antioxidant", "blood builder", "berry"]
  },
  {
    name: "Leeks",
    category: "Vegetables",
    servingSize: "100g",
    calories: 61,
    macros: {
      protein: 1.5,
      fat: 0.3,
      carbs: 14.2
    },
    nutrients: {
      vitaminK1: 47,    // mcg
      manganese: 0.5,   // mg
      fiber: 1.8,       // g
      vitaminC: 12,     // mg
      folate: 64        // mcg
    },
    tags: ["prebiotic", "aromatic", "spring veggie"]
  },
  {
    name: "Plum",
    category: "Fruits",
    servingSize: "100g",
    calories: 46,
    macros: {
      protein: 0.7,
      fat: 0.3,
      carbs: 11.4
    },
    nutrients: {
      vitaminC: 9.5,    // mg
      fiber: 1.4,       // g
      potassium: 157,   // mg
      vitaminK1: 6.4,   // mcg
      vitaminA: 17      // mcg
    },
    tags: ["juicy", "gut-friendly", "refreshing"]
  },
  {
    name: "Watercress",
    category: "Vegetables",
    servingSize: "100g",
    calories: 11,
    macros: {
      protein: 2.3,
      fat: 0.1,
      carbs: 1.3
    },
    nutrients: {
      vitaminK1: 250,   // mcg
      vitaminC: 43,     // mg
      calcium: 120,     // mg
      iron: 0.2,        // mg
      fiber: 0.5        // g
    },
    tags: ["alkaline", "super green", "detox"]
  },
  {
    name: "Fennel (bulb)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 7.3
    },
    nutrients: {
      fiber: 3.1,       // g
      potassium: 414,   // mg
      vitaminC: 12,     // mg
      manganese: 0.2,   // mg
      folate: 27        // mcg
    },
    tags: ["digestion", "aromatic", "gut-soothing"]
  },
  {
    name: "Cranberries (fresh)",
    category: "Fruits",
    servingSize: "100g",
    calories: 46,
    macros: {
      protein: 0.4,
      fat: 0.1,
      carbs: 12.2
    },
    nutrients: {
      fiber: 3.6,       // g
      vitaminC: 13.3,   // mg
      manganese: 0.4,   // mg
      vitaminE: 1.3,    // mg
      potassium: 85     // mg
    },
    tags: ["urinary health", "tart", "low-sugar"]
  },
  {
    name: "Mustard Greens (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 27,
    macros: {
      protein: 2.9,
      fat: 0.4,
      carbs: 4.7
    },
    nutrients: {
      vitaminK1: 258,   // mcg
      vitaminA: 151,    // mcg
      vitaminC: 70,     // mg
      fiber: 3.2,       // g
      calcium: 115      // mg
    },
    tags: ["bitter green", "cleansing", "bone-support"]
  },
  {
    name: "Turnip Greens (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 1.5,
      fat: 0.3,
      carbs: 7.1
    },
    nutrients: {
      vitaminK1: 251,   // mcg
      vitaminA: 579,    // mcg
      calcium: 190,     // mg
      fiber: 3.2,       // g
      folate: 118       // mcg
    },
    tags: ["leafy green", "detox", "high K"]
  },
  {
    name: "Persimmons",
    category: "Fruits",
    servingSize: "100g",
    calories: 70,
    macros: {
      protein: 0.6,
      fat: 0.2,
      carbs: 18.6
    },
    nutrients: {
      vitaminA: 81,     // mcg
      vitaminC: 7.5,    // mg
      manganese: 0.3,   // mg
      fiber: 3.6,       // g
      potassium: 161    // mg
    },
    tags: ["autumn fruit", "gut-friendly", "sweet"]
  },
  {
    name: "Swiss Chard (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 3.7
    },
    nutrients: {
      vitaminK1: 830,   // mcg
      vitaminA: 306,    // mcg
      magnesium: 81,    // mg
      fiber: 1.6,       // g
      iron: 1.8         // mg
    },
    tags: ["mineral-rich", "leafy", "cleansing"]
  },
  {
    name: "Tangerine",
    category: "Fruits",
    servingSize: "100g",
    calories: 53,
    macros: {
      protein: 0.8,
      fat: 0.3,
      carbs: 13.3
    },
    nutrients: {
      vitaminC: 26.7,   // mg
      vitaminA: 34,     // mcg
      fiber: 1.8,       // g
      potassium: 166,   // mg
      folate: 16        // mcg
    },
    tags: ["citrus", "hydrating", "snackable"]
  },
  {
    name: "Bok Choy (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 13,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 2.2
    },
    nutrients: {
      vitaminA: 223,    // mcg
      vitaminC: 45,     // mg
      calcium: 105,     // mg
      potassium: 252,   // mg
      fiber: 1.0        // g
    },
    tags: ["light veggie", "alkalizing", "stir-fry friendly"]
  },
  {
    name: "Okra (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 1.9,
      fat: 0.2,
      carbs: 7.5
    },
    nutrients: {
      fiber: 3.2,       // g
      vitaminC: 23,     // mg
      magnesium: 57,    // mg
      folate: 60,       // mcg
      calcium: 77       // mg
    },
    tags: ["gut-soothing", "mucilaginous", "southern veggie"]
  },
  {
    name: "Papaya",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 0.5,
      fat: 0.3,
      carbs: 11.0
    },
    nutrients: {
      vitaminC: 60.9,   // mg
      vitaminA: 47,     // mcg
      folate: 38,       // mcg
      fiber: 1.7,       // g
      potassium: 182    // mg
    },
    tags: ["digestive aid", "tropical", "enzyme-rich"]
  },
  {
    name: "Artichoke (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 47,
    macros: {
      protein: 3.3,
      fat: 0.2,
      carbs: 10.5
    },
    nutrients: {
      fiber: 5.4,       // g
      folate: 68,       // mcg
      magnesium: 60,    // mg
      vitaminC: 7.4,    // mg
      potassium: 370    // mg
    },
    tags: ["liver support", "fiber-rich", "mediterranean"]
  },
  {
    name: "Guava",
    category: "Fruits",
    servingSize: "100g",
    calories: 68,
    macros: {
      protein: 2.6,
      fat: 1.0,
      carbs: 14.3
    },
    nutrients: {
      vitaminC: 228.3,  // mg
      fiber: 5.4,       // g
      folate: 49,       // mcg
      potassium: 417,   // mg
      vitaminA: 31      // mcg
    },
    tags: ["immune booster", "tropical", "high fiber"]
  },
  {
    name: "Rutabaga (cooked)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 37,
    macros: {
      protein: 1.1,
      fat: 0.2,
      carbs: 8.6
    },
    nutrients: {
      fiber: 2.3,       // g
      vitaminC: 25,     // mg
      potassium: 208,   // mg
      calcium: 43,      // mg
      magnesium: 20     // mg
    },
    tags: ["winter root", "low-calorie", "versatile"]
  },
  {
    name: "Mango",
    category: "Fruits",
    servingSize: "100g",
    calories: 60,
    macros: {
      protein: 0.8,
      fat: 0.4,
      carbs: 15.0
    },
    nutrients: {
      vitaminC: 36.4,   // mg
      vitaminA: 54,     // mcg
      fiber: 1.6,       // g
      folate: 43,       // mcg
      potassium: 168    // mg
    },
    tags: ["hydrating", "sweet", "enzyme-rich"]
  },
  {
    name: "Cherimoya",
    category: "Fruits",
    servingSize: "100g",
    calories: 75,
    macros: {
      protein: 1.6,
      fat: 0.7,
      carbs: 18.1
    },
    nutrients: {
      vitaminC: 12.6,   // mg
      vitaminB6: 0.2,   // mg
      fiber: 3.0,       // g
      potassium: 287,   // mg
      magnesium: 17     // mg
    },
    tags: ["tropical", "sweet", "gut-friendly"]
  },
  {
    name: "Radicchio",
    category: "Vegetables",
    servingSize: "100g",
    calories: 23,
    macros: {
      protein: 1.4,
      fat: 0.3,
      carbs: 4.5
    },
    nutrients: {
      vitaminK1: 255,   // mcg
      fiber: 0.9,       // g
      vitaminC: 8,      // mg
      potassium: 302,   // mg
      folate: 60        // mcg
    },
    tags: ["bitter green", "digestive aid", "liver support"]
  },
  {
    name: "Seaweed (wakame)",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 45,
    macros: {
      protein: 3.0,
      fat: 0.6,
      carbs: 9.1
    },
    nutrients: {
      iodine: 415,      // mcg
      magnesium: 107,   // mg
      calcium: 150,     // mg
      iron: 2.2,        // mg
      fiber: 0.5        // g
    },
    tags: ["thyroid support", "mineral-rich", "alkalizing"]
  },
  {
    name: "Dandelion Greens",
    category: "Vegetables",
    servingSize: "100g",
    calories: 45,
    macros: {
      protein: 2.7,
      fat: 0.7,
      carbs: 9.2
    },
    nutrients: {
      vitaminA: 508,    // mcg
      vitaminK1: 778,   // mcg
      calcium: 187,     // mg
      fiber: 3.5,       // g
      iron: 3.1         // mg
    },
    tags: ["detox", "wild green", "anti-inflammatory"]
  },
  {
    name: "Sunchokes (Jerusalem Artichoke)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 73,
    macros: {
      protein: 2.0,
      fat: 0.0,
      carbs: 17.4
    },
    nutrients: {
      fiber: 1.6,       // g
      iron: 3.4,        // mg
      potassium: 429,   // mg
      thiamin: 0.2,     // mg
      magnesium: 17     // mg
    },
    tags: ["prebiotic", "gut health", "sweet root"]
  },
  {
    name: "Kohlrabi",
    category: "Vegetables",
    servingSize: "100g",
    calories: 27,
    macros: {
      protein: 1.7,
      fat: 0.1,
      carbs: 6.2
    },
    nutrients: {
      fiber: 3.6,       // g
      vitaminC: 62,     // mg
      potassium: 350,   // mg
      phosphorus: 46,   // mg
      folate: 16        // mcg
    },
    tags: ["crunchy", "low-calorie", "immune boost"]
  },
  {
    name: "Mizuna",
    category: "Vegetables",
    servingSize: "100g",
    calories: 14,
    macros: {
      protein: 1.6,
      fat: 0.3,
      carbs: 1.8
    },
    nutrients: {
      vitaminA: 130,    // mcg
      vitaminK1: 200,   // mcg
      calcium: 102,     // mg
      fiber: 1.8,       // g
      vitaminC: 22      // mg
    },
    tags: ["leafy green", "alkaline", "salad base"]
  },
  {
    name: "Plantains (boiled)",
    category: "Fruits",
    servingSize: "100g",
    calories: 116,
    macros: {
      protein: 1.3,
      fat: 0.2,
      carbs: 31.9
    },
    nutrients: {
      vitaminA: 1127,   // IU
      vitaminC: 18,     // mg
      fiber: 2.3,       // g
      potassium: 465,   // mg
      magnesium: 37     // mg
    },
    tags: ["resistant starch", "satisfying", "tropical"]
  },
  {
    name: "Snow Peas",
    category: "Vegetables",
    servingSize: "100g",
    calories: 42,
    macros: {
      protein: 2.8,
      fat: 0.2,
      carbs: 7.5
    },
    nutrients: {
      vitaminC: 60,     // mg
      fiber: 2.6,       // g
      vitaminK1: 25,    // mcg
      iron: 1.5,        // mg
      manganese: 0.2    // mg
    },
    tags: ["crunchy", "spring veggie", "fiber-rich"]
  },
  {
    name: "Goji Berries (dried)",
    category: "Fruits",
    servingSize: "28g",
    calories: 98,
    macros: {
      protein: 4.0,
      fat: 0.1,
      carbs: 21.6
    },
    nutrients: {
      vitaminA: 319,    // mcg
      iron: 1.9,        // mg
      vitaminC: 13.6,   // mg
      fiber: 3.6,       // g
      zinc: 0.5         // mg
    },
    tags: ["superfruit", "vision support", "immunity"]
  },
  {
    name: "Celeriac (celery root)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 42,
    macros: {
      protein: 1.5,
      fat: 0.3,
      carbs: 9.2
    },
    nutrients: {
      fiber: 1.8,       // g
      vitaminK1: 41,    // mcg
      vitaminC: 8,      // mg
      phosphorus: 115,  // mg
      potassium: 300    // mg
    },
    tags: ["aromatic root", "low-cal", "antioxidant"]
  },
  {
    name: "White Button Mushrooms (cooked)",
    category: "Fungi",
    servingSize: "100g",
    calories: 28,
    macros: {
      protein: 2.5,
      fat: 0.4,
      carbs: 4.3
    },
    nutrients: {
      selenium: 9.3,    // mcg
      vitaminD: 7,      // IU
      fiber: 1.0,       // g
      copper: 0.3,      // mg
      potassium: 318    // mg
    },
    tags: ["umami", "low-calorie", "immune modulating"]
  },
  {
    name: "Jicama",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 38,
    macros: {
      protein: 0.7,
      fat: 0.1,
      carbs: 8.8
    },
    nutrients: {
      fiber: 4.9,       // g
      vitaminC: 20,     // mg
      potassium: 150,   // mg
      folate: 12,       // mcg
      magnesium: 12     // mg
    },
    tags: ["crunchy", "hydrating", "prebiotic"]
  },
  {
    name: "Taro Root (boiled)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 112,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 26.5
    },
    nutrients: {
      fiber: 4.1,       // g
      vitaminE: 2.9,    // mg
      potassium: 591,   // mg
      magnesium: 33,    // mg
      vitaminC: 4.5     // mg
    },
    tags: ["starchy", "comfort food", "gut-soothing"]
  },
  {
    name: "Lotus Root",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 74,
    macros: {
      protein: 2.6,
      fat: 0.1,
      carbs: 17.2
    },
    nutrients: {
      fiber: 4.9,       // g
      vitaminC: 44,     // mg
      potassium: 556,   // mg
      copper: 0.3,      // mg
      vitaminB6: 0.2    // mg
    },
    tags: ["crunchy", "hydrating", "cultural classic"]
  },
  {
    name: "Chayote (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 24,
    macros: {
      protein: 0.5,
      fat: 0.2,
      carbs: 5.5
    },
    nutrients: {
      fiber: 2.2,       // g
      vitaminC: 7.7,    // mg
      folate: 93,       // mcg
      potassium: 125,   // mg
      vitaminB6: 0.1    // mg
    },
    tags: ["low-calorie", "digestive", "light veggie"]
  },
  {
    name: "Burdock Root",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 72,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 17.3
    },
    nutrients: {
      fiber: 3.3,       // g
      potassium: 308,   // mg
      magnesium: 38,    // mg
      calcium: 41,      // mg
      folate: 23        // mcg
    },
    tags: ["detox", "earthy", "traditional medicine"]
  },
  {
    name: "Amaranth (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 102,
    macros: {
      protein: 3.8,
      fat: 1.6,
      carbs: 19.0
    },
    nutrients: {
      fiber: 2.1,       // g
      iron: 2.3,        // mg
      magnesium: 65,    // mg
      phosphorus: 135,  // mg
      manganese: 0.6    // mg
    },
    tags: ["ancient grain", "complete protein", "energizing"]
  },
  {
    name: "Teff (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 101,
    macros: {
      protein: 3.9,
      fat: 0.6,
      carbs: 20.1
    },
    nutrients: {
      fiber: 2.8,       // g
      calcium: 180,     // mg
      iron: 2.1,        // mg
      manganese: 1.3,   // mg
      vitaminC: 0       // mg
    },
    tags: ["gluten-free", "bone support", "iron-rich"]
  },
  {
    name: "Nopales (cooked cactus)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 22,
    macros: {
      protein: 1.4,
      fat: 0.2,
      carbs: 4.9
    },
    nutrients: {
      fiber: 2.2,       // g
      vitaminC: 9.2,    // mg
      calcium: 164,     // mg
      magnesium: 52,    // mg
      potassium: 220    // mg
    },
    tags: ["blood sugar support", "gut health", "Mexican cuisine"]
  },
  {
    name: "Cress (garden cress)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 2.6,
      fat: 0.7,
      carbs: 5.5
    },
    nutrients: {
      vitaminC: 69,     // mg
      vitaminA: 691,    // mcg
      folate: 80,       // mcg
      iron: 1.3,        // mg
      fiber: 1.1        // g
    },
    tags: ["spicy green", "high vitamin C", "detox"]
  },
  {
    name: "Lingonberries",
    category: "Fruits",
    servingSize: "100g",
    calories: 53,
    macros: {
      protein: 0.7,
      fat: 0.5,
      carbs: 11.3
    },
    nutrients: {
      fiber: 2.5,       // g
      vitaminE: 1.5,    // mg
      manganese: 0.4,   // mg
      vitaminC: 11,     // mg
      potassium: 104    // mg
    },
    tags: ["nordic berry", "antioxidant", "immune support"]
  },
  {
    name: "Arame (seaweed)",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 50,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 11.6
    },
    nutrients: {
      iodine: 730,      // mcg
      calcium: 114,     // mg
      magnesium: 61,    // mg
      fiber: 1.5,       // g
      potassium: 325    // mg
    },
    tags: ["mineral-rich", "thyroid", "alkalizing"]
  },
  {
    name: "Daikon Radish (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 18,
    macros: {
      protein: 0.6,
      fat: 0.1,
      carbs: 4.1
    },
    nutrients: {
      fiber: 1.6,       // g
      vitaminC: 22,     // mg
      potassium: 227,   // mg
      calcium: 27,      // mg
      phosphorus: 23    // mg
    },
    tags: ["digestive", "cleansing", "crunchy"]
  },
  {
    name: "Tamarind",
    category: "Fruits",
    servingSize: "100g",
    calories: 239,
    macros: {
      protein: 2.8,
      fat: 0.6,
      carbs: 62.5
    },
    nutrients: {
      fiber: 5.1,       // g
      potassium: 628,   // mg
      magnesium: 92,    // mg
      vitaminB1: 0.4,   // mg
      iron: 2.8         // mg
    },
    tags: ["sweet & sour", "iron-rich", "tropical"]
  },
  {
    name: "Romanesco (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 2.0,
      fat: 0.3,
      carbs: 4.1
    },
    nutrients: {
      fiber: 2.2,       // g
      vitaminC: 60,     // mg
      vitaminK1: 12,    // mcg
      folate: 55,       // mcg
      potassium: 210    // mg
    },
    tags: ["fractal veggie", "cruciferous", "light"]
  },
  {
    name: "Chickpeas (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 164,
    macros: {
      protein: 8.9,
      fat: 2.6,
      carbs: 27.4
    },
    nutrients: {
      fiber: 7.6,       // g
      iron: 2.9,        // mg
      folate: 172,      // mcg
      manganese: 1.0,   // mg
      magnesium: 48     // mg
    },
    tags: ["plant protein", "filling", "versatile"]
  },
  {
    name: "Macadamia Nuts",
    category: "Nuts",
    servingSize: "100g",
    calories: 718,
    macros: {
      protein: 7.9,
      fat: 75.8,
      carbs: 13.8
    },
    nutrients: {
      fiber: 8.6,       // g
      thiamin: 1.2,     // mg
      magnesium: 130,   // mg
      iron: 3.7,        // mg
      manganese: 4.1    // mg
    },
    tags: ["high fat", "keto-friendly", "satiety"]
  },
  {
    name: "Prickly Pear",
    category: "Fruits",
    servingSize: "100g",
    calories: 41,
    macros: {
      protein: 0.7,
      fat: 0.5,
      carbs: 9.6
    },
    nutrients: {
      fiber: 3.6,       // g
      vitaminC: 14,     // mg
      calcium: 56,      // mg
      magnesium: 85,    // mg
      potassium: 220    // mg
    },
    tags: ["cactus fruit", "refreshing", "desert nutrient"]
  },
  {
    name: "Freekeh (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 123,
    macros: {
      protein: 4.4,
      fat: 0.9,
      carbs: 25.0
    },
    nutrients: {
      fiber: 3.6,       // g
      iron: 1.8,        // mg
      magnesium: 44,    // mg
      phosphorus: 105,  // mg
      zinc: 1.1         // mg
    },
    tags: ["ancient grain", "smoky flavor", "fiber-rich"]
  },
  {
    name: "Camu Camu (powder)",
    category: "Fruits",
    servingSize: "5g",
    calories: 20,
    macros: {
      protein: 0.2,
      fat: 0.1,
      carbs: 4.2
    },
    nutrients: {
      vitaminC: 750,    // mg
      fiber: 0.2,       // g
      potassium: 27,    // mg
      calcium: 3,       // mg
      iron: 0.2         // mg
    },
    tags: ["superfruit", "antioxidant", "immune booster"]
  },
  {
    name: "Ackee (cooked)",
    category: "Fruits",
    servingSize: "100g",
    calories: 151,
    macros: {
      protein: 2.9,
      fat: 15.2,
      carbs: 0.8
    },
    nutrients: {
      fiber: 2.7,       // g
      vitaminC: 30,     // mg
      potassium: 270,   // mg
      calcium: 35,      // mg
      iron: 1.1         // mg
    },
    tags: ["Caribbean", "fat-rich fruit", "savory"]
  },
  {
    name: "Fiddleheads (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 34,
    macros: {
      protein: 4.6,
      fat: 0.4,
      carbs: 5.7
    },
    nutrients: {
      fiber: 1.3,       // g
      vitaminA: 361,    // mcg
      vitaminC: 26.6,   // mg
      iron: 1.3,        // mg
      potassium: 370    // mg
    },
    tags: ["wild food", "spring veggie", "seasonal"]
  },
  {
    name: "Red Currants",
    category: "Fruits",
    servingSize: "100g",
    calories: 56,
    macros: {
      protein: 1.4,
      fat: 0.2,
      carbs: 13.8
    },
    nutrients: {
      fiber: 4.3,       // g
      vitaminC: 41,     // mg
      potassium: 275,   // mg
      iron: 1.0,        // mg
      vitaminK1: 11     // mcg
    },
    tags: ["tart berry", "immune health", "vibrant"]
  },
  {
    name: "Black Garlic",
    category: "Vegetables",
    servingSize: "100g",
    calories: 200,
    macros: {
      protein: 5.0,
      fat: 0.7,
      carbs: 46.0
    },
    nutrients: {
      fiber: 2.1,       // g
      manganese: 1.3,   // mg
      selenium: 14.2,   // mcg
      calcium: 93,      // mg
      vitaminC: 1.3     // mg
    },
    tags: ["fermented", "antioxidant", "sweet-savory"]
  },
  {
    name: "Yellow Split Peas (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 118,
    macros: {
      protein: 8.3,
      fat: 0.4,
      carbs: 21.1
    },
    nutrients: {
      fiber: 8.3,
      folate: 120,
      potassium: 370,
      iron: 1.3,
      magnesium: 43
    },
    tags: ["high-fiber", "hearty", "plant-based"]
  },
  {
    name: "Black Soybeans (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 140,
    macros: {
      protein: 11.1,
      fat: 6.0,
      carbs: 11.2
    },
    nutrients: {
      fiber: 7.5,
      iron: 3.6,
      calcium: 92,
      potassium: 431,
      folate: 165
    },
    tags: ["low carb", "keto-friendly", "soy protein"]
  },
  {
    name: "Rambutan",
    category: "Fruits",
    servingSize: "100g",
    calories: 68,
    macros: {
      protein: 0.9,
      fat: 0.2,
      carbs: 16.5
    },
    nutrients: {
      fiber: 0.9,
      vitaminC: 20,
      iron: 0.4,
      calcium: 22,
      potassium: 42
    },
    tags: ["exotic", "hydrating", "refreshing"]
  },
  {
    name: "Longan",
    category: "Fruits",
    servingSize: "100g",
    calories: 60,
    macros: {
      protein: 1.0,
      fat: 0.1,
      carbs: 15.1
    },
    nutrients: {
      vitaminC: 84,
      potassium: 266,
      fiber: 1.1,
      iron: 0.3,
      phosphorus: 21
    },
    tags: ["tropical", "lychee cousin", "sweet"]
  },
  {
    name: "Chokeberries (Aronia)",
    category: "Fruits",
    servingSize: "100g",
    calories: 47,
    macros: {
      protein: 1.4,
      fat: 0.5,
      carbs: 9.6
    },
    nutrients: {
      fiber: 5.3,
      vitaminC: 21,
      manganese: 1.1,
      potassium: 162,
      iron: 1.4
    },
    tags: ["superfruit", "antioxidant", "tart"]
  },
  {
    name: "Beluga Lentils (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 116,
    macros: {
      protein: 9.0,
      fat: 0.4,
      carbs: 20.1
    },
    nutrients: {
      fiber: 7.9,
      folate: 181,
      iron: 3.3,
      magnesium: 36,
      zinc: 1.3
    },
    tags: ["black lentils", "protein-rich", "iron booster"]
  },
  {
    name: "Enoki Mushrooms",
    category: "Fungi",
    servingSize: "100g",
    calories: 37,
    macros: {
      protein: 2.7,
      fat: 0.3,
      carbs: 7.8
    },
    nutrients: {
      fiber: 2.7,
      niacin: 7.0,
      potassium: 359,
      iron: 1.2,
      calcium: 3
    },
    tags: ["immune boost", "low-cal", "gourmet"]
  },
  {
    name: "Shiso Leaves",
    category: "Herbs",
    servingSize: "100g",
    calories: 37,
    macros: {
      protein: 2.2,
      fat: 0.4,
      carbs: 7.1
    },
    nutrients: {
      calcium: 150,
      vitaminC: 12,
      iron: 3.1,
      fiber: 3.2,
      vitaminA: 730
    },
    tags: ["herbal", "anti-inflammatory", "aromatic"]
  },
  {
    name: "Horned Melon",
    category: "Fruits",
    servingSize: "100g",
    calories: 44,
    macros: {
      protein: 1.8,
      fat: 1.3,
      carbs: 8.0
    },
    nutrients: {
      vitaminC: 5.3,
      magnesium: 40,
      iron: 1.1,
      fiber: 2.5,
      potassium: 123
    },
    tags: ["hydrating", "tropical", "funky-looking"]
  },
  {
    name: "Wheat Berries (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 111,
    macros: {
      protein: 3.8,
      fat: 0.4,
      carbs: 24.8
    },
    nutrients: {
      fiber: 3.8,
      magnesium: 38,
      iron: 1.5,
      zinc: 1.0,
      phosphorus: 104
    },
    tags: ["whole grain", "fiber-rich", "chewy"]
  },
  {
    name: "Green Papaya",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 0.5,
      fat: 0.3,
      carbs: 10.8
    },
    nutrients: {
      fiber: 1.7,
      vitaminC: 62,
      potassium: 182,
      folate: 37,
      vitaminA: 47
    },
    tags: ["enzyme-rich", "tart", "gut-health"]
  },
  {
    name: "Lotus Seeds (dried)",
    category: "Seeds",
    servingSize: "100g",
    calories: 332,
    macros: {
      protein: 15.4,
      fat: 1.9,
      carbs: 64.5
    },
    nutrients: {
      fiber: 12.3,
      calcium: 163,
      iron: 3.5,
      phosphorus: 168,
      potassium: 367
    },
    tags: ["traditional", "adaptogenic", "snackable"]
  },
  {
    name: "White Mulberries (dried)",
    category: "Fruits",
    servingSize: "100g",
    calories: 336,
    macros: {
      protein: 2.0,
      fat: 1.5,
      carbs: 75.0
    },
    nutrients: {
      fiber: 6.8,
      vitaminC: 36,
      iron: 2.6,
      potassium: 194,
      calcium: 186
    },
    tags: ["sweet", "traditional", "iron-rich"]
  },
  {
    name: "Rose Hips (dried)",
    category: "Fruits",
    servingSize: "100g",
    calories: 284,
    macros: {
      protein: 1.6,
      fat: 0.3,
      carbs: 63.0
    },
    nutrients: {
      vitaminC: 426,
      calcium: 169,
      fiber: 24.1,
      iron: 1.6,
      vitaminA: 217
    },
    tags: ["herbal", "astringent", "vitamin C bomb"]
  },
  {
    name: "Brazilian Nutsedge (Tigernuts)",
    category: "Tubers",
    servingSize: "100g",
    calories: 486,
    macros: {
      protein: 4.0,
      fat: 24.0,
      carbs: 63.0
    },
    nutrients: {
      fiber: 10.0,
      potassium: 495,
      magnesium: 92,
      iron: 3.0,
      calcium: 70
    },
    tags: ["prehistoric snack", "fiber-rich", "sweet"]
  },
  {
    name: "Kombu (seaweed, dried)",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 1.7,
      fat: 0.6,
      carbs: 9.6
    },
    nutrients: {
      iodine: 2523,     // mcg
      calcium: 168,     // mg
      magnesium: 121,   // mg
      fiber: 2.2,       // g
      iron: 2.9         // mg
    },
    tags: ["thyroid support", "umami base", "detox"]
  },
  {
    name: "Jackfruit (raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 95,
    macros: {
      protein: 1.7,
      fat: 0.6,
      carbs: 23.3
    },
    nutrients: {
      vitaminC: 13.7,
      potassium: 448,
      fiber: 1.5,
      magnesium: 29,
      vitaminA: 5
    },
    tags: ["meat substitute", "tropical", "bulky"]
  },
  {
    name: "Bitter Melon",
    category: "Vegetables",
    servingSize: "100g",
    calories: 17,
    macros: {
      protein: 1.0,
      fat: 0.2,
      carbs: 3.7
    },
    nutrients: {
      fiber: 2.8,
      vitaminC: 84,
      potassium: 296,
      folate: 72,
      iron: 0.4
    },
    tags: ["blood sugar support", "bitter herb", "gut-health"]
  },
  {
    name: "White Asparagus",
    category: "Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 2.2,
      fat: 0.2,
      carbs: 3.7
    },
    nutrients: {
      fiber: 2.1,
      vitaminK1: 42,
      folate: 89,
      vitaminC: 5.6,
      iron: 1.1
    },
    tags: ["delicate", "low-cal", "diuretic"]
  },
  {
    name: "Green Banana (boiled)",
    category: "Fruits",
    servingSize: "100g",
    calories: 122,
    macros: {
      protein: 1.2,
      fat: 0.3,
      carbs: 31.9
    },
    nutrients: {
      fiber: 2.6,
      potassium: 499,
      magnesium: 37,
      vitaminB6: 0.4,
      vitaminC: 8.7
    },
    tags: ["resistant starch", "prebiotic", "carb-base"]
  },
  {
    name: "Golden Berries (dried)",
    category: "Fruits",
    servingSize: "100g",
    calories: 325,
    macros: {
      protein: 7.0,
      fat: 5.3,
      carbs: 72.0
    },
    nutrients: {
      fiber: 19.2,
      vitaminC: 11,
      iron: 3.5,
      phosphorus: 200,
      potassium: 970
    },
    tags: ["superfruit", "sweet-tart", "energy"]
  },
  {
    name: "Mangosteen",
    category: "Fruits",
    servingSize: "100g",
    calories: 73,
    macros: {
      protein: 0.4,
      fat: 0.6,
      carbs: 17.9
    },
    nutrients: {
      vitaminC: 2.9,
      fiber: 1.8,
      potassium: 48,
      calcium: 12,
      iron: 0.3
    },
    tags: ["tropical", "antioxidant", "delicacy"]
  },
  {
    name: "Soursop",
    category: "Fruits",
    servingSize: "100g",
    calories: 66,
    macros: {
      protein: 1.0,
      fat: 0.3,
      carbs: 16.8
    },
    nutrients: {
      fiber: 3.3,
      vitaminC: 20.6,
      potassium: 278,
      magnesium: 21,
      calcium: 14
    },
    tags: ["tropical", "immune", "aromatic"]
  },
  {
    name: "Scallions (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 7.3
    },
    nutrients: {
      fiber: 2.6,
      vitaminK1: 207,
      vitaminC: 18.8,
      folate: 64,
      potassium: 276
    },
    tags: ["allium", "flavor booster", "low-cal"]
  },
  {
    name: "Cactus Paddle (Nopal, raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 16,
    macros: {
      protein: 1.3,
      fat: 0.1,
      carbs: 3.3
    },
    nutrients: {
      fiber: 2.2,
      vitaminC: 9.5,
      calcium: 164,
      magnesium: 52,
      potassium: 220
    },
    tags: ["hydrating", "alkalizing", "gut-health"]
  },
  {
    name: "Celeriac (cooked)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 42,
    macros: {
      protein: 1.5,
      fat: 0.3,
      carbs: 9.2
    },
    nutrients: {
      fiber: 1.8,
      vitaminK1: 41,
      vitaminC: 8,
      phosphorus: 115,
      potassium: 300
    },
    tags: ["root veggie", "aromatic", "low-cal"]
  },
  {
    name: "Purslane",
    category: "Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 2.0,
      fat: 0.4,
      carbs: 3.4
    },
    nutrients: {
      omega3_ALA: 0.4,
      vitaminA: 1320,
      magnesium: 68,
      potassium: 494,
      vitaminC: 21
    },
    tags: ["wild green", "anti-inflammatory", "omega-rich"]
  },
  {
    name: "Hearts of Palm (canned)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 36,
    macros: {
      protein: 3.6,
      fat: 0.6,
      carbs: 6.7
    },
    nutrients: {
      fiber: 3.5,
      potassium: 38,
      vitaminC: 7.4,
      iron: 3.1,
      zinc: 0.3
    },
    tags: ["fiber-rich", "smooth texture", "exotic"]
  },
  {
    name: "Alfalfa Sprouts",
    category: "Vegetables",
    servingSize: "100g",
    calories: 23,
    macros: {
      protein: 4.0,
      fat: 0.7,
      carbs: 2.1
    },
    nutrients: {
      vitaminK1: 30.5,
      vitaminC: 8.2,
      folate: 36,
      calcium: 32,
      fiber: 1.9
    },
    tags: ["light", "crunchy", "sprout power"]
  },
  {
    name: "Spirulina (dried)",
    category: "Algae",
    servingSize: "100g",
    calories: 290,
    macros: {
      protein: 57.5,
      fat: 7.7,
      carbs: 23.9
    },
    nutrients: {
      iron: 28.5,
      vitaminB1: 2.4,
      magnesium: 195,
      omega3_ALA: 0.9,
      fiber: 3.6
    },
    tags: ["superfood", "detox", "protein bomb"]
  },
  {
    name: "Coconut Water",
    category: "Beverages",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 0.7,
      fat: 0.2,
      carbs: 3.7
    },
    nutrients: {
      potassium: 250,
      magnesium: 25,
      sodium: 105,
      calcium: 24,
      fiber: 1.1
    },
    tags: ["hydrating", "natural electrolyte", "light"]
  },
  {
    name: "Orange Bell Pepper",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 1.0,
      fat: 0.3,
      carbs: 7.2
    },
    nutrients: {
      vitaminC: 150,
      vitaminA: 157,
      potassium: 212,
      fiber: 2.1,
      folate: 46
    },
    tags: ["antioxidant", "eye-health", "colorful"]
  },
  {
    name: "Marionberries",
    category: "Fruits",
    servingSize: "100g",
    calories: 52,
    macros: {
      protein: 1.4,
      fat: 0.5,
      carbs: 12.3
    },
    nutrients: {
      fiber: 7.6,
      vitaminC: 30,
      manganese: 0.9,
      vitaminK1: 7,
      potassium: 155
    },
    tags: ["antioxidant", "blackberry family", "fiber-rich"]
  },
  {
    name: "Morel Mushrooms (raw)",
    category: "Fungi",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 3.1,
      fat: 0.6,
      carbs: 5.1
    },
    nutrients: {
      iron: 12.2,
      phosphorus: 194,
      potassium: 411,
      fiber: 2.8,
      vitaminD: 5
    },
    tags: ["gourmet", "earthy", "wild-harvested"]
  },
  {
    name: "Yucca Root (boiled)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 112,
    macros: {
      protein: 1.4,
      fat: 0.4,
      carbs: 27.0
    },
    nutrients: {
      fiber: 1.8,
      vitaminC: 20.6,
      potassium: 271,
      magnesium: 21,
      calcium: 16
    },
    tags: ["carb source", "earthy", "gut-soothing"]
  },
  {
    name: "Fava Beans (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 110,
    macros: {
      protein: 7.6,
      fat: 0.5,
      carbs: 19.7
    },
    nutrients: {
      fiber: 5.4,
      folate: 104,
      iron: 1.5,
      magnesium: 43,
      potassium: 332
    },
    tags: ["protein", "fiber", "plant-powered"]
  },
  {
    name: "Green Chickpeas (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 120,
    macros: {
      protein: 7.5,
      fat: 2.2,
      carbs: 18.5
    },
    nutrients: {
      fiber: 6.8,
      vitaminC: 7,
      folate: 147,
      potassium: 346,
      iron: 2.1
    },
    tags: ["fresh legume", "plant protein", "gut-health"]
  },
  {
    name: "Galangal Root (raw)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 71,
    macros: {
      protein: 1.0,
      fat: 0.4,
      carbs: 15.4
    },
    nutrients: {
      fiber: 2.0,
      iron: 1.2,
      potassium: 415,
      calcium: 10,
      vitaminC: 5.4
    },
    tags: ["spicy", "digestive", "southeast asia"]
  },
  {
    name: "Kelp Noodles",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 6,
    macros: {
      protein: 0.3,
      fat: 0.1,
      carbs: 1.0
    },
    nutrients: {
      calcium: 134,
      iodine: 260,
      iron: 0.3,
      fiber: 1.0,
      magnesium: 30
    },
    tags: ["low-carb", "thyroid", "hydrating"]
  },
  {
    name: "Pomelo",
    category: "Fruits",
    servingSize: "100g",
    calories: 38,
    macros: {
      protein: 0.8,
      fat: 0.0,
      carbs: 9.6
    },
    nutrients: {
      fiber: 1.0,
      vitaminC: 61,
      potassium: 216,
      magnesium: 6,
      vitaminA: 8
    },
    tags: ["citrus", "hydrating", "alkaline"]
  },
  {
    name: "Green Mango",
    category: "Fruits",
    servingSize: "100g",
    calories: 60,
    macros: {
      protein: 0.8,
      fat: 0.4,
      carbs: 14.0
    },
    nutrients: {
      fiber: 1.7,
      vitaminC: 35.4,
      potassium: 168,
      folate: 43,
      vitaminA: 54
    },
    tags: ["tart", "tropical", "enzyme-rich"]
  },
  {
    name: "Rye Berries (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 120,
    macros: {
      protein: 4.0,
      fat: 1.6,
      carbs: 21.0
    },
    nutrients: {
      fiber: 5.2,
      manganese: 1.3,
      magnesium: 42,
      selenium: 18,
      zinc: 1.1
    },
    tags: ["ancient grain", "fiber-rich", "satiating"]
  },
  {
    name: "Black Radish",
    category: "Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 1.1,
      fat: 0.1,
      carbs: 4.1
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 17,
      potassium: 233,
      folate: 16,
      calcium: 35
    },
    tags: ["detox", "digestive", "peppery"]
  },
  {
    name: "Canistel (eggfruit)",
    category: "Fruits",
    servingSize: "100g",
    calories: 140,
    macros: {
      protein: 1.7,
      fat: 0.1,
      carbs: 36.7
    },
    nutrients: {
      fiber: 4.6,
      vitaminA: 369,
      potassium: 330,
      vitaminC: 31,
      calcium: 18
    },
    tags: ["carotenoid-rich", "tropical", "dessert fruit"]
  },
  {
    name: "Chayote Leaves",
    category: "Vegetables",
    servingSize: "100g",
    calories: 35,
    macros: {
      protein: 3.2,
      fat: 0.4,
      carbs: 5.9
    },
    nutrients: {
      fiber: 2.3,
      vitaminC: 33,
      iron: 2.8,
      calcium: 45,
      potassium: 312
    },
    tags: ["leafy green", "edible leaves", "alkalizing"]
  },
  {
    name: "Tiger Nuts (raw)",
    category: "Tubers",
    servingSize: "100g",
    calories: 484,
    macros: {
      protein: 4.3,
      fat: 24.9,
      carbs: 63.0
    },
    nutrients: {
      fiber: 10.0,
      iron: 3.3,
      magnesium: 92,
      potassium: 495,
      calcium: 70
    },
    tags: ["prehistoric snack", "fiber-rich", "resistant starch"]
  },
  {
    name: "Natto",
    category: "Legumes",
    servingSize: "100g",
    calories: 212,
    macros: {
      protein: 18.0,
      fat: 11.0,
      carbs: 12.0
    },
    nutrients: {
      fiber: 5.4,
      vitaminK2: 1000,
      iron: 8.6,
      calcium: 90,
      magnesium: 115
    },
    tags: ["fermented", "gut-health", "K2-rich"]
  },
  {
    name: "Cloudberries",
    category: "Fruits",
    servingSize: "100g",
    calories: 51,
    macros: {
      protein: 2.4,
      fat: 0.8,
      carbs: 8.6
    },
    nutrients: {
      vitaminC: 158,
      fiber: 6.3,
      iron: 0.7,
      potassium: 170,
      vitaminA: 80
    },
    tags: ["nordic", "immune boost", "rare"]
  },
  {
    name: "Black Sapote (chocolate pudding fruit)",
    category: "Fruits",
    servingSize: "100g",
    calories: 134,
    macros: {
      protein: 2.1,
      fat: 0.6,
      carbs: 35.7
    },
    nutrients: {
      fiber: 5.0,
      vitaminC: 19,
      potassium: 360,
      calcium: 22,
      vitaminA: 36
    },
    tags: ["dessert fruit", "tropical", "smooth"]
  },
  {
    name: "Cape Gooseberries",
    category: "Fruits",
    servingSize: "100g",
    calories: 53,
    macros: {
      protein: 1.9,
      fat: 0.7,
      carbs: 11.2
    },
    nutrients: {
      vitaminC: 11,
      vitaminA: 60,
      potassium: 300,
      fiber: 4.3,
      iron: 1.0
    },
    tags: ["tart", "exotic", "physalis"]
  },
  {
    name: "Pigeon Peas (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 142,
    macros: {
      protein: 9.1,
      fat: 0.6,
      carbs: 25.0
    },
    nutrients: {
      fiber: 5.0,
      folate: 104,
      potassium: 384,
      iron: 1.5,
      magnesium: 47
    },
    tags: ["protein-rich", "tropical legume", "hearty"]
  },
  {
    name: "Jujube (raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 79,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 20.2
    },
    nutrients: {
      fiber: 2.6,
      vitaminC: 69,
      potassium: 250,
      calcium: 21,
      phosphorus: 23
    },
    tags: ["adaptogenic", "sweet", "asian fruit"]
  },
  {
    name: "Barberry",
    category: "Fruits",
    servingSize: "100g",
    calories: 316,
    macros: {
      protein: 3.6,
      fat: 1.3,
      carbs: 63.9
    },
    nutrients: {
      fiber: 7.4,
      vitaminC: 24,
      iron: 7.2,
      potassium: 360,
      calcium: 83
    },
    tags: ["sour", "medicinal", "wild berry"]
  },
  {
    name: "Breadfruit (cooked)",
    category: "Fruits",
    servingSize: "100g",
    calories: 103,
    macros: {
      protein: 1.1,
      fat: 0.2,
      carbs: 27.1
    },
    nutrients: {
      fiber: 4.9,
      potassium: 490,
      vitaminC: 29,
      calcium: 17,
      magnesium: 25
    },
    tags: ["starchy", "Caribbean", "nutrient-dense"]
  },
  {
    name: "Cupuacu",
    category: "Fruits",
    servingSize: "100g",
    calories: 51,
    macros: {
      protein: 1.0,
      fat: 1.0,
      carbs: 11.4
    },
    nutrients: {
      fiber: 4.2,
      vitaminC: 24,
      calcium: 36,
      potassium: 286,
      iron: 0.9
    },
    tags: ["Amazonian", "superfruit", "fragrant"]
  },
  {
    name: "Salak (snake fruit)",
    category: "Fruits",
    servingSize: "100g",
    calories: 82,
    macros: {
      protein: 0.9,
      fat: 0.4,
      carbs: 22.3
    },
    nutrients: {
      fiber: 2.6,
      vitaminC: 8.4,
      potassium: 230,
      calcium: 38,
      iron: 1.1
    },
    tags: ["tropical", "sweet & sour", "scaly skin"]
  },
  {
    name: "Tamarillo (tree tomato)",
    category: "Fruits",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 2.0,
      fat: 0.4,
      carbs: 5.5
    },
    nutrients: {
      fiber: 1.3,
      vitaminC: 29,
      potassium: 321,
      calcium: 12,
      vitaminA: 52
    },
    tags: ["nightshade", "tart", "vitamin-packed"]
  },
  {
    name: "Mulukhiyah (Jew's Mallow, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 52,
    macros: {
      protein: 4.5,
      fat: 0.6,
      carbs: 7.0
    },
    nutrients: {
      fiber: 2.8,
      vitaminA: 559,
      calcium: 207,
      potassium: 494,
      iron: 5.8
    },
    tags: ["leafy", "slippery", "Middle Eastern"]
  },
  {
    name: "Lablab Beans (hyacinth beans, cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 129,
    macros: {
      protein: 8.4,
      fat: 0.7,
      carbs: 23.4
    },
    nutrients: {
      fiber: 6.0,
      potassium: 287,
      folate: 88,
      calcium: 46,
      magnesium: 51
    },
    tags: ["heirloom bean", "protein source", "fiber-rich"]
  },
  {
    name: "Rutabaga Greens",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 2.3,
      fat: 0.3,
      carbs: 4.6
    },
    nutrients: {
      fiber: 2.6,
      vitaminC: 32,
      calcium: 137,
      potassium: 220,
      iron: 1.9
    },
    tags: ["leafy green", "underused", "bitter"]
  },
  {
    name: "Indian Gooseberry (Amla)",
    category: "Fruits",
    servingSize: "100g",
    calories: 44,
    macros: {
      protein: 0.9,
      fat: 0.6,
      carbs: 10.2
    },
    nutrients: {
      fiber: 4.3,
      vitaminC: 252,
      calcium: 25,
      iron: 0.3,
      potassium: 198
    },
    tags: ["adaptogen", "antioxidant", "immune-boost"]
  },
  {
    name: "Siberian Ginseng Root",
    category: "Roots",
    servingSize: "100g",
    calories: 85,
    macros: {
      protein: 1.0,
      fat: 0.2,
      carbs: 19.5
    },
    nutrients: {
      fiber: 3.0,
      calcium: 50,
      potassium: 140,
      iron: 1.0,
      vitaminC: 5
    },
    tags: ["adaptogen", "energy", "tonic"]
  },
  {
    name: "Chufa Flour (Tiger Nut Flour)",
    category: "Tubers",
    servingSize: "100g",
    calories: 479,
    macros: {
      protein: 4.5,
      fat: 24.5,
      carbs: 63.2
    },
    nutrients: {
      fiber: 10.1,
      magnesium: 91,
      potassium: 430,
      iron: 3.5,
      calcium: 66
    },
    tags: ["paleo", "resistant starch", "gluten-free"]
  },
  {
    name: "Baobab Fruit Powder",
    category: "Fruits",
    servingSize: "100g",
    calories: 250,
    macros: {
      protein: 2.0,
      fat: 0.5,
      carbs: 75.0
    },
    nutrients: {
      fiber: 45.0,
      vitaminC: 280,
      potassium: 2100,
      calcium: 295,
      iron: 4.5
    },
    tags: ["superfruit", "African", "electrolyte"]
  },
  {
    name: "Water Chestnuts (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 97,
    macros: {
      protein: 1.4,
      fat: 0.1,
      carbs: 23.9
    },
    nutrients: {
      fiber: 3.0,
      potassium: 584,
      vitaminB6: 0.3,
      iron: 0.6,
      vitaminC: 4
    },
    tags: ["crunchy", "hydrating", "sweet-starch"]
  },
  {
    name: "Fiddlehead Ferns (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 34,
    macros: {
      protein: 4.5,
      fat: 0.4,
      carbs: 5.7
    },
    nutrients: {
      fiber: 1.3,
      vitaminA: 361,
      potassium: 370,
      iron: 1.3,
      vitaminC: 26.6
    },
    tags: ["wild", "spring", "detox"]
  },
  {
    name: "Okra Leaves",
    category: "Vegetables",
    servingSize: "100g",
    calories: 29,
    macros: {
      protein: 2.5,
      fat: 0.3,
      carbs: 4.5
    },
    nutrients: {
      fiber: 2.1,
      vitaminA: 142,
      calcium: 150,
      potassium: 291,
      vitaminC: 23
    },
    tags: ["leafy green", "soothing", "underrated"]
  },
  {
    name: "Roman Beans (Borlotti, cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 127,
    macros: {
      protein: 8.9,
      fat: 0.5,
      carbs: 23.7
    },
    nutrients: {
      fiber: 8.6,
      folate: 148,
      magnesium: 44,
      potassium: 350,
      iron: 2.5
    },
    tags: ["Italian bean", "creamy", "filling"]
  },
  {
    name: "Green Garlic",
    category: "Vegetables",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 1.8,
      fat: 0.3,
      carbs: 6.5
    },
    nutrients: {
      fiber: 2.0,
      vitaminC: 17,
      potassium: 246,
      folate: 47,
      calcium: 56
    },
    tags: ["seasonal", "aromatic", "young garlic"]
  },
  {
    name: "Samphire (Sea Asparagus)",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 2.0,
      fat: 0.5,
      carbs: 3.1
    },
    nutrients: {
      fiber: 2.0,
      sodium: 510,
      iodine: 105,
      potassium: 271,
      calcium: 50
    },
    tags: ["salty", "alkaline", "coastal"]
  },
  {
    name: "Red Kuri Squash (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 91,
    macros: {
      protein: 1.0,
      fat: 0.2,
      carbs: 23.7
    },
    nutrients: {
      fiber: 2.0,
      vitaminA: 1910,
      vitaminC: 20,
      potassium: 437,
      magnesium: 27
    },
    tags: ["autumn", "squash family", "vitamin A"]
  },
  {
    name: "Amsoi (Indian Mustard Greens)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 27,
    macros: {
      protein: 2.3,
      fat: 0.3,
      carbs: 4.5
    },
    nutrients: {
      fiber: 3.1,
      vitaminK1: 360,
      vitaminA: 118,
      vitaminC: 45,
      calcium: 115
    },
    tags: ["leafy", "bitter", "immune"]
  },
  {
    name: "Tatsoi",
    category: "Vegetables",
    servingSize: "100g",
    calories: 22,
    macros: {
      protein: 2.2,
      fat: 0.3,
      carbs: 3.5
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 65,
      calcium: 159,
      potassium: 554,
      vitaminK1: 280
    },
    tags: ["asian green", "mild", "alkaline"]
  },
  {
    name: "Moringa Leaves",
    category: "Vegetables",
    servingSize: "100g",
    calories: 64,
    macros: {
      protein: 9.4,
      fat: 1.4,
      carbs: 8.3
    },
    nutrients: {
      fiber: 2.0,
      calcium: 185,
      potassium: 337,
      iron: 4.0,
      vitaminC: 51
    },
    tags: ["supergreen", "antioxidant", "nutrient-dense"]
  },
  {
    name: "Tindora (Ivy Gourd, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 21,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 4.2
    },
    nutrients: {
      fiber: 2.2,
      vitaminC: 28,
      potassium: 157,
      calcium: 40,
      iron: 1.5
    },
    tags: ["Indian veggie", "low-cal", "gut support"]
  },
  {
    name: "Elephant Garlic (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 120,
    macros: {
      protein: 4.4,
      fat: 0.7,
      carbs: 25.0
    },
    nutrients: {
      fiber: 3.2,
      calcium: 153,
      potassium: 401,
      vitaminC: 12,
      selenium: 5.6
    },
    tags: ["giant allium", "antimicrobial", "aromatic"]
  },
  {
    name: "Kangkong (Water Spinach, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 2.6,
      fat: 0.2,
      carbs: 3.1
    },
    nutrients: {
      fiber: 2.1,
      vitaminA: 630,
      iron: 2.5,
      calcium: 77,
      vitaminC: 55
    },
    tags: ["leafy", "hydrating", "southeast asia"]
  },
  {
    name: "Sea Buckthorn Berries",
    category: "Fruits",
    servingSize: "100g",
    calories: 82,
    macros: {
      protein: 1.2,
      fat: 5.3,
      carbs: 8.0
    },
    nutrients: {
      fiber: 3.4,
      vitaminC: 400,
      vitaminE: 5.0,
      potassium: 300,
      omega3_ALA: 1.2
    },
    tags: ["superberry", "skin", "immune"]
  },
  {
    name: "Ramps (Wild Leeks)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 26,
    macros: {
      protein: 2.3,
      fat: 0.2,
      carbs: 4.8
    },
    nutrients: {
      fiber: 2.5,
      vitaminA: 120,
      vitaminC: 50,
      calcium: 60,
      potassium: 160
    },
    tags: ["foraged", "garlic-onion hybrid", "spring"]
  },
  {
    name: "Chicory Greens",
    category: "Vegetables",
    servingSize: "100g",
    calories: 23,
    macros: {
      protein: 1.7,
      fat: 0.3,
      carbs: 4.7
    },
    nutrients: {
      fiber: 3.0,
      vitaminK1: 231,
      calcium: 100,
      potassium: 420,
      folate: 110
    },
    tags: ["bitter", "gut health", "alkaline"]
  },
  {
    name: "Sunchoke Flour",
    category: "Roots",
    servingSize: "100g",
    calories: 331,
    macros: {
      protein: 5.3,
      fat: 0.4,
      carbs: 76.6
    },
    nutrients: {
      fiber: 10.3,
      iron: 3.2,
      potassium: 429,
      magnesium: 32,
      vitaminC: 2.6
    },
    tags: ["prebiotic", "resistant starch", "gut-health"]
  },
  {
    name: "Wood Ear Mushrooms (dried)",
    category: "Fungi",
    servingSize: "100g",
    calories: 284,
    macros: {
      protein: 9.3,
      fat: 0.7,
      carbs: 73.9
    },
    nutrients: {
      fiber: 25.7,
      iron: 5.8,
      potassium: 754,
      calcium: 109,
      phosphorus: 200
    },
    tags: ["crunchy", "iron-rich", "Chinese cuisine"]
  },
  {
    name: "Cholla Cactus Buds (dried)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 165,
    macros: {
      protein: 8.7,
      fat: 1.2,
      carbs: 33.0
    },
    nutrients: {
      fiber: 12.6,
      calcium: 369,
      magnesium: 64,
      potassium: 290,
      vitaminC: 2.5
    },
    tags: ["desert plant", "calcium-rich", "ancestral"]
  },
  {
    name: "Hornwort (aquatic plant, cooked)",
    category: "Aquatic Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 2.0,
      fat: 0.3,
      carbs: 3.5
    },
    nutrients: {
      fiber: 1.8,
      potassium: 250,
      calcium: 80,
      iron: 1.0,
      vitaminK1: 44
    },
    tags: ["edible pond plant", "sustainable", "mineral"]
  },
  {
    name: "Ajwain Leaves (Carom)",
    category: "Herbs",
    servingSize: "100g",
    calories: 38,
    macros: {
      protein: 2.0,
      fat: 0.5,
      carbs: 7.3
    },
    nutrients: {
      fiber: 3.0,
      iron: 3.9,
      calcium: 160,
      potassium: 211,
      vitaminC: 23
    },
    tags: ["digestive", "aromatic", "Indian herb"]
  },
  {
    name: "Chervil",
    category: "Herbs",
    servingSize: "100g",
    calories: 237,
    macros: {
      protein: 23.2,
      fat: 3.9,
      carbs: 37.3
    },
    nutrients: {
      fiber: 11.3,
      vitaminC: 85,
      iron: 8.8,
      calcium: 1346,
      vitaminA: 8424
    },
    tags: ["french herb", "mineral-dense", "alkaline"]
  },
  {
    name: "Taro Leaves (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 42,
    macros: {
      protein: 3.2,
      fat: 0.5,
      carbs: 6.4
    },
    nutrients: {
      fiber: 2.0,
      vitaminA: 484,
      calcium: 107,
      iron: 2.4,
      potassium: 277
    },
    tags: ["leafy", "tropical", "mineral-rich"]
  },
  {
    name: "Plantain Flower (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 51,
    macros: {
      protein: 1.6,
      fat: 0.5,
      carbs: 10.5
    },
    nutrients: {
      fiber: 5.7,
      iron: 1.6,
      calcium: 44,
      vitaminC: 20,
      potassium: 247
    },
    tags: ["flowering veggie", "fiber", "southeast asia"]
  },
  {
    name: "Jute Leaves (Molokhia, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 35,
    macros: {
      protein: 4.0,
      fat: 0.3,
      carbs: 5.0
    },
    nutrients: {
      fiber: 2.8,
      calcium: 200,
      iron: 4.7,
      vitaminA: 610,
      potassium: 379
    },
    tags: ["slippery", "immune", "Middle Eastern"]
  },
  {
    name: "Sacha Inchi Seeds",
    category: "Seeds",
    servingSize: "100g",
    calories: 562,
    macros: {
      protein: 26.0,
      fat: 43.0,
      carbs: 10.0
    },
    nutrients: {
      fiber: 8.4,
      omega3_ALA: 17.0,
      iron: 3.3,
      magnesium: 230,
      potassium: 290
    },
    tags: ["vegan protein", "omega-rich", "Amazonian"]
  },
  {
    name: "Yarrow Leaves (cooked)",
    category: "Herbs",
    servingSize: "100g",
    calories: 39,
    macros: {
      protein: 2.1,
      fat: 0.4,
      carbs: 7.6
    },
    nutrients: {
      fiber: 2.2,
      vitaminA: 410,
      calcium: 165,
      potassium: 281,
      vitaminC: 28
    },
    tags: ["wild herb", "bitter tonic", "anti-inflammatory"]
  },
  {
    name: "Malabar Spinach (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 2.0,
      fat: 0.3,
      carbs: 3.4
    },
    nutrients: {
      fiber: 2.0,
      vitaminA: 400,
      iron: 1.2,
      calcium: 102,
      vitaminC: 50
    },
    tags: ["mucilaginous", "alkalizing", "green"]
  },
  {
    name: "Sweet Lime (Mosambi)",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 0.8,
      fat: 0.3,
      carbs: 9.5
    },
    nutrients: {
      fiber: 1.7,
      vitaminC: 50,
      potassium: 200,
      calcium: 30,
      folate: 17
    },
    tags: ["citrus", "refreshing", "alkaline"]
  },
  {
    name: "Neem Leaves",
    category: "Herbs",
    servingSize: "100g",
    calories: 55,
    macros: {
      protein: 5.1,
      fat: 1.2,
      carbs: 6.8
    },
    nutrients: {
      fiber: 3.3,
      calcium: 125,
      potassium: 290,
      vitaminC: 23,
      iron: 2.2
    },
    tags: ["bitter", "cleansing", "traditional medicine"]
  },
  {
    name: "Papalo (Mexican Herb)",
    category: "Herbs",
    servingSize: "100g",
    calories: 38,
    macros: {
      protein: 2.6,
      fat: 0.5,
      carbs: 7.1
    },
    nutrients: {
      fiber: 2.4,
      calcium: 131,
      potassium: 300,
      vitaminC: 22,
      folate: 45
    },
    tags: ["cilantro-like", "aromatic", "traditional"]
  },
  {
    name: "Mizuna (Japanese Mustard Greens)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 21,
    macros: {
      protein: 2.0,
      fat: 0.3,
      carbs: 3.4
    },
    nutrients: {
      fiber: 2.0,
      vitaminK1: 200,
      vitaminA: 230,
      calcium: 86,
      vitaminC: 39
    },
    tags: ["peppery", "alkaline", "cruciferous"]
  },
  {
    name: "Turmeric Greens (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 45,
    macros: {
      protein: 2.3,
      fat: 0.4,
      carbs: 8.3
    },
    nutrients: {
      fiber: 2.7,
      iron: 3.1,
      calcium: 103,
      potassium: 294,
      vitaminC: 18
    },
    tags: ["anti-inflammatory", "bitter", "alkalizing"]
  },
  {
    name: "Limequat",
    category: "Fruits",
    servingSize: "100g",
    calories: 47,
    macros: {
      protein: 0.8,
      fat: 0.3,
      carbs: 10.5
    },
    nutrients: {
      fiber: 2.0,
      vitaminC: 88,
      calcium: 36,
      potassium: 180,
      folate: 12
    },
    tags: ["citrus hybrid", "tart", "vitamin C"]
  },
  {
    name: "Bok Choy Flowers",
    category: "Vegetables",
    servingSize: "100g",
    calories: 18,
    macros: {
      protein: 2.0,
      fat: 0.2,
      carbs: 2.8
    },
    nutrients: {
      fiber: 1.9,
      vitaminC: 45,
      vitaminA: 235,
      calcium: 105,
      folate: 42
    },
    tags: ["cruciferous", "flowering veggie", "mild"]
  },
  {
    name: "Hibiscus Leaves (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 2.1,
      fat: 0.4,
      carbs: 6.4
    },
    nutrients: {
      fiber: 3.3,
      calcium: 130,
      potassium: 293,
      iron: 3.0,
      vitaminC: 20
    },
    tags: ["sour", "alkaline", "gut-soothing"]
  },
  {
    name: "Roselle (Hibiscus Sabdariffa, calyx)",
    category: "Fruits",
    servingSize: "100g",
    calories: 49,
    macros: {
      protein: 0.9,
      fat: 0.6,
      carbs: 11.3
    },
    nutrients: {
      fiber: 2.3,
      vitaminC: 12,
      calcium: 215,
      iron: 1.5,
      potassium: 208
    },
    tags: ["sour", "blood pressure", "tea"]
  },
  {
    name: "Skirret Root",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 99,
    macros: {
      protein: 1.0,
      fat: 0.3,
      carbs: 23.0
    },
    nutrients: {
      fiber: 3.0,
      potassium: 397,
      calcium: 45,
      iron: 1.0,
      vitaminC: 6.0
    },
    tags: ["heirloom root", "sweet", "digestive"]
  },
  {
    name: "Maca Root (powdered)",
    category: "Roots",
    servingSize: "100g",
    calories: 325,
    macros: {
      protein: 14.3,
      fat: 2.2,
      carbs: 71.4
    },
    nutrients: {
      fiber: 7.1,
      iron: 14.8,
      calcium: 250,
      potassium: 2000,
      vitaminC: 285
    },
    tags: ["adaptogen", "energy", "hormone support"]
  },
  {
    name: "Perilla Leaves",
    category: "Herbs",
    servingSize: "100g",
    calories: 37,
    macros: {
      protein: 2.9,
      fat: 0.2,
      carbs: 6.5
    },
    nutrients: {
      fiber: 3.3,
      calcium: 170,
      iron: 2.2,
      potassium: 230,
      vitaminC: 24
    },
    tags: ["Korean cuisine", "omega-rich", "anti-inflammatory"]
  },
  {
    name: "Soursop Leaves (tea infusion)",
    category: "Herbs",
    servingSize: "100g",
    calories: 1,
    macros: {
      protein: 0.1,
      fat: 0.0,
      carbs: 0.2
    },
    nutrients: {
      fiber: 0.0,
      potassium: 8,
      calcium: 2,
      iron: 0.1,
      vitaminC: 1.3
    },
    tags: ["calming", "alkaline", "immune"]
  },
  {
    name: "Banana Blossom (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 51,
    macros: {
      protein: 1.6,
      fat: 0.3,
      carbs: 9.9
    },
    nutrients: {
      fiber: 5.7,
      calcium: 56,
      potassium: 246,
      vitaminC: 23,
      iron: 1.2
    },
    tags: ["meat substitute", "flowering veggie", "gut-health"]
  },
  {
    name: "Cattail Shoots (cooked)",
    category: "Aquatic Vegetables",
    servingSize: "100g",
    calories: 38,
    macros: {
      protein: 1.7,
      fat: 0.3,
      carbs: 8.4
    },
    nutrients: {
      fiber: 2.4,
      potassium: 293,
      vitaminC: 9.2,
      calcium: 48,
      iron: 0.9
    },
    tags: ["foraged", "wetland plant", "edible shoot"]
  },
  {
    name: "Toona Leaves (Chinese Mahogany)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 50,
    macros: {
      protein: 3.8,
      fat: 0.5,
      carbs: 9.2
    },
    nutrients: {
      fiber: 3.0,
      calcium: 165,
      potassium: 330,
      vitaminC: 65,
      iron: 2.5
    },
    tags: ["red veggie", "peppery", "traditional"]
  },
  {
    name: "Guaje Seeds (Leucaena)",
    category: "Legumes",
    servingSize: "100g",
    calories: 150,
    macros: {
      protein: 9.1,
      fat: 6.1,
      carbs: 14.7
    },
    nutrients: {
      fiber: 4.9,
      iron: 3.1,
      magnesium: 90,
      potassium: 286,
      vitaminC: 15
    },
    tags: ["Mexican legume", "fiber", "ancestral"]
  },
  {
    name: "Fennel Pollen",
    category: "Herbs",
    servingSize: "1g",
    calories: 3,
    macros: {
      protein: 0.1,
      fat: 0.1,
      carbs: 0.6
    },
    nutrients: {
      fiber: 0.1,
      calcium: 7,
      iron: 0.2,
      potassium: 12,
      vitaminC: 0.3
    },
    tags: ["aromatic", "digestive", "concentrated"]
  },
  {
    name: "Cassava Leaves (boiled)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 68,
    macros: {
      protein: 3.7,
      fat: 1.0,
      carbs: 11.0
    },
    nutrients: {
      fiber: 3.2,
      vitaminA: 640,
      calcium: 102,
      potassium: 210,
      iron: 1.8
    },
    tags: ["leafy", "staple", "alkaline"]
  },
  {
    name: "Wild Garlic (Ramsons)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 30,
    macros: {
      protein: 2.4,
      fat: 0.3,
      carbs: 5.6
    },
    nutrients: {
      fiber: 2.0,
      vitaminC: 45,
      potassium: 350,
      calcium: 75,
      iron: 1.9
    },
    tags: ["foraged", "detox", "aromatic"]
  },
  {
    name: "Green Sorrel",
    category: "Vegetables",
    servingSize: "100g",
    calories: 22,
    macros: {
      protein: 2.0,
      fat: 0.3,
      carbs: 3.9
    },
    nutrients: {
      fiber: 2.7,
      vitaminC: 48,
      calcium: 44,
      potassium: 390,
      vitaminA: 90
    },
    tags: ["tangy", "alkalizing", "sour"]
  },
  {
    name: "Arrowroot Powder",
    category: "Tubers",
    servingSize: "100g",
    calories: 357,
    macros: {
      protein: 0.3,
      fat: 0.1,
      carbs: 88.2
    },
    nutrients: {
      fiber: 3.4,
      calcium: 40,
      potassium: 454,
      iron: 2.2,
      magnesium: 25
    },
    tags: ["gluten-free", "digestive aid", "paleo"]
  },
  {
    name: "Ice Plant (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 17,
    macros: {
      protein: 1.4,
      fat: 0.2,
      carbs: 3.3
    },
    nutrients: {
      fiber: 1.5,
      vitaminC: 19,
      calcium: 34,
      potassium: 147,
      iron: 0.9
    },
    tags: ["succulent", "hydrating", "cooling"]
  },
  {
    name: "Tamarind Pulp",
    category: "Fruits",
    servingSize: "100g",
    calories: 239,
    macros: {
      protein: 2.8,
      fat: 0.6,
      carbs: 62.5
    },
    nutrients: {
      fiber: 5.1,
      potassium: 628,
      magnesium: 92,
      calcium: 74,
      iron: 2.8
    },
    tags: ["tangy", "digestive", "tropical"]
  },
  {
    name: "Desert Lime",
    category: "Fruits",
    servingSize: "100g",
    calories: 34,
    macros: {
      protein: 0.9,
      fat: 0.3,
      carbs: 7.5
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 49,
      calcium: 45,
      potassium: 230,
      iron: 0.4
    },
    tags: ["Australian native", "citrus", "immune"]
  },
  {
    name: "Sea Lettuce (raw)",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 27,
    macros: {
      protein: 1.7,
      fat: 0.2,
      carbs: 5.1
    },
    nutrients: {
      fiber: 2.1,
      iodine: 142,
      calcium: 72,
      magnesium: 45,
      iron: 1.5
    },
    tags: ["marine", "alkalizing", "chlorophyll"]
  },
  {
    name: "Borage Leaves (cooked)",
    category: "Herbs",
    servingSize: "100g",
    calories: 21,
    macros: {
      protein: 1.8,
      fat: 0.4,
      carbs: 3.1
    },
    nutrients: {
      fiber: 1.9,
      vitaminC: 35,
      potassium: 180,
      calcium: 93,
      iron: 1.6
    },
    tags: ["cooling", "soft", "skin-support"]
  },
  {
    name: "Snake Gourd (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 18,
    macros: {
      protein: 0.6,
      fat: 0.2,
      carbs: 3.9
    },
    nutrients: {
      fiber: 1.2,
      potassium: 137,
      vitaminC: 13,
      calcium: 26,
      magnesium: 14
    },
    tags: ["cooling", "alkaline", "asian veggie"]
  },
  {
    name: "Sugarcane Juice",
    category: "Beverages",
    servingSize: "100g",
    calories: 269,
    macros: {
      protein: 0.3,
      fat: 0.2,
      carbs: 63.9
    },
    nutrients: {
      calcium: 11,
      potassium: 37,
      magnesium: 10,
      iron: 0.6,
      fiber: 0.1
    },
    tags: ["natural sweet", "energy", "hydration"]
  },
  {
    name: "Chaya (Tree Spinach, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 44,
    macros: {
      protein: 5.7,
      fat: 0.4,
      carbs: 7.0
    },
    nutrients: {
      fiber: 2.2,
      calcium: 199,
      potassium: 316,
      vitaminC: 164,
      iron: 2.1
    },
    tags: ["leafy", "detox", "protein"]
  },
  {
    name: "Breadnut (cooked)",
    category: "Seeds",
    servingSize: "100g",
    calories: 215,
    macros: {
      protein: 5.9,
      fat: 1.5,
      carbs: 47.0
    },
    nutrients: {
      fiber: 4.4,
      potassium: 318,
      iron: 1.2,
      calcium: 38,
      magnesium: 62
    },
    tags: ["nutrient-dense", "ancestral", "carb-rich"]
  },
  {
    name: "Feijoa (Pineapple Guava)",
    category: "Fruits",
    servingSize: "100g",
    calories: 55,
    macros: {
      protein: 0.7,
      fat: 0.6,
      carbs: 13.0
    },
    nutrients: {
      fiber: 6.4,
      vitaminC: 32,
      calcium: 17,
      potassium: 172,
      magnesium: 9
    },
    tags: ["fragrant", "fiber", "tropical"]
  },
  {
    name: "Pandan Leaves",
    category: "Herbs",
    servingSize: "100g",
    calories: 36,
    macros: {
      protein: 2.1,
      fat: 0.3,
      carbs: 7.2
    },
    nutrients: {
      fiber: 2.0,
      potassium: 223,
      calcium: 54,
      iron: 1.4,
      vitaminC: 9.6
    },
    tags: ["aromatic", "calming", "southeast asia"]
  },
  {
    name: "Mangrove Apple (Sonneratia)",
    category: "Fruits",
    servingSize: "100g",
    calories: 40,
    macros: {
      protein: 0.9,
      fat: 0.2,
      carbs: 9.2
    },
    nutrients: {
      fiber: 2.8,
      vitaminC: 22,
      potassium: 206,
      calcium: 31,
      iron: 0.7
    },
    tags: ["coastal", "alkaline", "wild fruit"]
  },
  {
    name: "Elephant Foot Yam (cooked)",
    category: "Tubers",
    servingSize: "100g",
    calories: 118,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 27.9
    },
    nutrients: {
      fiber: 3.5,
      potassium: 320,
      vitaminC: 4.3,
      calcium: 22,
      iron: 0.9
    },
    tags: ["carb source", "gut-friendly", "traditional"]
  },
  {
    name: "Jaggery (raw sugar)",
    category: "Sweeteners",
    servingSize: "100g",
    calories: 383,
    macros: {
      protein: 0.4,
      fat: 0.1,
      carbs: 97.0
    },
    nutrients: {
      iron: 11.0,
      potassium: 1050,
      calcium: 80,
      magnesium: 70,
      fiber: 0.2
    },
    tags: ["natural sweetener", "mineral", "energy"]
  },
  {
    name: "Tindora Leaves (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 28,
    macros: {
      protein: 2.1,
      fat: 0.3,
      carbs: 4.9
    },
    nutrients: {
      fiber: 2.3,
      calcium: 142,
      potassium: 226,
      vitaminC: 27,
      iron: 1.6
    },
    tags: ["bitter", "detox", "alkaline"]
  },
  {
    name: "Chikoo (Sapodilla)",
    category: "Fruits",
    servingSize: "100g",
    calories: 83,
    macros: {
      protein: 0.4,
      fat: 1.1,
      carbs: 19.9
    },
    nutrients: {
      fiber: 5.3,
      vitaminC: 14.7,
      potassium: 193,
      calcium: 21,
      iron: 0.8
    },
    tags: ["dessert fruit", "mineral-rich", "sweet"]
  },
  {
    name: "Chia Sprouts",
    category: "Sprouts",
    servingSize: "100g",
    calories: 52,
    macros: {
      protein: 4.0,
      fat: 1.5,
      carbs: 6.8
    },
    nutrients: {
      fiber: 4.0,
      calcium: 110,
      potassium: 200,
      vitaminC: 8,
      magnesium: 60
    },
    tags: ["sprouted", "omega-rich", "gut health"]
  },
  {
    name: "Sea Beans (Samphire, raw)",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 1.8,
      fat: 0.3,
      carbs: 3.2
    },
    nutrients: {
      fiber: 2.2,
      iodine: 93,
      calcium: 45,
      iron: 0.6,
      magnesium: 25
    },
    tags: ["salty", "mineral-rich", "hydrating"]
  },
  {
    name: "Corn Smut (Huitlacoche)",
    category: "Fungi",
    servingSize: "100g",
    calories: 42,
    macros: {
      protein: 3.2,
      fat: 1.0,
      carbs: 7.1
    },
    nutrients: {
      fiber: 2.5,
      vitaminC: 5,
      potassium: 155,
      iron: 0.8,
      folate: 30
    },
    tags: ["edible fungus", "umami", "ancient food"]
  },
  {
    name: "Pea Shoots",
    category: "Sprouts",
    servingSize: "100g",
    calories: 35,
    macros: {
      protein: 3.6,
      fat: 0.4,
      carbs: 6.5
    },
    nutrients: {
      fiber: 2.1,
      vitaminA: 765,
      vitaminC: 40,
      calcium: 43,
      iron: 1.5
    },
    tags: ["leafy", "light", "antioxidant"]
  },
  {
    name: "Bamboo Shoots (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 27,
    macros: {
      protein: 2.6,
      fat: 0.3,
      carbs: 5.2
    },
    nutrients: {
      fiber: 2.2,
      potassium: 533,
      iron: 0.5,
      vitaminC: 4,
      magnesium: 11
    },
    tags: ["crunchy", "light", "asian cuisine"]
  },
  {
    name: "Jackfruit (young, cooked)",
    category: "Fruits",
    servingSize: "100g",
    calories: 95,
    macros: {
      protein: 1.7,
      fat: 0.6,
      carbs: 22.4
    },
    nutrients: {
      fiber: 1.5,
      potassium: 448,
      vitaminC: 13.7,
      calcium: 24,
      iron: 0.2
    },
    tags: ["meat alternative", "fibrous", "tropical"]
  },
  {
    name: "Pumpkin Flowers",
    category: "Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 4.2
    },
    nutrients: {
      fiber: 1.7,
      vitaminC: 23,
      potassium: 209,
      calcium: 38,
      iron: 0.6
    },
    tags: ["seasonal", "floral", "delicate"]
  },
  {
    name: "Oca (cooked)",
    category: "Tubers",
    servingSize: "100g",
    calories: 65,
    macros: {
      protein: 1.1,
      fat: 0.1,
      carbs: 15.0
    },
    nutrients: {
      fiber: 1.4,
      vitaminC: 12,
      potassium: 326,
      calcium: 11,
      iron: 0.5
    },
    tags: ["Andean root", "tangy", "ancestral"]
  },
  {
    name: "Taro Stem (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 29,
    macros: {
      protein: 1.0,
      fat: 0.1,
      carbs: 6.1
    },
    nutrients: {
      fiber: 1.6,
      calcium: 58,
      potassium: 239,
      iron: 0.7,
      vitaminC: 6
    },
    tags: ["fibrous stem", "alkaline", "tropical"]
  },
  {
    name: "Yam Leaves (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 37,
    macros: {
      protein: 3.1,
      fat: 0.3,
      carbs: 6.2
    },
    nutrients: {
      fiber: 2.3,
      calcium: 102,
      potassium: 320,
      iron: 2.2,
      vitaminC: 17
    },
    tags: ["leafy", "earthy", "ancestral"]
  },
  {
    name: "Sea Grapes (Caulerpa lentillifera)",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 29,
    macros: {
      protein: 1.4,
      fat: 0.2,
      carbs: 6.1
    },
    nutrients: {
      fiber: 2.4,
      iodine: 105,
      magnesium: 20,
      calcium: 35,
      vitaminC: 15
    },
    tags: ["marine", "briny", "alkaline"]
  },
  {
    name: "Sprouted Lentils",
    category: "Sprouts",
    servingSize: "100g",
    calories: 106,
    macros: {
      protein: 9.0,
      fat: 0.6,
      carbs: 18.7
    },
    nutrients: {
      fiber: 5.4,
      folate: 100,
      iron: 3.2,
      magnesium: 36,
      vitaminC: 9
    },
    tags: ["plant protein", "digestive", "sprouted"]
  },
  {
    name: "Crosne (Chinese Artichoke, cooked)",
    category: "Tubers",
    servingSize: "100g",
    calories: 73,
    macros: {
      protein: 2.1,
      fat: 0.4,
      carbs: 16.1
    },
    nutrients: {
      fiber: 2.5,
      potassium: 347,
      calcium: 19,
      vitaminC: 5,
      iron: 0.4
    },
    tags: ["knobby root", "crunchy", "prebiotic"]
  },
  {
    name: "Tiger Melon",
    category: "Fruits",
    servingSize: "100g",
    calories: 28,
    macros: {
      protein: 0.6,
      fat: 0.1,
      carbs: 6.4
    },
    nutrients: {
      fiber: 0.9,
      vitaminC: 9,
      potassium: 168,
      calcium: 12,
      magnesium: 10
    },
    tags: ["melon", "hydrating", "rare"]
  },
  {
    name: "Mung Bean Sprouts",
    category: "Sprouts",
    servingSize: "100g",
    calories: 30,
    macros: {
      protein: 3.0,
      fat: 0.2,
      carbs: 5.9
    },
    nutrients: {
      fiber: 1.8,
      vitaminC: 13,
      potassium: 149,
      iron: 0.9,
      folate: 61
    },
    tags: ["light", "digestive", "sprouted"]
  },
  {
    name: "Jicama (raw)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 38,
    macros: {
      protein: 0.7,
      fat: 0.1,
      carbs: 8.8
    },
    nutrients: {
      fiber: 4.9,
      vitaminC: 20,
      potassium: 150,
      calcium: 12,
      iron: 0.6
    },
    tags: ["crunchy", "hydrating", "gut-friendly"]
  },
  {
    name: "Salsify (cooked)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 82,
    macros: {
      protein: 3.3,
      fat: 0.2,
      carbs: 19.0
    },
    nutrients: {
      fiber: 3.0,
      potassium: 380,
      calcium: 40,
      iron: 1.1,
      vitaminC: 5
    },
    tags: ["oyster root", "earthy", "ancestral"]
  },
  {
    name: "Chinese Mustard Greens (Gai Choy)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 29,
    macros: {
      protein: 2.7,
      fat: 0.3,
      carbs: 4.8
    },
    nutrients: {
      fiber: 2.2,
      vitaminA: 380,
      vitaminC: 36,
      calcium: 105,
      iron: 1.4
    },
    tags: ["cruciferous", "bitter", "alkaline"]
  },
  {
    name: "Tatume Squash",
    category: "Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 3.9
    },
    nutrients: {
      fiber: 1.5,
      vitaminC: 15,
      potassium: 230,
      calcium: 18,
      magnesium: 22
    },
    tags: ["zucchini-like", "mild", "alkalizing"]
  },
  {
    name: "Romanesco Broccoli (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 2.4,
      fat: 0.3,
      carbs: 4.6
    },
    nutrients: {
      fiber: 2.0,
      vitaminC: 60,
      vitaminK1: 90,
      potassium: 270,
      folate: 44
    },
    tags: ["fractal", "cruciferous", "prebiotic"]
  },
  {
    name: "New Zealand Spinach (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 22,
    macros: {
      protein: 2.1,
      fat: 0.2,
      carbs: 3.6
    },
    nutrients: {
      fiber: 1.9,
      calcium: 68,
      potassium: 299,
      iron: 1.2,
      vitaminC: 30
    },
    tags: ["salty green", "leafy", "coastal"]
  },
  {
    name: "Kohlrabi Greens (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 3.1,
      fat: 0.4,
      carbs: 5.8
    },
    nutrients: {
      fiber: 2.5,
      calcium: 120,
      potassium: 380,
      vitaminC: 45,
      vitaminA: 450
    },
    tags: ["cruciferous", "leafy", "detox"]
  },
  {
    name: "Chinese Water Spinach (Kangkong)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 2.6,
      fat: 0.2,
      carbs: 3.1
    },
    nutrients: {
      fiber: 2.1,
      vitaminA: 630,
      calcium: 77,
      potassium: 291,
      vitaminC: 55
    },
    tags: ["leafy", "hydrating", "Asian cuisine"]
  },
  {
    name: "Bitter Melon Leaves (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 2.3,
      fat: 0.3,
      carbs: 4.2
    },
    nutrients: {
      fiber: 2.0,
      potassium: 360,
      calcium: 99,
      iron: 1.5,
      vitaminC: 32
    },
    tags: ["bitter", "alkaline", "healing"]
  },
  {
    name: "Purple Yam (cooked)",
    category: "Tubers",
    servingSize: "100g",
    calories: 120,
    macros: {
      protein: 1.4,
      fat: 0.2,
      carbs: 27.9
    },
    nutrients: {
      fiber: 3.4,
      potassium: 373,
      vitaminC: 12,
      magnesium: 18,
      calcium: 24
    },
    tags: ["colorful", "complex carb", "alkaline"]
  },
  {
    name: "Broccolini (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 3.0,
      fat: 0.5,
      carbs: 5.8
    },
    nutrients: {
      fiber: 3.0,
      vitaminC: 65,
      vitaminA: 250,
      calcium: 65,
      folate: 60
    },
    tags: ["mild", "cruciferous", "gut health"]
  },
  {
    name: "Okra Pods (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 2.0,
      fat: 0.2,
      carbs: 7.5
    },
    nutrients: {
      fiber: 3.2,
      vitaminC: 23,
      calcium: 77,
      potassium: 299,
      vitaminA: 375
    },
    tags: ["slippery", "gut-soothing", "southern"]
  },
  {
    name: "Atemoya",
    category: "Fruits",
    servingSize: "100g",
    calories: 94,
    macros: {
      protein: 1.8,
      fat: 0.6,
      carbs: 22.6
    },
    nutrients: {
      fiber: 2.4,
      vitaminC: 32,
      potassium: 247,
      calcium: 12,
      iron: 0.5
    },
    tags: ["custard fruit", "tropical", "dessert"]
  },
  {
    name: "Chayote Root (cooked)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 74,
    macros: {
      protein: 0.9,
      fat: 0.1,
      carbs: 17.5
    },
    nutrients: {
      fiber: 2.0,
      vitaminC: 7.4,
      potassium: 235,
      calcium: 19,
      iron: 0.4
    },
    tags: ["starchy", "mild", "alkaline"]
  },
  {
    name: "Luffa (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 4.4
    },
    nutrients: {
      fiber: 1.8,
      vitaminC: 15,
      potassium: 139,
      calcium: 25,
      iron: 0.6
    },
    tags: ["sponge gourd", "light", "alkaline"]
  },
  {
    name: "Sweet Corn (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 96,
    macros: {
      protein: 3.4,
      fat: 1.5,
      carbs: 21.0
    },
    nutrients: {
      fiber: 2.4,
      potassium: 270,
      magnesium: 37,
      vitaminC: 5,
      folate: 42
    },
    tags: ["sweet", "comfort", "energy"]
  },
  {
    name: "Tinda (Indian Round Gourd, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 0.9,
      fat: 0.1,
      carbs: 4.1
    },
    nutrients: {
      fiber: 1.6,
      vitaminC: 12,
      calcium: 20,
      potassium: 130,
      iron: 0.3
    },
    tags: ["light", "alkalizing", "digestive"]
  },
  {
    name: "Arrowhead Root (cooked)",
    category: "Tubers",
    servingSize: "100g",
    calories: 93,
    macros: {
      protein: 1.4,
      fat: 0.2,
      carbs: 22.0
    },
    nutrients: {
      fiber: 2.8,
      potassium: 314,
      calcium: 27,
      iron: 1.0,
      magnesium: 30
    },
    tags: ["aquatic", "energy", "wild"]
  },
  {
    name: "Persian Cucumber",
    category: "Vegetables",
    servingSize: "100g",
    calories: 16,
    macros: {
      protein: 0.8,
      fat: 0.1,
      carbs: 3.6
    },
    nutrients: {
      fiber: 1.5,
      vitaminC: 5,
      potassium: 147,
      calcium: 16,
      magnesium: 13
    },
    tags: ["hydrating", "crunchy", "alkalizing"]
  },
  {
    name: "Gai Lan (Chinese Broccoli, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 2.5,
      fat: 0.4,
      carbs: 5.9
    },
    nutrients: {
      fiber: 2.6,
      vitaminC: 45,
      vitaminA: 310,
      calcium: 82,
      iron: 1.3
    },
    tags: ["leafy", "bitter", "cruciferous"]
  },
  {
    name: "Pattypan Squash (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 18,
    macros: {
      protein: 1.1,
      fat: 0.3,
      carbs: 3.5
    },
    nutrients: {
      fiber: 1.4,
      vitaminC: 13,
      potassium: 208,
      calcium: 20,
      iron: 0.5
    },
    tags: ["summer squash", "cute shape", "alkaline"]
  },
  {
    name: "Zizania (Wild Rice, cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 101,
    macros: {
      protein: 4.0,
      fat: 0.3,
      carbs: 21.3
    },
    nutrients: {
      fiber: 1.8,
      magnesium: 32,
      potassium: 101,
      phosphorus: 101,
      zinc: 2.1
    },
    tags: ["ancestral grain", "wild", "nutty"]
  },
  {
    name: "Burdock Root (cooked)",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 72,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 17.3
    },
    nutrients: {
      fiber: 3.3,
      potassium: 308,
      calcium: 41,
      magnesium: 38,
      iron: 0.9
    },
    tags: ["detox", "earthy", "Japanese cuisine"]
  },
  {
    name: "Amaranth Leaves (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 23,
    macros: {
      protein: 2.1,
      fat: 0.3,
      carbs: 4.1
    },
    nutrients: {
      fiber: 2.2,
      calcium: 215,
      vitaminC: 43,
      iron: 2.3,
      potassium: 299
    },
    tags: ["leafy", "alkaline", "nutrient-dense"]
  },
  {
    name: "Enset (false banana, cooked)",
    category: "Starchy Plants",
    servingSize: "100g",
    calories: 142,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 34.0
    },
    nutrients: {
      fiber: 3.0,
      calcium: 18,
      potassium: 258,
      magnesium: 23,
      iron: 0.7
    },
    tags: ["Ethiopian", "resilient crop", "energy"]
  },
  {
    name: "Chickweed (raw)",
    category: "Wild Greens",
    servingSize: "100g",
    calories: 29,
    macros: {
      protein: 2.7,
      fat: 0.4,
      carbs: 4.6
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 46,
      iron: 1.9,
      potassium: 180,
      calcium: 130
    },
    tags: ["foraged", "alkaline", "medicinal"]
  },
  {
    name: "Tigernuts (dried)",
    category: "Tubers",
    servingSize: "100g",
    calories: 486,
    macros: {
      protein: 4.3,
      fat: 24.9,
      carbs: 63.1
    },
    nutrients: {
      fiber: 33.0,
      iron: 3.4,
      potassium: 430,
      magnesium: 91,
      calcium: 66
    },
    tags: ["prebiotic", "energy", "gluten-free"]
  },
  {
    name: "Kangkong Stems (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 15,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 2.7
    },
    nutrients: {
      fiber: 1.2,
      potassium: 180,
      calcium: 35,
      vitaminC: 18,
      iron: 1.0
    },
    tags: ["light", "alkaline", "tender"]
  },
  {
    name: "Garbanzo Sprouts",
    category: "Sprouts",
    servingSize: "100g",
    calories: 164,
    macros: {
      protein: 9.0,
      fat: 2.6,
      carbs: 27.4
    },
    nutrients: {
      fiber: 7.6,
      potassium: 290,
      magnesium: 45,
      iron: 2.1,
      vitaminC: 7
    },
    tags: ["plant protein", "sprouted", "alkaline"]
  },
  {
    name: "Cranberry Beans (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 143,
    macros: {
      protein: 9.0,
      fat: 0.5,
      carbs: 25.2
    },
    nutrients: {
      fiber: 9.0,
      folate: 144,
      iron: 2.1,
      potassium: 289,
      magnesium: 45
    },
    tags: ["Italian bean", "fibrous", "energy"]
  },
  {
    name: "Lamb’s Quarters (raw)",
    category: "Wild Greens",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 4.2,
      fat: 0.8,
      carbs: 7.3
    },
    nutrients: {
      fiber: 2.7,
      calcium: 309,
      vitaminA: 11,
      iron: 2.3,
      vitaminC: 80
    },
    tags: ["wild", "nutrient-dense", "alkaline"]
  },
  {
    name: "Celtuce (stem lettuce, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 3.4
    },
    nutrients: {
      fiber: 1.5,
      potassium: 158,
      vitaminC: 10,
      calcium: 26,
      iron: 0.5
    },
    tags: ["crunchy stem", "Asian", "refreshing"]
  },
  {
    name: "Indian Sorrel (Gongura)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 27,
    macros: {
      protein: 2.2,
      fat: 0.3,
      carbs: 4.9
    },
    nutrients: {
      fiber: 2.3,
      vitaminC: 45,
      iron: 2.0,
      calcium: 70,
      potassium: 288
    },
    tags: ["sour leaf", "alkaline", "Indian cuisine"]
  },
  {
    name: "Purslane (raw)",
    category: "Wild Greens",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 2.0,
      fat: 0.2,
      carbs: 3.5
    },
    nutrients: {
      fiber: 1.5,
      omega3_ALA: 0.4,
      potassium: 494,
      magnesium: 68,
      vitaminC: 21
    },
    tags: ["succulent", "omega-3", "wild edible"]
  },
  {
    name: "Jewel Yam (cooked)",
    category: "Tubers",
    servingSize: "100g",
    calories: 110,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 26.1
    },
    nutrients: {
      fiber: 3.1,
      potassium: 394,
      calcium: 21,
      vitaminC: 12,
      magnesium: 16
    },
    tags: ["sweet yam", "orange flesh", "gut-health"]
  },
  {
    name: "Kurrat (Egyptian Leek)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 1.8,
      fat: 0.3,
      carbs: 7.0
    },
    nutrients: {
      fiber: 2.1,
      calcium: 59,
      potassium: 260,
      vitaminC: 12,
      iron: 1.1
    },
    tags: ["mild allium", "alkaline", "traditional"]
  },
  {
    name: "Desert Prickly Pear (raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 41,
    macros: {
      protein: 0.7,
      fat: 0.5,
      carbs: 9.6
    },
    nutrients: {
      fiber: 3.6,
      vitaminC: 14,
      calcium: 56,
      potassium: 220,
      magnesium: 85
    },
    tags: ["desert fruit", "hydrating", "alkaline"]
  },
  {
    name: "Miner's Lettuce (raw)",
    category: "Wild Greens",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 2.1,
      fat: 0.3,
      carbs: 3.2
    },
    nutrients: {
      fiber: 1.7,
      vitaminC: 18,
      calcium: 70,
      potassium: 275,
      iron: 1.4
    },
    tags: ["wild edible", "refreshing", "nutrient-dense"]
  },
  {
    name: "Malabar Chestnut Seeds (cooked)",
    category: "Seeds",
    servingSize: "100g",
    calories: 161,
    macros: {
      protein: 5.0,
      fat: 2.3,
      carbs: 31.4
    },
    nutrients: {
      fiber: 2.6,
      potassium: 350,
      magnesium: 48,
      calcium: 27,
      iron: 1.3
    },
    tags: ["water chestnut family", "fiber", "energy"]
  },
  {
    name: "Ceylon Spinach (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 3.4
    },
    nutrients: {
      fiber: 2.0,
      calcium: 105,
      potassium: 280,
      vitaminC: 38,
      iron: 1.1
    },
    tags: ["leafy", "alkaline", "gut-soothing"]
  },
  {
    name: "Turmeric Root (raw)",
    category: "Roots",
    servingSize: "100g",
    calories: 312,
    macros: {
      protein: 9.7,
      fat: 3.3,
      carbs: 67.1
    },
    nutrients: {
      fiber: 22.7,
      iron: 41,
      potassium: 2080,
      magnesium: 193,
      vitaminC: 25
    },
    tags: ["anti-inflammatory", "spice", "alkaline"]
  },
  {
    name: "Fuzzy Melon (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 21,
    macros: {
      protein: 1.0,
      fat: 0.1,
      carbs: 4.7
    },
    nutrients: {
      fiber: 1.6,
      potassium: 210,
      vitaminC: 13,
      calcium: 23,
      magnesium: 17
    },
    tags: ["Asian gourd", "alkaline", "light"]
  },
  {
    name: "Taro Flower (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 45,
    macros: {
      protein: 2.1,
      fat: 0.4,
      carbs: 8.9
    },
    nutrients: {
      fiber: 2.5,
      calcium: 97,
      potassium: 270,
      iron: 1.0,
      vitaminC: 10
    },
    tags: ["floral veggie", "alkaline", "tropical"]
  },
  {
    name: "Chaya Shoots (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 47,
    macros: {
      protein: 5.6,
      fat: 0.4,
      carbs: 7.3
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 165,
      calcium: 199,
      potassium: 320,
      iron: 2.3
    },
    tags: ["leafy", "alkaline", "traditional"]
  },
  {
    name: "Breadfruit (roasted)",
    category: "Fruits",
    servingSize: "100g",
    calories: 103,
    macros: {
      protein: 1.1,
      fat: 0.2,
      carbs: 27.1
    },
    nutrients: {
      fiber: 4.9,
      potassium: 490,
      calcium: 17,
      vitaminC: 29,
      magnesium: 25
    },
    tags: ["starchy fruit", "ancestral", "energy"]
  },
  {
    name: "Sprouted Moth Beans",
    category: "Sprouts",
    servingSize: "100g",
    calories: 122,
    macros: {
      protein: 9.2,
      fat: 1.2,
      carbs: 20.8
    },
    nutrients: {
      fiber: 4.7,
      folate: 136,
      iron: 3.2,
      potassium: 274,
      vitaminC: 6
    },
    tags: ["Indian legume", "sprouted", "alkaline"]
  },
  {
    name: "African Eggplant (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 24,
    macros: {
      protein: 1.4,
      fat: 0.2,
      carbs: 5.6
    },
    nutrients: {
      fiber: 2.0,
      potassium: 289,
      vitaminC: 12,
      calcium: 29,
      iron: 0.8
    },
    tags: ["bitter", "African heritage", "gut health"]
  },
  {
    name: "Tinda Leaves (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 2.2,
      fat: 0.3,
      carbs: 5.8
    },
    nutrients: {
      fiber: 2.4,
      calcium: 102,
      potassium: 280,
      vitaminC: 26,
      iron: 1.1
    },
    tags: ["leafy", "alkaline", "Indian vegetable"]
  },
  {
    name: "Winged Beans (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 49,
    macros: {
      protein: 3.6,
      fat: 0.5,
      carbs: 7.3
    },
    nutrients: {
      fiber: 2.6,
      folate: 45,
      iron: 1.7,
      potassium: 276,
      vitaminC: 18
    },
    tags: ["versatile legume", "alkaline", "Asian cuisine"]
  },
  {
    name: "Elephant Apple (Dillenia indica, raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 41,
    macros: {
      protein: 0.8,
      fat: 0.2,
      carbs: 9.3
    },
    nutrients: {
      fiber: 2.9,
      vitaminC: 18,
      potassium: 201,
      calcium: 32,
      iron: 0.5
    },
    tags: ["tart fruit", "Indian cuisine", "alkaline"]
  },
  {
    name: "Snake Tomato (garden egg tomato)",
    category: "Fruits",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 1.1,
      fat: 0.2,
      carbs: 6.7
    },
    nutrients: {
      fiber: 2.4,
      potassium: 212,
      vitaminC: 11,
      calcium: 21,
      iron: 0.6
    },
    tags: ["African tomato", "alkaline", "traditional"]
  },
  {
    name: "Tinda Flower (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 22,
    macros: {
      protein: 1.8,
      fat: 0.3,
      carbs: 4.2
    },
    nutrients: {
      fiber: 1.9,
      potassium: 196,
      vitaminC: 17,
      calcium: 44,
      iron: 0.9
    },
    tags: ["Indian cuisine", "floral veggie", "gut health"]
  },
  {
    name: "Akebi Fruit",
    category: "Fruits",
    servingSize: "100g",
    calories: 75,
    macros: {
      protein: 1.2,
      fat: 1.5,
      carbs: 17.3
    },
    nutrients: {
      fiber: 2.5,
      potassium: 251,
      vitaminC: 14,
      calcium: 19,
      magnesium: 13
    },
    tags: ["Japanese fruit", "uncommon", "alkaline"]
  },
  {
    name: "African Basil (raw)",
    category: "Herbs",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 3.5,
      fat: 0.5,
      carbs: 6.7
    },
    nutrients: {
      fiber: 2.4,
      vitaminC: 18,
      potassium: 290,
      calcium: 98,
      iron: 2.2
    },
    tags: ["herbal", "medicinal", "alkaline"]
  },
  {
    name: "Velvet Bean (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 143,
    macros: {
      protein: 8.9,
      fat: 0.9,
      carbs: 25.2
    },
    nutrients: {
      fiber: 8.2,
      potassium: 340,
      calcium: 52,
      iron: 3.0,
      magnesium: 60
    },
    tags: ["nervine", "dopamine support", "alkaline"]
  },
  {
    name: "Yardlong Beans (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 47,
    macros: {
      protein: 2.8,
      fat: 0.3,
      carbs: 8.4
    },
    nutrients: {
      fiber: 2.9,
      potassium: 240,
      vitaminC: 18,
      iron: 1.7,
      calcium: 48
    },
    tags: ["Asian bean", "alkaline", "gut health"]
  },
  {
    name: "Bambara Groundnut (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 155,
    macros: {
      protein: 9.7,
      fat: 1.3,
      carbs: 27.4
    },
    nutrients: {
      fiber: 6.1,
      potassium: 302,
      magnesium: 44,
      calcium: 40,
      iron: 2.5
    },
    tags: ["African legume", "drought-resistant", "alkaline"]
  },
  {
    name: "Curry Leaves (cooked)",
    category: "Herbs",
    servingSize: "100g",
    calories: 108,
    macros: {
      protein: 6.1,
      fat: 1.0,
      carbs: 18.7
    },
    nutrients: {
      fiber: 6.4,
      calcium: 350,
      vitaminA: 756,
      iron: 1.7,
      vitaminC: 34
    },
    tags: ["aromatic herb", "Indian cuisine", "alkaline"]
  },
  {
    name: "Bael Fruit (raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 137,
    macros: {
      protein: 1.8,
      fat: 0.3,
      carbs: 31.8
    },
    nutrients: {
      fiber: 2.9,
      vitaminC: 8,
      calcium: 85,
      potassium: 210,
      iron: 0.7
    },
    tags: ["gut-soothing", "traditional medicine", "alkaline"]
  },
  {
    name: "Garden Cress (raw)",
    category: "Herbs",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 2.6,
      fat: 0.7,
      carbs: 5.5
    },
    nutrients: {
      fiber: 1.8,
      vitaminC: 69,
      iron: 1.3,
      potassium: 606,
      calcium: 81
    },
    tags: ["microgreen", "spicy", "alkaline"]
  },
  {
    name: "Sweetleaf (Sauropus androgynus, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 34,
    macros: {
      protein: 5.1,
      fat: 0.4,
      carbs: 5.7
    },
    nutrients: {
      fiber: 3.0,
      calcium: 180,
      iron: 2.1,
      vitaminC: 72,
      potassium: 250
    },
    tags: ["leafy", "high protein", "alkaline"]
  },
  {
    name: "Desert Lime Leaves (raw)",
    category: "Herbs",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 2.1,
      fat: 0.5,
      carbs: 6.0
    },
    nutrients: {
      fiber: 2.0,
      calcium: 89,
      vitaminC: 40,
      iron: 0.9,
      potassium: 220
    },
    tags: ["bitter-citrus", "wild edible", "alkaline"]
  },
  {
    name: "Kudzu Root (cooked)",
    category: "Roots",
    servingSize: "100g",
    calories: 80,
    macros: {
      protein: 1.6,
      fat: 0.2,
      carbs: 18.9
    },
    nutrients: {
      fiber: 2.2,
      potassium: 190,
      calcium: 38,
      magnesium: 25,
      iron: 0.6
    },
    tags: ["cooling", "digestive", "alkaline"]
  },
  {
    name: "Rosy Garlic (raw)",
    category: "Herbs",
    servingSize: "100g",
    calories: 149,
    macros: {
      protein: 6.4,
      fat: 0.5,
      carbs: 33.1
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 31,
      potassium: 401,
      calcium: 181,
      iron: 1.7
    },
    tags: ["aromatic", "alkaline", "wild garlic"]
  },
  {
    name: "Ice Apple (Taal fruit)",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 0.8,
      fat: 0.1,
      carbs: 10.1
    },
    nutrients: {
      fiber: 1.4,
      potassium: 238,
      calcium: 27,
      vitaminC: 5,
      magnesium: 15
    },
    tags: ["cooling", "hydrating", "tropical"]
  },
  {
    name: "Ramps (Wild Leeks, raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 50,
    macros: {
      protein: 2.2,
      fat: 0.3,
      carbs: 10.8
    },
    nutrients: {
      fiber: 2.0,
      calcium: 35,
      potassium: 232,
      vitaminC: 26,
      iron: 0.9
    },
    tags: ["foraged", "spring veggie", "aromatic"]
  },
  {
    name: "Job's Tears (cooked)",
    category: "Grains",
    servingSize: "100g",
    calories: 130,
    macros: {
      protein: 4.1,
      fat: 1.2,
      carbs: 27.7
    },
    nutrients: {
      fiber: 2.9,
      magnesium: 50,
      potassium: 168,
      calcium: 14,
      iron: 1.0
    },
    tags: ["Asian grain", "alkaline", "ancient"]
  },
  {
    name: "African Locust Bean (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 151,
    macros: {
      protein: 9.2,
      fat: 1.4,
      carbs: 25.0
    },
    nutrients: {
      fiber: 7.8,
      calcium: 56,
      iron: 2.7,
      potassium: 310,
      vitaminC: 3
    },
    tags: ["fermented", "traditional", "protein"]
  },
  {
    name: "Gnetum Leaves (Eru, cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 46,
    macros: {
      protein: 3.9,
      fat: 0.6,
      carbs: 8.2
    },
    nutrients: {
      fiber: 3.5,
      calcium: 120,
      potassium: 290,
      iron: 2.1,
      vitaminC: 22
    },
    tags: ["African green", "alkaline", "leafy"]
  },
  {
    name: "Yardlong Bean Shoots (cooked)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 2.2,
      fat: 0.2,
      carbs: 6.0
    },
    nutrients: {
      fiber: 2.4,
      potassium: 180,
      vitaminC: 15,
      calcium: 55,
      iron: 1.2
    },
    tags: ["leafy", "Asian cuisine", "alkaline"]
  },
  {
    name: "Wood Apple (Bael, ripe)",
    category: "Fruits",
    servingSize: "100g",
    calories: 140,
    macros: {
      protein: 2.0,
      fat: 0.5,
      carbs: 31.0
    },
    nutrients: {
      fiber: 2.6,
      calcium: 80,
      potassium: 260,
      iron: 0.8,
      vitaminC: 6
    },
    tags: ["gut health", "traditional", "alkaline"]
  },
  {
    name: "Borage Flowers (raw)",
    category: "Flowers",
    servingSize: "100g",
    calories: 44,
    macros: {
      protein: 1.9,
      fat: 0.5,
      carbs: 9.2
    },
    nutrients: {
      fiber: 2.0,
      potassium: 145,
      calcium: 35,
      iron: 0.6,
      vitaminC: 17
    },
    tags: ["edible flower", "decorative", "alkaline"]
  },
  {
    name: "Lablab Beans (cooked)",
    category: "Legumes",
    servingSize: "100g",
    calories: 128,
    macros: {
      protein: 8.1,
      fat: 0.6,
      carbs: 22.5
    },
    nutrients: {
      fiber: 6.0,
      calcium: 73,
      iron: 2.3,
      potassium: 244,
      magnesium: 42
    },
    tags: ["tropical bean", "alkaline", "protein-rich"]
  },
  {
    name: "Sapote (raw)",
    category: "Fruits",
    servingSize: "100g",
    calories: 134,
    macros: {
      protein: 1.7,
      fat: 0.5,
      carbs: 33.0
    },
    nutrients: {
      fiber: 5.0,
      potassium: 246,
      calcium: 18,
      vitaminC: 21,
      iron: 0.7
    },
    tags: ["dessert fruit", "alkaline", "nutrient-dense"]
  },
  {
    name: "Scotch Bonnet Pepper (raw)",
    category: "Vegetables",
    servingSize: "100g",
    calories: 40,
    macros: {
      protein: 1.9,
      fat: 0.4,
      carbs: 9.1
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 105,
      potassium: 208,
      calcium: 12,
      iron: 0.9
    },
    tags: ["hot pepper", "spicy", "circulation"]
  },
  {
    name: "Amaranth Flour",
    category: "Grains",
    servingSize: "100g",
    calories: 371,
    macros: {
      protein: 13.6,
      fat: 7.0,
      carbs: 65.2
    },
    nutrients: {
      fiber: 6.7,
      iron: 7.6,
      calcium: 159,
      magnesium: 248,
      zinc: 2.9
    },
    tags: ["gluten-free", "whole grain", "high protein"]
  },
  {
    name: "Apples, Fuji",
    category: "Fruits",
    servingSize: "100g",
    calories: 57,
    macros: {
      protein: 0.3,
      fat: 0.2,
      carbs: 15.2
    },
    nutrients: {
      fiber: 2.4,
      vitaminC: 4.6,
      potassium: 107,
      calcium: 6,
      magnesium: 5
    },
    tags: ["snackable", "antioxidant", "gut-health"]
  },
  {
    name: "Apples, Honeycrisp",
    category: "Fruits",
    servingSize: "100g",
    calories: 57,
    macros: {
      protein: 0.3,
      fat: 0.1,
      carbs: 14.8
    },
    nutrients: {
      fiber: 2.3,
      vitaminC: 5.0,
      potassium: 115,
      calcium: 7,
      magnesium: 4
    },
    tags: ["sweet", "crisp", "hydrating"]
  },
  {
    name: "Apples, Gala",
    category: "Fruits",
    servingSize: "100g",
    calories: 57,
    macros: {
      protein: 0.3,
      fat: 0.1,
      carbs: 14.2
    },
    nutrients: {
      fiber: 2.2,
      vitaminC: 4.0,
      potassium: 110,
      calcium: 6,
      magnesium: 5
    },
    tags: ["fruit", "sweet", "low-cal"]
  },
  {
    name: "Apples, Red Delicious",
    category: "Fruits",
    servingSize: "100g",
    calories: 59,
    macros: {
      protein: 0.3,
      fat: 0.2,
      carbs: 15.0
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 3.5,
      potassium: 112,
      calcium: 6,
      magnesium: 4
    },
    tags: ["classic", "antioxidant", "fruit"]
  },
  {
    name: "Apricot, with Skin, Pitted, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 48,
    macros: {
      protein: 1.4,
      fat: 0.4,
      carbs: 11.1
    },
    nutrients: {
      fiber: 2.0,
      vitaminA: 96,
      vitaminC: 10,
      potassium: 259,
      iron: 0.4
    },
    tags: ["stone fruit", "summer", "beta-carotene"]
  },
  {
    name: "Arugula, Baby, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 2.6,
      fat: 0.7,
      carbs: 3.7
    },
    nutrients: {
      fiber: 1.6,
      vitaminK1: 108,
      folate: 97,
      calcium: 160,
      potassium: 369
    },
    tags: ["leafy green", "peppery", "alkaline"]
  },
  {
    name: "Avocado, Hass, Peeled",
    category: "Fruits",
    servingSize: "100g",
    calories: 160,
    macros: {
      protein: 2.0,
      fat: 15.0,
      carbs: 9.0
    },
    nutrients: {
      fiber: 6.7,
      potassium: 485,
      folate: 81,
      vitaminK1: 21,
      vitaminC: 10
    },
    tags: ["healthy fat", "creamy", "nutrient-dense"]
  },
  {
    name: "Bananas, Overripe",
    category: "Fruits",
    servingSize: "100g",
    calories: 90,
    macros: {
      protein: 1.1,
      fat: 0.3,
      carbs: 23.0
    },
    nutrients: {
      fiber: 2.5,
      potassium: 358,
      vitaminB6: 0.4,
      vitaminC: 8.7,
      magnesium: 27
    },
    tags: ["sweet", "energy", "baking"]
  },
  {
    name: "Bananas, Slightly Ripe",
    category: "Fruits",
    servingSize: "100g",
    calories: 89,
    macros: {
      protein: 1.1,
      fat: 0.3,
      carbs: 22.8
    },
    nutrients: {
      fiber: 2.6,
      potassium: 358,
      vitaminC: 8.7,
      magnesium: 27,
      vitaminB6: 0.4
    },
    tags: ["energy", "potassium-rich", "snack"]
  },
  {
    name: "Beets, Raw",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 1.6,
      fat: 0.2,
      carbs: 9.6
    },
    nutrients: {
      fiber: 2.8,
      folate: 109,
      manganese: 0.3,
      potassium: 325,
      vitaminC: 4.9
    },
    tags: ["root veggie", "blood flow", "earthy"]
  },
  {
    name: "Blackberries, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 1.4,
      fat: 0.5,
      carbs: 9.6
    },
    nutrients: {
      fiber: 5.3,
      vitaminC: 21,
      manganese: 0.6,
      vitaminK1: 19,
      folate: 25
    },
    tags: ["antioxidant", "berry", "low-glycemic"]
  },
  {
    name: "Blueberries, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 57,
    macros: {
      protein: 0.7,
      fat: 0.3,
      carbs: 14.5
    },
    nutrients: {
      fiber: 2.4,
      vitaminC: 9.7,
      vitaminK1: 19.3,
      manganese: 0.3,
      anthocyanins: 200
    },
    tags: ["brain health", "antioxidant", "snack"]
  },
  {
    name: "Broccoli, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 34,
    macros: {
      protein: 2.8,
      fat: 0.4,
      carbs: 6.6
    },
    nutrients: {
      fiber: 2.6,
      vitaminC: 89,
      vitaminK1: 101,
      folate: 63,
      potassium: 316
    },
    tags: ["cruciferous", "immune support", "detox"]
  },
  {
    name: "Cabbage, Green, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 1.3,
      fat: 0.1,
      carbs: 5.8
    },
    nutrients: {
      fiber: 2.5,
      vitaminC: 36.6,
      vitaminK1: 76,
      folate: 43,
      potassium: 170
    },
    tags: ["budget-friendly", "digestive", "crunchy"]
  },
  {
    name: "Carrots, Baby, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 35,
    macros: {
      protein: 0.6,
      fat: 0.1,
      carbs: 8.2
    },
    nutrients: {
      fiber: 2.9,
      vitaminA: 835,
      vitaminK1: 13,
      potassium: 320,
      vitaminC: 5.9
    },
    tags: ["crunchy", "beta-carotene", "snack"]
  },
  {
    name: "Cauliflower, White, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 1.9,
      fat: 0.3,
      carbs: 4.9
    },
    nutrients: {
      fiber: 2.0,
      vitaminC: 48.2,
      vitaminK1: 15.5,
      folate: 57,
      choline: 44.3
    },
    tags: ["low-carb", "versatile", "digestive"]
  },
  {
    name: "Celery, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 16,
    macros: {
      protein: 0.7,
      fat: 0.2,
      carbs: 3.0
    },
    nutrients: {
      fiber: 1.6,
      vitaminK1: 29.3,
      potassium: 260,
      folate: 36,
      vitaminC: 3.1
    },
    tags: ["hydrating", "alkaline", "crunchy"]
  },
  {
    name: "Chard, Swiss, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 19,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 3.7
    },
    nutrients: {
      fiber: 1.6,
      vitaminK1: 830,
      vitaminA: 306,
      magnesium: 81,
      iron: 1.8
    },
    tags: ["leafy green", "alkaline", "bone health"]
  },
  {
    name: "Chickpeas, Cooked",
    category: "Legumes",
    servingSize: "100g",
    calories: 164,
    macros: {
      protein: 8.9,
      fat: 2.6,
      carbs: 27.4
    },
    nutrients: {
      fiber: 7.6,
      folate: 172,
      iron: 2.9,
      magnesium: 48,
      potassium: 291
    },
    tags: ["plant protein", "fiber-rich", "versatile"]
  },
  {
    name: "Collard Greens, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 3.0,
      fat: 0.6,
      carbs: 5.4
    },
    nutrients: {
      fiber: 4.0,
      vitaminK1: 437,
      calcium: 232,
      vitaminA: 250,
      folate: 129
    },
    tags: ["leafy", "bone support", "southern staple"]
  },
  {
    name: "Corn, Yellow, Cooked",
    category: "Grains",
    servingSize: "100g",
    calories: 96,
    macros: {
      protein: 3.4,
      fat: 1.5,
      carbs: 21.0
    },
    nutrients: {
      fiber: 2.4,
      vitaminC: 5.5,
      magnesium: 37,
      folate: 42,
      potassium: 270
    },
    tags: ["energy", "sweet", "fiber-rich"]
  },
  {
    name: "Cucumber, With Skin, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 15,
    macros: {
      protein: 0.7,
      fat: 0.1,
      carbs: 3.6
    },
    nutrients: {
      fiber: 0.5,
      vitaminK1: 16.4,
      potassium: 147,
      vitaminC: 2.8,
      magnesium: 13
    },
    tags: ["hydrating", "cooling", "alkalizing"]
  },
  {
    name: "Dates, Medjool",
    category: "Fruits",
    servingSize: "100g",
    calories: 277,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 75.0
    },
    nutrients: {
      fiber: 6.7,
      potassium: 696,
      magnesium: 54,
      vitaminB6: 0.2,
      iron: 0.9
    },
    tags: ["natural sweetener", "energy dense", "prebiotic"]
  },
  {
    name: "Edamame, Cooked",
    category: "Legumes",
    servingSize: "100g",
    calories: 121,
    macros: {
      protein: 11.9,
      fat: 5.2,
      carbs: 8.9
    },
    nutrients: {
      fiber: 5.2,
      iron: 2.3,
      magnesium: 61,
      vitaminK1: 26.7,
      folate: 311
    },
    tags: ["plant protein", "bone health", "soy-based"]
  },
  {
    name: "Eggplant, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 25,
    macros: {
      protein: 1.0,
      fat: 0.2,
      carbs: 5.9
    },
    nutrients: {
      fiber: 3.0,
      potassium: 229,
      vitaminB6: 0.1,
      manganese: 0.2,
      folate: 22
    },
    tags: ["nightshade", "antioxidant", "versatile"]
  },
  {
    name: "Fennel, Bulb, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 7.3
    },
    nutrients: {
      fiber: 3.1,
      vitaminC: 12,
      potassium: 414,
      manganese: 0.2,
      folate: 27
    },
    tags: ["digestive", "aromatic", "alkaline"]
  },
  {
    name: "Figs, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 74,
    macros: {
      protein: 0.8,
      fat: 0.3,
      carbs: 19.2
    },
    nutrients: {
      fiber: 2.9,
      calcium: 35,
      potassium: 232,
      magnesium: 17,
      vitaminK1: 4.7
    },
    tags: ["gut health", "mineral-rich", "natural sweet"]
  },
  {
    name: "Garlic, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 149,
    macros: {
      protein: 6.4,
      fat: 0.5,
      carbs: 33.1
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 31,
      manganese: 1.7,
      calcium: 181,
      selenium: 14.2
    },
    tags: ["antimicrobial", "immune-boost", "anti-inflammatory"]
  },
  {
    name: "Ginger Root, Raw",
    category: "Roots",
    servingSize: "100g",
    calories: 80,
    macros: {
      protein: 1.8,
      fat: 0.8,
      carbs: 17.8
    },
    nutrients: {
      fiber: 2.0,
      potassium: 415,
      magnesium: 43,
      vitaminC: 5,
      vitaminB6: 0.2
    },
    tags: ["warming", "anti-nausea", "circulation"]
  },
  {
    name: "Grapefruit, Pink, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 42,
    macros: {
      protein: 0.8,
      fat: 0.1,
      carbs: 10.7
    },
    nutrients: {
      fiber: 1.6,
      vitaminC: 31.2,
      vitaminA: 58,
      potassium: 135,
      folate: 13
    },
    tags: ["citrus", "detox", "low-cal"]
  },
  {
    name: "Grapes, Red, Seedless, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 69,
    macros: {
      protein: 0.7,
      fat: 0.2,
      carbs: 18.1
    },
    nutrients: {
      fiber: 0.9,
      vitaminC: 3.2,
      vitaminK1: 14.6,
      potassium: 191,
      manganese: 0.1
    },
    tags: ["antioxidant", "hydrating", "natural sugar"]
  },
  {
    name: "Green Beans, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 1.8,
      fat: 0.1,
      carbs: 7.1
    },
    nutrients: {
      fiber: 3.4,
      vitaminC: 12.2,
      vitaminK1: 43,
      folate: 33,
      potassium: 211
    },
    tags: ["crunchy", "alkaline", "light"]
  },
  {
    name: "Guava, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 68,
    macros: {
      protein: 2.6,
      fat: 1.0,
      carbs: 14.3
    },
    nutrients: {
      fiber: 5.4,
      vitaminC: 228,
      folate: 49,
      potassium: 417,
      magnesium: 22
    },
    tags: ["tropical", "vitamin C", "immune"]
  },
  {
    name: "Jerusalem Artichoke, Raw",
    category: "Roots",
    servingSize: "100g",
    calories: 73,
    macros: {
      protein: 2.0,
      fat: 0.0,
      carbs: 17.4
    },
    nutrients: {
      fiber: 1.6,
      iron: 3.4,
      potassium: 429,
      phosphorus: 78,
      thiamin: 0.2
    },
    tags: ["prebiotic", "earthy", "fiber-rich"]
  },
  {
    name: "Kale, Curly, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 49,
    macros: {
      protein: 4.3,
      fat: 0.9,
      carbs: 8.8
    },
    nutrients: {
      fiber: 3.6,
      vitaminK1: 817,
      vitaminA: 681,
      vitaminC: 120,
      calcium: 150
    },
    tags: ["leafy green", "superfood", "detox"]
  },
  {
    name: "Kiwi, Green, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 61,
    macros: {
      protein: 1.1,
      fat: 0.5,
      carbs: 14.7
    },
    nutrients: {
      fiber: 3.0,
      vitaminC: 92.7,
      vitaminK1: 40.3,
      potassium: 312,
      vitaminE: 1.5
    },
    tags: ["tropical", "antioxidant", "digestion"]
  },
  {
    name: "Leeks, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 61,
    macros: {
      protein: 1.5,
      fat: 0.3,
      carbs: 14.2
    },
    nutrients: {
      fiber: 1.8,
      vitaminK1: 47,
      manganese: 0.5,
      vitaminC: 12,
      iron: 2.1
    },
    tags: ["allium", "digestive", "alkaline"]
  },
  {
    name: "Lentils, Cooked",
    category: "Legumes",
    servingSize: "100g",
    calories: 116,
    macros: {
      protein: 9.0,
      fat: 0.4,
      carbs: 20.1
    },
    nutrients: {
      fiber: 7.9,
      folate: 181,
      iron: 3.3,
      magnesium: 36,
      protein: 9.0
    },
    tags: ["plant protein", "blood-builder", "fiber-rich"]
  },
  {
    name: "Lettuce, Romaine, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 17,
    macros: {
      protein: 1.2,
      fat: 0.3,
      carbs: 3.3
    },
    nutrients: {
      fiber: 2.1,
      vitaminA: 436,
      vitaminK1: 102,
      folate: 136,
      vitaminC: 4
    },
    tags: ["hydrating", "alkaline", "crisp"]
  },
  {
    name: "Mango, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 60,
    macros: {
      protein: 0.8,
      fat: 0.4,
      carbs: 15.0
    },
    nutrients: {
      fiber: 1.6,
      vitaminC: 36.4,
      vitaminA: 54,
      folate: 43,
      potassium: 168
    },
    tags: ["tropical", "juicy", "antioxidant"]
  },
  {
    name: "Mushrooms, White, Raw",
    category: "Fungi",
    servingSize: "100g",
    calories: 22,
    macros: {
      protein: 3.1,
      fat: 0.3,
      carbs: 3.3
    },
    nutrients: {
      fiber: 1.0,
      potassium: 318,
      vitaminD: 7,
      selenium: 9.3,
      riboflavin: 0.4
    },
    tags: ["immune-support", "low-calorie", "adaptogen"]
  },
  {
    name: "Mustard Greens, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 27,
    macros: {
      protein: 2.9,
      fat: 0.4,
      carbs: 4.7
    },
    nutrients: {
      fiber: 3.2,
      vitaminK1: 257,
      vitaminA: 151,
      vitaminC: 70,
      calcium: 115
    },
    tags: ["leafy", "detox", "spicy green"]
  },
  {
    name: "Okra, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 33,
    macros: {
      protein: 2.0,
      fat: 0.2,
      carbs: 7.5
    },
    nutrients: {
      fiber: 3.2,
      vitaminC: 23,
      vitaminK1: 31,
      magnesium: 57,
      calcium: 82
    },
    tags: ["southern", "slimy", "gut-friendly"]
  },
  {
    name: "Olives, Green, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 115,
    macros: {
      protein: 0.8,
      fat: 10.7,
      carbs: 6.3
    },
    nutrients: {
      fiber: 3.2,
      vitaminE: 3.8,
      iron: 3.3,
      calcium: 88,
      sodium: 735
    },
    tags: ["healthy fat", "Mediterranean", "bitter"]
  },
  {
    name: "Onions, Yellow, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 40,
    macros: {
      protein: 1.1,
      fat: 0.1,
      carbs: 9.3
    },
    nutrients: {
      fiber: 1.7,
      vitaminC: 7.4,
      potassium: 146,
      folate: 19,
      manganese: 0.1
    },
    tags: ["allium", "antioxidant", "versatile"]
  },
  {
    name: "Orange, Navel, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 47,
    macros: {
      protein: 0.9,
      fat: 0.1,
      carbs: 11.8
    },
    nutrients: {
      fiber: 2.4,
      vitaminC: 59.1,
      calcium: 40,
      potassium: 181,
      folate: 30
    },
    tags: ["citrus", "immune", "hydrating"]
  },
  {
    name: "Papaya, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 43,
    macros: {
      protein: 0.5,
      fat: 0.3,
      carbs: 10.8
    },
    nutrients: {
      fiber: 1.7,
      vitaminC: 60.9,
      folate: 38,
      potassium: 182,
      vitaminA: 47
    },
    tags: ["tropical", "enzyme-rich", "soothing"]
  },
  {
    name: "Parsnips, Raw",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 75,
    macros: {
      protein: 1.2,
      fat: 0.3,
      carbs: 18.0
    },
    nutrients: {
      fiber: 4.9,
      vitaminC: 17,
      folate: 67,
      potassium: 375,
      magnesium: 29
    },
    tags: ["earthy", "winter root", "complex carb"]
  },
  {
    name: "Passion Fruit, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 97,
    macros: {
      protein: 2.2,
      fat: 0.4,
      carbs: 23.4
    },
    nutrients: {
      fiber: 10.4,
      vitaminC: 30,
      vitaminA: 64,
      potassium: 348,
      iron: 1.6
    },
    tags: ["tropical", "fiber-rich", "vitamin C"]
  },
  {
    name: "Peaches, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 39,
    macros: {
      protein: 0.9,
      fat: 0.3,
      carbs: 9.5
    },
    nutrients: {
      fiber: 1.5,
      vitaminC: 6.6,
      potassium: 190,
      vitaminA: 16,
      niacin: 1.0
    },
    tags: ["stone fruit", "summer", "refreshing"]
  },
  {
    name: "Pears, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 57,
    macros: {
      protein: 0.4,
      fat: 0.1,
      carbs: 15.2
    },
    nutrients: {
      fiber: 3.1,
      vitaminC: 4.3,
      potassium: 119,
      vitaminK1: 4.4,
      folate: 7
    },
    tags: ["gut health", "hydrating", "snackable"]
  },
  {
    name: "Peas, Green, Cooked",
    category: "Legumes",
    servingSize: "100g",
    calories: 84,
    macros: {
      protein: 5.4,
      fat: 0.4,
      carbs: 14.5
    },
    nutrients: {
      fiber: 5.7,
      vitaminC: 14.2,
      vitaminK1: 24.8,
      folate: 65,
      thiamin: 0.3
    },
    tags: ["sweet legume", "fiber-rich", "alkaline"]
  },
  {
    name: "Pineapple, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 50,
    macros: {
      protein: 0.5,
      fat: 0.1,
      carbs: 13.1
    },
    nutrients: {
      fiber: 1.4,
      vitaminC: 47.8,
      manganese: 1.3,
      potassium: 109,
      thiamin: 0.1
    },
    tags: ["tropical", "enzyme-rich", "anti-inflammatory"]
  },
  {
    name: "Plums, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 46,
    macros: {
      protein: 0.7,
      fat: 0.3,
      carbs: 11.4
    },
    nutrients: {
      fiber: 1.4,
      vitaminC: 9.5,
      potassium: 157,
      vitaminK1: 6.4,
      vitaminA: 17
    },
    tags: ["stone fruit", "cooling", "digestive"]
  },
  {
    name: "Pomegranate Seeds, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 83,
    macros: {
      protein: 1.7,
      fat: 1.2,
      carbs: 18.7
    },
    nutrients: {
      fiber: 4.0,
      vitaminC: 10.2,
      potassium: 236,
      folate: 38,
      vitaminK1: 16.4
    },
    tags: ["antioxidant", "circulation", "skin health"]
  },
  {
    name: "Potatoes, White, Flesh and Skin, Baked",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 93,
    macros: {
      protein: 2.5,
      fat: 0.1,
      carbs: 21.0
    },
    nutrients: {
      fiber: 2.2,
      vitaminC: 9.6,
      potassium: 544,
      vitaminB6: 0.2,
      magnesium: 23
    },
    tags: ["complex carb", "energy", "versatile"]
  },
  {
    name: "Pumpkin, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 26,
    macros: {
      protein: 1.0,
      fat: 0.1,
      carbs: 6.5
    },
    nutrients: {
      fiber: 0.5,
      vitaminA: 426,
      vitaminC: 9,
      potassium: 340,
      iron: 0.8
    },
    tags: ["autumn", "beta-carotene", "alkaline"]
  },
  {
    name: "Radishes, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 16,
    macros: {
      protein: 0.7,
      fat: 0.1,
      carbs: 3.4
    },
    nutrients: {
      fiber: 1.6,
      vitaminC: 14.8,
      potassium: 233,
      folate: 25,
      calcium: 25
    },
    tags: ["detox", "crunchy", "alkaline"]
  },
  {
    name: "Raspberries, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 52,
    macros: {
      protein: 1.2,
      fat: 0.7,
      carbs: 11.9
    },
    nutrients: {
      fiber: 6.5,
      vitaminC: 26.2,
      manganese: 0.7,
      vitaminK1: 7.8,
      magnesium: 22
    },
    tags: ["antioxidant", "fiber-rich", "low-glycemic"]
  },
  {
    name: "Red Bell Pepper, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 31,
    macros: {
      protein: 1.0,
      fat: 0.3,
      carbs: 6.0
    },
    nutrients: {
      fiber: 2.1,
      vitaminC: 127.7,
      vitaminA: 157,
      folate: 46,
      vitaminB6: 0.3
    },
    tags: ["antioxidant", "skin health", "hydrating"]
  },
  {
    name: "Rhubarb, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 21,
    macros: {
      protein: 0.9,
      fat: 0.2,
      carbs: 4.5
    },
    nutrients: {
      fiber: 1.8,
      vitaminK1: 29.3,
      calcium: 86,
      potassium: 288,
      vitaminC: 8
    },
    tags: ["tart", "spring", "alkaline"]
  },
  {
    name: "Romaine Lettuce, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 17,
    macros: {
      protein: 1.2,
      fat: 0.3,
      carbs: 3.3
    },
    nutrients: {
      fiber: 2.1,
      vitaminA: 436,
      vitaminK1: 102,
      folate: 136,
      potassium: 247
    },
    tags: ["hydrating", "alkaline", "crisp"]
  },
  {
    name: "Seaweed, Wakame, Raw",
    category: "Sea Vegetables",
    servingSize: "100g",
    calories: 45,
    macros: {
      protein: 3.0,
      fat: 0.6,
      carbs: 9.1
    },
    nutrients: {
      fiber: 0.5,
      iodine: 4150,
      magnesium: 107,
      calcium: 150,
      iron: 2.2
    },
    tags: ["mineral-rich", "thyroid", "alkaline"]
  },
  {
    name: "Spinach, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 23,
    macros: {
      protein: 2.9,
      fat: 0.4,
      carbs: 3.6
    },
    nutrients: {
      fiber: 2.2,
      vitaminK1: 483,
      folate: 194,
      iron: 2.7,
      magnesium: 79
    },
    tags: ["leafy", "iron-rich", "alkalizing"]
  },
  {
    name: "Strawberries, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 0.7,
      fat: 0.3,
      carbs: 7.7
    },
    nutrients: {
      fiber: 2.0,
      vitaminC: 58.8,
      manganese: 0.4,
      folate: 24,
      potassium: 153
    },
    tags: ["antioxidant", "cooling", "skin-brightening"]
  },
  {
    name: "Sunflower Seeds, Raw",
    category: "Seeds",
    servingSize: "100g",
    calories: 584,
    macros: {
      protein: 20.8,
      fat: 51.5,
      carbs: 20.0
    },
    nutrients: {
      fiber: 8.6,
      vitaminE: 35.2,
      selenium: 53,
      magnesium: 325,
      iron: 5.3
    },
    tags: ["vitamin E", "nervous system", "immune"]
  },
  {
    name: "Sweet Potato, Baked, Skin On",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 90,
    macros: {
      protein: 2.0,
      fat: 0.2,
      carbs: 21.3
    },
    nutrients: {
      fiber: 3.3,
      vitaminA: 961,
      vitaminC: 19.6,
      potassium: 475,
      manganese: 0.5
    },
    tags: ["complex carb", "gut-friendly", "beta-carotene"]
  },
  {
    name: "Tomatoes, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 18,
    macros: {
      protein: 0.9,
      fat: 0.2,
      carbs: 3.9
    },
    nutrients: {
      fiber: 1.2,
      vitaminC: 13.7,
      potassium: 237,
      vitaminA: 42,
      lycopene: 2573
    },
    tags: ["anti-inflammatory", "heart", "hydrating"]
  },
  {
    name: "Turnip, Raw",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 28,
    macros: {
      protein: 0.9,
      fat: 0.1,
      carbs: 6.4
    },
    nutrients: {
      fiber: 1.8,
      vitaminC: 21,
      calcium: 30,
      potassium: 191,
      folate: 15
    },
    tags: ["winter root", "alkaline", "low-cal"]
  },
  {
    name: "Walnuts, Raw",
    category: "Nuts",
    servingSize: "100g",
    calories: 654,
    macros: {
      protein: 15.2,
      fat: 65.2,
      carbs: 13.7
    },
    nutrients: {
      fiber: 6.7,
      omega3_ALA: 9.1,
      copper: 1.6,
      magnesium: 158,
      protein: 15.2
    },
    tags: ["brain food", "omega-rich", "anti-inflammatory"]
  },
  {
    name: "Watermelon, Raw",
    category: "Fruits",
    servingSize: "100g",
    calories: 30,
    macros: {
      protein: 0.6,
      fat: 0.2,
      carbs: 7.6
    },
    nutrients: {
      fiber: 0.4,
      vitaminC: 8.1,
      potassium: 112,
      lycopene: 4532,
      vitaminA: 28
    },
    tags: ["hydrating", "cooling", "low-cal"]
  },
  {
    name: "Zucchini, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 17,
    macros: {
      protein: 1.2,
      fat: 0.3,
      carbs: 3.1
    },
    nutrients: {
      fiber: 1.1,
      vitaminC: 17.9,
      potassium: 261,
      folate: 24,
      vitaminB6: 0.2
    },
    tags: ["light veggie", "low-calorie", "digestive support"]
  },
  {
    name: "Yellow Squash, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 16,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 3.4
    },
    nutrients: {
      fiber: 1.1,
      vitaminC: 19.3,
      vitaminA: 10,
      potassium: 262,
      magnesium: 18
    },
    tags: ["summer squash", "hydrating", "alkaline"]
  },
  {
    name: "Yam, Cooked, Boiled",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 118,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 27.9
    },
    nutrients: {
      fiber: 4.1,
      vitaminC: 12.1,
      potassium: 816,
      vitaminB6: 0.3,
      manganese: 0.4
    },
    tags: ["energy", "root veggie", "complex carb"]
  },
  {
    name: "Acorn Squash, Baked, No Salt",
    category: "Vegetables",
    servingSize: "100g",
    calories: 89,
    macros: {
      protein: 0.8,
      fat: 0.1,
      carbs: 22.9
    },
    nutrients: {
      fiber: 3.0,
      vitaminA: 24,
      vitaminC: 11,
      potassium: 437,
      magnesium: 32
    },
    tags: ["winter squash", "comfort food", "high fiber"]
  },
  {
    name: "Bok Choy, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 13,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 2.2
    },
    nutrients: {
      fiber: 1.0,
      vitaminA: 268,
      vitaminC: 45,
      calcium: 105,
      vitaminK1: 45.5
    },
    tags: ["cruciferous", "alkaline", "bone support"]
  },
  {
    name: "Butternut Squash, Baked, No Salt",
    category: "Vegetables",
    servingSize: "100g",
    calories: 82,
    macros: {
      protein: 1.0,
      fat: 0.1,
      carbs: 21.5
    },
    nutrients: {
      fiber: 3.2,
      vitaminA: 532,
      vitaminC: 15.1,
      potassium: 284,
      magnesium: 34
    },
    tags: ["winter squash", "comfort food", "beta-carotene"]
  },
  {
    name: "Chili Peppers, Red, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 40,
    macros: {
      protein: 2.0,
      fat: 0.4,
      carbs: 9.5
    },
    nutrients: {
      fiber: 1.5,
      vitaminC: 143.7,
      vitaminA: 59,
      potassium: 322,
      capsaicin: 0.1
    },
    tags: ["spicy", "metabolism", "circulation"]
  },
  {
    name: "Dandelion Greens, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 45,
    macros: {
      protein: 2.7,
      fat: 0.7,
      carbs: 9.2
    },
    nutrients: {
      fiber: 3.5,
      vitaminA: 508,
      vitaminK1: 778,
      calcium: 187,
      iron: 3.1
    },
    tags: ["wild food", "detox", "mineral-rich"]
  },
  {
    name: "Green Onion (Scallions), Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 32,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 7.3
    },
    nutrients: {
      fiber: 2.6,
      vitaminK1: 207,
      vitaminC: 18.8,
      folate: 64,
      calcium: 72
    },
    tags: ["allium", "fresh", "aromatic"]
  },
  {
    name: "Swiss Chard, Cooked",
    category: "Vegetables",
    servingSize: "100g",
    calories: 35,
    macros: {
      protein: 1.8,
      fat: 0.2,
      carbs: 7.2
    },
    nutrients: {
      fiber: 3.7,
      vitaminK1: 830,
      magnesium: 81,
      vitaminA: 306,
      iron: 1.8
    },
    tags: ["leafy green", "mineral support", "alkaline"]
  },
  {
    name: "Taro Root, Cooked",
    category: "Root Vegetables",
    servingSize: "100g",
    calories: 112,
    macros: {
      protein: 1.5,
      fat: 0.2,
      carbs: 26.5
    },
    nutrients: {
      fiber: 4.1,
      potassium: 615,
      magnesium: 33,
      vitaminE: 2.9,
      manganese: 0.4
    },
    tags: ["starchy root", "gut health", "energy"]
  },
  {
    name: "Watercress, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 11,
    macros: {
      protein: 2.3,
      fat: 0.1,
      carbs: 1.3
    },
    nutrients: {
      fiber: 0.5,
      vitaminK1: 250,
      vitaminC: 43,
      calcium: 120,
      folate: 9
    },
    tags: ["leafy green", "alkaline", "light"]
  },
  {
    name: "Napa Cabbage, Raw",
    category: "Vegetables",
    servingSize: "100g",
    calories: 16,
    macros: {
      protein: 1.2,
      fat: 0.2,
      carbs: 3.2
    },
    nutrients: {
      fiber: 1.0,
      vitaminC: 27,
      folate: 79,
      calcium: 77,
      potassium: 238
    },
    tags: ["cruciferous", "hydrating", "gut-friendly"]
  },
  {
    name: "Oat milk, unsweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 40,
    macros: {
      protein: 1.0,
      fat: 1.5,
      carbs: 7.0
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.6,      // mg
      magnesium: 16,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["dairy-free", "vegan", "fortified", "creamy"]
  },
  {
    name: "Almond milk, unsweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 13,
    macros: {
      protein: 0.4,
      fat: 1.1,
      carbs: 0.4
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      vitaminE: 2.0,  // mg
      magnesium: 13,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["low-calorie", "vegan", "fortified", "smooth"]
  },
  {
    name: "Cashew milk, unsweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 25,
    macros: {
      protein: 0.6,
      fat: 2.0,
      carbs: 1.0
    },
    nutrients: {
      calcium: 130,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.5,      // mg
      magnesium: 15,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["dairy-free", "smooth", "fortified", "nutty"]
  },
  {
    name: "Soy milk, unsweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 33,
    macros: {
      protein: 3.3,
      fat: 1.8,
      carbs: 0.4
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.6,      // mg
      magnesium: 25,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["high-protein", "vegan", "fortified", "creamy"]
  },
  {
    name: "Coconut milk (carton, unsweetened)",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 13,
    macros: {
      protein: 0.3,
      fat: 1.2,
      carbs: 1.1
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.2,      // mg
      magnesium: 12,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["dairy-free", "vegan", "fortified", "coconutty"]
  },
  {
    name: "Hemp milk, unsweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 30,
    macros: {
      protein: 1.6,
      fat: 2.5,
      carbs: 0.6
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.5,      // mg
      magnesium: 15,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["vegan", "nut-free", "fortified", "earthy"]
  },
  {
    name: "Macadamia milk, unsweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 50,
    macros: {
      protein: 1.0,
      fat: 4.0,
      carbs: 2.0
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.3,      // mg
      magnesium: 20,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["creamy", "vegan", "fortified", "nutty"]
  },
  {
    name: "Oat milk, sweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 60,
    macros: {
      protein: 1.0,
      fat: 1.5,
      carbs: 12.0
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.6,      // mg
      magnesium: 16,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["dairy-free", "vegan", "fortified", "creamy", "sweetened"]
  },
  {
    name: "Almond milk, sweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 60,
    macros: {
      protein: 0.4,
      fat: 1.1,
      carbs: 5.5
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      vitaminE: 2.0,  // mg
      magnesium: 13,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["low-calorie", "vegan", "fortified", "smooth", "sweetened"]
  },
  {
    name: "Cashew milk, sweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 50,
    macros: {
      protein: 0.6,
      fat: 2.0,
      carbs: 3.5
    },
    nutrients: {
      calcium: 130,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.5,      // mg
      magnesium: 15,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["dairy-free", "smooth", "fortified", "nutty", "sweetened"]
  },
  {
    name: "Soy milk, sweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 55,
    macros: {
      protein: 3.3,
      fat: 1.8,
      carbs: 6.0
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.6,      // mg
      magnesium: 25,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["high-protein", "vegan", "fortified", "creamy", "sweetened"]
  },
  {
    name: "Coconut milk (carton, sweetened)",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 45,
    macros: {
      protein: 0.3,
      fat: 1.2,
      carbs: 7.0
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.2,      // mg
      magnesium: 12,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["dairy-free", "vegan", "fortified", "coconutty", "sweetened"]
  },
  {
    name: "Hemp milk, sweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 50,
    macros: {
      protein: 1.6,
      fat: 2.5,
      carbs: 5.0
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.5,      // mg
      magnesium: 15,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["vegan", "nut-free", "fortified", "earthy", "sweetened"]
  },
  {
    name: "Macadamia milk, sweetened",
    category: "Plant-Based Milks",
    servingSize: "100ml",
    calories: 60,
    macros: {
      protein: 1.0,
      fat: 4.0,
      carbs: 3.5
    },
    nutrients: {
      calcium: 120,   // mg
      vitaminD: 2.5,  // IU
      iron: 0.3,      // mg
      magnesium: 20,  // mg
      vitaminB12: 0.0 // mcg
    },
    tags: ["creamy", "vegan", "fortified", "nutty", "sweetened"]
  }
  ];
  