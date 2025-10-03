// Comprehensive Soil Analysis Database for Krishinetra Agro Assist
// Covers 7 main soil types: Alluvial, Black, Red, Laterite, Sandy, Clayey, Loamy

export interface SoilType {
  name: string;
  description: string;
  characteristics: string[];
  idealPhRange: {
    min: number;
    max: number;
  };
  bestCrops: CropRecommendation[];
  soilCorrections: SoilCorrection[];
  color: string;
  texture: string;
}

export interface CropRecommendation {
  name: string;
  idealPhRange: {
    min: number;
    max: number;
  };
  plantingSeason: string[];
  waterRequirement: "low" | "medium" | "high";
  yieldPotential: "low" | "medium" | "high";
  marketValue: "low" | "medium" | "high";
  specialNotes: string[];
}

export interface SoilCorrection {
  type: "organic" | "cost_efficient" | "immediate" | "long_term";
  title: string;
  description: string;
  materials: string[];
  application: string[];
  cost: "very_low" | "low" | "medium" | "high";
  effectiveness: "low" | "medium" | "high";
  timeToEffect: string;
  notes: string[];
}

export interface SoilAnalysisResult {
  soilType: SoilType;
  currentPh?: number;
  phStatus: "optimal" | "too_acidic" | "too_alkaline" | "unknown";
  recommendedCrops: CropRecommendation[];
  soilCorrections: {
    immediate: SoilCorrection[];
    organic: SoilCorrection[];
    costEfficient: SoilCorrection[];
    longTerm: SoilCorrection[];
  };
  timelineIntegration: {
    suggestedCrops: string[];
    plantingSchedule: string[];
    soilPreparation: string[];
  };
  diseasePrevention: string[];
  yieldOptimization: string[];
}

// Comprehensive Soil Type Database
export const SOIL_DATABASE: SoilType[] = [
  {
    name: "Alluvial Soil",
    description: "Fertile soil deposited by rivers, rich in nutrients and organic matter",
    characteristics: [
      "High fertility and organic matter content",
      "Good water retention capacity",
      "Well-drained with good aeration",
      "Rich in nutrients like nitrogen, phosphorus, and potassium",
      "Suitable for intensive agriculture"
    ],
    idealPhRange: { min: 6.0, max: 7.5 },
    color: "Dark brown to black",
    texture: "Fine to medium",
    bestCrops: [
      {
        name: "Rice",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["Kharif (June-July)", "Rabi (November-December)"],
        waterRequirement: "high",
        yieldPotential: "high",
        marketValue: "medium",
        specialNotes: ["Staple crop", "High water requirement", "Good for flood-prone areas"]
      },
      {
        name: "Wheat",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["Rabi (October-November)"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Winter crop", "Good for rotation with rice", "High market demand"]
      },
      {
        name: "Sugarcane",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["February-March", "October-November"],
        waterRequirement: "high",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Cash crop", "Long duration (12-18 months)", "High water requirement"]
      },
      {
        name: "Cotton",
        idealPhRange: { min: 5.8, max: 8.0 },
        plantingSeason: ["April-May"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Cash crop", "Good for textile industry", "Requires proper drainage"]
      },
      {
        name: "Maize",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["Kharif (June-July)", "Rabi (October-November)"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "medium",
        specialNotes: ["Fast growing", "Good for animal feed", "Versatile crop"]
      }
    ],
    soilCorrections: [
      {
        type: "organic",
        title: "Green Manure Application",
        description: "Plant and incorporate green manure crops to improve soil fertility",
        materials: ["Sesbania seeds", "Dhaincha seeds", "Sunhemp seeds"],
        application: [
          "Sow green manure crops after main crop harvest",
          "Allow to grow for 45-60 days",
          "Incorporate into soil before flowering",
          "Apply 2-3 tons per acre"
        ],
        cost: "very_low",
        effectiveness: "high",
        timeToEffect: "2-3 months",
        notes: ["Improves soil structure", "Adds nitrogen", "Reduces soil erosion"]
      },
      {
        type: "cost_efficient",
        title: "Farmyard Manure Application",
        description: "Apply well-decomposed farmyard manure to maintain soil fertility",
        materials: ["Farmyard manure", "Compost", "Vermicompost"],
        application: [
          "Apply 10-15 tons per acre annually",
          "Spread evenly before plowing",
          "Mix well with top 6 inches of soil",
          "Apply 2-3 weeks before planting"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "1-2 months",
        notes: ["Improves soil structure", "Provides slow-release nutrients", "Enhances water retention"]
      }
    ]
  },
  {
    name: "Black Soil (Regur)",
    description: "Clay-rich soil with high water retention, ideal for cotton and oilseeds",
    characteristics: [
      "High clay content (40-60%)",
      "Excellent water retention capacity",
      "Rich in calcium, magnesium, and potassium",
      "Cracks during dry season, swells when wet",
      "Good for deep-rooted crops"
    ],
    idealPhRange: { min: 6.5, max: 8.5 },
    color: "Dark black to deep brown",
    texture: "Heavy clay",
    bestCrops: [
      {
        name: "Cotton",
        idealPhRange: { min: 6.5, max: 8.0 },
        plantingSeason: ["April-May"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Perfect for black soil", "Deep root system", "Cash crop"]
      },
      {
        name: "Soybean",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["June-July"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Oilseed crop", "Nitrogen fixing", "Good for rotation"]
      },
      {
        name: "Sunflower",
        idealPhRange: { min: 6.0, max: 8.0 },
        plantingSeason: ["June-July", "October-November"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Oilseed crop", "Drought tolerant", "Good market price"]
      },
      {
        name: "Wheat",
        idealPhRange: { min: 6.5, max: 7.5 },
        plantingSeason: ["October-November"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Winter crop", "Good for rotation", "Staple food"]
      },
      {
        name: "Sugarcane",
        idealPhRange: { min: 6.5, max: 8.0 },
        plantingSeason: ["February-March"],
        waterRequirement: "high",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Cash crop", "Long duration", "High water requirement"]
      }
    ],
    soilCorrections: [
      {
        type: "organic",
        title: "Gypsum Application",
        description: "Apply gypsum to improve soil structure and reduce alkalinity",
        materials: ["Gypsum powder", "Water"],
        application: [
          "Apply 1-2 tons per acre",
          "Spread evenly before plowing",
          "Mix well with top 6 inches of soil",
          "Apply during dry season for better mixing"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "3-6 months",
        notes: ["Reduces soil alkalinity", "Improves soil structure", "Helps with drainage"]
      },
      {
        type: "cost_efficient",
        title: "Lime Application",
        description: "Apply lime to correct soil acidity and improve nutrient availability",
        materials: ["Agricultural lime", "Water"],
        application: [
          "Apply 500-1000 kg per acre",
          "Spread evenly before plowing",
          "Mix well with soil",
          "Apply 2-3 weeks before planting"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "2-4 months",
        notes: ["Corrects soil acidity", "Improves nutrient availability", "Long-lasting effect"]
      }
    ]
  },
  {
    name: "Red Soil",
    description: "Iron-rich soil with good drainage, suitable for a variety of crops",
    characteristics: [
      "High iron oxide content",
      "Good drainage and aeration",
      "Low in organic matter and nitrogen",
      "Suitable for drought-resistant crops",
      "Good for root development"
    ],
    idealPhRange: { min: 5.5, max: 7.0 },
    color: "Red to reddish brown",
    texture: "Sandy to loamy",
    bestCrops: [
      {
        name: "Groundnut",
        idealPhRange: { min: 5.5, max: 7.0 },
        plantingSeason: ["June-July"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "high",
        specialNotes: ["Oilseed crop", "Drought tolerant", "Nitrogen fixing"]
      },
      {
        name: "Ragi (Finger Millet)",
        idealPhRange: { min: 5.5, max: 7.0 },
        plantingSeason: ["June-July"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "medium",
        specialNotes: ["Nutritious grain", "Drought tolerant", "Good for health"]
      },
      {
        name: "Castor",
        idealPhRange: { min: 5.5, max: 7.0 },
        plantingSeason: ["June-July"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "high",
        specialNotes: ["Oilseed crop", "Drought tolerant", "Industrial use"]
      },
      {
        name: "Tobacco",
        idealPhRange: { min: 5.5, max: 7.0 },
        plantingSeason: ["October-November"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Cash crop", "High value", "Requires careful management"]
      },
      {
        name: "Chickpea",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["October-November"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "high",
        specialNotes: ["Pulse crop", "Nitrogen fixing", "Good for rotation"]
      }
    ],
    soilCorrections: [
      {
        type: "organic",
        title: "Compost and Organic Matter",
        description: "Add compost and organic matter to improve soil fertility and water retention",
        materials: ["Compost", "Farmyard manure", "Green manure"],
        application: [
          "Apply 5-10 tons compost per acre",
          "Mix with top 6 inches of soil",
          "Apply before planting season",
          "Repeat annually"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "2-3 months",
        notes: ["Improves soil fertility", "Increases water retention", "Enhances soil structure"]
      },
      {
        type: "cost_efficient",
        title: "Nitrogen Fertilizer Application",
        description: "Apply nitrogen fertilizers to compensate for low nitrogen content",
        materials: ["Urea", "Ammonium sulfate", "NPK fertilizer"],
        application: [
          "Apply 50-100 kg nitrogen per acre",
          "Split application: 50% at planting, 50% at flowering",
          "Apply in bands near plant roots",
          "Water after application"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "1-2 weeks",
        notes: ["Quick nutrient availability", "Increases yield", "Follow soil test recommendations"]
      }
    ]
  },
  {
    name: "Laterite Soil",
    description: "Iron and aluminum-rich soil, typically found in high rainfall areas",
    characteristics: [
      "High iron and aluminum content",
      "Low in organic matter and nutrients",
      "Good drainage but poor water retention",
      "Suitable for plantation crops",
      "Requires regular fertilization"
    ],
    idealPhRange: { min: 4.5, max: 6.5 },
    color: "Red to reddish brown",
    texture: "Sandy to clayey",
    bestCrops: [
      {
        name: "Tea",
        idealPhRange: { min: 4.5, max: 6.0 },
        plantingSeason: ["March-April", "July-August"],
        waterRequirement: "high",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Plantation crop", "High value", "Requires shade"]
      },
      {
        name: "Coffee",
        idealPhRange: { min: 5.0, max: 6.5 },
        plantingSeason: ["June-July"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Plantation crop", "High value", "Requires shade"]
      },
      {
        name: "Rubber",
        idealPhRange: { min: 5.0, max: 6.5 },
        plantingSeason: ["June-July"],
        waterRequirement: "high",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Plantation crop", "Long term investment", "High value"]
      },
      {
        name: "Cashew",
        idealPhRange: { min: 5.0, max: 6.5 },
        plantingSeason: ["June-July"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "high",
        specialNotes: ["Nut crop", "Drought tolerant", "High value"]
      },
      {
        name: "Coconut",
        idealPhRange: { min: 5.5, max: 7.0 },
        plantingSeason: ["June-July"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Plantation crop", "Multiple uses", "Long term crop"]
      }
    ],
    soilCorrections: [
      {
        type: "organic",
        title: "Mulching and Organic Matter",
        description: "Apply mulch and organic matter to improve soil moisture and fertility",
        materials: ["Coconut husk", "Rice straw", "Compost", "Green manure"],
        application: [
          "Apply 5-10 cm thick mulch around plants",
          "Add 2-3 tons compost per acre annually",
          "Use green manure crops in between",
          "Maintain mulch throughout the year"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "3-6 months",
        notes: ["Improves moisture retention", "Adds organic matter", "Reduces soil erosion"]
      },
      {
        type: "cost_efficient",
        title: "Lime and Fertilizer Application",
        description: "Apply lime to correct acidity and balanced fertilizers for nutrients",
        materials: ["Agricultural lime", "NPK fertilizer", "Micronutrients"],
        application: [
          "Apply 1-2 tons lime per acre",
          "Apply balanced NPK fertilizer",
          "Add micronutrients as needed",
          "Test soil every 2-3 years"
        ],
        cost: "medium",
        effectiveness: "high",
        timeToEffect: "2-4 months",
        notes: ["Corrects soil acidity", "Provides balanced nutrition", "Improves crop yield"]
      }
    ]
  },
  {
    name: "Sandy Soil",
    description: "Light, well-drained soil with low water retention, suitable for drought-resistant crops",
    characteristics: [
      "High sand content (70-90%)",
      "Excellent drainage and aeration",
      "Low water retention capacity",
      "Low in organic matter and nutrients",
      "Warms up quickly in spring"
    ],
    idealPhRange: { min: 6.0, max: 7.5 },
    color: "Light brown to yellow",
    texture: "Sandy",
    bestCrops: [
      {
        name: "Pearl Millet (Bajra)",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["June-July"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "medium",
        specialNotes: ["Drought tolerant", "Nutritious grain", "Good for arid regions"]
      },
      {
        name: "Sorghum (Jowar)",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["June-July"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "medium",
        specialNotes: ["Drought tolerant", "Dual purpose crop", "Good for fodder"]
      },
      {
        name: "Groundnut",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["June-July"],
        waterRequirement: "low",
        yieldPotential: "medium",
        marketValue: "high",
        specialNotes: ["Oilseed crop", "Drought tolerant", "Nitrogen fixing"]
      },
      {
        name: "Watermelon",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["February-March"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Cash crop", "High water content", "Good market demand"]
      },
      {
        name: "Cucumber",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["February-March", "September-October"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "medium",
        specialNotes: ["Vegetable crop", "Short duration", "Good for intercropping"]
      }
    ],
    soilCorrections: [
      {
        type: "organic",
        title: "Organic Matter and Compost",
        description: "Add organic matter to improve water retention and soil fertility",
        materials: ["Compost", "Farmyard manure", "Green manure", "Crop residues"],
        application: [
          "Apply 10-15 tons organic matter per acre",
          "Mix with top 6 inches of soil",
          "Apply before planting season",
          "Use green manure crops in rotation"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "2-3 months",
        notes: ["Improves water retention", "Adds nutrients", "Enhances soil structure"]
      },
      {
        type: "cost_efficient",
        title: "Irrigation and Fertilizer Management",
        description: "Implement efficient irrigation and balanced fertilization",
        materials: ["Drip irrigation system", "NPK fertilizer", "Micronutrients"],
        application: [
          "Install drip irrigation for water efficiency",
          "Apply fertilizers in split doses",
          "Use slow-release fertilizers",
          "Monitor soil moisture regularly"
        ],
        cost: "medium",
        effectiveness: "high",
        timeToEffect: "1-2 months",
        notes: ["Saves water", "Improves nutrient use efficiency", "Increases yield"]
      }
    ]
  },
  {
    name: "Clayey Soil",
    description: "Heavy soil with high water retention, suitable for water-loving crops",
    characteristics: [
      "High clay content (40-60%)",
      "Excellent water retention",
      "Poor drainage and aeration",
      "Rich in nutrients",
      "Difficult to work when wet"
    ],
    idealPhRange: { min: 6.0, max: 7.5 },
    color: "Dark brown to black",
    texture: "Heavy clay",
    bestCrops: [
      {
        name: "Rice",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["Kharif (June-July)"],
        waterRequirement: "high",
        yieldPotential: "high",
        marketValue: "medium",
        specialNotes: ["Staple crop", "High water requirement", "Good for clay soil"]
      },
      {
        name: "Wheat",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["Rabi (October-November)"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Winter crop", "Good for rotation", "Staple food"]
      },
      {
        name: "Sugarcane",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["February-March"],
        waterRequirement: "high",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Cash crop", "Long duration", "High water requirement"]
      },
      {
        name: "Potato",
        idealPhRange: { min: 5.5, max: 7.0 },
        plantingSeason: ["October-November"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Vegetable crop", "High value", "Requires good drainage"]
      },
      {
        name: "Onion",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["October-November"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Vegetable crop", "High value", "Good for storage"]
      }
    ],
    soilCorrections: [
      {
        type: "organic",
        title: "Drainage and Aeration Improvement",
        description: "Improve drainage and aeration by adding organic matter and sand",
        materials: ["Compost", "Sand", "Rice husk", "Coconut coir"],
        application: [
          "Apply 5-10 tons compost per acre",
          "Add 2-3 tons sand per acre",
          "Mix rice husk or coconut coir",
          "Create raised beds for better drainage"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "2-3 months",
        notes: ["Improves drainage", "Enhances aeration", "Reduces waterlogging"]
      },
      {
        type: "cost_efficient",
        title: "Gypsum and Lime Application",
        description: "Apply gypsum to improve soil structure and lime to correct pH",
        materials: ["Gypsum", "Agricultural lime", "Water"],
        application: [
          "Apply 1-2 tons gypsum per acre",
          "Apply 500-1000 kg lime per acre",
          "Mix well with top 6 inches of soil",
          "Apply during dry season"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "3-6 months",
        notes: ["Improves soil structure", "Corrects pH", "Reduces compaction"]
      }
    ]
  },
  {
    name: "Loamy Soil",
    description: "Ideal soil type with balanced sand, silt, and clay content",
    characteristics: [
      "Balanced sand, silt, and clay content",
      "Good water retention and drainage",
      "High fertility and organic matter",
      "Easy to work with",
      "Suitable for most crops"
    ],
    idealPhRange: { min: 6.0, max: 7.5 },
    color: "Dark brown",
    texture: "Loamy",
    bestCrops: [
      {
        name: "Wheat",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["Rabi (October-November)"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Staple crop", "High yield potential", "Good for rotation"]
      },
      {
        name: "Maize",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["Kharif (June-July)", "Rabi (October-November)"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "medium",
        specialNotes: ["Versatile crop", "Good for animal feed", "Fast growing"]
      },
      {
        name: "Soybean",
        idealPhRange: { min: 6.0, max: 7.5 },
        plantingSeason: ["June-July"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Oilseed crop", "Nitrogen fixing", "Good for rotation"]
      },
      {
        name: "Tomato",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["February-March", "September-October"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Vegetable crop", "High value", "Good for processing"]
      },
      {
        name: "Chili",
        idealPhRange: { min: 6.0, max: 7.0 },
        plantingSeason: ["February-March", "September-October"],
        waterRequirement: "medium",
        yieldPotential: "high",
        marketValue: "high",
        specialNotes: ["Spice crop", "High value", "Good for export"]
      }
    ],
    soilCorrections: [
      {
        type: "organic",
        title: "Maintain Soil Health",
        description: "Maintain soil health through regular organic matter addition and crop rotation",
        materials: ["Compost", "Green manure", "Crop residues", "Biofertilizers"],
        application: [
          "Apply 5-10 tons compost per acre annually",
          "Use green manure crops in rotation",
          "Incorporate crop residues",
          "Apply biofertilizers as needed"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "2-3 months",
        notes: ["Maintains soil fertility", "Improves soil structure", "Sustainable farming"]
      },
      {
        type: "cost_efficient",
        title: "Balanced Fertilization",
        description: "Apply balanced fertilizers based on soil test recommendations",
        materials: ["NPK fertilizer", "Micronutrients", "Soil test kit"],
        application: [
          "Test soil every 2-3 years",
          "Apply fertilizers based on test results",
          "Use split application method",
          "Monitor crop response"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "1-2 weeks",
        notes: ["Optimizes nutrient use", "Increases yield", "Reduces waste"]
      }
    ]
  }
];

// Soil Analysis Engine
export class SoilAnalysisEngine {
  private soilDatabase: SoilType[];

  constructor() {
    this.soilDatabase = SOIL_DATABASE;
  }

  // Analyze soil type and pH to provide recommendations
  analyzeSoil(soilTypeName: string, phValue?: number): SoilAnalysisResult {
    const soilType = this.soilDatabase.find(soil => 
      soil.name.toLowerCase() === soilTypeName.toLowerCase()
    );

    if (!soilType) {
      throw new Error(`Soil type "${soilTypeName}" not found in database`);
    }

    const phStatus = this.determinePhStatus(soilType.idealPhRange, phValue);
    const recommendedCrops = this.getRecommendedCrops(soilType, phValue);
    const soilCorrections = this.getSoilCorrections(soilType, phStatus);
    const timelineIntegration = this.getTimelineIntegration(recommendedCrops);
    const diseasePrevention = this.getDiseasePreventionTips(soilType);
    const yieldOptimization = this.getYieldOptimizationTips(soilType);

    return {
      soilType,
      currentPh: phValue,
      phStatus,
      recommendedCrops,
      soilCorrections,
      timelineIntegration,
      diseasePrevention,
      yieldOptimization
    };
  }

  private determinePhStatus(idealRange: { min: number; max: number }, phValue?: number): "optimal" | "too_acidic" | "too_alkaline" | "unknown" {
    if (phValue === undefined) return "unknown";
    
    if (phValue >= idealRange.min && phValue <= idealRange.max) {
      return "optimal";
    } else if (phValue < idealRange.min) {
      return "too_acidic";
    } else {
      return "too_alkaline";
    }
  }

  private getRecommendedCrops(soilType: SoilType, phValue?: number): CropRecommendation[] {
    if (phValue === undefined) {
      return soilType.bestCrops;
    }

    return soilType.bestCrops.filter(crop => 
      phValue >= crop.idealPhRange.min && phValue <= crop.idealPhRange.max
    );
  }

  private getSoilCorrections(soilType: SoilType, phStatus: string): any {
    const corrections = {
      immediate: [] as SoilCorrection[],
      organic: [] as SoilCorrection[],
      costEfficient: [] as SoilCorrection[],
      longTerm: [] as SoilCorrection[]
    };

    soilType.soilCorrections.forEach(correction => {
      const correctionType = correction.type === "cost_efficient" ? "costEfficient" : 
                            correction.type === "long_term" ? "longTerm" : 
                            correction.type;
      corrections[correctionType as keyof typeof corrections].push(correction);
    });

    // Add pH-specific corrections
    if (phStatus === "too_acidic") {
      corrections.immediate.push({
        type: "immediate",
        title: "Lime Application",
        description: "Apply lime to quickly raise soil pH",
        materials: ["Agricultural lime", "Water"],
        application: [
          "Apply 500-1000 kg per acre",
          "Spread evenly before plowing",
          "Mix well with soil",
          "Water after application"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "2-4 weeks",
        notes: ["Quick pH correction", "Improves nutrient availability", "Follow soil test recommendations"]
      });
    } else if (phStatus === "too_alkaline") {
      corrections.immediate.push({
        type: "immediate",
        title: "Sulfur Application",
        description: "Apply sulfur to quickly lower soil pH",
        materials: ["Elemental sulfur", "Water"],
        application: [
          "Apply 100-200 kg per acre",
          "Spread evenly before plowing",
          "Mix well with soil",
          "Water after application"
        ],
        cost: "low",
        effectiveness: "high",
        timeToEffect: "2-4 weeks",
        notes: ["Quick pH correction", "Improves nutrient availability", "Follow soil test recommendations"]
      });
    }

    return corrections;
  }

  private getTimelineIntegration(crops: CropRecommendation[]): any {
    const suggestedCrops = crops.map(crop => crop.name);
    const plantingSchedule = crops.flatMap(crop => crop.plantingSeason);
    const soilPreparation = [
      "Test soil pH and nutrients",
      "Apply recommended soil corrections",
      "Prepare seedbeds",
      "Plan irrigation schedule",
      "Arrange seeds and fertilizers"
    ];

    return {
      suggestedCrops,
      plantingSchedule: [...new Set(plantingSchedule)],
      soilPreparation
    };
  }

  private getDiseasePreventionTips(soilType: SoilType): string[] {
    const tips = [
      "Practice crop rotation to break disease cycles",
      "Use disease-resistant varieties when available",
      "Maintain proper soil drainage to prevent waterlogging",
      "Apply organic matter to improve soil health",
      "Monitor crops regularly for early disease detection",
      "Clean farm equipment between fields",
      "Remove and destroy infected plant debris"
    ];

    // Add soil-specific tips
    if (soilType.name === "Clayey Soil") {
      tips.push("Improve drainage to prevent root rot diseases");
    } else if (soilType.name === "Sandy Soil") {
      tips.push("Maintain soil moisture to prevent drought stress");
    }

    return tips;
  }

  private getYieldOptimizationTips(soilType: SoilType): string[] {
    const tips = [
      "Test soil regularly and apply fertilizers based on recommendations",
      "Use high-quality seeds and planting material",
      "Implement proper irrigation management",
      "Control weeds, pests, and diseases effectively",
      "Harvest at the right time for maximum quality",
      "Practice proper post-harvest handling",
      "Keep records of farming practices and yields"
    ];

    // Add soil-specific tips
    if (soilType.name === "Alluvial Soil") {
      tips.push("Take advantage of high fertility with intensive cropping");
    } else if (soilType.name === "Sandy Soil") {
      tips.push("Use mulching to conserve soil moisture");
    } else if (soilType.name === "Clayey Soil") {
      tips.push("Improve soil structure with organic matter");
    }

    return tips;
  }

  // Get all available soil types
  getAvailableSoilTypes(): string[] {
    return this.soilDatabase.map(soil => soil.name);
  }

  // Get soil type details
  getSoilTypeDetails(soilTypeName: string): SoilType | undefined {
    return this.soilDatabase.find(soil => 
      soil.name.toLowerCase() === soilTypeName.toLowerCase()
    );
  }
}

// Export singleton instance
export const soilAnalysisEngine = new SoilAnalysisEngine();
