// Growth Stage Database for Krishinetra Agro Assist
// Comprehensive crop growth stages with durations, tips, and AI integration

export interface GrowthStage {
  id: string;
  name: string;
  emoji: string;
  description: string;
  duration: number; // in days
  keyCharacteristics: string[];
  tips: {
    irrigation: string[];
    fertilization: string[];
    pruning: string[];
    diseasePrevention: string[];
    general: string[];
  };
  aiIndicators: {
    visualCues: string[];
    leafCount?: { min: number; max: number };
    heightRange?: { min: number; max: number }; // in cm
    fruitPresence?: boolean;
    flowerPresence?: boolean;
  };
  nextStage?: string;
  criticalActions: string[];
  warnings: string[];
}

export interface CropType {
  id: string;
  name: string;
  scientificName: string;
  totalDuration: number; // in days
  stages: GrowthStage[];
  optimalConditions: {
    temperature: { min: number; max: number };
    humidity: { min: number; max: number };
    soilType: string[];
    waterRequirement: "low" | "medium" | "high";
  };
  commonDiseases: string[];
  yieldFactors: string[];
}

export interface GrowthAnalysis {
  currentStage: GrowthStage;
  nextStage: GrowthStage | null;
  daysInCurrentStage: number;
  daysUntilNextStage: number;
  progressPercentage: number;
  stageSpecificRecommendations: {
    irrigation: string[];
    fertilization: string[];
    pruning: string[];
    diseasePrevention: string[];
    general: string[];
  };
  criticalActions: string[];
  warnings: string[];
  aiConfidence: number;
  visualAnalysis?: {
    detectedCharacteristics: string[];
    confidence: number;
    recommendations: string[];
  };
}

// Growth Stages Database
export const GROWTH_STAGES: { [key: string]: GrowthStage } = {
  germination: {
    id: "germination",
    name: "Germination",
    emoji: "🌱",
    description: "Seed begins to sprout and develop roots",
    duration: 7,
    keyCharacteristics: [
      "Seed coat breaks open",
      "First root (radicle) emerges",
      "First shoot (plumule) appears",
      "Cotyledons become visible"
    ],
    tips: {
      irrigation: [
        "Keep soil consistently moist but not waterlogged",
        "Use fine mist or gentle watering to avoid disturbing seeds",
        "Water 2-3 times daily in small amounts"
      ],
      fertilization: [
        "No fertilizer needed at this stage",
        "Seeds contain enough nutrients for initial growth",
        "Focus on soil preparation instead"
      ],
      pruning: [
        "No pruning required",
        "Allow natural growth to establish"
      ],
      diseasePrevention: [
        "Use disease-free seeds",
        "Ensure good soil drainage",
        "Avoid overwatering to prevent damping off"
      ],
      general: [
        "Maintain optimal soil temperature (20-25°C)",
        "Provide adequate light (12-16 hours daily)",
        "Protect from extreme weather conditions"
      ]
    },
    aiIndicators: {
      visualCues: [
        "Seed coat splitting",
        "White root emerging from seed",
        "Green shoot breaking through soil",
        "Cotyledons unfurling"
      ],
      heightRange: { min: 0, max: 2 }
    },
    nextStage: "seedling",
    criticalActions: [
      "Monitor soil moisture daily",
      "Check for uniform germination",
      "Remove any moldy or diseased seeds"
    ],
    warnings: [
      "Overwatering can cause damping off disease",
      "Cold soil temperatures delay germination",
      "Insufficient light causes weak, leggy growth"
    ]
  },

  seedling: {
    id: "seedling",
    name: "Seedling",
    emoji: "🌿",
    description: "Young plant develops first true leaves and establishes root system",
    duration: 14,
    keyCharacteristics: [
      "First true leaves appear",
      "Root system begins to develop",
      "Stem becomes more defined",
      "Plant height increases rapidly"
    ],
    tips: {
      irrigation: [
        "Water when top 1cm of soil feels dry",
        "Use bottom watering to encourage deep root growth",
        "Avoid wetting leaves to prevent disease"
      ],
      fertilization: [
        "Begin with diluted liquid fertilizer (1/4 strength)",
        "Apply nitrogen-rich fertilizer weekly",
        "Use organic options like fish emulsion or compost tea"
      ],
      pruning: [
        "Remove any damaged or diseased leaves",
        "Pinch back leggy growth to encourage bushiness"
      ],
      diseasePrevention: [
        "Ensure good air circulation",
        "Water at soil level, not on leaves",
        "Use clean, sterilized tools"
      ],
      general: [
        "Provide 14-16 hours of light daily",
        "Maintain temperature between 18-24°C",
        "Begin hardening off for outdoor planting"
      ]
    },
    aiIndicators: {
      visualCues: [
        "True leaves larger than cotyledons",
        "Stem thickening and strengthening",
        "Root system visible at container edges",
        "Overall plant vigor and green color"
      ],
      leafCount: { min: 2, max: 6 },
      heightRange: { min: 2, max: 8 }
    },
    nextStage: "vegetative",
    criticalActions: [
      "Begin hardening off process",
      "Transplant when roots fill container",
      "Monitor for pest damage"
    ],
    warnings: [
      "Leggy growth indicates insufficient light",
      "Yellowing leaves may indicate overwatering",
      "Stunted growth suggests nutrient deficiency"
    ]
  },

  vegetative: {
    id: "vegetative",
    name: "Vegetative Growth",
    emoji: "🌾",
    description: "Rapid leaf and stem growth, plant establishes strong structure",
    duration: 30,
    keyCharacteristics: [
      "Rapid leaf production",
      "Stem elongation and thickening",
      "Branch development begins",
      "Root system expands significantly"
    ],
    tips: {
      irrigation: [
        "Water deeply but less frequently",
        "Allow soil to dry slightly between waterings",
        "Use drip irrigation for efficiency"
      ],
      fertilization: [
        "Apply balanced NPK fertilizer every 2 weeks",
        "Increase nitrogen for leafy crops",
        "Use slow-release fertilizers for convenience"
      ],
      pruning: [
        "Remove lower leaves that touch soil",
        "Pinch growing tips to encourage branching",
        "Remove suckers and water sprouts"
      ],
      diseasePrevention: [
        "Maintain proper plant spacing",
        "Rotate crops to prevent disease buildup",
        "Use mulch to prevent soil splash"
      ],
      general: [
        "Provide support structures for climbing plants",
        "Monitor for pest infestations",
        "Ensure adequate space for growth"
      ]
    },
    aiIndicators: {
      visualCues: [
        "Multiple sets of true leaves",
        "Stem thickening and strengthening",
        "Branch development",
        "Overall plant size increase"
      ],
      leafCount: { min: 6, max: 20 },
      heightRange: { min: 8, max: 30 }
    },
    nextStage: "flowering",
    criticalActions: [
      "Install support structures",
      "Begin pest monitoring program",
      "Prepare for flowering phase"
    ],
    warnings: [
      "Excessive nitrogen delays flowering",
      "Insufficient light causes weak growth",
      "Overcrowding increases disease risk"
    ]
  },

  flowering: {
    id: "flowering",
    name: "Flowering",
    emoji: "🌸",
    description: "Plant produces flowers and begins reproductive phase",
    duration: 21,
    keyCharacteristics: [
      "First flower buds appear",
      "Flowers open and become visible",
      "Pollination occurs",
      "Plant energy shifts to reproduction"
    ],
    tips: {
      irrigation: [
        "Maintain consistent soil moisture",
        "Avoid wetting flowers to prevent disease",
        "Increase watering frequency if needed"
      ],
      fertilization: [
        "Switch to phosphorus-rich fertilizer",
        "Reduce nitrogen to encourage flowering",
        "Apply bloom booster every 2 weeks"
      ],
      pruning: [
        "Remove spent flowers to encourage more blooms",
        "Prune excessive foliage to improve air circulation",
        "Remove any diseased or damaged parts"
      ],
      diseasePrevention: [
        "Monitor for flower-specific diseases",
        "Ensure good air circulation around flowers",
        "Avoid overhead watering during flowering"
      ],
      general: [
        "Provide adequate pollination support",
        "Protect from extreme weather",
        "Monitor for pest damage to flowers"
      ]
    },
    aiIndicators: {
      visualCues: [
        "Flower buds forming",
        "Open flowers visible",
        "Pollen production",
        "Flower color and shape development"
      ],
      flowerPresence: true,
      heightRange: { min: 20, max: 50 }
    },
    nextStage: "fruiting",
    criticalActions: [
      "Ensure proper pollination",
      "Monitor flower health daily",
      "Prepare for fruit development"
    ],
    warnings: [
      "Poor pollination reduces fruit set",
      "Extreme temperatures can damage flowers",
      "Pest damage to flowers affects yield"
    ]
  },

  fruiting: {
    id: "fruiting",
    name: "Fruiting",
    emoji: "🍅",
    description: "Fruits develop and mature, plant focuses energy on reproduction",
    duration: 35,
    keyCharacteristics: [
      "Small fruits begin to form",
      "Fruits grow and develop",
      "Seeds mature inside fruits",
      "Fruit color and size change"
    ],
    tips: {
      irrigation: [
        "Maintain consistent moisture for fruit development",
        "Water deeply to reach root zone",
        "Avoid water stress during fruit growth"
      ],
      fertilization: [
        "Apply potassium-rich fertilizer",
        "Use calcium supplements to prevent blossom end rot",
        "Reduce nitrogen to focus on fruit quality"
      ],
      pruning: [
        "Remove excess foliage to improve fruit exposure",
        "Support heavy fruit with stakes or cages",
        "Remove any diseased fruits immediately"
      ],
      diseasePrevention: [
        "Monitor for fruit-specific diseases",
        "Use organic fungicides if needed",
        "Ensure proper fruit spacing"
      ],
      general: [
        "Support heavy fruit clusters",
        "Monitor fruit development daily",
        "Protect from birds and animals"
      ]
    },
    aiIndicators: {
      visualCues: [
        "Small fruits visible",
        "Fruit size increasing",
        "Fruit color development",
        "Fruit shape and texture changes"
      ],
      fruitPresence: true,
      heightRange: { min: 30, max: 80 }
    },
    nextStage: "maturity",
    criticalActions: [
      "Support heavy fruit clusters",
      "Monitor fruit development",
      "Prepare for harvest"
    ],
    warnings: [
      "Inconsistent watering causes fruit cracking",
      "Calcium deficiency causes blossom end rot",
      "Pest damage affects fruit quality"
    ]
  },

  maturity: {
    id: "maturity",
    name: "Maturity",
    emoji: "🌻",
    description: "Fruits reach full size and optimal ripeness for harvest",
    duration: 14,
    keyCharacteristics: [
      "Fruits reach full size",
      "Optimal ripeness achieved",
      "Seeds fully developed",
      "Plant begins to decline"
    ],
    tips: {
      irrigation: [
        "Reduce watering frequency",
        "Allow soil to dry slightly between waterings",
        "Stop watering 2-3 days before harvest"
      ],
      fertilization: [
        "Stop fertilizing to allow natural ripening",
        "Apply final potassium boost if needed",
        "Focus on fruit quality over growth"
      ],
      pruning: [
        "Remove any remaining diseased parts",
        "Clean up plant debris",
        "Prepare for harvest"
      ],
      diseasePrevention: [
        "Monitor for late-season diseases",
        "Remove any infected fruits immediately",
        "Maintain clean growing area"
      ],
      general: [
        "Check ripeness daily",
        "Harvest at optimal time",
        "Prepare for next growing cycle"
      ]
    },
    aiIndicators: {
      visualCues: [
        "Fruits at full size",
        "Proper color development",
        "Firm but ripe texture",
        "Mature seed development"
      ],
      fruitPresence: true,
      heightRange: { min: 40, max: 100 }
    },
    nextStage: "harvest",
    criticalActions: [
      "Monitor ripeness daily",
      "Harvest at optimal time",
      "Prepare for post-harvest care"
    ],
    warnings: [
      "Overripe fruits lose quality",
      "Delayed harvest increases disease risk",
      "Weather damage affects fruit quality"
    ]
  },

  harvest: {
    id: "harvest",
    name: "Harvest",
    emoji: "🧺",
    description: "Fruits are harvested and plant cycle completes",
    duration: 7,
    keyCharacteristics: [
      "Fruits harvested at peak ripeness",
      "Plant energy shifts to seed production",
      "Leaves begin to yellow and die",
      "Root system begins to decline"
    ],
    tips: {
      irrigation: [
        "Minimal watering needed",
        "Allow plant to naturally decline",
        "Water only if extremely dry"
      ],
      fertilization: [
        "No fertilization needed",
        "Allow plant to use remaining nutrients",
        "Prepare soil for next crop"
      ],
      pruning: [
        "Remove spent plant material",
        "Clean up all debris",
        "Prepare for soil preparation"
      ],
      diseasePrevention: [
        "Remove all plant debris",
        "Clean and sanitize tools",
        "Prepare for crop rotation"
      ],
      general: [
        "Harvest all remaining fruits",
        "Collect seeds if desired",
        "Prepare for next growing season"
      ]
    },
    aiIndicators: {
      visualCues: [
        "Fruits ready for harvest",
        "Plant showing signs of decline",
        "Leaves yellowing and dying",
        "Overall plant maturity"
      ],
      fruitPresence: true,
      heightRange: { min: 40, max: 100 }
    },
    criticalActions: [
      "Complete harvest",
      "Clean up plant debris",
      "Prepare for next crop"
    ],
    warnings: [
      "Delayed harvest reduces quality",
      "Leaving debris increases disease risk",
      "Poor cleanup affects next crop"
    ]
  }
};

// Crop Types Database
export const CROP_TYPES: { [key: string]: CropType } = {
  tomato: {
    id: "tomato",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    totalDuration: 120,
    stages: [
      GROWTH_STAGES.germination,
      GROWTH_STAGES.seedling,
      GROWTH_STAGES.vegetative,
      GROWTH_STAGES.flowering,
      GROWTH_STAGES.fruiting,
      GROWTH_STAGES.maturity,
      GROWTH_STAGES.harvest
    ],
    optimalConditions: {
      temperature: { min: 18, max: 30 },
      humidity: { min: 60, max: 80 },
      soilType: ["loamy", "sandy loam", "clay loam"],
      waterRequirement: "medium"
    },
    commonDiseases: ["Late Blight", "Early Blight", "Bacterial Wilt", "Fusarium Wilt"],
    yieldFactors: ["Pruning", "Staking", "Pollination", "Disease Control"]
  },

  wheat: {
    id: "wheat",
    name: "Wheat",
    scientificName: "Triticum aestivum",
    totalDuration: 150,
    stages: [
      GROWTH_STAGES.germination,
      GROWTH_STAGES.seedling,
      GROWTH_STAGES.vegetative,
      GROWTH_STAGES.flowering,
      GROWTH_STAGES.fruiting,
      GROWTH_STAGES.maturity,
      GROWTH_STAGES.harvest
    ],
    optimalConditions: {
      temperature: { min: 15, max: 25 },
      humidity: { min: 50, max: 70 },
      soilType: ["loamy", "clay loam", "silty loam"],
      waterRequirement: "medium"
    },
    commonDiseases: ["Rust", "Powdery Mildew", "Fusarium Head Blight", "Septoria"],
    yieldFactors: ["Nitrogen Application", "Planting Density", "Disease Control", "Harvest Timing"]
  },

  rice: {
    id: "rice",
    name: "Rice",
    scientificName: "Oryza sativa",
    totalDuration: 120,
    stages: [
      GROWTH_STAGES.germination,
      GROWTH_STAGES.seedling,
      GROWTH_STAGES.vegetative,
      GROWTH_STAGES.flowering,
      GROWTH_STAGES.fruiting,
      GROWTH_STAGES.maturity,
      GROWTH_STAGES.harvest
    ],
    optimalConditions: {
      temperature: { min: 20, max: 35 },
      humidity: { min: 70, max: 90 },
      soilType: ["clay", "clay loam", "silty clay"],
      waterRequirement: "high"
    },
    commonDiseases: ["Bacterial Blight", "Rice Blast", "Sheath Blight", "Brown Spot"],
    yieldFactors: ["Water Management", "Nitrogen Timing", "Planting Method", "Disease Control"]
  },

  corn: {
    id: "corn",
    name: "Corn",
    scientificName: "Zea mays",
    totalDuration: 100,
    stages: [
      GROWTH_STAGES.germination,
      GROWTH_STAGES.seedling,
      GROWTH_STAGES.vegetative,
      GROWTH_STAGES.flowering,
      GROWTH_STAGES.fruiting,
      GROWTH_STAGES.maturity,
      GROWTH_STAGES.harvest
    ],
    optimalConditions: {
      temperature: { min: 18, max: 30 },
      humidity: { min: 60, max: 80 },
      soilType: ["loamy", "sandy loam", "clay loam"],
      waterRequirement: "medium"
    },
    commonDiseases: ["Corn Smut", "Rust", "Gray Leaf Spot", "Northern Corn Leaf Blight"],
    yieldFactors: ["Planting Density", "Pollination", "Nitrogen Management", "Disease Control"]
  }
};

// AI Analysis Engine for Growth Stages
export class GrowthAnalysisEngine {
  private cropTypes: { [key: string]: CropType };

  constructor() {
    this.cropTypes = CROP_TYPES;
  }

  // Analyze current growth stage based on farmer input and AI image analysis
  analyzeGrowthStage(
    cropType: string,
    sowingDate: Date,
    currentDate: Date,
    farmerObservations: string[],
    imageAnalysis?: {
      detectedCharacteristics: string[];
      confidence: number;
      leafCount?: number;
      height?: number;
      hasFlowers?: boolean;
      hasFruits?: boolean;
    }
  ): GrowthAnalysis {
    const crop = this.cropTypes[cropType];
    if (!crop) {
      throw new Error(`Crop type ${cropType} not found`);
    }

    const daysSinceSowing = Math.floor((currentDate.getTime() - sowingDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentStage = this.determineCurrentStage(crop, daysSinceSowing, imageAnalysis);
    const nextStage = this.getNextStage(crop, currentStage);
    const daysInCurrentStage = this.calculateDaysInCurrentStage(crop, currentStage, daysSinceSowing);
    const daysUntilNextStage = this.calculateDaysUntilNextStage(crop, currentStage, daysInCurrentStage);
    const progressPercentage = this.calculateProgressPercentage(crop, currentStage, daysInCurrentStage);

    const stageSpecificRecommendations = this.generateStageRecommendations(currentStage, farmerObservations);
    const criticalActions = this.getCriticalActions(currentStage, daysInCurrentStage);
    const warnings = this.getWarnings(currentStage, farmerObservations, imageAnalysis);

    const aiConfidence = this.calculateAIConfidence(imageAnalysis, currentStage, farmerObservations);

    return {
      currentStage,
      nextStage,
      daysInCurrentStage,
      daysUntilNextStage,
      progressPercentage,
      stageSpecificRecommendations,
      criticalActions,
      warnings,
      aiConfidence,
      visualAnalysis: imageAnalysis ? {
        detectedCharacteristics: imageAnalysis.detectedCharacteristics,
        confidence: imageAnalysis.confidence,
        recommendations: this.generateVisualRecommendations(imageAnalysis, currentStage)
      } : undefined
    };
  }

  private determineCurrentStage(crop: CropType, daysSinceSowing: number, imageAnalysis?: any): GrowthStage {
    let cumulativeDays = 0;
    
    for (const stage of crop.stages) {
      cumulativeDays += stage.duration;
      if (daysSinceSowing <= cumulativeDays) {
        return stage;
      }
    }
    
    // If beyond all stages, return harvest stage
    return GROWTH_STAGES.harvest;
  }

  private getNextStage(crop: CropType, currentStage: GrowthStage): GrowthStage | null {
    const currentIndex = crop.stages.findIndex(stage => stage.id === currentStage.id);
    if (currentIndex < crop.stages.length - 1) {
      return crop.stages[currentIndex + 1];
    }
    return null;
  }

  private calculateDaysInCurrentStage(crop: CropType, currentStage: GrowthStage, daysSinceSowing: number): number {
    let cumulativeDays = 0;
    
    for (const stage of crop.stages) {
      if (stage.id === currentStage.id) {
        return Math.min(daysSinceSowing - cumulativeDays, stage.duration);
      }
      cumulativeDays += stage.duration;
    }
    
    return 0;
  }

  private calculateDaysUntilNextStage(crop: CropType, currentStage: GrowthStage, daysInCurrentStage: number): number {
    return Math.max(0, currentStage.duration - daysInCurrentStage);
  }

  private calculateProgressPercentage(crop: CropType, currentStage: GrowthStage, daysInCurrentStage: number): number {
    return Math.min(100, Math.round((daysInCurrentStage / currentStage.duration) * 100));
  }

  private generateStageRecommendations(stage: GrowthStage, observations: string[]): any {
    // Customize recommendations based on farmer observations
    const recommendations = { ...stage.tips };
    
    // Add specific recommendations based on observations
    if (observations.some(obs => obs.toLowerCase().includes('yellow'))) {
      recommendations.fertilization.push("Yellowing leaves may indicate nitrogen deficiency - apply nitrogen-rich fertilizer");
    }
    
    if (observations.some(obs => obs.toLowerCase().includes('dry'))) {
      recommendations.irrigation.push("Increase watering frequency - soil appears too dry");
    }
    
    if (observations.some(obs => obs.toLowerCase().includes('pest'))) {
      recommendations.diseasePrevention.push("Monitor for pest damage and apply appropriate control measures");
    }
    
    return recommendations;
  }

  private getCriticalActions(stage: GrowthStage, daysInCurrentStage: number): string[] {
    const actions = [...stage.criticalActions];
    
    // Add time-sensitive actions
    if (daysInCurrentStage > stage.duration * 0.8) {
      actions.push("Prepare for next growth stage");
    }
    
    return actions;
  }

  private getWarnings(stage: GrowthStage, observations: string[], imageAnalysis?: any): string[] {
    const warnings = [...stage.warnings];
    
    // Add AI-based warnings
    if (imageAnalysis && imageAnalysis.confidence < 0.7) {
      warnings.push("AI analysis confidence is low - verify growth stage manually");
    }
    
    // Add observation-based warnings
    if (observations.some(obs => obs.toLowerCase().includes('disease'))) {
      warnings.push("Disease symptoms detected - take immediate action");
    }
    
    return warnings;
  }

  private calculateAIConfidence(imageAnalysis: any, currentStage: GrowthStage, observations: string[]): number {
    let confidence = 0.5; // Base confidence
    
    if (imageAnalysis) {
      confidence += imageAnalysis.confidence * 0.4;
    }
    
    // Increase confidence if observations match stage characteristics
    const matchingObservations = observations.filter(obs => 
      currentStage.keyCharacteristics.some(char => 
        obs.toLowerCase().includes(char.toLowerCase())
      )
    ).length;
    
    confidence += (matchingObservations / observations.length) * 0.3;
    
    return Math.min(1, Math.max(0, confidence));
  }

  private generateVisualRecommendations(imageAnalysis: any, currentStage: GrowthStage): string[] {
    const recommendations = [];
    
    if (imageAnalysis.leafCount && currentStage.aiIndicators.leafCount) {
      const { min, max } = currentStage.aiIndicators.leafCount;
      if (imageAnalysis.leafCount < min) {
        recommendations.push("Plant appears to be in earlier growth stage - check for proper care");
      } else if (imageAnalysis.leafCount > max) {
        recommendations.push("Plant may be in later growth stage - verify current stage");
      }
    }
    
    if (imageAnalysis.hasFlowers && !currentStage.aiIndicators.flowerPresence) {
      recommendations.push("Flowers detected but not expected at this stage - verify growth stage");
    }
    
    if (imageAnalysis.hasFruits && !currentStage.aiIndicators.fruitPresence) {
      recommendations.push("Fruits detected but not expected at this stage - verify growth stage");
    }
    
    return recommendations;
  }

  // Get all available crop types
  getAvailableCrops(): CropType[] {
    return Object.values(this.cropTypes);
  }

  // Get crop by ID
  getCropById(id: string): CropType | null {
    return this.cropTypes[id] || null;
  }
}

// Export singleton instance
export const growthAnalysisEngine = new GrowthAnalysisEngine();
