const animalFoodList = [
    {
      name: "Beef, ground, 85% lean, cooked",
      category: "Beef Products",
      servingSize: "100g",
      calories: 250,
      macros: {
        protein: 26.0,
        fat: 17.0,
        carbs: 0.0
      },
      nutrients: {
        iron: 2.5,
        zinc: 6.3,
        vitaminB12: 2.5,
        niacin: 4.0,
        selenium: 26.0
      },
      tags: ["muscle building", "iron-rich", "high protein"]
    },
    {
      name: "Chicken breast, skinless, roasted",
      category: "Poultry Products",
      servingSize: "100g",
      calories: 165,
      macros: {
        protein: 31.0,
        fat: 3.6,
        carbs: 0.0
      },
      nutrients: {
        niacin: 14.8,
        selenium: 27.6,
        vitaminB6: 0.6,
        phosphorus: 220,
        potassium: 256
      },
      tags: ["lean protein", "low fat", "versatile"]
    },
    {
      name: "Eggs, whole, cooked, hard-boiled",
      category: "Dairy and Egg Products",
      servingSize: "100g",
      calories: 155,
      macros: {
        protein: 13.0,
        fat: 11.0,
        carbs: 1.1
      },
      nutrients: {
        choline: 294,
        vitaminB12: 1.1,
        vitaminD: 37,
        selenium: 31.7,
        vitaminA: 140
      },
      tags: ["complete protein", "brain support", "portable"]
    },
    {
      name: "Salmon, Atlantic, wild, cooked",
      category: "Finfish and Shellfish Products",
      servingSize: "100g",
      calories: 182,
      macros: {
        protein: 25.4,
        fat: 8.2,
        carbs: 0.0
      },
      nutrients: {
        omega3_EPA_DHA: 2.6,
        vitaminD: 526,
        selenium: 36.5,
        vitaminB12: 3.2,
        potassium: 490
      },
      tags: ["omega-3", "anti-inflammatory", "heart health"]
    },
    {
      name: "Lamb, ground, cooked",
      category: "Lamb, Veal, and Game Products",
      servingSize: "100g",
      calories: 282,
      macros: {
        protein: 25.0,
        fat: 20.0,
        carbs: 0.0
      },
      nutrients: {
        zinc: 4.5,
        vitaminB12: 2.3,
        selenium: 23.5,
        iron: 2.0,
        niacin: 5.0
      },
      tags: ["iron-rich", "zinc-dense", "hearty"]
    },
    {
      name: "Pork loin, roasted",
      category: "Pork Products",
      servingSize: "100g",
      calories: 196,
      macros: {
        protein: 27.0,
        fat: 9.0,
        carbs: 0.0
      },
      nutrients: {
        thiamin: 0.8,
        selenium: 39.0,
        niacin: 8.5,
        vitaminB6: 0.7,
        zinc: 2.3
      },
      tags: ["high protein", "lean cut", "muscle maintenance"]
    },
    {
      name: "Duck breast, roasted, skinless",
      category: "Poultry Products",
      servingSize: "100g",
      calories: 190,
      macros: {
        protein: 27.0,
        fat: 8.0,
        carbs: 0.0
      },
      nutrients: {
        iron: 2.7,
        selenium: 25.0,
        niacin: 7.8,
        zinc: 2.0,
        vitaminB6: 0.5
      },
      tags: ["rich flavor", "iron support", "global cuisine"]
    },
    {
        name: "Bison, ground, cooked",
        category: "Lamb, Veal, and Game Products",
        servingSize: "100g",
        calories: 190,
        macros: {
          protein: 26.0,
          fat: 10.0,
          carbs: 0.0
        },
        nutrients: {
          iron: 3.0,
          zinc: 4.0,
          selenium: 31.0,
          vitaminB12: 2.9,
          niacin: 6.2
        },
        tags: ["game meat", "high iron", "lean protein"]
      },
      {
        name: "Goat meat, cooked",
        category: "Lamb, Veal, and Game Products",
        servingSize: "100g",
        calories: 143,
        macros: {
          protein: 27.0,
          fat: 3.0,
          carbs: 0.0
        },
        nutrients: {
          iron: 3.7,
          potassium: 385,
          vitaminB12: 1.5,
          zinc: 4.2,
          selenium: 17.0
        },
        tags: ["lean", "cultural staple", "high protein"]
      },
      {
        name: "Turkey breast, roasted, skinless",
        category: "Poultry Products",
        servingSize: "100g",
        calories: 135,
        macros: {
          protein: 30.0,
          fat: 1.0,
          carbs: 0.0
        },
        nutrients: {
          niacin: 11.0,
          selenium: 29.0,
          vitaminB6: 0.9,
          phosphorus: 220,
          zinc: 2.0
        },
        tags: ["low fat", "muscle building", "holiday classic"]
      },
      {
        name: "Quail, cooked",
        category: "Poultry Products",
        servingSize: "100g",
        calories: 234,
        macros: {
          protein: 25.0,
          fat: 14.0,
          carbs: 0.0
        },
        nutrients: {
          iron: 4.0,
          selenium: 22.0,
          niacin: 6.8,
          vitaminB6: 0.6,
          zinc: 2.5
        },
        tags: ["exotic", "iron-rich", "protein-dense"]
      },
      {
        name: "Venison, cooked",
        category: "Lamb, Veal, and Game Products",
        servingSize: "100g",
        calories: 158,
        macros: {
          protein: 30.0,
          fat: 3.2,
          carbs: 0.0
        },
        nutrients: {
          iron: 4.1,
          vitaminB12: 2.4,
          selenium: 27.0,
          zinc: 3.0,
          niacin: 7.1
        },
        tags: ["wild game", "lean", "nutrient-dense"]
      },
      {
        name: "Rabbit, cooked",
        category: "Lamb, Veal, and Game Products",
        servingSize: "100g",
        calories: 173,
        macros: {
          protein: 28.0,
          fat: 6.0,
          carbs: 0.0
        },
        nutrients: {
          iron: 3.5,
          vitaminB12: 2.6,
          selenium: 29.0,
          niacin: 8.2,
          phosphorus: 220
        },
        tags: ["game meat", "sustainable", "high protein"]
      },
      {
        name: "Beef liver, cooked",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 175,
        macros: {
          protein: 26.0,
          fat: 5.0,
          carbs: 3.9
        },
        nutrients: {
          vitaminA: 6582,
          vitaminB12: 70.7,
          iron: 6.2,
          folate: 290,
          copper: 12.0
        },
        tags: ["nutrient powerhouse", "ancestral", "iron-loaded"]
      },
      {
        name: "Pork liver, cooked",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 165,
        macros: {
          protein: 27.0,
          fat: 5.0,
          carbs: 2.0
        },
        nutrients: {
          vitaminA: 5668,
          vitaminB12: 25.0,
          zinc: 4.0,
          selenium: 55.0,
          iron: 12.0
        },
        tags: ["vitamin A rich", "iron loaded", "dense organ meat"]
      },
      {
        name: "Beef heart, cooked",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 179,
        macros: {
          protein: 27.0,
          fat: 7.0,
          carbs: 0.0
        },
        nutrients: {
          zinc: 4.3,
          iron: 4.0,
          vitaminB12: 8.0,
          selenium: 28.0,
          phosphorus: 215
        },
        tags: ["coenzyme Q10", "cardiac health", "nutrient-rich"]
      },
      {
        name: "Chicken heart, cooked",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 185,
        macros: {
          protein: 26.0,
          fat: 8.0,
          carbs: 0.7
        },
        nutrients: {
          iron: 5.6,
          vitaminB12: 7.3,
          zinc: 3.5,
          selenium: 23.0,
          niacin: 4.9
        },
        tags: ["iron boost", "traditional food", "compact protein"]
      },
      {
        name: "Chicken gizzards, cooked",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 153,
        macros: {
          protein: 30.0,
          fat: 2.7,
          carbs: 0.0
        },
        nutrients: {
          iron: 2.5,
          zinc: 3.8,
          niacin: 4.4,
          selenium: 27.0,
          vitaminB12: 1.2
        },
        tags: ["chewy texture", "high protein", "digestive tract"]
      },
      {
        name: "Duck liver, cooked",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 136,
        macros: {
          protein: 17.0,
          fat: 6.0,
          carbs: 1.0
        },
        nutrients: {
          vitaminA: 5200,
          iron: 30.5,
          vitaminB12: 13.7,
          copper: 12.5,
          folate: 425
        },
        tags: ["iron-rich", "vitamin A loaded", "luxury organ"]
      },
      {
        name: "Tripe (beef stomach), cooked",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 85,
        macros: {
          protein: 12.0,
          fat: 3.7,
          carbs: 0.0
        },
        nutrients: {
          selenium: 14.0,
          vitaminB12: 1.6,
          zinc: 1.6,
          phosphorus: 81,
          choline: 110
        },
        tags: ["digestive tract", "low cal", "traditional dish"]
      },
      {
        name: "Bone marrow (beef), roasted",
        category: "Organ Meats",
        servingSize: "100g",
        calories: 770,
        macros: {
          protein: 7.0,
          fat: 84.0,
          carbs: 0.0
        },
        nutrients: {
          iron: 0.3,
          vitaminA: 9.0,
          monounsaturatedFat: 51.0,
          phosphorus: 132,
          collagen: "high"
        },
        tags: ["fat fuel", "ancestral energy", "collagen-rich"]
      },
      {
        name: "Oxtail, cooked",
        category: "Beef Products",
        servingSize: "100g",
        calories: 262,
        macros: {
          protein: 30.0,
          fat: 16.0,
          carbs: 0.0
        },
        nutrients: {
          iron: 2.4,
          zinc: 4.0,
          collagen: "very high",
          selenium: 23.0,
          phosphorus: 205
        },
        tags: ["joint health", "rich broth base", "slow-cooked classic"]
      },
      {
        name: "Chicken feet, boiled",
        category: "Poultry Products",
        servingSize: "100g",
        calories: 215,
        macros: {
          protein: 19.4,
          fat: 15.5,
          carbs: 0.0
        },
        nutrients: {
          collagen: "extremely high",
          calcium: 88,
          phosphorus: 187,
          selenium: 12.0,
          vitaminB6: 0.6
        },
        tags: ["collagen booster", "gelatinous", "joint support"]
      },
      {
        name: "Fish roe, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 143,
        macros: {
          protein: 26.0,
          fat: 4.0,
          carbs: 1.0
        },
        nutrients: {
          omega3_EPA_DHA: 2.0,
          vitaminB12: 10.0,
          selenium: 36.0,
          vitaminD: 320,
          choline: 370
        },
        tags: ["fertility", "brain food", "ancestral superfood"]
      },
      {
        name: "Salmon skin, grilled",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 468,
        macros: {
          protein: 23.0,
          fat: 42.0,
          carbs: 0.0
        },
        nutrients: {
          omega3_EPA_DHA: 3.5,
          collagen: "rich",
          selenium: 28.0,
          vitaminD: 500,
          phosphorus: 260
        },
        tags: ["crispy fat", "omega-rich", "skin health"]
      },
      {
        name: "Anchovies, canned in oil, drained",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 210,
        macros: {
          protein: 29.0,
          fat: 10.0,
          carbs: 0.0
        },
        nutrients: {
          calcium: 147,
          iron: 4.6,
          selenium: 36.5,
          vitaminB12: 3.4,
          omega3_EPA_DHA: 2.0
        },
        tags: ["umami", "bone-in calcium", "tiny fish, big nutrients"]
      },
      {
        name: "Sardines, canned in water, drained",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 208,
        macros: {
          protein: 25.0,
          fat: 11.0,
          carbs: 0.0
        },
        nutrients: {
          vitaminD: 270,
          calcium: 382,
          selenium: 52.7,
          omega3_EPA_DHA: 2.2,
          vitaminB12: 8.9
        },
        tags: ["bone health", "omega-3", "low-mercury"]
      },
      {
        name: "Herring, Atlantic, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 203,
        macros: {
          protein: 23.0,
          fat: 12.0,
          carbs: 0.0
        },
        nutrients: {
          omega3_EPA_DHA: 2.5,
          vitaminD: 680,
          selenium: 39.0,
          vitaminB12: 13.7,
          choline: 75
        },
        tags: ["nordic staple", "brain booster", "fatty fish"]
      },
      {
        name: "Cod, Pacific, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 105,
        macros: {
          protein: 23.0,
          fat: 0.9,
          carbs: 0.0
        },
        nutrients: {
          selenium: 33.0,
          vitaminB6: 0.6,
          phosphorus: 264,
          potassium: 439,
          choline: 95
        },
        tags: ["lean fish", "mild flavor", "protein-rich"]
      },
      {
        name: "Tuna, skipjack, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 132,
        macros: {
          protein: 28.0,
          fat: 1.0,
          carbs: 0.0
        },
        nutrients: {
          selenium: 72.8,
          vitaminB12: 9.4,
          niacin: 18.8,
          vitaminD: 156,
          potassium: 441
        },
        tags: ["high protein", "travel-friendly", "muscle support"]
      },
      {
        name: "Crab, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 97,
        macros: {
          protein: 20.0,
          fat: 1.5,
          carbs: 0.0
        },
        nutrients: {
          selenium: 36.4,
          zinc: 3.1,
          vitaminB12: 9.8,
          copper: 1.3,
          omega3_EPA_DHA: 0.3
        },
        tags: ["sweet meat", "zinc-rich", "iodine support"]
      },
      {
        name: "Lobster, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 89,
        macros: {
          protein: 19.0,
          fat: 0.9,
          carbs: 0.0
        },
        nutrients: {
          selenium: 46.0,
          copper: 1.7,
          zinc: 3.5,
          vitaminB12: 4.0,
          phosphorus: 200
        },
        tags: ["luxury shellfish", "lean protein", "nerve health"]
      },
      {
        name: "Mussels, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 172,
        macros: {
          protein: 24.0,
          fat: 4.5,
          carbs: 7.4
        },
        nutrients: {
          vitaminB12: 20.4,
          manganese: 6.8,
          selenium: 56.0,
          zinc: 3.2,
          omega3_EPA_DHA: 0.7
        },
        tags: ["sustainable", "trace mineral source", "high-protein"]
      },
      {
        name: "Scallops, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 111,
        macros: {
          protein: 20.0,
          fat: 1.0,
          carbs: 4.5
        },
        nutrients: {
          selenium: 24.0,
          vitaminB12: 1.3,
          phosphorus: 320,
          potassium: 314,
          choline: 65
        },
        tags: ["delicate texture", "lean seafood", "metabolic support"]
      },
      {
        name: "Squid, cooked",
        category: "Finfish and Shellfish Products",
        servingSize: "100g",
        calories: 175,
        macros: {
          protein: 29.9,
          fat: 4.8,
          carbs: 1.5
        },
        nutrients: {
          selenium: 44.8,
          vitaminB12: 1.3,
          copper: 1.9,
          phosphorus: 221,
          cholesterol: 233
        },
        tags: ["chewy protein", "zinc-rich", "deep sea"]
      },
      {
        name: "Frog legs, cooked",
        category: "Lamb, Veal, and Game Products",
        servingSize: "100g",
        calories: 73,
        macros: {
          protein: 16.0,
          fat: 0.3,
          carbs: 0.0
        },
        nutrients: {
          potassium: 285,
          phosphorus: 215,
          iron: 1.0,
          magnesium: 19,
          selenium: 25.0
        },
        tags: ["lean protein", "amphibious source", "delicacy"]
      },
      {
        name: "Duck eggs, whole, cooked",
        category: "Dairy and Egg Products",
        servingSize: "100g",
        calories: 185,
        macros: {
          protein: 13.0,
          fat: 14.0,
          carbs: 1.5
        },
        nutrients: {
          choline: 320,
          vitaminB12: 3.8,
          vitaminD: 70,
          selenium: 33.0,
          folate: 80
        },
        tags: ["rich yolk", "brain boost", "rare egg"]
      },
      {
        name: "Quail eggs, whole, cooked",
        category: "Dairy and Egg Products",
        servingSize: "100g",
        calories: 158,
        macros: {
          protein: 13.1,
          fat: 11.0,
          carbs: 1.0
        },
        nutrients: {
          iron: 3.6,
          vitaminA: 543,
          vitaminB12: 1.6,
          selenium: 32.0,
          riboflavin: 0.8
        },
        tags: ["small but mighty", "eye health", "high yolk ratio"]
      },
      {
        name: "Buffalo meat, cooked",
        category: "Lamb, Veal, and Game Products",
        servingSize: "100g",
        calories: 146,
        macros: {
          protein: 28.4,
          fat: 2.4,
          carbs: 0.0
        },
        nutrients: {
          iron: 3.1,
          zinc: 3.9,
          selenium: 28.0,
          vitaminB12: 2.7,
          niacin: 6.5
        },
        tags: ["wild protein", "grass-fed", "ancestral"]
      },
      {
    name: "Rabbit liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 173,
    macros: {
      protein: 27.0,
      fat: 6.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 4300,
      iron: 7.2,
      vitaminB12: 16.4,
      selenium: 50.0,
      folate: 210
    },
    tags: ["light organ", "vitamin A rich", "sustainable"]
  },
  {
    name: "Turkey liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 189,
    macros: {
      protein: 28.0,
      fat: 7.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 6186,
      vitaminB12: 23.3,
      iron: 7.5,
      folate: 650,
      selenium: 55.0
    },
    tags: ["holiday nutrient", "iron support", "ancestral organ"]
  },
  {
    name: "Chicken skin, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 450,
    macros: {
      protein: 18.0,
      fat: 40.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      selenium: 24.0,
      phosphorus: 180,
      vitaminB6: 0.6,
      zinc: 2.0
    },
    tags: ["crispy energy", "collagen boost", "fat fuel"]
  },
  {
    name: "Beef marrow broth",
    category: "Beef Products",
    servingSize: "100g",
    calories: 40,
    macros: {
      protein: 4.0,
      fat: 1.5,
      carbs: 0.0
    },
    nutrients: {
      collagen: "rich",
      gelatin: "high",
      calcium: 25,
      magnesium: 10,
      phosphorus: 45
    },
    tags: ["gut healer", "joint support", "liquid gold"]
  },
  {
    name: "Egg yolk, cooked",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 322,
    macros: {
      protein: 16.0,
      fat: 27.0,
      carbs: 3.6
    },
    nutrients: {
      choline: 680,
      vitaminA: 540,
      vitaminD: 218,
      selenium: 36.0,
      folate: 146
    },
    tags: ["brain fuel", "fat-soluble vitamins", "concentrated nutrition"]
  },
  {
    name: "Cow milk, whole, raw",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 61,
    macros: {
      protein: 3.2,
      fat: 3.4,
      carbs: 4.8
    },
    nutrients: {
      calcium: 113,
      phosphorus: 93,
      riboflavin: 0.2,
      vitaminB12: 0.4,
      iodine: "moderate"
    },
    tags: ["whole food dairy", "electrolyte balance", "ancestral milk"]
  },
  {
    name: "Goat milk, raw",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 69,
    macros: {
      protein: 3.6,
      fat: 4.1,
      carbs: 4.5
    },
    nutrients: {
      calcium: 134,
      vitaminA: 57,
      potassium: 204,
      magnesium: 14,
      phosphorus: 111
    },
    tags: ["easily digested", "alkaline dairy", "global staple"]
  },
  {
    name: "Sheep milk, raw",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 108,
    macros: {
      protein: 5.4,
      fat: 6.7,
      carbs: 5.0
    },
    nutrients: {
      calcium: 193,
      phosphorus: 158,
      zinc: 0.5,
      vitaminB12: 0.8,
      riboflavin: 0.3
    },
    tags: ["rich dairy", "calcium dense", "ancestral milk"]
  },
  {
    name: "Kefir, whole milk",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 63,
    macros: {
      protein: 3.5,
      fat: 3.3,
      carbs: 4.5
    },
    nutrients: {
      probiotics: "active",
      calcium: 120,
      vitaminD: 38,
      phosphorus: 95,
      B12: 0.4
    },
    tags: ["gut health", "fermented", "probiotic rich"]
  },
  {
    name: "Greek yogurt, plain, whole milk",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 97,
    macros: {
      protein: 9.0,
      fat: 5.0,
      carbs: 3.6
    },
    nutrients: {
      calcium: 110,
      phosphorus: 135,
      vitaminB12: 0.8,
      potassium: 141,
      probiotics: "present"
    },
    tags: ["muscle recovery", "gut flora", "satiating"]
  },
  {
    name: "Cottage cheese, full fat",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 98,
    macros: {
      protein: 11.1,
      fat: 4.3,
      carbs: 3.4
    },
    nutrients: {
      calcium: 83,
      phosphorus: 144,
      selenium: 13.0,
      vitaminA: 105,
      B12: 0.7
    },
    tags: ["slow-digesting", "casein source", "versatile dairy"]
  },
  {
    name: "Cheddar cheese, aged",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 403,
    macros: {
      protein: 24.9,
      fat: 33.1,
      carbs: 1.3
    },
    nutrients: {
      calcium: 721,
      phosphorus: 512,
      vitaminA: 265,
      vitaminK2: "high",
      B12: 1.5
    },
    tags: ["bone health", "fat-soluble storage", "keto friendly"]
  },
  {
    name: "Parmesan cheese, aged",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 431,
    macros: {
      protein: 38.5,
      fat: 29.0,
      carbs: 4.1
    },
    nutrients: {
      calcium: 1184,
      phosphorus: 694,
      vitaminA: 330,
      sodium: 1529,
      vitaminB12: 1.4
    },
    tags: ["hard cheese", "protein-dense", "mineral booster"]
  },
  {
    name: "Ghee (clarified butter)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 900,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 3069,
      vitaminE: 2.8,
      vitaminK2: "present",
      butyrate: "abundant",
      CLA: "present"
    },
    tags: ["pure fat", "heat stable", "ancestral fuel"]
  },
  {
    name: "Butter, unsalted",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 717,
    macros: {
      protein: 0.9,
      fat: 81.0,
      carbs: 0.1
    },
    nutrients: {
      vitaminA: 684,
      vitaminD: 20,
      vitaminK2: "present",
      CLA: "trace",
      selenium: 1.0
    },
    tags: ["fat source", "natural dairy", "spreadable energy"]
  },
  {
    name: "Camembert cheese",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 300,
    macros: {
      protein: 19.8,
      fat: 24.3,
      carbs: 0.5
    },
    nutrients: {
      calcium: 388,
      phosphorus: 347,
      vitaminA: 241,
      vitaminB12: 1.3,
      zinc: 2.4
    },
    tags: ["soft cheese", "fermented", "fat-soluble vitamins"]
  },
  {
    name: "Feta cheese",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 264,
    macros: {
      protein: 14.2,
      fat: 21.3,
      carbs: 4.1
    },
    nutrients: {
      calcium: 493,
      phosphorus: 337,
      sodium: 917,
      vitaminB12: 1.2,
      zinc: 2.9
    },
    tags: ["crumbly", "salty", "Mediterranean staple"]
  },
  {
    name: "Ricotta cheese, whole milk",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 174,
    macros: {
      protein: 11.0,
      fat: 13.0,
      carbs: 3.0
    },
    nutrients: {
      calcium: 207,
      phosphorus: 158,
      selenium: 10.5,
      vitaminA: 140,
      zinc: 0.6
    },
    tags: ["creamy", "Italian origin", "protein + fat combo"]
  },
  {
    name: "Mozzarella cheese, whole milk",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 300,
    macros: {
      protein: 22.2,
      fat: 22.1,
      carbs: 2.2
    },
    nutrients: {
      calcium: 505,
      phosphorus: 354,
      vitaminB12: 2.3,
      zinc: 2.5,
      selenium: 14.3
    },
    tags: ["melting cheese", "classic", "pizza fuel"]
  },
  {
    name: "Halloumi cheese",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 321,
    macros: {
      protein: 21.0,
      fat: 26.0,
      carbs: 2.0
    },
    nutrients: {
      calcium: 700,
      sodium: 1000,
      vitaminA: 250,
      vitaminB12: 1.0,
      zinc: 3.0
    },
    tags: ["grillable", "Middle Eastern", "salty treat"]
  },
  {
    name: "Cream, heavy whipping",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 340,
    macros: {
      protein: 2.0,
      fat: 36.0,
      carbs: 3.0
    },
    nutrients: {
      vitaminA: 411,
      vitaminD: 19,
      calcium: 66,
      phosphorus: 58,
      CLA: "trace"
    },
    tags: ["keto staple", "rich texture", "dessert enhancer"]
  },
  {
    name: "Cream cheese",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 342,
    macros: {
      protein: 6.2,
      fat: 34.4,
      carbs: 4.1
    },
    nutrients: {
      vitaminA: 308,
      calcium: 97,
      phosphorus: 107,
      vitaminB12: 0.8,
      selenium: 8.5
    },
    tags: ["spreadable fat", "keto treat", "creamy texture"]
  },
  {
    name: "Blue cheese",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 353,
    macros: {
      protein: 21.4,
      fat: 28.7,
      carbs: 2.3
    },
    nutrients: {
      calcium: 528,
      phosphorus: 387,
      vitaminB12: 1.2,
      vitaminA: 198,
      sodium: 1300
    },
    tags: ["bold flavor", "probiotic-rich", "fat-dense"]
  },
  {
    name: "Brie cheese",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 334,
    macros: {
      protein: 20.8,
      fat: 27.7,
      carbs: 0.5
    },
    nutrients: {
      calcium: 184,
      phosphorus: 188,
      vitaminA: 308,
      vitaminB12: 1.0,
      selenium: 5.0
    },
    tags: ["soft cheese", "French origin", "fat-soluble"]
  },
  {
    name: "Goat cheese, soft",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 364,
    macros: {
      protein: 21.6,
      fat: 29.8,
      carbs: 0.1
    },
    nutrients: {
      calcium: 298,
      phosphorus: 248,
      vitaminA: 407,
      vitaminB2: 0.6,
      vitaminB12: 1.1
    },
    tags: ["tangy", "easy to digest", "elegant"]
  },
  {
    name: "Sheep cheese, hard",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 400,
    macros: {
      protein: 25.0,
      fat: 33.0,
      carbs: 1.0
    },
    nutrients: {
      calcium: 750,
      vitaminA: 500,
      zinc: 4.0,
      phosphorus: 500,
      selenium: 9.0
    },
    tags: ["rich texture", "Mediterranean", "mineral boost"]
  },
  {
    name: "Butter, cultured",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 717,
    macros: {
      protein: 0.9,
      fat: 81.1,
      carbs: 0.1
    },
    nutrients: {
      vitaminA: 684,
      vitaminK2: "present",
      vitaminD: 20,
      CLA: "trace",
      butyrate: "present"
    },
    tags: ["gut-friendly fat", "fermented", "keto favorite"]
  },
  {
    name: "Whey protein concentrate",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 365,
    macros: {
      protein: 75.0,
      fat: 3.0,
      carbs: 10.0
    },
    nutrients: {
      calcium: 480,
      phosphorus: 250,
      BCAAs: "high",
      selenium: 20.0,
      magnesium: 60
    },
    tags: ["muscle fuel", "rapid digestion", "post-workout"]
  },
  {
    name: "Casein protein (micellar)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 358,
    macros: {
      protein: 80.0,
      fat: 1.5,
      carbs: 5.0
    },
    nutrients: {
      calcium: 500,
      phosphorus: 350,
      magnesium: 40,
      BCAAs: "moderate",
      vitaminB12: 2.0
    },
    tags: ["slow digesting", "muscle repair", "overnight fuel"]
  },
  {
    name: "Egg white, cooked",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 52,
    macros: {
      protein: 11.0,
      fat: 0.2,
      carbs: 0.7
    },
    nutrients: {
      selenium: 20.0,
      potassium: 163,
      riboflavin: 0.4,
      sodium: 166,
      niacin: 0.1
    },
    tags: ["pure protein", "zero fat", "lean cut"]
  },
  {
    name: "Colostrum (bovine, dried)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 495,
    macros: {
      protein: 45.0,
      fat: 25.0,
      carbs: 20.0
    },
    nutrients: {
      immunoglobulins: "very high",
      lactoferrin: "high",
      vitaminA: 1500,
      zinc: 6.0,
      calcium: 350
    },
    tags: ["immune booster", "growth factors", "ancestral start"]
  },
  {
    name: "Pig feet, boiled",
    category: "Pork Products",
    servingSize: "100g",
    calories: 264,
    macros: {
      protein: 19.0,
      fat: 21.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "extremely high",
      calcium: 88,
      zinc: 2.5,
      phosphorus: 190,
      selenium: 25.0
    },
    tags: ["joint support", "rich broth", "slow cooked"]
  },
  {
    name: "Pork skin, roasted",
    category: "Pork Products",
    servingSize: "100g",
    calories: 544,
    macros: {
      protein: 61.0,
      fat: 31.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      sodium: 1100,
      selenium: 19.0,
      phosphorus: 210,
      iron: 2.5
    },
    tags: ["crunchy", "protein chip", "zero carb"]
  },
  {
    name: "Chicken broth, homemade",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 15,
    macros: {
      protein: 1.5,
      fat: 0.5,
      carbs: 0.3
    },
    nutrients: {
      collagen: "rich",
      glycine: "present",
      potassium: 40,
      sodium: 150,
      phosphorus: 30
    },
    tags: ["gut soothing", "fasting support", "rehydration"]
  },
  {
    name: "Lamb shank, roasted",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 224,
    macros: {
      protein: 27.0,
      fat: 12.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.3,
      selenium: 27.0,
      zinc: 3.5,
      vitaminB12: 2.0,
      phosphorus: 250
    },
    tags: ["hearty", "slow roast", "iron support"]
  },
  {
    name: "Veal chop, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 196,
    macros: {
      protein: 27.0,
      fat: 9.0,
      carbs: 0.0
    },
    nutrients: {
      zinc: 3.1,
      selenium: 26.0,
      vitaminB12: 1.8,
      phosphorus: 232,
      iron: 1.5
    },
    tags: ["tender", "mild flavor", "iron-rich"]
  },
  {
    name: "Goat meat liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 180,
    macros: {
      protein: 26.0,
      fat: 7.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 5200,
      iron: 9.0,
      folate: 200,
      vitaminB12: 18.0,
      selenium: 45.0
    },
    tags: ["ancestral", "nutrient powerhouse", "strong flavor"]
  },
  {
    name: "Beef ribs, roasted",
    category: "Beef Products",
    servingSize: "100g",
    calories: 291,
    macros: {
      protein: 24.0,
      fat: 21.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.6,
      zinc: 6.0,
      vitaminB12: 2.1,
      phosphorus: 225,
      selenium: 29.0
    },
    tags: ["flavorful", "BBQ classic", "hearty"]
  },
  {
    name: "Liverwurst (organ blend), quality source",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 326,
    macros: {
      protein: 14.0,
      fat: 28.0,
      carbs: 3.5
    },
    nutrients: {
      vitaminA: 8000,
      vitaminB12: 18.0,
      iron: 6.0,
      zinc: 5.0,
      selenium: 40.0
    },
    tags: ["ancestral blend", "ready to eat", "organ synergy"]
  },
  {
    name: "Turkey neck, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 189,
    macros: {
      protein: 24.5,
      fat: 10.2,
      carbs: 0.0
    },
    nutrients: {
      collagen: "moderate",
      phosphorus: 210,
      iron: 2.4,
      zinc: 2.8,
      selenium: 31.0
    },
    tags: ["broth-worthy", "tough cut", "mineral boost"]
  },
  {
    name: "Fish head, cooked (e.g. salmon)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 195,
    macros: {
      protein: 20.0,
      fat: 12.0,
      carbs: 0.0
    },
    nutrients: {
      omega3_EPA_DHA: 2.8,
      collagen: "high",
      vitaminA: 250,
      selenium: 34.0,
      iodine: "moderate"
    },
    tags: ["head-to-tail", "omega boost", "traditional wisdom"]
  },
  {
    name: "Veal liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 192,
    macros: {
      protein: 29.0,
      fat: 6.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminA: 6582,
      vitaminB12: 72.7,
      iron: 7.5,
      folate: 260,
      zinc: 5.2
    },
    tags: ["mild organ", "high B12", "classic"]
  },
  {
    name: "Beef tallow",
    category: "Beef Products",
    servingSize: "100g",
    calories: 902,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminE: 1.9,
      CLA: "trace",
      choline: "trace",
      saturatedFat: 50.0,
      monounsaturatedFat: 42.0
    },
    tags: ["ancestral cooking fat", "high heat stable", "keto"]
  },
  {
    name: "Lamb fat, rendered",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 900,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminE: 2.1,
      saturatedFat: 53.0,
      monounsaturatedFat: 40.0,
      vitaminK2: "trace",
      CLA: "trace"
    },
    tags: ["tallow alternative", "cultural cuisine", "energy-dense"]
  },
  {
    name: "Duck fat",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 882,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminE: 5.0,
      monounsaturatedFat: 50.0,
      saturatedFat: 35.0,
      CLA: "trace",
      selenium: 0.4
    },
    tags: ["culinary fat", "rich flavor", "stable cooking oil"]
  },
  {
    name: "Goose liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 305,
    macros: {
      protein: 15.0,
      fat: 27.0,
      carbs: 1.1
    },
    nutrients: {
      vitaminA: 9000,
      iron: 9.2,
      vitaminB12: 23.5,
      selenium: 41.0,
      folate: 300
    },
    tags: ["foie gras base", "luxury organ", "fat-rich"]
  },
  {
    name: "Fish bones, dried (e.g. anchovy powder)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 230,
    macros: {
      protein: 35.0,
      fat: 7.0,
      carbs: 0.0
    },
    nutrients: {
      calcium: 1200,
      phosphorus: 900,
      magnesium: 85,
      iodine: "moderate",
      vitaminD: 150
    },
    tags: ["bone support", "mineral-dense", "ancestral additive"]
  },
  {
    name: "Whole sardines (with bones & skin)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 208,
    macros: {
      protein: 25.0,
      fat: 11.0,
      carbs: 0.0
    },
    nutrients: {
      calcium: 382,
      vitaminD: 270,
      omega3_EPA_DHA: 2.2,
      selenium: 52.7,
      vitaminB12: 8.9
    },
    tags: ["head-to-tail", "low toxin", "nutrient stack"]
  },
  {
    name: "Milk kefir, goat milk base",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 64,
    macros: {
      protein: 3.9,
      fat: 3.5,
      carbs: 4.2
    },
    nutrients: {
      probiotics: "active",
      calcium: 130,
      phosphorus: 105,
      vitaminB12: 0.5,
      riboflavin: 0.3
    },
    tags: ["gut flora", "fermented dairy", "ancestral probiotic"]
  },
  {
    name: "Smoked salmon, wild",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 117,
    macros: {
      protein: 18.3,
      fat: 4.3,
      carbs: 0.0
    },
    nutrients: {
      omega3_EPA_DHA: 2.5,
      vitaminD: 490,
      selenium: 35.0,
      sodium: 672,
      potassium: 210
    },
    tags: ["preserved fish", "rich flavor", "brain fuel"]
  },
  {
    name: "Beef cheek, braised",
    category: "Beef Products",
    servingSize: "100g",
    calories: 252,
    macros: {
      protein: 24.0,
      fat: 16.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      iron: 2.5,
      selenium: 28.0,
      zinc: 3.8,
      vitaminB12: 1.9
    },
    tags: ["slow cook cut", "gelatinous texture", "deep flavor"]
  },
  {
    name: "Caviar (sturgeon roe)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 264,
    macros: {
      protein: 25.0,
      fat: 17.9,
      carbs: 4.0
    },
    nutrients: {
      omega3_EPA_DHA: 3.0,
      vitaminB12: 20.0,
      selenium: 65.0,
      vitaminD: 300,
      choline: 350
    },
    tags: ["luxury food", "fertility tonic", "superbrain boost"]
  },
  {
    name: "Milk, water buffalo",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 97,
    macros: {
      protein: 4.5,
      fat: 6.9,
      carbs: 5.1
    },
    nutrients: {
      calcium: 195,
      vitaminA: 120,
      phosphorus: 150,
      selenium: 4.0,
      vitaminB2: 0.3
    },
    tags: ["rich milk", "creamy", "global dairy"]
  },
  {
    name: "Moose meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 148,
    macros: {
      protein: 27.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.4,
      zinc: 4.2,
      selenium: 29.0,
      vitaminB12: 2.8,
      phosphorus: 215
    },
    tags: ["wild game", "lean red meat", "forest energy"]
  },
  {
    name: "Crocodile meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 104,
    macros: {
      protein: 22.0,
      fat: 1.9,
      carbs: 0.0
    },
    nutrients: {
      potassium: 360,
      iron: 1.5,
      selenium: 22.0,
      vitaminB6: 0.6,
      phosphorus: 200
    },
    tags: ["reptilian protein", "exotic", "low fat"]
  },
  {
    name: "Softshell turtle, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 137,
    macros: {
      protein: 20.0,
      fat: 5.5,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.0,
      calcium: 85,
      collagen: "high",
      selenium: 28.0,
      vitaminA: 300
    },
    tags: ["Asian cuisine", "collagen-rich", "ancestral"]
  },
  {
    name: "Snail eggs (escargot caviar)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 94,
    macros: {
      protein: 16.0,
      fat: 3.5,
      carbs: 1.0
    },
    nutrients: {
      zinc: 3.5,
      selenium: 14.0,
      iron: 2.3,
      vitaminE: 4.2,
      B12: 0.6
    },
    tags: ["rare delicacy", "high trace minerals", "luxury"]
  },
  {
    name: "Reindeer meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 151,
    macros: {
      protein: 27.1,
      fat: 4.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.7,
      vitaminB12: 3.1,
      zinc: 4.8,
      selenium: 31.0,
      phosphorus: 225
    },
    tags: ["arctic source", "wild and lean", "holiday lore"]
  },
  {
    name: "Alligator meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 143,
    macros: {
      protein: 29.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.2,
      potassium: 260,
      vitaminB12: 1.6,
      phosphorus: 220,
      selenium: 26.0
    },
    tags: ["swamp muscle", "lean protein", "southern cuisine"]
  },
  {
    name: "Pigeon meat, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 142,
    macros: {
      protein: 24.0,
      fat: 5.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.8,
      selenium: 22.0,
      vitaminB6: 0.5,
      phosphorus: 210,
      vitaminB12: 2.4
    },
    tags: ["game bird", "delicate flavor", "traditional fare"]
  },
  {
    name: "Partridge, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 152,
    macros: {
      protein: 27.0,
      fat: 5.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 2.0,
      iron: 2.5,
      phosphorus: 220,
      selenium: 23.0,
      potassium: 285
    },
    tags: ["forest bird", "lean and clean", "ancient feast"]
  },
  {
    name: "Duck blood (congealed)",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 78,
    macros: {
      protein: 16.0,
      fat: 1.0,
      carbs: 0.5
    },
    nutrients: {
      iron: 30.0,
      vitaminB12: 9.0,
      selenium: 18.0,
      zinc: 2.7,
      copper: 0.9
    },
    tags: ["ancestral food", "iron-rich", "eastern cuisine"]
  },
  {
    name: "Chicken blood (congealed)",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 82,
    macros: {
      protein: 16.9,
      fat: 1.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 28.0,
      vitaminB12: 8.0,
      selenium: 17.0,
      zinc: 2.0,
      copper: 0.6
    },
    tags: ["ancestral remedy", "iron fuel", "cultural food"]
  },
  {
    name: "Fish eyes (e.g. salmon)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 144,
    macros: {
      protein: 15.0,
      fat: 9.0,
      carbs: 0.0
    },
    nutrients: {
      omega3_EPA_DHA: 2.0,
      vitaminA: 950,
      collagen: "high",
      selenium: 22.0,
      vitaminD: 420
    },
    tags: ["head-to-tail", "neural support", "ancestral omega"]
  },
  {
    name: "Beef testicles (Rocky Mountain oysters), cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 135,
    macros: {
      protein: 26.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      zinc: 5.0,
      selenium: 28.0,
      vitaminB12: 2.5,
      testosteronePrecursors: "present",
      cholesterol: 375
    },
    tags: ["fertility tonic", "ancestral masculinity", "rare cut"]
  },
  {
    name: "Chicken cartilage, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 173,
    macros: {
      protein: 23.0,
      fat: 8.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      glycine: "high",
      calcium: 100,
      phosphorus: 145,
      selenium: 15.0
    },
    tags: ["joint support", "chewy texture", "collagen booster"]
  },
  {
    name: "Beef trachea, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 185,
    macros: {
      protein: 28.0,
      fat: 7.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "extremely high",
      glucosamine: "present",
      chondroitin: "present",
      phosphorus: 130,
      iron: 1.6
    },
    tags: ["cartilage-rich", "supplemental food", "ancestral snack"]
  },
  {
    name: "Lamb brain, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 122,
    macros: {
      protein: 10.0,
      fat: 8.6,
      carbs: 1.1
    },
    nutrients: {
      cholesterol: 3100,
      omega3_DHA: 0.8,
      vitaminB12: 12.0,
      selenium: 30.0,
      choline: 491
    },
    tags: ["neural density", "traditional food", "mind-to-mind"]
  },
  {
    name: "Beef spinal cord, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 223,
    macros: {
      protein: 14.0,
      fat: 19.0,
      carbs: 0.0
    },
    nutrients: {
      cholesterol: 2100,
      omega3_DHA: 0.6,
      vitaminB12: 9.5,
      selenium: 26.0,
      iron: 2.0
    },
    tags: ["brain-adjacent", "myelin-rich", "ancestral energy"]
  },
  {
    name: "Beef lungs, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 92,
    macros: {
      protein: 16.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 9.0,
      iron: 6.8,
      selenium: 21.0,
      vitaminA: 1890,
      zinc: 2.4
    },
    tags: ["light organ", "oxygen support", "high iron"]
  },
  {
    name: "Lamb spleen, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 104,
    macros: {
      protein: 17.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 25.0,
      vitaminB12: 12.0,
      selenium: 19.0,
      copper: 1.0,
      zinc: 2.0
    },
    tags: ["blood builder", "ancestral remedy", "mineral dense"]
  },
  {
    name: "Chicken necks, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 180,
    macros: {
      protein: 22.0,
      fat: 10.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      iron: 1.8,
      selenium: 21.0,
      phosphorus: 160,
      zinc: 2.5
    },
    tags: ["broth base", "neck-to-tail", "soft bone support"]
  },
  {
    name: "Veal brain, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 122,
    macros: {
      protein: 10.3,
      fat: 8.6,
      carbs: 0.9
    },
    nutrients: {
      cholesterol: 3100,
      omega3_DHA: 0.8,
      vitaminB12: 12.0,
      selenium: 30.0,
      choline: 510
    },
    tags: ["neural fat", "primal energy", "high DHA"]
  },
  {
    name: "Cow udder, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 144,
    macros: {
      protein: 15.0,
      fat: 9.0,
      carbs: 0.5
    },
    nutrients: {
      vitaminB12: 1.0,
      selenium: 10.0,
      zinc: 2.2,
      calcium: 38,
      iron: 2.1
    },
    tags: ["rare cut", "traditional cuisine", "dairy origin"]
  },
  {
    name: "Boar meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 160,
    macros: {
      protein: 26.0,
      fat: 6.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.2,
      vitaminB12: 2.3,
      zinc: 3.0,
      selenium: 27.0,
      niacin: 6.8
    },
    tags: ["wild pork", "gamey taste", "forest-raised"]
  },
  {
    name: "Venison heart, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 165,
    macros: {
      protein: 28.0,
      fat: 5.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.6,
      vitaminB12: 7.0,
      selenium: 24.0,
      CoQ10: "high",
      zinc: 2.5
    },
    tags: ["wild organ", "cardiac support", "hunter’s prize"]
  },
  {
    name: "Rabbit kidney, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 108,
    macros: {
      protein: 19.0,
      fat: 3.5,
      carbs: 0.0
    },
    nutrients: {
      selenium: 18.0,
      vitaminB12: 4.5,
      iron: 2.8,
      phosphorus: 180,
      zinc: 2.1
    },
    tags: ["small organ", "mild taste", "mineral support"]
  },
  {
    name: "Goose fat",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 900,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminE: 5.3,
      monounsaturatedFat: 58.0,
      saturatedFat: 28.0,
      CLA: "trace",
      vitaminK2: "present"
    },
    tags: ["fat fuel", "high smoke point", "elegant cooking"]
  },
  {
    name: "Deer liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 179,
    macros: {
      protein: 28.0,
      fat: 6.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminA: 6200,
      vitaminB12: 72.0,
      iron: 9.0,
      zinc: 4.5,
      selenium: 44.0
    },
    tags: ["wild liver", "vitamin A rich", "sacred cut"]
  },
  {
    name: "Turkey gizzards, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 154,
    macros: {
      protein: 29.0,
      fat: 4.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.5,
      selenium: 24.0,
      zinc: 2.7,
      phosphorus: 185,
      vitaminB12: 2.2
    },
    tags: ["chewy and dense", "low fat", "mineral boost"]
  },
  {
    name: "Rabbit heart, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 172,
    macros: {
      protein: 27.5,
      fat: 6.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 5.2,
      iron: 3.4,
      zinc: 2.1,
      CoQ10: "present",
      selenium: 22.0
    },
    tags: ["tiny but dense", "ancestral protein", "lean heart"]
  },
  {
    name: "Chicken feet, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 215,
    macros: {
      protein: 19.4,
      fat: 15.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "extremely high",
      calcium: 88,
      magnesium: 13,
      phosphorus: 120,
      zinc: 1.5
    },
    tags: ["bone broth base", "joint support", "ancestral gelatin"]
  },
  {
    name: "Camel milk, raw",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 70,
    macros: {
      protein: 3.0,
      fat: 3.6,
      carbs: 4.5
    },
    nutrients: {
      calcium: 120,
      vitaminC: 3.0,
      B1: 0.05,
      phosphorus: 95,
      iron: 0.2
    },
    tags: ["desert dairy", "hypoallergenic", "immune-friendly"]
  },
  {
    name: "Turkey skin, roasted",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 454,
    macros: {
      protein: 18.0,
      fat: 42.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      selenium: 26.0,
      zinc: 2.3,
      phosphorus: 150,
      vitaminB6: 0.4
    },
    tags: ["crispy", "fat-rich", "holiday fuel"]
  },
  {
    name: "Eggshell powder (chicken)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 0,
    macros: {
      protein: 0.0,
      fat: 0.0,
      carbs: 0.0
    },
    nutrients: {
      calcium: 38000,
      magnesium: 375,
      phosphorus: 100,
      strontium: 15,
      fluoride: 1.5
    },
    tags: ["bone supplement", "zero cal", "recycled nutrition"]
  },
  {
    name: "Beef bone marrow, roasted",
    category: "Beef Products",
    servingSize: "100g",
    calories: 770,
    macros: {
      protein: 7.0,
      fat: 84.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 105,
      vitaminK2: "trace",
      iron: 1.8,
      collagenPrecursors: "high",
      CLA: "present"
    },
    tags: ["ancestral fat", "deep flavor", "brain builder"]
  },
  {
    name: "Quail eggshell (powdered)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 0,
    macros: {
      protein: 0.0,
      fat: 0.0,
      carbs: 0.0
    },
    nutrients: {
      calcium: 39000,
      magnesium: 390,
      strontium: 14,
      manganese: 1.2,
      phosphorus: 98
    },
    tags: ["tiny source", "calcium-dense", "whole egg use"]
  },
  {
    name: "Cricket, roasted",
    category: "Insects",
    servingSize: "100g",
    calories: 121,
    macros: {
      protein: 13.0,
      fat: 5.5,
      carbs: 5.1
    },
    nutrients: {
      vitaminB12: 5.4,
      iron: 5.0,
      zinc: 10.0,
      magnesium: 65,
      fiber: 6.0
    },
    tags: ["sustainable", "insect protein", "mineral rich"]
  },
  {
    name: "Mealworms, roasted",
    category: "Insects",
    servingSize: "100g",
    calories: 206,
    macros: {
      protein: 25.0,
      fat: 13.0,
      carbs: 1.0
    },
    nutrients: {
      iron: 5.5,
      selenium: 18.0,
      vitaminB2: 0.7,
      potassium: 268,
      zinc: 4.5
    },
    tags: ["future food", "complete protein", "eco fuel"]
  },
  {
    name: "Silkworm pupae, cooked",
    category: "Insects",
    servingSize: "100g",
    calories: 150,
    macros: {
      protein: 15.0,
      fat: 7.0,
      carbs: 3.0
    },
    nutrients: {
      iron: 3.3,
      calcium: 120,
      vitaminB12: 2.4,
      zinc: 2.6,
      phosphorus: 200
    },
    tags: ["Asian staple", "delicate taste", "nutrient-dense"]
  },
  {
    name: "Beef tongue, cooked",
    category: "Beef Products",
    servingSize: "100g",
    calories: 284,
    macros: {
      protein: 16.0,
      fat: 23.9,
      carbs: 0.0
    },
    nutrients: {
      zinc: 4.1,
      iron: 2.9,
      vitaminB12: 3.6,
      choline: 120,
      selenium: 25.0
    },
    tags: ["tender cut", "rich in fat", "taco favorite"]
  },
  {
    name: "Ox tail, stewed",
    category: "Beef Products",
    servingSize: "100g",
    calories: 262,
    macros: {
      protein: 17.0,
      fat: 20.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      phosphorus: 185,
      zinc: 3.2,
      selenium: 22.0,
      B6: 0.4
    },
    tags: ["slow cook", "gelatin-rich", "ancestral dish"]
  },
  {
    name: "Blood sausage (traditional)",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 379,
    macros: {
      protein: 14.0,
      fat: 35.0,
      carbs: 2.5
    },
    nutrients: {
      iron: 35.0,
      vitaminB12: 10.0,
      selenium: 25.0,
      zinc: 3.8,
      cholesterol: 115
    },
    tags: ["traditional food", "iron powerhouse", "ancestral blend"]
  },
  {
    name: "Fish roe (general, cooked)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 143,
    macros: {
      protein: 24.6,
      fat: 6.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminB12: 11.9,
      vitaminD: 250,
      omega3_EPA_DHA: 2.7,
      selenium: 48.0,
      phosphorus: 330
    },
    tags: ["fertility support", "brain fats", "ancestral eggs"]
  },
  {
    name: "Mackerel, Atlantic, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 205,
    macros: {
      protein: 19.0,
      fat: 13.9,
      carbs: 0.0
    },
    nutrients: {
      vitaminD: 643,
      omega3_EPA_DHA: 2.6,
      selenium: 46.8,
      vitaminB12: 12.0,
      niacin: 8.6
    },
    tags: ["fatty fish", "brain health", "sustainable seafood"]
  },
  {
    name: "Herring, pickled",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 262,
    macros: {
      protein: 14.2,
      fat: 18.0,
      carbs: 9.0
    },
    nutrients: {
      omega3_EPA_DHA: 2.0,
      vitaminD: 680,
      selenium: 38.0,
      vitaminB12: 13.6,
      iron: 1.7
    },
    tags: ["fermented", "brain booster", "northern tradition"]
  },
  {
    name: "Clams, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 148,
    macros: {
      protein: 25.5,
      fat: 2.0,
      carbs: 5.1
    },
    nutrients: {
      iron: 28.0,
      vitaminB12: 98.9,
      selenium: 44.8,
      zinc: 2.3,
      vitaminC: 22.1
    },
    tags: ["iron queen", "blood builder", "shellfish superfood"]
  },
  {
    name: "Shrimp, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 99,
    macros: {
      protein: 24.0,
      fat: 0.3,
      carbs: 0.2
    },
    nutrients: {
      selenium: 39.0,
      vitaminB12: 1.1,
      phosphorus: 190,
      iodine: "moderate",
      choline: 114
    },
    tags: ["lean seafood", "quick cook", "cholesterol-rich"]
  },
  {
    name: "Crawfish, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 87,
    macros: {
      protein: 18.0,
      fat: 1.3,
      carbs: 0.0
    },
    nutrients: {
      selenium: 33.0,
      vitaminB12: 1.0,
      zinc: 1.7,
      phosphorus: 200,
      iron: 1.2
    },
    tags: ["southern favorite", "mini lobster", "festive shellfish"]
  },
  {
    name: "Snails (escargot), cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 90,
    macros: {
      protein: 16.0,
      fat: 1.4,
      carbs: 2.0
    },
    nutrients: {
      iron: 3.5,
      magnesium: 250,
      selenium: 27.0,
      vitaminE: 5.0,
      potassium: 382
    },
    tags: ["slow food", "earthy taste", "high magnesium"]
  },
  {
    name: "Abalone, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 105,
    macros: {
      protein: 17.1,
      fat: 0.8,
      carbs: 6.0
    },
    nutrients: {
      vitaminB12: 1.2,
      selenium: 26.0,
      iron: 2.0,
      zinc: 1.8,
      iodine: "moderate"
    },
    tags: ["sea delicacy", "mineral dense", "Asian luxury"]
  },
  {
    name: "Swordfish, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 172,
    macros: {
      protein: 27.0,
      fat: 6.0,
      carbs: 0.0
    },
    nutrients: {
      selenium: 49.0,
      vitaminD: 667,
      vitaminB12: 2.0,
      phosphorus: 215,
      omega3_EPA_DHA: 1.2
    },
    tags: ["steak of the sea", "meaty texture", "vitamin D powerhouse"]
  },
  {
    name: "Tilapia, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 128,
    macros: {
      protein: 26.2,
      fat: 2.7,
      carbs: 0.0
    },
    nutrients: {
      selenium: 54.4,
      vitaminB12: 1.9,
      phosphorus: 204,
      potassium: 380,
      niacin: 3.9
    },
    tags: ["light fish", "easy to cook", "mild flavor"]
  },
  {
    name: "Catfish, farmed, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 135,
    macros: {
      protein: 18.0,
      fat: 6.0,
      carbs: 0.0
    },
    nutrients: {
      selenium: 14.3,
      vitaminB12: 2.2,
      phosphorus: 215,
      vitaminD: 150,
      potassium: 333
    },
    tags: ["southern classic", "mild fish", "budget friendly"]
  },
  {
    name: "Flatfish (flounder), cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 117,
    macros: {
      protein: 24.0,
      fat: 1.6,
      carbs: 0.0
    },
    nutrients: {
      selenium: 36.5,
      vitaminB12: 3.0,
      phosphorus: 210,
      magnesium: 33,
      niacin: 5.2
    },
    tags: ["white fish", "lean", "easy digest"]
  },
  {
    name: "Grouper, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 118,
    macros: {
      protein: 23.5,
      fat: 2.3,
      carbs: 0.0
    },
    nutrients: {
      selenium: 36.0,
      vitaminB12: 1.7,
      potassium: 370,
      phosphorus: 180,
      niacin: 3.5
    },
    tags: ["firm fish", "restaurant staple", "white fillet"]
  },
  {
    name: "Halibut, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 140,
    macros: {
      protein: 27.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      selenium: 47.0,
      vitaminB12: 1.5,
      magnesium: 30,
      phosphorus: 240,
      niacin: 5.0
    },
    tags: ["flaky fish", "mild taste", "omega support"]
  },
  {
    name: "Sea bass, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 124,
    macros: {
      protein: 23.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      selenium: 36.0,
      vitaminB12: 2.3,
      phosphorus: 220,
      potassium: 380,
      omega3_EPA_DHA: 0.8
    },
    tags: ["delicate fish", "restaurant choice", "ocean elegance"]
  },
  {
    name: "Perch, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 96,
    macros: {
      protein: 20.0,
      fat: 1.5,
      carbs: 0.0
    },
    nutrients: {
      selenium: 28.0,
      vitaminB12: 1.6,
      phosphorus: 210,
      potassium: 310,
      vitaminD: 150
    },
    tags: ["mild freshwater", "pan-fry favorite", "clean protein"]
  },
  {
    name: "Trout, rainbow, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 148,
    macros: {
      protein: 20.5,
      fat: 6.6,
      carbs: 0.0
    },
    nutrients: {
      vitaminD: 635,
      omega3_EPA_DHA: 1.1,
      selenium: 30.0,
      vitaminB12: 4.5,
      phosphorus: 225
    },
    tags: ["stream-fed", "omega source", "grill ready"]
  },
  {
    name: "Anchovies, canned in oil",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 210,
    macros: {
      protein: 29.0,
      fat: 10.0,
      carbs: 0.0
    },
    nutrients: {
      calcium: 147,
      vitaminB12: 1.4,
      omega3_EPA_DHA: 2.2,
      selenium: 36.0,
      sodium: 2000
    },
    tags: ["salty snack", "tiny fish", "head-to-tail"]
  },
  {
    name: "Pollock, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 92,
    macros: {
      protein: 19.4,
      fat: 0.8,
      carbs: 0.0
    },
    nutrients: {
      selenium: 43.0,
      vitaminB12: 1.1,
      phosphorus: 210,
      iodine: "high",
      potassium: 384
    },
    tags: ["white fish", "mild and clean", "iodine support"]
  },
  {
    name: "Cod, Atlantic, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 105,
    macros: {
      protein: 23.0,
      fat: 0.9,
      carbs: 0.0
    },
    nutrients: {
      selenium: 43.0,
      vitaminB12: 0.9,
      iodine: "very high",
      phosphorus: 210,
      niacin: 2.8
    },
    tags: ["light protein", "lean fish", "thyroid support"]
  },
  {
    name: "Cod liver, canned in own oil",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 613,
    macros: {
      protein: 8.0,
      fat: 65.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 30000,
      vitaminD: 10000,
      omega3_EPA_DHA: 5.0,
      selenium: 43.0,
      vitaminB12: 9.5
    },
    tags: ["sacred organ", "fat-soluble vault", "nourish the deep"]
  },
  {
    name: "Fish gelatin (powdered)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 335,
    macros: {
      protein: 85.0,
      fat: 0.0,
      carbs: 0.0
    },
    nutrients: {
      glycine: "very high",
      proline: "high",
      calcium: 15,
      magnesium: 10,
      phosphorus: 5
    },
    tags: ["marine collagen", "gut lining support", "recovery"]
  },
  {
    name: "Smelt, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 169,
    macros: {
      protein: 18.0,
      fat: 10.5,
      carbs: 0.0
    },
    nutrients: {
      calcium: 306,
      vitaminD: 430,
      vitaminB12: 4.3,
      selenium: 39.0,
      phosphorus: 210
    },
    tags: ["small fish", "head-to-tail", "bone support"]
  },
  {
    name: "Whitefish, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 134,
    macros: {
      protein: 20.0,
      fat: 5.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 1.8,
      selenium: 38.0,
      potassium: 350,
      phosphorus: 215,
      magnesium: 30
    },
    tags: ["mild flavor", "freshwater fish", "lean cut"]
  },
  {
    name: "Haddock, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 90,
    macros: {
      protein: 20.0,
      fat: 0.6,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 1.3,
      selenium: 44.8,
      phosphorus: 222,
      iodine: "high",
      potassium: 333
    },
    tags: ["light white fish", "flaky texture", "iodine support"]
  },
  {
    name: "Fish skin (salmon), cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 250,
    macros: {
      protein: 17.0,
      fat: 20.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      omega3_EPA_DHA: 2.0,
      selenium: 28.0,
      vitaminD: 600,
      glycine: "present"
    },
    tags: ["skin-on cooking", "crispy fat", "beauty support"]
  },
  {
    name: "Fish bones (anchovy), cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 220,
    macros: {
      protein: 25.0,
      fat: 12.0,
      carbs: 0.0
    },
    nutrients: {
      calcium: 1200,
      phosphorus: 800,
      magnesium: 85,
      collagen: "present",
      iodine: "trace"
    },
    tags: ["bone builder", "microfish power", "whole source"]
  },
  {
    name: "Seaweed-fed fish (wild type, generic)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 135,
    macros: {
      protein: 21.0,
      fat: 6.0,
      carbs: 0.0
    },
    nutrients: {
      iodine: "high",
      omega3_EPA_DHA: 2.5,
      selenium: 40.0,
      vitaminD: 500,
      vitaminB12: 3.0
    },
    tags: ["natural omega balance", "thyroid support", "eco source"]
  },
  {
    name: "Lard (pork fat), rendered",
    category: "Pork Products",
    servingSize: "100g",
    calories: 902,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminD: 13,
      choline: 9.0,
      monounsaturatedFat: 45.0,
      saturatedFat: 39.0,
      CLA: "trace"
    },
    tags: ["ancestral fat", "keto fuel", "high-heat cooking"]
  },
  {
    name: "Duck egg",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 185,
    macros: {
      protein: 13.0,
      fat: 14.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminB12: 5.4,
      selenium: 28.0,
      choline: 263,
      vitaminA: 472,
      vitaminD: 37
    },
    tags: ["rich yolk", "high fat egg", "nutrient dense"]
  },
  {
    name: "Quail egg",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 158,
    macros: {
      protein: 13.1,
      fat: 11.1,
      carbs: 0.4
    },
    nutrients: {
      vitaminB12: 1.6,
      selenium: 32.0,
      iron: 3.6,
      choline: 320,
      vitaminA: 543
    },
    tags: ["tiny egg", "zinc-rich", "iron support"]
  },
  {
    name: "Goose egg",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 185,
    macros: {
      protein: 13.9,
      fat: 13.3,
      carbs: 1.3
    },
    nutrients: {
      vitaminB12: 6.0,
      choline: 330,
      selenium: 35.0,
      vitaminA: 580,
      vitaminD: 41
    },
    tags: ["large egg", "rare find", "ancestral egg"]
  },
  {
    name: "Emu egg",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 170,
    macros: {
      protein: 12.6,
      fat: 13.0,
      carbs: 1.1
    },
    nutrients: {
      selenium: 30.0,
      vitaminA: 430,
      choline: 290,
      vitaminD: 39,
      phosphorus: 220
    },
    tags: ["exotic egg", "super yolk", "energy dense"]
  },
  {
    name: "Rabbit fat, rendered",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 900,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminE: 3.2,
      monounsaturatedFat: 43.0,
      saturatedFat: 37.0,
      CLA: "trace",
      selenium: 1.0
    },
    tags: ["rare fat", "high-heat stable", "neutral flavor"]
  },
  {
    name: "Beef suet (raw kidney fat), rendered",
    category: "Beef Products",
    servingSize: "100g",
    calories: 902,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      saturatedFat: 50.0,
      monounsaturatedFat: 42.0,
      vitaminK2: "present",
      vitaminD: 16,
      CLA: "trace"
    },
    tags: ["primal fat", "deep energy", "nose-to-tail"]
  },
  {
    name: "Sheep milk",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 108,
    macros: {
      protein: 5.4,
      fat: 6.9,
      carbs: 5.0
    },
    nutrients: {
      calcium: 193,
      vitaminB12: 0.8,
      phosphorus: 158,
      vitaminA: 180,
      zinc: 1.0
    },
    tags: ["richest milk", "creamy and dense", "calcium source"]
  },
  {
    name: "Sheep cheese (manchego, aged)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 455,
    macros: {
      protein: 25.0,
      fat: 38.0,
      carbs: 0.0
    },
    nutrients: {
      calcium: 740,
      vitaminA: 380,
      selenium: 28.0,
      phosphorus: 530,
      vitaminB2: 0.4
    },
    tags: ["ancestral dairy", "hard cheese", "sheep’s delight"]
  },
  {
    name: "Goat cheese (chèvre, fresh)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 264,
    macros: {
      protein: 18.0,
      fat: 21.0,
      carbs: 1.0
    },
    nutrients: {
      calcium: 140,
      phosphorus: 230,
      vitaminA: 330,
      selenium: 18.0,
      zinc: 0.8
    },
    tags: ["tangy", "easy to digest", "cultured food"]
  },
  {
    name: "Camel hump fat (rendered)",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 900,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      saturatedFat: 38.0,
      monounsaturatedFat: 55.0,
      CLA: "trace",
      vitaminE: 3.5,
      selenium: 2.2
    },
    tags: ["desert fuel", "ancestral energy", "sacred fat"]
  },
  {
    name: "Whale blubber (muktuk, raw)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 420,
    macros: {
      protein: 12.0,
      fat: 40.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminC: 20.0,
      omega3_EPA_DHA: 3.2,
      selenium: 36.0,
      vitaminA: 1450,
      vitaminD: 520
    },
    tags: ["Arctic ancestral food", "survival fuel", "marine superfat"]
  },
  {
    name: "Seal meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 130,
    macros: {
      protein: 27.0,
      fat: 2.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 5.1,
      vitaminB12: 8.0,
      selenium: 40.0,
      omega3_EPA_DHA: 2.8,
      phosphorus: 210
    },
    tags: ["cold-climate protein", "high iron", "wild source"]
  },
  {
    name: "Bear meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 155,
    macros: {
      protein: 20.0,
      fat: 7.5,
      carbs: 0.0
    },
    nutrients: {
      iron: 4.2,
      selenium: 22.0,
      vitaminB12: 3.5,
      zinc: 2.5,
      phosphorus: 195
    },
    tags: ["wild game", "power meat", "earth-based strength"]
  },
  {
    name: "Boar fat, rendered",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 902,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      saturatedFat: 42.0,
      monounsaturatedFat: 50.0,
      vitaminD: 12,
      CLA: "trace",
      selenium: 1.4
    },
    tags: ["wild fat", "stable cooking oil", "ancestral flavor"]
  },
  {
    name: "Goose skin, roasted",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 452,
    macros: {
      protein: 19.0,
      fat: 41.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      selenium: 23.0,
      vitaminA: 210,
      zinc: 1.5,
      vitaminB6: 0.4
    },
    tags: ["crispy fat", "skin-on protein", "holiday energy"]
  },
  {
    name: "Fish liver oil (generic)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 902,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 90000,
      vitaminD: 34000,
      omega3_EPA_DHA: 9.0,
      vitaminE: 5.0,
      selenium: 1.0
    },
    tags: ["sacred supplement", "hormone support", "fat-soluble vault"]
  },
  {
    name: "Fish head, cooked (salmon)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 228,
    macros: {
      protein: 18.0,
      fat: 17.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      omega3_EPA_DHA: 3.0,
      selenium: 36.0,
      vitaminD: 640,
      vitaminB12: 5.0
    },
    tags: ["head-to-tail", "gelatin rich", "brain-nourishing"]
  },
  {
    name: "Crab roe",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 138,
    macros: {
      protein: 20.0,
      fat: 6.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminA: 980,
      vitaminB12: 10.0,
      selenium: 34.0,
      omega3_EPA_DHA: 2.5,
      phosphorus: 210
    },
    tags: ["reproductive energy", "brain food", "marine fertility"]
  },
  {
    name: "Clam juice (broth)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 20,
    macros: {
      protein: 2.5,
      fat: 0.0,
      carbs: 1.5
    },
    nutrients: {
      zinc: 1.4,
      selenium: 12.0,
      iodine: "moderate",
      potassium: 150,
      sodium: 250
    },
    tags: ["light broth", "mineral infusion", "savoury base"]
  },
  {
    name: "Egg yolk, raw (chicken)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 322,
    macros: {
      protein: 15.9,
      fat: 26.5,
      carbs: 3.6
    },
    nutrients: {
      choline: 682,
      vitaminA: 381,
      vitaminD: 87,
      vitaminE: 2.7,
      omega3_DHA: 0.6
    },
    tags: ["fat-soluble source", "brain builder", "perfect whole"]
  },
  {
    name: "Egg white, raw (chicken)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 52,
    macros: {
      protein: 10.9,
      fat: 0.2,
      carbs: 0.7
    },
    nutrients: {
      selenium: 20.0,
      riboflavin: 0.4,
      potassium: 163,
      sodium: 166,
      magnesium: 11
    },
    tags: ["pure protein", "fat-free", "muscle repair"]
  },
  {
    name: "Whey protein (concentrate, unsweetened)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 353,
    macros: {
      protein: 80.0,
      fat: 2.0,
      carbs: 6.0
    },
    nutrients: {
      calcium: 500,
      magnesium: 60,
      BCAA: "high",
      leucine: 8.6,
      cysteine: "present"
    },
    tags: ["bioavailable", "muscle synthesis", "performance"]
  },
  {
    name: "Casein protein (micellar, unsweetened)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 370,
    macros: {
      protein: 78.0,
      fat: 3.5,
      carbs: 8.0
    },
    nutrients: {
      calcium: 600,
      tryptophan: 1.1,
      glutamine: "present",
      phosphorus: 500,
      zinc: 2.0
    },
    tags: ["slow digesting", "night fuel", "muscle protection"]
  },
  {
    name: "Buttermilk (cultured)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 40,
    macros: {
      protein: 3.3,
      fat: 1.0,
      carbs: 4.8
    },
    nutrients: {
      calcium: 116,
      potassium: 151,
      vitaminB12: 0.4,
      phosphorus: 105,
      probiotics: "active"
    },
    tags: ["gut health", "sour dairy", "hydrating protein"]
  },
  {
    name: "Goat milk yogurt (plain)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 72,
    macros: {
      protein: 4.3,
      fat: 4.1,
      carbs: 4.7
    },
    nutrients: {
      calcium: 140,
      phosphorus: 110,
      probiotics: "active",
      selenium: 8.0,
      zinc: 0.5
    },
    tags: ["gentle dairy", "probiotic-rich", "ancestral yogurt"]
  },
  {
    name: "Camel milk yogurt (plain)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 63,
    macros: {
      protein: 3.0,
      fat: 3.4,
      carbs: 5.0
    },
    nutrients: {
      calcium: 130,
      vitaminC: 2.5,
      iron: 0.2,
      phosphorus: 100,
      probiotics: "active"
    },
    tags: ["hypoallergenic", "immune support", "desert dairy"]
  },
  {
    name: "Cow milk yogurt (plain, whole milk)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 61,
    macros: {
      protein: 3.5,
      fat: 3.3,
      carbs: 4.7
    },
    nutrients: {
      calcium: 121,
      potassium: 155,
      probiotics: "active",
      vitaminB12: 0.4,
      phosphorus: 95
    },
    tags: ["common dairy", "gut friendly", "stable protein"]
  },
  {
    name: "Raw cow milk",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 68,
    macros: {
      protein: 3.2,
      fat: 3.7,
      carbs: 4.8
    },
    nutrients: {
      calcium: 113,
      phosphorus: 93,
      vitaminB12: 0.4,
      vitaminD: 1.3,
      CLA: "trace"
    },
    tags: ["ancestral dairy", "whole nourishment", "raw vitality"]
  },
  {
    name: "A2 cow milk (whole)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 66,
    macros: {
      protein: 3.3,
      fat: 3.5,
      carbs: 4.7
    },
    nutrients: {
      calcium: 120,
      vitaminD: 1.0,
      phosphorus: 95,
      vitaminB2: 0.2,
      potassium: 155
    },
    tags: ["gut friendly", "beta-casein A2", "easier digestion"]
  },
  {
    name: "Fermented mare milk (airag)",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 44,
    macros: {
      protein: 2.1,
      fat: 1.0,
      carbs: 6.0
    },
    nutrients: {
      vitaminC: 5.0,
      probiotics: "active",
      potassium: 120,
      phosphorus: 90,
      calcium: 100
    },
    tags: ["nomadic tradition", "light dairy", "fermented fuel"]
  },
  {
    name: "Horse meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 133,
    macros: {
      protein: 20.6,
      fat: 5.2,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.5,
      vitaminB12: 2.0,
      zinc: 3.0,
      selenium: 26.0,
      phosphorus: 215
    },
    tags: ["gamey red meat", "global staple", "ancestral protein"]
  },
  {
    name: "Donkey milk",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 47,
    macros: {
      protein: 1.6,
      fat: 1.2,
      carbs: 6.3
    },
    nutrients: {
      vitaminD: 1.6,
      vitaminC: 4.5,
      calcium: 100,
      phosphorus: 85,
      iron: 0.3
    },
    tags: ["hypoallergenic", "light dairy", "skin friendly"]
  },
  {
    name: "Pig blood (congealed)",
    category: "Pork Products",
    servingSize: "100g",
    calories: 78,
    macros: {
      protein: 16.0,
      fat: 1.0,
      carbs: 0.5
    },
    nutrients: {
      iron: 28.0,
      vitaminB12: 9.0,
      selenium: 19.0,
      zinc: 2.2,
      copper: 0.8
    },
    tags: ["iron rich", "ancestral medicine", "blood builder"]
  },
  {
    name: "Beef blood (liquid)",
    category: "Beef Products",
    servingSize: "100g",
    calories: 60,
    macros: {
      protein: 14.0,
      fat: 0.4,
      carbs: 0.0
    },
    nutrients: {
      iron: 25.0,
      vitaminB12: 10.0,
      zinc: 1.9,
      selenium: 16.0,
      copper: 0.7
    },
    tags: ["life force", "vitality tonic", "ancestral practice"]
  },
  {
    name: "Ox blood (liquid)",
    category: "Beef Products",
    servingSize: "100g",
    calories: 65,
    macros: {
      protein: 14.5,
      fat: 0.3,
      carbs: 0.0
    },
    nutrients: {
      iron: 27.0,
      vitaminB12: 10.5,
      zinc: 2.0,
      copper: 0.8,
      selenium: 17.0
    },
    tags: ["warrior fuel", "ritual food", "iron saturation"]
  },
  {
    name: "Rabbit blood (liquid)",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 58,
    macros: {
      protein: 13.0,
      fat: 0.4,
      carbs: 0.0
    },
    nutrients: {
      iron: 23.0,
      vitaminB12: 8.7,
      copper: 0.6,
      selenium: 15.0,
      zinc: 1.5
    },
    tags: ["lean blood", "ancestral medicine", "vital source"]
  },
  {
    name: "Duck fat, rendered",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 882,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      monounsaturatedFat: 50.0,
      saturatedFat: 37.0,
      vitaminE: 5.1,
      vitaminK2: "present",
      CLA: "trace"
    },
    tags: ["high-heat fat", "chef’s oil", "ancestral cooking"]
  },
  {
    name: "Turkey fat, rendered",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 900,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      saturatedFat: 38.0,
      monounsaturatedFat: 46.0,
      vitaminD: 12,
      vitaminE: 3.5,
      selenium: 1.0
    },
    tags: ["holiday drippings", "stable cooking fat", "natural flavor"]
  },
  {
    name: "Chicken fat (schmaltz), rendered",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 901,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      monounsaturatedFat: 49.0,
      saturatedFat: 35.0,
      vitaminE: 3.2,
      vitaminK2: "trace",
      selenium: 0.9
    },
    tags: ["traditional Jewish fat", "rich flavor", "sacred cooking oil"]
  },
  {
    name: "Fish oil (generic, food grade)",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 902,
    macros: {
      protein: 0.0,
      fat: 100.0,
      carbs: 0.0
    },
    nutrients: {
      omega3_EPA_DHA: 9.5,
      vitaminD: 6000,
      vitaminA: 2500,
      selenium: 0.8,
      vitaminE: 3.0
    },
    tags: ["omega-rich", "anti-inflammatory", "nervous system"]
  },
  {
    name: "Bone broth (beef), reduced",
    category: "Beef Products",
    servingSize: "100g",
    calories: 55,
    macros: {
      protein: 9.5,
      fat: 2.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      glycine: "high",
      proline: "present",
      calcium: 80,
      magnesium: 18
    },
    tags: ["gut healer", "joint support", "slow simmered"]
  },
  {
    name: "Bone broth (chicken), reduced",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 50,
    macros: {
      protein: 9.0,
      fat: 1.5,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      glycine: "high",
      calcium: 65,
      magnesium: 15,
      potassium: 130
    },
    tags: ["light broth", "gut repair", "ancestral elixir"]
  },
  {
    name: "Gelatin (pork), dry powder",
    category: "Pork Products",
    servingSize: "100g",
    calories: 355,
    macros: {
      protein: 87.0,
      fat: 0.0,
      carbs: 0.0
    },
    nutrients: {
      glycine: 21.0,
      proline: 12.0,
      hydroxyproline: 10.0,
      calcium: 10,
      magnesium: 5
    },
    tags: ["joint support", "skin health", "pure collagen"]
  },
  {
    name: "Pork rinds (fried)",
    category: "Pork Products",
    servingSize: "100g",
    calories: 544,
    macros: {
      protein: 61.0,
      fat: 31.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "moderate",
      sodium: 1500,
      calcium: 35,
      iron: 2.2,
      phosphorus: 180
    },
    tags: ["snack protein", "keto friendly", "ancestral crunch"]
  },
  {
    name: "Duck broth (reduced)",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 58,
    macros: {
      protein: 10.0,
      fat: 2.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      glycine: "present",
      calcium: 72,
      magnesium: 17,
      potassium: 140
    },
    tags: ["rich broth", "dark meat flavor", "deep recovery"]
  },
  {
    name: "Elk meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 149,
    macros: {
      protein: 30.2,
      fat: 2.2,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.4,
      zinc: 4.2,
      vitaminB12: 3.1,
      selenium: 28.0,
      phosphorus: 220
    },
    tags: ["wild red meat", "lean fuel", "primal strength"]
  },
  {
    name: "Bison liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 152,
    macros: {
      protein: 26.0,
      fat: 4.4,
      carbs: 1.1
    },
    nutrients: {
      vitaminA: 5000,
      vitaminB12: 68.0,
      iron: 7.2,
      zinc: 5.5,
      selenium: 44.0
    },
    tags: ["wild liver", "nutrient king", "iron powerhouse"]
  },
  {
    name: "Bison meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 143,
    macros: {
      protein: 28.4,
      fat: 2.4,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.4,
      zinc: 4.8,
      selenium: 26.0,
      vitaminB12: 2.9,
      phosphorus: 210
    },
    tags: ["lean red meat", "ancestral staple", "wild energy"]
  },
  {
    name: "Caribou meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 135,
    macros: {
      protein: 26.0,
      fat: 2.5,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.8,
      selenium: 27.0,
      zinc: 3.9,
      vitaminB12: 3.3,
      phosphorus: 212
    },
    tags: ["cold-climate game", "high protein", "Indigenous fuel"]
  },
  {
    name: "Antelope meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 122,
    macros: {
      protein: 24.6,
      fat: 2.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.0,
      zinc: 3.7,
      selenium: 25.0,
      vitaminB12: 2.1,
      phosphorus: 200
    },
    tags: ["game meat", "lean and wild", "sprint strength"]
  },
  {
    name: "Ostrich meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 145,
    macros: {
      protein: 28.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 4.6,
      vitaminB12: 3.5,
      zinc: 4.2,
      selenium: 30.0,
      phosphorus: 210
    },
    tags: ["poultry alternative", "low fat", "high iron"]
  },
  {
    name: "Quail meat, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 134,
    macros: {
      protein: 25.0,
      fat: 4.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.9,
      selenium: 20.0,
      vitaminB6: 0.6,
      phosphorus: 195,
      zinc: 2.5
    },
    tags: ["mini poultry", "gourmet meat", "tender and rich"]
  },
  {
    name: "Guinea fowl, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 150,
    macros: {
      protein: 26.5,
      fat: 4.5,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.7,
      vitaminB6: 0.5,
      zinc: 2.4,
      phosphorus: 190,
      selenium: 22.0
    },
    tags: ["farm bird", "wild taste", "traditional poultry"]
  },
  {
    name: "Capybara meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 132,
    macros: {
      protein: 25.5,
      fat: 3.5,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.0,
      zinc: 3.5,
      selenium: 24.0,
      phosphorus: 180,
      vitaminB12: 2.8
    },
    tags: ["South American game", "unique flavor", "lean and wild"]
  },
  {
    name: "Yak meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 137,
    macros: {
      protein: 27.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.3,
      selenium: 26.0,
      vitaminB12: 3.1,
      zinc: 3.9,
      phosphorus: 210
    },
    tags: ["Himalayan protein", "cold-adapted", "dense red meat"]
  },
  {
    name: "Camel meat, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 122,
    macros: {
      protein: 23.5,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 3.1,
      vitaminB12: 2.9,
      selenium: 28.0,
      zinc: 3.8,
      phosphorus: 205
    },
    tags: ["desert fuel", "lean game", "ancient nomad meat"]
  },
  {
    name: "Beef tripe (stomach), cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 85,
    macros: {
      protein: 12.0,
      fat: 4.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 1.4,
      selenium: 14.0,
      zinc: 1.7,
      phosphorus: 78,
      iron: 1.8
    },
    tags: ["gut lining", "digestive organ", "ancestral offal"]
  },
  {
    name: "Beef brain, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 151,
    macros: {
      protein: 12.0,
      fat: 10.5,
      carbs: 1.0
    },
    nutrients: {
      cholesterol: 3100,
      omega3_DHA: 0.8,
      selenium: 25.0,
      vitaminB12: 10.5,
      phosphorus: 220
    },
    tags: ["neural fat", "brain food", "nootropic organ"]
  },
  {
    name: "Beef thymus (sweetbreads), cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 236,
    macros: {
      protein: 16.0,
      fat: 19.0,
      carbs: 1.0
    },
    nutrients: {
      zinc: 3.0,
      selenium: 22.0,
      vitaminC: 2.5,
      vitaminB12: 3.4,
      phosphorus: 230
    },
    tags: ["culinary delicacy", "immune organ", "rich and creamy"]
  },
  {
    name: "Beef spleen, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 130,
    macros: {
      protein: 22.0,
      fat: 3.5,
      carbs: 0.0
    },
    nutrients: {
      iron: 27.0,
      vitaminC: 45.0,
      zinc: 2.2,
      selenium: 20.0,
      vitaminB12: 4.2
    },
    tags: ["blood builder", "iron-rich organ", "traditional tonic"]
  },
  {
    name: "Beef pancreas, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 118,
    macros: {
      protein: 16.0,
      fat: 5.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 3.2,
      zinc: 2.4,
      selenium: 18.0,
      phosphorus: 170,
      digestiveEnzymes: "present"
    },
    tags: ["enzyme rich", "glandular support", "ancestral organ"]
  },
  {
    name: "Beef kidney, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 159,
    macros: {
      protein: 26.0,
      fat: 5.5,
      carbs: 0.0
    },
    nutrients: {
      selenium: 228.0,
      vitaminB12: 27.0,
      iron: 4.0,
      riboflavin: 2.8,
      phosphorus: 220
    },
    tags: ["detox organ", "selenium king", "urea regulator"]
  },
  {
    name: "Beef esophagus, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 142,
    macros: {
      protein: 25.0,
      fat: 4.5,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      glycine: "present",
      zinc: 2.0,
      selenium: 16.0,
      phosphorus: 180
    },
    tags: ["cartilage-rich", "chewy cut", "nose-to-tail"]
  },
  {
    name: "Beef cartilage (trachea), cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 132,
    macros: {
      protein: 24.0,
      fat: 3.5,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      calcium: 55,
      glucosamine: "present",
      chondroitin: "present",
      magnesium: 12
    },
    tags: ["joint builder", "ancestral chew", "raw collagen"]
  },
  {
    name: "Duck heart, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 179,
    macros: {
      protein: 23.0,
      fat: 9.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 6.2,
      vitaminB12: 7.5,
      zinc: 3.2,
      CoQ10: "present",
      phosphorus: 215
    },
    tags: ["muscle meat", "fat-rich organ", "cardiac strength"]
  },
  {
    name: "Duck liver, foie gras (cooked)",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 462,
    macros: {
      protein: 7.0,
      fat: 43.0,
      carbs: 2.0
    },
    nutrients: {
      vitaminA: 11800,
      vitaminB12: 15.0,
      iron: 9.2,
      selenium: 40.0,
      folate: 170
    },
    tags: ["gourmet organ", "fatty liver", "French tradition"]
  },
  {
    name: "Beef oxtail broth (reduced)",
    category: "Beef Products",
    servingSize: "100g",
    calories: 60,
    macros: {
      protein: 10.5,
      fat: 2.5,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      glycine: "present",
      calcium: 70,
      magnesium: 15,
      potassium: 130
    },
    tags: ["slow-simmered", "joint builder", "ancestral comfort"]
  },
  {
    name: "Goat heart, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 170,
    macros: {
      protein: 22.5,
      fat: 8.5,
      carbs: 0.0
    },
    nutrients: {
      CoQ10: "present",
      vitaminB12: 6.2,
      zinc: 2.8,
      iron: 4.7,
      phosphorus: 200
    },
    tags: ["cardiac meat", "muscle support", "wild flavor"]
  },
  {
    name: "Goat liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 169,
    macros: {
      protein: 25.0,
      fat: 5.0,
      carbs: 2.2
    },
    nutrients: {
      vitaminA: 7500,
      iron: 9.5,
      vitaminB12: 22.0,
      zinc: 3.5,
      selenium: 30.0
    },
    tags: ["iron dense", "ancestral nutrient bomb", "goat offal"]
  },
  {
    name: "Sheep liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 185,
    macros: {
      protein: 26.0,
      fat: 6.5,
      carbs: 2.1
    },
    nutrients: {
      vitaminA: 8200,
      folate: 290,
      vitaminB12: 24.5,
      iron: 8.0,
      selenium: 34.0
    },
    tags: ["deep red liver", "blood builder", "pasture-raised power"]
  },
  {
    name: "Pig heart, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 166,
    macros: {
      protein: 23.0,
      fat: 8.0,
      carbs: 0.0
    },
    nutrients: {
      CoQ10: "present",
      zinc: 3.1,
      vitaminB12: 7.3,
      selenium: 29.0,
      iron: 3.2
    },
    tags: ["pumping strength", "cardiac support", "whole beast"]
  },
  {
    name: "Pig liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 165,
    macros: {
      protein: 23.5,
      fat: 6.0,
      carbs: 2.0
    },
    nutrients: {
      vitaminA: 8300,
      iron: 12.0,
      vitaminB12: 25.0,
      zinc: 4.0,
      selenium: 33.0
    },
    tags: ["iron champion", "affordable organ", "classic cut"]
  },
  {
    name: "Venison liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 158,
    macros: {
      protein: 26.0,
      fat: 5.0,
      carbs: 1.8
    },
    nutrients: {
      vitaminA: 9200,
      iron: 10.5,
      vitaminB12: 26.0,
      zinc: 4.2,
      selenium: 35.0
    },
    tags: ["wild liver", "hunter’s nutrition", "blood vitality"]
  },
  {
    name: "Wild boar liver, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 160,
    macros: {
      protein: 24.0,
      fat: 5.5,
      carbs: 2.0
    },
    nutrients: {
      vitaminA: 8700,
      iron: 11.2,
      vitaminB12: 23.0,
      selenium: 32.0,
      zinc: 3.8
    },
    tags: ["forest-fed organ", "earthy power", "deep tissue support"]
  },
  {
    name: "Beef tendon, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 224,
    macros: {
      protein: 36.7,
      fat: 7.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "very high",
      glycine: "high",
      proline: "present",
      calcium: 35,
      phosphorus: 80
    },
    tags: ["joint matrix", "chewy collagen", "slow-cooked strength"]
  },
  {
    name: "Beef cheek, cooked",
    category: "Beef Products",
    servingSize: "100g",
    calories: 220,
    macros: {
      protein: 22.5,
      fat: 14.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "high",
      iron: 3.5,
      vitaminB12: 2.6,
      zinc: 3.8,
      phosphorus: 190
    },
    tags: ["slow roast", "collagen-rich", "flavor bomb"]
  },
  {
    name: "Beef shank, cooked",
    category: "Beef Products",
    servingSize: "100g",
    calories: 214,
    macros: {
      protein: 27.0,
      fat: 11.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "present",
      iron: 3.1,
      zinc: 4.0,
      vitaminB12: 3.0,
      phosphorus: 210
    },
    tags: ["braised strength", "dense meat", "marrow-adjacent"]
  },
  {
    name: "Lamb tongue, cooked",
    category: "Lamb, Veal, and Game Products",
    servingSize: "100g",
    calories: 276,
    macros: {
      protein: 16.0,
      fat: 22.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB12: 3.8,
      selenium: 20.0,
      iron: 3.4,
      zinc: 3.5,
      phosphorus: 180
    },
    tags: ["rich cut", "chewy organ", "Mediterranean tradition"]
  },
  {
    name: "Lamb sweetbreads (thymus), cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 234,
    macros: {
      protein: 18.0,
      fat: 18.0,
      carbs: 0.5
    },
    nutrients: {
      zinc: 3.2,
      selenium: 26.0,
      vitaminB12: 4.1,
      phosphorus: 220,
      vitaminC: 2.2
    },
    tags: ["immune gland", "silky texture", "chef’s offal"]
  },
  {
    name: "Lamb kidney, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 138,
    macros: {
      protein: 22.0,
      fat: 4.0,
      carbs: 0.0
    },
    nutrients: {
      selenium: 229.0,
      vitaminB12: 27.5,
      iron: 4.1,
      zinc: 2.8,
      riboflavin: 3.2
    },
    tags: ["detox organ", "mineral-rich", "nose-to-tail"]
  },
  {
    name: "Lamb testicles, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 134,
    macros: {
      protein: 25.0,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      zinc: 6.2,
      selenium: 34.0,
      vitaminB12: 3.8,
      phosphorus: 185,
      testosteronePrecursors: "present"
    },
    tags: ["hormonal balance", "rare cut", "deep vitality"]
  },
  {
    name: "Goat tripe (stomach), cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 90,
    macros: {
      protein: 14.5,
      fat: 3.0,
      carbs: 0.0
    },
    nutrients: {
      selenium: 12.0,
      iron: 2.1,
      vitaminB12: 1.6,
      zinc: 1.8,
      phosphorus: 135
    },
    tags: ["gut lining", "fermented-friendly", "ancestral chew"]
  },
  {
    name: "Pork uterus, cooked",
    category: "Organ Meats",
    servingSize: "100g",
    calories: 127,
    macros: {
      protein: 22.0,
      fat: 4.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "present",
      zinc: 2.6,
      vitaminB12: 2.2,
      iron: 3.2,
      selenium: 19.0
    },
    tags: ["rare organ", "nourish creation", "sacred feminine"]
  },
  {
    name: "Chicken comb, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 180,
    macros: {
      protein: 17.0,
      fat: 12.0,
      carbs: 0.0
    },
    nutrients: {
      hyaluronicAcid: "very high",
      zinc: 1.4,
      vitaminB12: 2.0,
      selenium: 12.0,
      copper: 0.4
    },
    tags: ["skin-elixir", "anti-aging", "cosmetic internal"]
  },
  {
    name: "Chicken gizzard, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 155,
    macros: {
      protein: 27.0,
      fat: 4.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.8,
      zinc: 2.5,
      selenium: 24.0,
      vitaminB12: 1.2,
      phosphorus: 185
    },
    tags: ["chewy organ", "digestive muscle", "high protein"]
  },
  {
    name: "Chicken liver, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 167,
    macros: {
      protein: 24.0,
      fat: 6.0,
      carbs: 1.1
    },
    nutrients: {
      vitaminA: 9400,
      folate: 560,
      iron: 8.0,
      vitaminB12: 17.0,
      selenium: 31.0
    },
    tags: ["budget nutrient bomb", "fat-soluble source", "classic offal"]
  },
  {
    name: "Duck gizzard, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 154,
    macros: {
      protein: 27.0,
      fat: 4.2,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.6,
      zinc: 2.3,
      selenium: 22.0,
      vitaminB12: 1.3,
      phosphorus: 180
    },
    tags: ["dense chew", "digestive meat", "pan-fried offal"]
  },
  {
    name: "Duck tongue, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 245,
    macros: {
      protein: 18.0,
      fat: 20.0,
      carbs: 0.0
    },
    nutrients: {
      collagen: "present",
      zinc: 2.0,
      selenium: 20.0,
      vitaminB12: 2.1,
      iron: 3.2
    },
    tags: ["Chinese delicacy", "tender cartilage", "collagen snack"]
  },
  {
    name: "Turkey heart, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 170,
    macros: {
      protein: 26.0,
      fat: 7.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 4.8,
      CoQ10: "present",
      vitaminB12: 7.0,
      selenium: 24.0,
      zinc: 3.2
    },
    tags: ["dense muscle", "high energy", "holiday organ"]
  },
  {
    name: "Turkey gizzard, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 155,
    macros: {
      protein: 26.0,
      fat: 5.0,
      carbs: 0.0
    },
    nutrients: {
      iron: 2.9,
      selenium: 25.0,
      vitaminB12: 1.5,
      zinc: 2.2,
      phosphorus: 190
    },
    tags: ["firm cut", "digestive aid", "ancestral chewy"]
  },
  {
    name: "Quail liver, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 174,
    macros: {
      protein: 25.0,
      fat: 7.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminA: 9100,
      iron: 9.2,
      vitaminB12: 19.5,
      folate: 520,
      selenium: 28.0
    },
    tags: ["tiny organ", "rich and silky", "dense nutrition"]
  },
  {
    name: "Quail heart, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 179,
    macros: {
      protein: 26.0,
      fat: 8.0,
      carbs: 0.0
    },
    nutrients: {
      CoQ10: "present",
      vitaminB12: 6.5,
      selenium: 23.0,
      zinc: 2.8,
      iron: 4.0
    },
    tags: ["mini muscle", "energy dense", "gourmet cut"]
  },
  {
    name: "Duck egg yolk, raw",
    category: "Dairy and Egg Products",
    servingSize: "100g",
    calories: 350,
    macros: {
      protein: 16.0,
      fat: 31.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminA: 570,
      choline: 700,
      omega3_DHA: 0.8,
      vitaminD: 85,
      selenium: 30.0
    },
    tags: ["brain builder", "fat-soluble fuel", "prenatal superfood"]
  },
  {
    name: "Fish roe (salmon), raw",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 250,
    macros: {
      protein: 29.0,
      fat: 14.0,
      carbs: 1.0
    },
    nutrients: {
      vitaminB12: 20.0,
      omega3_EPA_DHA: 3.2,
      selenium: 40.0,
      vitaminD: 520,
      choline: 490
    },
    tags: ["fertility source", "nervous system", "ancestral fat"]
  },
  {
    name: "Sea cucumber, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 60,
    macros: {
      protein: 13.0,
      fat: 0.1,
      carbs: 0.5
    },
    nutrients: {
      collagen: "high",
      chondroitin: "present",
      selenium: 6.0,
      magnesium: 25,
      calcium: 40
    },
    tags: ["marine medicine", "joint rejuvenation", "ocean collagen"]
  },
  {
    name: "Conch meat, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 130,
    macros: {
      protein: 26.0,
      fat: 1.0,
      carbs: 3.0
    },
    nutrients: {
      selenium: 35.0,
      vitaminE: 2.0,
      vitaminB12: 1.8,
      phosphorus: 240,
      zinc: 2.5
    },
    tags: ["Caribbean tradition", "muscle protein", "sea vitality"]
  },
  {
    name: "Octopus, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 164,
    macros: {
      protein: 29.8,
      fat: 2.1,
      carbs: 2.2
    },
    nutrients: {
      vitaminB12: 20.0,
      iron: 9.5,
      selenium: 89.6,
      copper: 0.4,
      phosphorus: 280
    },
    tags: ["cephalopod strength", "brain food", "dense protein"]
  },
  {
    name: "Eel, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 236,
    macros: {
      protein: 23.7,
      fat: 15.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminA: 980,
      omega3_EPA_DHA: 2.1,
      vitaminD: 932,
      selenium: 20.0,
      vitaminB12: 4.0
    },
    tags: ["fatty fish", "skin glow", "Japanese tradition"]
  },
  {
    name: "Snail (escargot), cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 90,
    macros: {
      protein: 16.0,
      fat: 1.4,
      carbs: 2.0
    },
    nutrients: {
      iron: 3.5,
      magnesium: 250,
      phosphorus: 270,
      selenium: 27.0,
      copper: 0.3
    },
    tags: ["mineral bomb", "uncommon meat", "gourmet source"]
  },
  {
    name: "Periwinkle, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 94,
    macros: {
      protein: 18.0,
      fat: 1.5,
      carbs: 2.0
    },
    nutrients: {
      iron: 4.0,
      calcium: 180,
      phosphorus: 160,
      vitaminB12: 3.6,
      zinc: 1.9
    },
    tags: ["coastal tradition", "tiny powerhouse", "snail protein"]
  },
  {
    name: "Whelk, cooked",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 100,
    macros: {
      protein: 20.0,
      fat: 1.2,
      carbs: 2.3
    },
    nutrients: {
      selenium: 18.0,
      vitaminB12: 2.0,
      iron: 2.7,
      phosphorus: 195,
      zinc: 1.5
    },
    tags: ["shellfish support", "cold sea cut", "oceanic fuel"]
  },
  {
    name: "Sea urchin roe (uni), raw",
    category: "Finfish and Shellfish Products",
    servingSize: "100g",
    calories: 172,
    macros: {
      protein: 14.0,
      fat: 11.0,
      carbs: 4.5
    },
    nutrients: {
      omega3_EPA_DHA: 2.4,
      vitaminA: 400,
      zinc: 2.8,
      selenium: 20.0,
      vitaminC: 2.0
    },
    tags: ["umami gold", "fertility roe", "Japanese delicacy"]
  },
  {
    name: "Ground chicken, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 165,
    macros: {
      protein: 25.0,
      fat: 7.0,
      carbs: 0.0
    },
    nutrients: {
      vitaminB6: 0.5,    // mg
      selenium: 24.0,    // mcg
      phosphorus: 190,   // mg
      zinc: 1.3,         // mg
      vitaminB12: 0.6    // mcg
    },
    tags: ["lean protein", "versatile meat", "meal prep staple"]
  },
  {
    name: "Ground turkey, cooked",
    category: "Poultry Products",
    servingSize: "100g",
    calories: 169,
    macros: {
      protein: 26.0,
      fat: 8.0,
      carbs: 0.0
    },
    nutrients: {
      selenium: 27.0,    // mcg
      zinc: 2.0,         // mg
      vitaminB6: 0.6,    // mg
      phosphorus: 195,   // mg
      vitaminB12: 1.1    // mcg
    },
    tags: ["everyday protein", "budget friendly", "muscle builder"]
  }


  ];
  