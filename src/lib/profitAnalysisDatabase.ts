// Comprehensive Profit Analysis Database for Krishinetra Agro Assist
// Contains crop data with cost of cultivation, yield estimates, and market prices

export interface CropProfitData {
  name: string;
  emoji: string;
  costPerAcre: {
    seeds: number;
    fertilizers: number;
    irrigation: number;
    labor: number;
    pesticides: number;
    other: number;
    total: number;
  };
  yieldPerAcre: {
    min: number; // quintals
    max: number; // quintals
    average: number; // quintals
  };
  marketPrice: {
    min: number; // per quintal
    max: number; // per quintal
    average: number; // per quintal
  };
  growingPeriod: {
    min: number; // days
    max: number; // days
    average: number; // days
  };
  riskFactors: string[];
  organicSavings: number; // percentage savings with organic farming
  soilTypes: string[]; // compatible soil types
  seasons: string[];
  specialNotes: string[];
}

export interface ProfitAnalysisResult {
  crop: CropProfitData;
  landSize: number; // acres
  totalCost: number;
  expectedYield: number; // quintals
  totalIncome: number;
  netProfit: number;
  profitMargin: number; // percentage
  riskLevel: "low" | "medium" | "high";
  riskFactors: string[];
  organicSavings: number;
  recommendations: string[];
}

// Comprehensive Crop Profit Database
export const CROP_PROFIT_DATABASE: CropProfitData[] = [
  {
    name: "Wheat",
    emoji: "🌾",
    costPerAcre: {
      seeds: 2000,
      fertilizers: 3000,
      irrigation: 1500,
      labor: 2500,
      pesticides: 800,
      other: 700,
      total: 10500
    },
    yieldPerAcre: {
      min: 15,
      max: 35,
      average: 25
    },
    marketPrice: {
      min: 2000,
      max: 2800,
      average: 2400
    },
    growingPeriod: {
      min: 120,
      max: 150,
      average: 135
    },
    riskFactors: ["Weather dependency", "Pest attacks", "Market price fluctuations"],
    organicSavings: 15,
    soilTypes: ["Alluvial Soil", "Black Soil", "Loamy Soil", "Clayey Soil"],
    seasons: ["Rabi (October-November)"],
    specialNotes: ["Staple crop", "High demand", "Good for rotation", "Government support"]
  },
  {
    name: "Rice",
    emoji: "🍚",
    costPerAcre: {
      seeds: 1500,
      fertilizers: 4000,
      irrigation: 3000,
      labor: 4000,
      pesticides: 1200,
      other: 800,
      total: 14500
    },
    yieldPerAcre: {
      min: 20,
      max: 50,
      average: 35
    },
    marketPrice: {
      min: 1800,
      max: 2500,
      average: 2150
    },
    growingPeriod: {
      min: 120,
      max: 150,
      average: 135
    },
    riskFactors: ["Water availability", "Flood risk", "High input costs"],
    organicSavings: 20,
    soilTypes: ["Alluvial Soil", "Clayey Soil", "Loamy Soil"],
    seasons: ["Kharif (June-July)", "Rabi (November-December)"],
    specialNotes: ["Staple food", "High water requirement", "Government procurement"]
  },
  {
    name: "Tomato",
    emoji: "🍅",
    costPerAcre: {
      seeds: 3000,
      fertilizers: 5000,
      irrigation: 4000,
      labor: 6000,
      pesticides: 2000,
      other: 2000,
      total: 22000
    },
    yieldPerAcre: {
      min: 200,
      max: 400,
      average: 300
    },
    marketPrice: {
      min: 15,
      max: 50,
      average: 25
    },
    growingPeriod: {
      min: 90,
      max: 120,
      average: 105
    },
    riskFactors: ["Price volatility", "Disease susceptibility", "Perishable nature"],
    organicSavings: 25,
    soilTypes: ["Loamy Soil", "Alluvial Soil", "Red Soil"],
    seasons: ["February-March", "September-October"],
    specialNotes: ["High value crop", "Short duration", "Good for processing"]
  },
  {
    name: "Cotton",
    emoji: "🌱",
    costPerAcre: {
      seeds: 4000,
      fertilizers: 6000,
      irrigation: 5000,
      labor: 8000,
      pesticides: 3000,
      other: 2000,
      total: 28000
    },
    yieldPerAcre: {
      min: 8,
      max: 20,
      average: 14
    },
    marketPrice: {
      min: 5000,
      max: 8000,
      average: 6500
    },
    growingPeriod: {
      min: 150,
      max: 180,
      average: 165
    },
    riskFactors: ["Pest attacks", "Weather dependency", "Market price fluctuations"],
    organicSavings: 30,
    soilTypes: ["Black Soil", "Alluvial Soil", "Loamy Soil"],
    seasons: ["April-May"],
    specialNotes: ["Cash crop", "High value", "Export potential", "Long duration"]
  },
  {
    name: "Sugarcane",
    emoji: "🎋",
    costPerAcre: {
      seeds: 8000,
      fertilizers: 10000,
      irrigation: 8000,
      labor: 12000,
      pesticides: 2000,
      other: 3000,
      total: 43000
    },
    yieldPerAcre: {
      min: 300,
      max: 500,
      average: 400
    },
    marketPrice: {
      min: 250,
      max: 350,
      average: 300
    },
    growingPeriod: {
      min: 300,
      max: 365,
      average: 330
    },
    riskFactors: ["Long duration", "High initial investment", "Water requirement"],
    organicSavings: 20,
    soilTypes: ["Alluvial Soil", "Black Soil", "Loamy Soil", "Clayey Soil"],
    seasons: ["February-March", "October-November"],
    specialNotes: ["Cash crop", "Long duration", "Sugar industry", "Government support"]
  },
  {
    name: "Maize",
    emoji: "🌽",
    costPerAcre: {
      seeds: 2500,
      fertilizers: 4000,
      irrigation: 3000,
      labor: 3500,
      pesticides: 1500,
      other: 1000,
      total: 15500
    },
    yieldPerAcre: {
      min: 25,
      max: 50,
      average: 37
    },
    marketPrice: {
      min: 1500,
      max: 2200,
      average: 1850
    },
    growingPeriod: {
      min: 90,
      max: 120,
      average: 105
    },
    riskFactors: ["Weather dependency", "Pest attacks", "Market price fluctuations"],
    organicSavings: 18,
    soilTypes: ["Alluvial Soil", "Loamy Soil", "Black Soil"],
    seasons: ["Kharif (June-July)", "Rabi (October-November)"],
    specialNotes: ["Versatile crop", "Animal feed", "Fast growing", "Multiple uses"]
  },
  {
    name: "Soybean",
    emoji: "🫘",
    costPerAcre: {
      seeds: 2000,
      fertilizers: 3000,
      irrigation: 2000,
      labor: 2500,
      pesticides: 1000,
      other: 500,
      total: 11000
    },
    yieldPerAcre: {
      min: 12,
      max: 25,
      average: 18
    },
    marketPrice: {
      min: 3500,
      max: 5000,
      average: 4250
    },
    growingPeriod: {
      min: 90,
      max: 120,
      average: 105
    },
    riskFactors: ["Weather dependency", "Market price fluctuations", "Pest attacks"],
    organicSavings: 22,
    soilTypes: ["Black Soil", "Alluvial Soil", "Loamy Soil"],
    seasons: ["June-July"],
    specialNotes: ["Oilseed crop", "Nitrogen fixing", "Export potential", "High protein"]
  },
  {
    name: "Potato",
    emoji: "🥔",
    costPerAcre: {
      seeds: 8000,
      fertilizers: 5000,
      irrigation: 3000,
      labor: 6000,
      pesticides: 2000,
      other: 2000,
      total: 26000
    },
    yieldPerAcre: {
      min: 150,
      max: 300,
      average: 225
    },
    marketPrice: {
      min: 20,
      max: 40,
      average: 30
    },
    growingPeriod: {
      min: 90,
      max: 120,
      average: 105
    },
    riskFactors: ["Storage requirements", "Price volatility", "Disease susceptibility"],
    organicSavings: 20,
    soilTypes: ["Loamy Soil", "Clayey Soil", "Alluvial Soil"],
    seasons: ["October-November"],
    specialNotes: ["High value crop", "Good storage", "Multiple uses", "High demand"]
  },
  {
    name: "Onion",
    emoji: "🧅",
    costPerAcre: {
      seeds: 3000,
      fertilizers: 4000,
      irrigation: 2500,
      labor: 4000,
      pesticides: 1500,
      other: 1000,
      total: 16000
    },
    yieldPerAcre: {
      min: 100,
      max: 200,
      average: 150
    },
    marketPrice: {
      min: 30,
      max: 80,
      average: 55
    },
    growingPeriod: {
      min: 120,
      max: 150,
      average: 135
    },
    riskFactors: ["Price volatility", "Storage requirements", "Weather dependency"],
    organicSavings: 25,
    soilTypes: ["Loamy Soil", "Alluvial Soil", "Red Soil"],
    seasons: ["October-November"],
    specialNotes: ["High value crop", "Good storage", "Export potential", "Spice crop"]
  },
  {
    name: "Chili",
    emoji: "🌶️",
    costPerAcre: {
      seeds: 2000,
      fertilizers: 3000,
      irrigation: 2000,
      labor: 4000,
      pesticides: 1500,
      other: 1000,
      total: 13500
    },
    yieldPerAcre: {
      min: 20,
      max: 40,
      average: 30
    },
    marketPrice: {
      min: 200,
      max: 500,
      average: 350
    },
    growingPeriod: {
      min: 120,
      max: 150,
      average: 135
    },
    riskFactors: ["Price volatility", "Weather dependency", "Pest attacks"],
    organicSavings: 30,
    soilTypes: ["Loamy Soil", "Red Soil", "Alluvial Soil"],
    seasons: ["February-March", "September-October"],
    specialNotes: ["Spice crop", "High value", "Export potential", "Drought tolerant"]
  },
  {
    name: "Groundnut",
    emoji: "🥜",
    costPerAcre: {
      seeds: 3000,
      fertilizers: 2500,
      irrigation: 1500,
      labor: 2000,
      pesticides: 1000,
      other: 500,
      total: 10500
    },
    yieldPerAcre: {
      min: 15,
      max: 30,
      average: 22
    },
    marketPrice: {
      min: 4000,
      max: 6000,
      average: 5000
    },
    growingPeriod: {
      min: 100,
      max: 130,
      average: 115
    },
    riskFactors: ["Weather dependency", "Pest attacks", "Market price fluctuations"],
    organicSavings: 25,
    soilTypes: ["Red Soil", "Sandy Soil", "Loamy Soil"],
    seasons: ["June-July"],
    specialNotes: ["Oilseed crop", "Drought tolerant", "Nitrogen fixing", "High protein"]
  },
  {
    name: "Sunflower",
    emoji: "🌻",
    costPerAcre: {
      seeds: 2000,
      fertilizers: 3000,
      irrigation: 2000,
      labor: 2500,
      pesticides: 1000,
      other: 500,
      total: 11000
    },
    yieldPerAcre: {
      min: 8,
      max: 20,
      average: 14
    },
    marketPrice: {
      min: 4000,
      max: 6000,
      average: 5000
    },
    growingPeriod: {
      min: 90,
      max: 120,
      average: 105
    },
    riskFactors: ["Weather dependency", "Pest attacks", "Market price fluctuations"],
    organicSavings: 20,
    soilTypes: ["Black Soil", "Alluvial Soil", "Loamy Soil"],
    seasons: ["June-July", "October-November"],
    specialNotes: ["Oilseed crop", "Drought tolerant", "High value", "Good rotation crop"]
  }
];

// Profit Analysis Engine
export class ProfitAnalysisEngine {
  private cropDatabase: CropProfitData[];

  constructor() {
    this.cropDatabase = CROP_PROFIT_DATABASE;
  }

  // Calculate profit analysis for a crop
  calculateProfit(
    cropName: string,
    landSize: number,
    isOrganic: boolean = false,
    riskFactors: string[] = []
  ): ProfitAnalysisResult {
    const crop = this.cropDatabase.find(c => 
      c.name.toLowerCase() === cropName.toLowerCase()
    );

    if (!crop) {
      throw new Error(`Crop "${cropName}" not found in database`);
    }

    // Calculate costs
    let totalCost = crop.costPerAcre.total * landSize;
    
    // Apply organic savings if organic farming
    if (isOrganic) {
      const savings = (totalCost * crop.organicSavings) / 100;
      totalCost -= savings;
    }

    // Calculate expected yield (use average for now, can be enhanced with weather/soil factors)
    const expectedYield = crop.yieldPerAcre.average * landSize;

    // Calculate income
    const totalIncome = expectedYield * crop.marketPrice.average;

    // Calculate profit
    const netProfit = totalIncome - totalCost;
    const profitMargin = (netProfit / totalIncome) * 100;

    // Determine risk level
    const riskLevel = this.determineRiskLevel(crop, riskFactors);

    // Get recommendations
    const recommendations = this.getRecommendations(crop, netProfit, riskLevel, isOrganic);

    return {
      crop,
      landSize,
      totalCost,
      expectedYield,
      totalIncome,
      netProfit,
      profitMargin,
      riskLevel,
      riskFactors: [...crop.riskFactors, ...riskFactors],
      organicSavings: isOrganic ? (crop.costPerAcre.total * landSize * crop.organicSavings) / 100 : 0,
      recommendations
    };
  }

  // Get crops suitable for specific soil type
  getCropsForSoilType(soilType: string): CropProfitData[] {
    return this.cropDatabase.filter(crop => 
      crop.soilTypes.some(soil => 
        soil.toLowerCase().includes(soilType.toLowerCase()) ||
        soilType.toLowerCase().includes(soil.toLowerCase())
      )
    );
  }

  // Get all available crops
  getAllCrops(): CropProfitData[] {
    return this.cropDatabase;
  }

  // Get crop by name
  getCropByName(cropName: string): CropProfitData | undefined {
    return this.cropDatabase.find(crop => 
      crop.name.toLowerCase() === cropName.toLowerCase()
    );
  }

  // Get crops by season
  getCropsBySeason(season: string): CropProfitData[] {
    return this.cropDatabase.filter(crop => 
      crop.seasons.some(s => 
        s.toLowerCase().includes(season.toLowerCase()) ||
        season.toLowerCase().includes(s.toLowerCase())
      )
    );
  }

  // Get high-profit crops
  getHighProfitCrops(landSize: number = 1): CropProfitData[] {
    return this.cropDatabase
      .map(crop => {
        const analysis = this.calculateProfit(crop.name, landSize);
        return { crop, analysis };
      })
      .sort((a, b) => b.analysis.netProfit - a.analysis.netProfit)
      .slice(0, 5)
      .map(item => item.crop);
  }

  private determineRiskLevel(crop: CropProfitData, additionalRisks: string[]): "low" | "medium" | "high" {
    const totalRisks = crop.riskFactors.length + additionalRisks.length;
    
    if (totalRisks <= 2) return "low";
    if (totalRisks <= 4) return "medium";
    return "high";
  }

  private getRecommendations(
    crop: CropProfitData, 
    netProfit: number, 
    riskLevel: string, 
    isOrganic: boolean
  ): string[] {
    const recommendations: string[] = [];

    // Profit-based recommendations
    if (netProfit > 50000) {
      recommendations.push("Excellent profit potential! Consider expanding cultivation.");
    } else if (netProfit > 20000) {
      recommendations.push("Good profit potential. Monitor market prices closely.");
    } else if (netProfit > 0) {
      recommendations.push("Moderate profit. Consider cost optimization strategies.");
    } else {
      recommendations.push("Negative profit. Review costs and consider alternative crops.");
    }

    // Risk-based recommendations
    if (riskLevel === "high") {
      recommendations.push("High risk crop. Consider crop insurance and diversification.");
    } else if (riskLevel === "medium") {
      recommendations.push("Medium risk. Monitor weather and market conditions.");
    } else {
      recommendations.push("Low risk crop. Good choice for stable income.");
    }

    // Organic farming recommendations
    if (isOrganic) {
      recommendations.push(`Organic farming can save ₹${Math.round(crop.costPerAcre.total * crop.organicSavings / 100)} per acre.`);
    } else {
      recommendations.push(`Consider organic farming to save ${crop.organicSavings}% on input costs.`);
    }

    // Crop-specific recommendations
    if (crop.name === "Tomato" || crop.name === "Chili") {
      recommendations.push("High-value crops with price volatility. Consider contract farming.");
    }
    
    if (crop.name === "Sugarcane") {
      recommendations.push("Long duration crop. Ensure stable water supply and market access.");
    }

    if (crop.name === "Cotton") {
      recommendations.push("Cash crop with export potential. Monitor international prices.");
    }

    return recommendations;
  }
}

// Export singleton instance
export const profitAnalysisEngine = new ProfitAnalysisEngine();
