const nutrientData = {
  vitamins: {
    "Vitamin A": {
      functions: ["Vision", "Immunity", "Reproduction"],
      sources: ["Liver", "Carrots", "Sweet potatoes"],
      unit: "mcg RAE",
      rda: {
        male: {
          infant: 400,
          child: 500,
          tween: 600,
          teen: 900,
          young_adult: 900,
          adult: 900,
          older_adult: 900,
          elder: 900
        },
        female: {
          infant: 400,
          child: 400,
          tween: 600,
          teen: 700,
          young_adult: 700,
          adult: 700,
          older_adult: 700,
          elder: 700
        }
      },
      ul: 3000,
      weightModifier: {
        low: 0.9,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    },
    "Vitamin C": {
      functions: ["Antioxidant", "Collagen synthesis", "Immune function"],
      sources: ["Citrus fruits", "Bell peppers", "Strawberries"],
      unit: "mg",
      rda: {
        male: {
          infant: 15,
          child: 25,
          tween: 45,
          teen: 75,
          young_adult: 90,
          adult: 90,
          older_adult: 90,
          elder: 90
        },
        female: {
          infant: 15,
          child: 25,
          tween: 45,
          teen: 65,
          young_adult: 75,
          adult: 75,
          older_adult: 75,
          elder: 75
        }
      },
      ul: 2000,
      weightModifier: {
        low: 0.9,
        moderate: 1,
        high: 1.15,
        very_high: 1.3
      }
    },
    "Vitamin D": {
      functions: ["Bone health", "Calcium absorption", "Immune function"],
      sources: ["Sunlight", "Fatty fish", "Fortified milk"],
      unit: "IU",
      rda: {
        male: {
          infant: 400,
          child: 600,
          tween: 600,
          teen: 600,
          young_adult: 600,
          adult: 600,
          older_adult: 800,
          elder: 800
        },
        female: {
          infant: 400,
          child: 600,
          tween: 600,
          teen: 600,
          young_adult: 600,
          adult: 600,
          older_adult: 800,
          elder: 800
        }
      },
      ul: 4000,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    },
    "Vitamin E": {
      functions: ["Antioxidant", "Cell membrane protection"],
      sources: ["Seeds", "Nuts", "Vegetable oils"],
      unit: "mg",
      rda: {
        male: {
          infant: 6,
          child: 7,
          tween: 11,
          teen: 15,
          young_adult: 15,
          adult: 15,
          older_adult: 15,
          elder: 15
        },
        female: {
          infant: 6,
          child: 7,
          tween: 11,
          teen: 15,
          young_adult: 15,
          adult: 15,
          older_adult: 15,
          elder: 15
        }
      },
      ul: 1000,
      weightModifier: {
        low: 0.9,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    },
    "Vitamin K1": {
      functions: ["Blood clotting"],
      sources: ["Leafy greens", "Broccoli"],
      unit: "mcg",
      rda: {
        male: {
          infant: 2,
          child: 30,
          tween: 55,
          teen: 75,
          young_adult: 120,
          adult: 120,
          older_adult: 120,
          elder: 120
        },
        female: {
          infant: 2,
          child: 30,
          tween: 55,
          teen: 60,
          young_adult: 90,
          adult: 90,
          older_adult: 90,
          elder: 90
        }
      },
      ul: null,
      weightModifier: {
        low: 1,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Vitamin K2": {
      functions: ["Bone health", "Cardiovascular health"],
      sources: ["Natto", "Fermented cheese", "Egg yolks"],
      unit: "mcg",
      rda: {
        male: {
          infant: 2,
          child: 30,
          tween: 55,
          teen: 75,
          young_adult: 120,
          adult: 120,
          older_adult: 120,
          elder: 120
        },
        female: {
          infant: 2,
          child: 30,
          tween: 55,
          teen: 60,
          young_adult: 90,
          adult: 90,
          older_adult: 90,
          elder: 90
        }
      },
      weightModifier: {
        low: 1,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Vitamin B1": {
      name: "Thiamine",
      functions: ["Energy metabolism", "Nervous system"],
      sources: ["Whole grains", "Pork", "Legumes"],
      unit: "mg",
      rda: {
        male: {
          infant: 0.2,
          child: 0.5,
          tween: 0.9,
          teen: 1.2,
          young_adult: 1.2,
          adult: 1.2,
          older_adult: 1.2,
          elder: 1.2
        },
        female: {
          infant: 0.2,
          child: 0.5,
          tween: 0.9,
          teen: 1.0,
          young_adult: 1.1,
          adult: 1.1,
          older_adult: 1.1,
          elder: 1.1
        }
      },
      ul: null,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    },
    "Vitamin B2": {
      name: "Riboflavin",
      functions: ["Energy production", "Cellular function"],
      sources: ["Milk", "Eggs", "Almonds"],
      unit: "mg",
      rda: {
        male: {
          infant: 0.3,
          child: 0.5,
          tween: 0.9,
          teen: 1.3,
          young_adult: 1.3,
          adult: 1.3,
          older_adult: 1.3,
          elder: 1.3
        },
        female: {
          infant: 0.3,
          child: 0.5,
          tween: 0.9,
          teen: 1.0,
          young_adult: 1.1,
          adult: 1.1,
          older_adult: 1.1,
          elder: 1.1
        }
      },
      ul: null,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Vitamin B3": {
      name: "Niacin",
      functions: ["DNA repair", "Metabolism", "Skin health"],
      sources: ["Poultry", "Fish", "Peanuts"],
      unit: "mg NE",
      rda: {
        male: {
          infant: 2,
          child: 6,
          tween: 12,
          teen: 16,
          young_adult: 16,
          adult: 16,
          older_adult: 16,
          elder: 16
        },
        female: {
          infant: 2,
          child: 6,
          tween: 10,
          teen: 14,
          young_adult: 14,
          adult: 14,
          older_adult: 14,
          elder: 14
        }
      },
      ul: 35,
      weightModifier: {
        low: 0.9,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    },
    "Vitamin B6": {
      name: "Pyridoxine",
      functions: ["Brain health", "Mood regulation", "Amino acid metabolism"],
      sources: ["Bananas", "Chickpeas", "Tuna"],
      unit: "mg",
      rda: {
        male: {
          infant: 0.1,
          child: 0.5,
          tween: 1.0,
          teen: 1.3,
          young_adult: 1.3,
          adult: 1.3,
          older_adult: 1.7,
          elder: 1.7
        },
        female: {
          infant: 0.1,
          child: 0.5,
          tween: 1.0,
          teen: 1.2,
          young_adult: 1.3,
          adult: 1.3,
          older_adult: 1.5,
          elder: 1.5
        }
      },
      ul: 100,
      weightModifier: {
        low: 0.9,
        moderate: 1,
        high: 1.15,
        very_high: 1.25
      }
    },
    "Vitamin B9": {
      name: "Folate",
      functions: ["DNA synthesis", "Pregnancy support", "Cell growth"],
      sources: ["Leafy greens", "Lentils", "Fortified grains"],
      unit: "mcg DFE",
      rda: {
        male: {
          infant: 65,
          child: 150,
          tween: 300,
          teen: 400,
          young_adult: 400,
          adult: 400,
          older_adult: 400,
          elder: 400
        },
        female: {
          infant: 65,
          child: 150,
          tween: 300,
          teen: 400,
          young_adult: 400,
          adult: 400,
          older_adult: 400,
          elder: 400
        }
      },
      ul: 1000,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.05,
        very_high: 1.15
      }
    },
    "Vitamin B12": {
      name: "Cobalamin",
      functions: ["Nerve health", "Red blood cell production"],
      sources: ["Meat", "Eggs", "Dairy"],
      unit: "mcg",
      rda: {
        male: {
          infant: 0.4,
          child: 0.9,
          tween: 1.8,
          teen: 2.4,
          young_adult: 2.4,
          adult: 2.4,
          older_adult: 2.4,
          elder: 2.4
        },
        female: {
          infant: 0.4,
          child: 0.9,
          tween: 1.8,
          teen: 2.4,
          young_adult: 2.4,
          adult: 2.4,
          older_adult: 2.4,
          elder: 2.4
        }
      },
      ul: null,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    }
  },
  minerals: {
    "Calcium": {
      functions: ["Bone health", "Muscle function", "Nerve signaling"],
      sources: ["Dairy", "Leafy greens", "Tofu"],
      unit: "mg",
      rda: {
        male: {
          infant: 200,
          child: 700,
          tween: 1000,
          teen: 1300,
          young_adult: 1000,
          adult: 1000,
          older_adult: 1200,
          elder: 1200
        },
        female: {
          infant: 200,
          child: 700,
          tween: 1000,
          teen: 1300,
          young_adult: 1000,
          adult: 1000,
          older_adult: 1200,
          elder: 1200
        }
      },
      ul: 2500,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Iron": {
      functions: ["Oxygen transport", "Energy", "Immunity"],
      sources: ["Red meat", "Spinach", "Lentils"],
      unit: "mg",
      rda: {
        male: {
          infant: 0.27,
          child: 7,
          tween: 10,
          teen: 11,
          young_adult: 8,
          adult: 8,
          older_adult: 8,
          elder: 8
        },
        female: {
          infant: 0.27,
          child: 7,
          tween: 10,
          teen: 15,
          young_adult: 18,
          adult: 18,
          older_adult: 8,
          elder: 8
        }
      },
      ul: 45,
      weightModifier: {
        low: 1,
        moderate: 1,
        high: 1.15,
        very_high: 1.3
      }
    },
    "Magnesium": {
      functions: ["Muscle & nerve function", "Sleep", "Enzyme reactions"],
      sources: ["Nuts", "Whole grains", "Dark chocolate"],
      unit: "mg",
      rda: {
        male: {
          infant: 30,
          child: 80,
          tween: 130,
          teen: 410,
          young_adult: 400,
          adult: 400,
          older_adult: 420,
          elder: 420
        },
        female: {
          infant: 30,
          child: 80,
          tween: 130,
          teen: 360,
          young_adult: 310,
          adult: 310,
          older_adult: 320,
          elder: 320
        }
      },
      ul: 350,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    },
    "Zinc": {
      functions: ["Immunity", "Wound healing", "Hormone production"],
      sources: ["Shellfish", "Beef", "Pumpkin seeds"],
      unit: "mg",
      rda: {
        male: {
          infant: 2,
          child: 5,
          tween: 8,
          teen: 11,
          young_adult: 11,
          adult: 11,
          older_adult: 11,
          elder: 11
        },
        female: {
          infant: 2,
          child: 5,
          tween: 8,
          teen: 9,
          young_adult: 8,
          adult: 8,
          older_adult: 8,
          elder: 8
        }
      },
      ul: 40,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Selenium": {
      functions: ["Thyroid function", "Antioxidant role"],
      sources: ["Brazil nuts", "Seafood"],
      unit: "mcg",
      rda: {
        male: {
          infant: 15,
          child: 20,
          tween: 30,
          teen: 55,
          young_adult: 55,
          adult: 55,
          older_adult: 55,
          elder: 55
        },
        female: {
          infant: 15,
          child: 20,
          tween: 30,
          teen: 55,
          young_adult: 55,
          adult: 55,
          older_adult: 55,
          elder: 55
        }
      },
      ul: 400,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.1,
        very_high: 1.2
      }
    },
    "Iodine": {
      functions: ["Thyroid hormone production"],
      sources: ["Iodized salt", "Seaweed"],
      unit: "mcg",
      rda: {
        male: {
          infant: 110,
          child: 90,
          tween: 120,
          teen: 150,
          young_adult: 150,
          adult: 150,
          older_adult: 150,
          elder: 150
        },
        female: {
          infant: 110,
          child: 90,
          tween: 120,
          teen: 150,
          young_adult: 150,
          adult: 150,
          older_adult: 150,
          elder: 150
        }
      },
      ul: 1100,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Potassium": {
      functions: ["Fluid balance", "Heart rhythm", "Nerve signals"],
      sources: ["Bananas", "Sweet potatoes", "Beans"],
      unit: "mg",
      rda: {
        male: {
          infant: 400,
          child: 2000,
          tween: 2500,
          teen: 3000,
          young_adult: 3400,
          adult: 3400,
          older_adult: 3400,
          elder: 3400
        },
        female: {
          infant: 400,
          child: 2000,
          tween: 2300,
          teen: 2300,
          young_adult: 2600,
          adult: 2600,
          older_adult: 2600,
          elder: 2600
        }
      },
      ul: null,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.1,
        very_high: 1.25
      }
    },
    "Phosphorus": {
      functions: ["Bone & teeth health", "Energy (ATP)", "Cell function"],
      sources: ["Meat", "Dairy", "Legumes"],
      unit: "mg",
      rda: {
        male: {
          infant: 100,
          child: 460,
          tween: 500,
          teen: 1250,
          young_adult: 700,
          adult: 700,
          older_adult: 700,
          elder: 700
        },
        female: {
          infant: 100,
          child: 460,
          tween: 500,
          teen: 1250,
          young_adult: 700,
          adult: 700,
          older_adult: 700,
          elder: 700
        }
      },
      ul: 4000,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Copper": {
      functions: ["Iron metabolism", "Connective tissue", "Brain development"],
      sources: ["Shellfish", "Nuts", "Whole grains"],
      unit: "mcg",
      rda: {
        male: {
          infant: 200,
          child: 340,
          tween: 700,
          teen: 890,
          young_adult: 900,
          adult: 900,
          older_adult: 900,
          elder: 900
        },
        female: {
          infant: 200,
          child: 340,
          tween: 700,
          teen: 890,
          young_adult: 900,
          adult: 900,
          older_adult: 900,
          elder: 900
        }
      },
      ul: 10000,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.05,
        very_high: 1.1
      }
    },
    "Manganese": {
      functions: ["Bone development", "Metabolism"],
      sources: ["Whole grains", "Nuts", "Leafy greens"],
      unit: "mg",
      rda: {
        male: {
          infant: 0.003,
          child: 1.2,
          tween: 1.9,
          teen: 2.2,
          young_adult: 2.3,
          adult: 2.3,
          older_adult: 2.3,
          elder: 2.3
        },
        female: {
          infant: 0.003,
          child: 1.2,
          tween: 1.6,
          teen: 1.6,
          young_adult: 1.8,
          adult: 1.8,
          older_adult: 1.8,
          elder: 1.8
        }
      },
      ul: 11,
      weightModifier: {
        low: 0.95,
        moderate: 1,
        high: 1.1,
        very_high: 1.15
      }
    },
    "Molybdenum": {
  functions: ["Enzyme activity", "Detoxification"],
  sources: ["Legumes", "Grains", "Nuts"],
  unit: "mcg",
  rda: {
    male: {
      infant: 2,
      child: 17,
      tween: 34,
      teen: 43,
      young_adult: 45,
      adult: 45,
      older_adult: 45,
      elder: 45
    },
    female: {
      infant: 2,
      child: 17,
      tween: 34,
      teen: 43,
      young_adult: 45,
      adult: 45,
      older_adult: 45,
      elder: 45
    }
  },
  ul: 2000,
  weightModifier: {
    low: 0.9,
    moderate: 1,
    high: 1.1,
    very_high: 1.2
  }
},
"Chromium": {
  functions: ["Blood sugar control", "Insulin function"],
  sources: ["Broccoli", "Grape juice", "Whole grains"],
  unit: "mcg",
  rda: {
    male: {
      infant: 0.2,
      child: 11,
      tween: 15,
      teen: 35,
      young_adult: 35,
      adult: 35,
      older_adult: 30,
      elder: 30
    },
    female: {
      infant: 0.2,
      child: 11,
      tween: 15,
      teen: 24,
      young_adult: 25,
      adult: 25,
      older_adult: 20,
      elder: 20
    }
  },
  ul: null,
  weightModifier: {
    low: 0.95,
    moderate: 1,
    high: 1.05,
    very_high: 1.15
  }
},
"Chloride": {
  functions: ["Fluid balance", "Digestion (stomach acid)"],
  sources: ["Salt", "Seaweed", "Tomatoes"],
  unit: "mg",
  rda: {
    male: {
      infant: 180,
      child: 1500,
      tween: 1800,
      teen: 2300,
      young_adult: 2300,
      adult: 2300,
      older_adult: 2000,
      elder: 2000
    },
    female: {
      infant: 180,
      child: 1500,
      tween: 1800,
      teen: 2300,
      young_adult: 2300,
      adult: 2300,
      older_adult: 2000,
      elder: 2000
    }
  },
  ul: 3600,
  weightModifier: {
    low: 0.95,
    moderate: 1,
    high: 1.1,
    very_high: 1.2
  }
},
"Fluoride": {
  functions: ["Dental health", "Bone density"],
  sources: ["Fluoridated water", "Tea"],
  unit: "mg",
  rda: {
    male: {
      infant: 0.01,
      child: 0.5,
      tween: 1,
      teen: 2,
      young_adult: 4,
      adult: 4,
      older_adult: 4,
      elder: 4
    },
    female: {
      infant: 0.01,
      child: 0.5,
      tween: 1,
      teen: 2,
      young_adult: 3,
      adult: 3,
      older_adult: 3,
      elder: 3
    }
  },
  ul: 10,
  weightModifier: {
    low: 0.95,
    moderate: 1,
    high: 1.1,
    very_high: 1.15
  }
},
"Sulfur": {
  functions: ["Protein structure", "Detox support"],
  sources: ["Garlic", "Onions", "Cruciferous vegetables"],
  unit: "mg",
  rda: {
    male: { "19-50": null, "51+": null },
    female: { "19-50": null, "51+": null }
  },
  ul: null,
  weightModifier: {
    low: 1,
    moderate: 1,
    high: 1.05,
    very_high: 1.1
  }
  }
}
};

export default nutrientData;