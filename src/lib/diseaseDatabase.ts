// Comprehensive Disease Database for Krishinetra Agro Assist
// Covers 6 main categories: Fungal, Bacterial, Viral, Nematode, Nutrient Deficiencies, Pest-Associated

export interface DiseaseDiagnosis {
  name: string;
  confidence: number;
  severity: "early" | "moderate" | "severe" | "uncertain";
  notes: string;
  category: "fungal" | "bacterial" | "viral" | "nematode" | "nutrient" | "pest";
  crops: string[];
  symptoms: string[];
  causes: string[];
  questions: string[];
}

export interface Solution {
  title: string;
  steps: string[];
  materials: string[];
  cost: "very low" | "low" | "medium" | "high";
  notes: string;
}

export interface DiseaseAnalysis {
  topDiagnoses: DiseaseDiagnosis[];
  questionsToFarmer: string[];
  recommendations: {
    immediate: string[];
    week: string[];
    longTerm: string[];
  };
  solutions: {
    organic: Solution[];
    costEfficient: Solution[];
    unique: Solution[];
  };
  nextSteps: {
    labTest: boolean;
    contactAgronomist: boolean;
  };
}

// Comprehensive Disease Database
export const DISEASE_DATABASE: DiseaseDiagnosis[] = [
  // FUNGAL DISEASES
  {
    name: "Late Blight (Phytophthora infestans)",
    confidence: 0.85,
    severity: "moderate",
    notes: "Brown-black lesions with white fungal growth on undersides",
    category: "fungal",
    crops: ["Potato", "Tomato"],
    symptoms: [
      "Brown-black lesions on leaves with white fungal growth on undersides",
      "Dark spots spreading rapidly across foliage",
      "Stems showing dark streaks",
      "Fruit developing firm brown rot"
    ],
    causes: [
      "High humidity (>90%) combined with moderate temperatures (15-25°C)",
      "Extended leaf wetness from rain or heavy dew",
      "Poor air circulation in dense plantings",
      "Infected seed tubers or nearby infected crops"
    ],
    questions: [
      "How many days ago did you first notice these spots?",
      "Are nearby plants (within 5 meters) also showing symptoms?",
      "Have you had heavy rain or fog in the past week?",
      "What crop was planted in this field last season?"
    ]
  },
  {
    name: "Early Blight (Alternaria solani)",
    confidence: 0.78,
    severity: "moderate",
    notes: "Concentric rings on leaves, target-like appearance",
    category: "fungal",
    crops: ["Potato", "Tomato"],
    symptoms: [
      "Small dark spots with concentric rings",
      "Yellowing around lesions",
      "Leaves turning brown and dropping",
      "Fruit showing sunken dark spots"
    ],
    causes: [
      "Warm, humid conditions (24-29°C)",
      "Alternating wet and dry periods",
      "Poor soil nutrition",
      "Infected plant debris in soil"
    ],
    questions: [
      "Are the spots forming concentric rings?",
      "Is the disease starting from lower leaves?",
      "Have you had alternating wet and dry weather?"
    ]
  },
  {
    name: "Powdery Mildew",
    confidence: 0.92,
    severity: "early",
    notes: "White powdery coating on upper leaf surfaces",
    category: "fungal",
    crops: ["Multiple crops"],
    symptoms: [
      "White powdery coating on upper leaf surfaces",
      "Leaves curling at edges",
      "Slight yellowing under powder",
      "Stunted growth in severe cases"
    ],
    causes: [
      "Moderate temperatures (20-30°C) with low humidity",
      "Shaded conditions with poor air movement",
      "Dense plantings",
      "High nitrogen fertilization"
    ],
    questions: [
      "Is this crop in full sun or partly shaded?",
      "When did you last fertilize and with what?",
      "Are leaves staying dry or getting wet from irrigation?"
    ]
  },
  {
    name: "Downy Mildew",
    confidence: 0.80,
    severity: "moderate",
    notes: "Yellow patches on upper surface, white/gray growth underneath",
    category: "fungal",
    crops: ["Cucumber", "Grapes", "Maize"],
    symptoms: [
      "Yellow patches on upper leaf surface",
      "White to gray fuzzy growth on underside",
      "Leaves turning brown and dying",
      "Stunted plant growth"
    ],
    causes: [
      "Cool, humid conditions (15-25°C)",
      "High humidity (>85%)",
      "Poor air circulation",
      "Overhead irrigation"
    ],
    questions: [
      "Is there fuzzy growth on the underside of leaves?",
      "Are you using overhead irrigation?",
      "What's the typical humidity in your area?"
    ]
  },
  {
    name: "Rust",
    confidence: 0.75,
    severity: "moderate",
    notes: "Orange, yellow, or brown pustules on leaves",
    category: "fungal",
    crops: ["Wheat", "Bean", "Coffee"],
    symptoms: [
      "Orange, yellow, or brown pustules on leaves",
      "Powdery spores that rub off",
      "Leaves turning yellow and dropping",
      "Reduced photosynthesis"
    ],
    causes: [
      "High humidity and moderate temperatures",
      "Dense plantings",
      "Infected plant debris",
      "Susceptible varieties"
    ],
    questions: [
      "Do the spots have a powdery appearance?",
      "Can you see spores that rub off easily?",
      "Is this a rust-susceptible variety?"
    ]
  },
  {
    name: "Anthracnose",
    confidence: 0.70,
    severity: "moderate",
    notes: "Dark, sunken lesions on fruits and leaves",
    category: "fungal",
    crops: ["Mango", "Beans", "Cotton"],
    symptoms: [
      "Dark, sunken lesions on fruits",
      "Circular spots on leaves with dark borders",
      "Fruit rot and premature dropping",
      "Stem cankers in severe cases"
    ],
    causes: [
      "Warm, humid weather (24-30°C)",
      "Rain splash spreading spores",
      "Infected plant debris",
      "Poor air circulation"
    ],
    questions: [
      "Are the lesions sunken and dark?",
      "Is this affecting fruits or just leaves?",
      "Have you had recent heavy rains?"
    ]
  },
  {
    name: "Fusarium Wilt",
    confidence: 0.85,
    severity: "severe",
    notes: "Yellowing and wilting starting from lower leaves",
    category: "fungal",
    crops: ["Banana", "Tomato", "Cotton"],
    symptoms: [
      "Yellowing and wilting starting from lower leaves",
      "Brown discoloration in vascular tissue",
      "One-sided wilting",
      "Plant death in severe cases"
    ],
    causes: [
      "Soil-borne fungus",
      "Warm soil temperatures (25-30°C)",
      "Infected soil or planting material",
      "Poor drainage"
    ],
    questions: [
      "Is the wilting starting from one side of the plant?",
      "Can you see brown discoloration when cutting the stem?",
      "Is this affecting multiple plants in a row?"
    ]
  },

  // BACTERIAL DISEASES
  {
    name: "Bacterial Blight",
    confidence: 0.80,
    severity: "moderate",
    notes: "Water-soaked lesions that turn brown and dry",
    category: "bacterial",
    crops: ["Rice", "Cotton", "Beans"],
    symptoms: [
      "Water-soaked lesions on leaves",
      "Lesions turn brown and dry out",
      "Yellow halo around lesions",
      "Bacterial ooze in humid conditions"
    ],
    causes: [
      "High humidity and warm temperatures",
      "Rain splash or irrigation water",
      "Infected seed or plant debris",
      "Wounds from insects or tools"
    ],
    questions: [
      "Do the lesions look water-soaked initially?",
      "Is there a yellow halo around the spots?",
      "Have you had recent heavy rains or irrigation?"
    ]
  },
  {
    name: "Bacterial Wilt",
    confidence: 0.90,
    severity: "severe",
    notes: "Sudden wilting without yellowing, white bacterial ooze",
    category: "bacterial",
    crops: ["Tomato", "Potato", "Banana"],
    symptoms: [
      "Sudden wilting without yellowing",
      "White bacterial ooze from cut stems",
      "Brown vascular discoloration",
      "Plant death within days"
    ],
    causes: [
      "Soil-borne bacteria",
      "Warm, moist soil conditions",
      "Infected soil or water",
      "Root damage from cultivation"
    ],
    questions: [
      "Did the plant wilt suddenly without yellowing first?",
      "Is there white ooze when you cut the stem?",
      "Is this affecting multiple plants quickly?"
    ]
  },
  {
    name: "Bacterial Spot",
    confidence: 0.75,
    severity: "moderate",
    notes: "Small, dark spots with yellow halos",
    category: "bacterial",
    crops: ["Tomato", "Pepper", "Citrus"],
    symptoms: [
      "Small, dark spots on leaves and fruits",
      "Yellow halos around spots",
      "Spots may crack or become sunken",
      "Reduced fruit quality"
    ],
    causes: [
      "High humidity and warm temperatures",
      "Rain splash or overhead irrigation",
      "Infected seed or transplants",
      "Wounds from insects or handling"
    ],
    questions: [
      "Are the spots small and dark with yellow halos?",
      "Is this affecting both leaves and fruits?",
      "Have you had recent overhead irrigation?"
    ]
  },

  // VIRAL DISEASES
  {
    name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    confidence: 0.85,
    severity: "severe",
    notes: "Upward curling of leaves with yellowing",
    category: "viral",
    crops: ["Tomato"],
    symptoms: [
      "Upward curling of leaves",
      "Yellowing between veins",
      "Stunted growth",
      "Reduced fruit set"
    ],
    causes: [
      "Whitefly transmission",
      "Infected transplants",
      "Weed hosts",
      "No direct plant-to-plant spread"
    ],
    questions: [
      "Are the leaves curling upward?",
      "Do you see whiteflies on the plants?",
      "Is this affecting multiple plants in the field?"
    ]
  },
  {
    name: "Cucumber Mosaic Virus (CMV)",
    confidence: 0.80,
    severity: "moderate",
    notes: "Mosaic pattern of light and dark green on leaves",
    category: "viral",
    crops: ["Multiple crops"],
    symptoms: [
      "Mosaic pattern of light and dark green",
      "Leaf distortion and stunting",
      "Reduced fruit size and quality",
      "Yellow streaking on fruits"
    ],
    causes: [
      "Aphid transmission",
      "Infected seed",
      "Weed hosts",
      "Mechanical transmission"
    ],
    questions: [
      "Do you see a mosaic pattern on the leaves?",
      "Are there aphids on the plants?",
      "Is the plant growth stunted?"
    ]
  },

  // NEMATODE PROBLEMS
  {
    name: "Root Knot Nematode",
    confidence: 0.90,
    severity: "severe",
    notes: "Galls or knots on roots, stunted growth",
    category: "nematode",
    crops: ["Multiple crops"],
    symptoms: [
      "Galls or knots on roots",
      "Stunted plant growth",
      "Yellowing and wilting",
      "Reduced yield"
    ],
    causes: [
      "Infected soil",
      "Warm soil temperatures",
      "Sandy soils",
      "Continuous cropping of susceptible plants"
    ],
    questions: [
      "Can you see galls or knots on the roots?",
      "Is the plant growth stunted despite good care?",
      "Have you had this problem in this field before?"
    ]
  },

  // NUTRIENT DEFICIENCIES
  {
    name: "Nitrogen Deficiency",
    confidence: 0.85,
    severity: "moderate",
    notes: "General yellowing starting from older leaves",
    category: "nutrient",
    crops: ["Multiple crops"],
    symptoms: [
      "General yellowing starting from older leaves",
      "Stunted growth",
      "Reduced leaf size",
      "Poor fruit development"
    ],
    causes: [
      "Insufficient nitrogen in soil",
      "Poor soil organic matter",
      "Excessive rainfall leaching nutrients",
      "Imbalanced fertilization"
    ],
    questions: [
      "Is the yellowing starting from older leaves?",
      "When did you last apply nitrogen fertilizer?",
      "Have you had heavy rains recently?"
    ]
  },
  {
    name: "Phosphorus Deficiency",
    confidence: 0.80,
    severity: "moderate",
    notes: "Purple or reddish discoloration on leaves",
    category: "nutrient",
    crops: ["Multiple crops"],
    symptoms: [
      "Purple or reddish discoloration on leaves",
      "Stunted growth",
      "Dark green leaves",
      "Poor root development"
    ],
    causes: [
      "Low phosphorus in soil",
      "Cold soil temperatures",
      "High pH soils",
      "Poor root development"
    ],
    questions: [
      "Do you see purple or reddish coloring on leaves?",
      "Is the soil temperature cold?",
      "What's the pH of your soil?"
    ]
  },
  {
    name: "Potassium Deficiency",
    confidence: 0.75,
    severity: "moderate",
    notes: "Yellowing and browning of leaf edges",
    category: "nutrient",
    crops: ["Multiple crops"],
    symptoms: [
      "Yellowing and browning of leaf edges",
      "Weak stems",
      "Poor fruit quality",
      "Increased susceptibility to disease"
    ],
    causes: [
      "Low potassium in soil",
      "Sandy soils",
      "Excessive nitrogen fertilization",
      "Drought stress"
    ],
    questions: [
      "Are the leaf edges turning brown?",
      "Do the stems seem weak?",
      "Have you had drought conditions?"
    ]
  },
  {
    name: "Iron Deficiency",
    confidence: 0.85,
    severity: "moderate",
    notes: "Yellowing between veins while veins remain green",
    category: "nutrient",
    crops: ["Multiple crops"],
    symptoms: [
      "Yellowing between veins while veins remain green",
      "Stunted growth",
      "Poor fruit development",
      "Leaf drop in severe cases"
    ],
    causes: [
      "High soil pH (>7.0)",
      "Excessive phosphorus",
      "Poor drainage",
      "Cold, wet soils"
    ],
    questions: [
      "Is the yellowing between veins while veins stay green?",
      "What's the pH of your soil?",
      "Have you applied a lot of phosphorus recently?"
    ]
  },
  {
    name: "Calcium Deficiency",
    confidence: 0.80,
    severity: "moderate",
    notes: "Blossom end rot in fruits, stunted growth",
    category: "nutrient",
    crops: ["Tomato", "Pepper", "Cucumber"],
    symptoms: [
      "Blossom end rot in fruits",
      "Stunted growth",
      "Leaf curling",
      "Poor root development"
    ],
    causes: [
      "Insufficient calcium in soil",
      "Irregular watering",
      "High nitrogen fertilization",
      "Poor root development"
    ],
    questions: [
      "Do you see blossom end rot on fruits?",
      "Is your watering irregular?",
      "Have you applied a lot of nitrogen recently?"
    ]
  },

  // PEST-ASSOCIATED ISSUES
  {
    name: "Aphid Damage",
    confidence: 0.90,
    severity: "moderate",
    notes: "Curling leaves, sticky honeydew, viral transmission",
    category: "pest",
    crops: ["Multiple crops"],
    symptoms: [
      "Curling and distortion of leaves",
      "Sticky honeydew on leaves",
      "Sooty mold growth",
      "Viral disease transmission"
    ],
    causes: [
      "Aphid feeding on plant sap",
      "High nitrogen fertilization",
      "Ants protecting aphids",
      "Lack of natural predators"
    ],
    questions: [
      "Do you see small green or black insects on the leaves?",
      "Are the leaves sticky to touch?",
      "Do you see ants on the plants?"
    ]
  },
  {
    name: "Whitefly Damage",
    confidence: 0.85,
    severity: "moderate",
    notes: "Yellowing leaves, white insects flying when disturbed",
    category: "pest",
    crops: ["Multiple crops"],
    symptoms: [
      "Yellowing of leaves",
      "White insects flying when disturbed",
      "Sticky honeydew",
      "Viral disease transmission"
    ],
    causes: [
      "Whitefly feeding on plant sap",
      "High humidity and warm temperatures",
      "Lack of natural predators",
      "Infected transplants"
    ],
    questions: [
      "Do you see small white insects flying when you disturb the plant?",
      "Are the leaves turning yellow?",
      "Is this affecting multiple plants?"
    ]
  },
  {
    name: "Thrips Damage",
    confidence: 0.80,
    severity: "moderate",
    notes: "Silver streaks on leaves, curled leaves",
    category: "pest",
    crops: ["Multiple crops"],
    symptoms: [
      "Silver streaks on leaves",
      "Curled and distorted leaves",
      "Brown spots on fruits",
      "Reduced plant vigor"
    ],
    causes: [
      "Thrips feeding on plant tissue",
      "Dry, dusty conditions",
      "Lack of natural predators",
      "Infected plant material"
    ],
    questions: [
      "Do you see silver streaks on the leaves?",
      "Are the leaves curled and distorted?",
      "Is the weather dry and dusty?"
    ]
  },
  {
    name: "Mite Damage",
    confidence: 0.75,
    severity: "moderate",
    notes: "Tiny spots on leaves, fine webbing",
    category: "pest",
    crops: ["Multiple crops"],
    symptoms: [
      "Tiny yellow or white spots on leaves",
      "Fine webbing on leaves",
      "Bronzing of leaves",
      "Reduced plant vigor"
    ],
    causes: [
      "Spider mite feeding",
      "Hot, dry conditions",
      "Lack of natural predators",
      "Dusty conditions"
    ],
    questions: [
      "Do you see tiny spots on the leaves?",
      "Is there fine webbing on the leaves?",
      "Is the weather hot and dry?"
    ]
  }
];

// AI Analysis Engine
export class DiseaseAnalysisEngine {
  private diseaseDatabase: DiseaseDiagnosis[];

  constructor() {
    this.diseaseDatabase = DISEASE_DATABASE;
  }

  // Analyze image and return top diagnoses
  analyzeImage(imageData: string): DiseaseAnalysis {
    // Simulate AI analysis - in real implementation, this would use computer vision
    const randomDiseases = this.getRandomDiseases(3);
    
    return {
      topDiagnoses: randomDiseases,
      questionsToFarmer: this.generateQuestions(randomDiseases),
      recommendations: this.generateRecommendations(randomDiseases[0]),
      solutions: this.generateSolutions(randomDiseases[0]),
      nextSteps: this.generateNextSteps(randomDiseases[0])
    };
  }

  // Analyze symptoms description
  analyzeSymptoms(symptoms: string, cropType?: string): DiseaseAnalysis {
    const matchingDiseases = this.findMatchingDiseases(symptoms, cropType);
    const topDiseases = matchingDiseases.slice(0, 4);
    
    return {
      topDiagnoses: topDiseases,
      questionsToFarmer: this.generateQuestions(topDiseases),
      recommendations: this.generateRecommendations(topDiseases[0]),
      solutions: this.generateSolutions(topDiseases[0]),
      nextSteps: this.generateNextSteps(topDiseases[0])
    };
  }

  private getRandomDiseases(count: number): DiseaseDiagnosis[] {
    const shuffled = [...this.diseaseDatabase].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(disease => ({
      ...disease,
      confidence: Math.random() * 0.4 + 0.6 // 60-100% confidence
    }));
  }

  private findMatchingDiseases(symptoms: string, cropType?: string): DiseaseDiagnosis[] {
    const symptomsLower = symptoms.toLowerCase();
    const matchingDiseases = this.diseaseDatabase.filter(disease => {
      const symptomMatch = disease.symptoms.some(symptom => 
        symptom.toLowerCase().includes(symptomsLower) || 
        symptomsLower.includes(symptom.toLowerCase())
      );
      const cropMatch = !cropType || disease.crops.some(crop => 
        crop.toLowerCase().includes(cropType.toLowerCase())
      );
      return symptomMatch && cropMatch;
    });

    return matchingDiseases.sort((a, b) => b.confidence - a.confidence);
  }

  private generateQuestions(diseases: DiseaseDiagnosis[]): string[] {
    const allQuestions = diseases.flatMap(disease => disease.questions);
    const uniqueQuestions = [...new Set(allQuestions)];
    return uniqueQuestions.slice(0, 4);
  }

  private generateRecommendations(disease: DiseaseDiagnosis) {
    const baseRecommendations = {
      immediate: [
        "Remove heavily infected plant parts immediately",
        "Stop overhead irrigation to prevent spread",
        "Apply first treatment from recommended solutions",
        "Isolate affected plants if possible"
      ],
      week: [
        "Monitor daily for new symptoms",
        "Continue treatment every 3-5 days",
        "Check soil moisture and drainage",
        "Document progression with photos"
      ],
      longTerm: [
        "Practice crop rotation to break disease cycles",
        "Use disease-resistant varieties next season",
        "Improve soil health with organic matter",
        "Implement proper spacing and air circulation"
      ]
    };

    // Customize based on disease category
    if (disease.category === "fungal") {
      baseRecommendations.immediate.unshift("Improve air circulation around plants");
    } else if (disease.category === "bacterial") {
      baseRecommendations.immediate.unshift("Avoid working with wet plants");
    } else if (disease.category === "viral") {
      baseRecommendations.immediate.unshift("Control insect vectors immediately");
    } else if (disease.category === "nutrient") {
      baseRecommendations.immediate.unshift("Test soil and apply appropriate fertilizer");
    } else if (disease.category === "pest") {
      baseRecommendations.immediate.unshift("Identify and control pest population");
    }

    return baseRecommendations;
  }

  private generateSolutions(disease: DiseaseDiagnosis) {
    const solutions = {
      organic: this.getOrganicSolutions(disease),
      costEfficient: this.getCostEfficientSolutions(disease),
      unique: this.getUniqueSolutions(disease)
    };

    return solutions;
  }

  private getOrganicSolutions(disease: DiseaseDiagnosis): Solution[] {
    const organicSolutions: { [key: string]: Solution[] } = {
      fungal: [
        {
          title: "Neem Oil + Milk Spray",
          steps: [
            "Mix 30ml neem oil with 5 liters water",
            "Add 1 cup fresh milk as emulsifier",
            "Add 5ml liquid soap",
            "Spray thoroughly on all surfaces",
            "Repeat every 5 days for 3 weeks"
          ],
          materials: ["Neem oil", "Fresh milk", "Liquid soap", "Sprayer"],
          cost: "low",
          notes: "Safe for beneficial insects. Most effective in early stages."
        }
      ],
      bacterial: [
        {
          title: "Copper + Baking Soda Spray",
          steps: [
            "Mix 1 tablespoon copper sulfate with 1 gallon water",
            "Add 1 tablespoon baking soda",
            "Add 1 teaspoon liquid soap",
            "Spray on affected areas",
            "Repeat every 7 days"
          ],
          materials: ["Copper sulfate", "Baking soda", "Liquid soap", "Sprayer"],
          cost: "low",
          notes: "Effective against bacterial diseases. Test on small area first."
        }
      ],
      viral: [
        {
          title: "Garlic + Chili Spray",
          steps: [
            "Blend 10 garlic cloves with 5 chili peppers",
            "Add 1 liter water and let steep overnight",
            "Strain and add 1 tablespoon liquid soap",
            "Spray on plants to repel vectors",
            "Apply every 3 days"
          ],
          materials: ["Garlic cloves", "Chili peppers", "Liquid soap", "Sprayer"],
          cost: "very low",
          notes: "Repels insect vectors. No cure for viral diseases."
        }
      ],
      nutrient: [
        {
          title: "Compost Tea + Seaweed Extract",
          steps: [
            "Brew compost tea for 24-48 hours",
            "Add seaweed extract (1:100 dilution)",
            "Apply to soil around plant base",
            "Repeat every 2 weeks",
            "Monitor plant response"
          ],
          materials: ["Compost", "Seaweed extract", "Water", "Sprayer"],
          cost: "very low",
          notes: "Provides balanced nutrients and improves soil health."
        }
      ],
      pest: [
        {
          title: "Neem + Soap Spray",
          steps: [
            "Mix 2 tablespoons neem oil with 1 gallon water",
            "Add 1 tablespoon liquid soap",
            "Spray directly on pests and affected areas",
            "Repeat every 3-5 days until controlled",
            "Apply in early morning or evening"
          ],
          materials: ["Neem oil", "Liquid soap", "Water", "Sprayer"],
          cost: "low",
          notes: "Effective against most soft-bodied pests. Safe for beneficial insects."
        }
      ]
    };

    return organicSolutions[disease.category] || organicSolutions.fungal;
  }

  private getCostEfficientSolutions(disease: DiseaseDiagnosis): Solution[] {
    const costEfficientSolutions: { [key: string]: Solution[] } = {
      fungal: [
        {
          title: "Sulfur-Based Fungicide",
          steps: [
            "Purchase wettable sulfur from agricultural supplier",
            "Follow label instructions for mixing ratio",
            "Apply in cool morning hours",
            "Repeat as directed on label",
            "Wear protective equipment"
          ],
          materials: ["Wettable sulfur", "Water", "Sprayer", "PPE"],
          cost: "low",
          notes: "Very effective and inexpensive. Do not apply in hot weather."
        }
      ],
      bacterial: [
        {
          title: "Copper Oxychloride",
          steps: [
            "Purchase registered copper fungicide",
            "Follow label instructions exactly",
            "Apply with proper safety equipment",
            "Observe harvest waiting period",
            "Store safely away from children"
          ],
          materials: ["Copper fungicide", "Water", "Sprayer", "PPE"],
          cost: "medium",
          notes: "More effective than organic methods. Follow safety guidelines."
        }
      ],
      viral: [
        {
          title: "Insecticide for Vector Control",
          steps: [
            "Identify the specific vector (aphids, whiteflies, etc.)",
            "Purchase appropriate insecticide",
            "Follow label instructions for application",
            "Apply when vectors are active",
            "Monitor for resistance"
          ],
          materials: ["Insecticide", "Water", "Sprayer", "PPE"],
          cost: "medium",
          notes: "Controls vectors but cannot cure viral diseases."
        }
      ],
      nutrient: [
        {
          title: "Balanced NPK Fertilizer",
          steps: [
            "Test soil to determine specific needs",
            "Purchase appropriate NPK fertilizer",
            "Apply according to soil test recommendations",
            "Water in thoroughly after application",
            "Monitor plant response"
          ],
          materials: ["NPK fertilizer", "Water", "Spreader"],
          cost: "low",
          notes: "Quick and effective. Follow soil test recommendations."
        }
      ],
      pest: [
        {
          title: "Pyrethrin-Based Insecticide",
          steps: [
            "Purchase pyrethrin insecticide",
            "Follow label instructions for mixing",
            "Apply when pests are active",
            "Repeat as needed",
            "Observe safety precautions"
          ],
          materials: ["Pyrethrin insecticide", "Water", "Sprayer", "PPE"],
          cost: "low",
          notes: "Effective against many pests. Derived from chrysanthemums."
        }
      ]
    };

    return costEfficientSolutions[disease.category] || costEfficientSolutions.fungal;
  }

  private getUniqueSolutions(disease: DiseaseDiagnosis): Solution[] {
    const uniqueSolutions: { [key: string]: Solution[] } = {
      fungal: [
        {
          title: "Whey + Molasses Spray",
          steps: [
            "Mix 1 part whey with 10 parts water",
            "Add 1 tablespoon molasses per liter",
            "Add 1 teaspoon liquid soap",
            "Spray on affected areas",
            "Repeat every 5 days"
          ],
          materials: ["Whey (dairy byproduct)", "Molasses", "Liquid soap", "Sprayer"],
          cost: "very low",
          notes: "Probiotic bacteria suppress fungal spores. Innovative but effective."
        }
      ],
      bacterial: [
        {
          title: "Horseradish + Garlic Extract",
          steps: [
            "Blend 1 cup horseradish root with 10 garlic cloves",
            "Add 1 liter water and let steep 24 hours",
            "Strain and add 1 tablespoon liquid soap",
            "Spray on affected areas",
            "Repeat every 3 days"
          ],
          materials: ["Horseradish root", "Garlic cloves", "Liquid soap", "Sprayer"],
          cost: "very low",
          notes: "Natural antibacterial properties. Test on small area first."
        }
      ],
      viral: [
        {
          title: "Reflective Mulch + Companion Planting",
          steps: [
            "Install reflective mulch around plants",
            "Plant marigolds and basil as companions",
            "Use yellow sticky traps for vectors",
            "Create physical barriers with row covers",
            "Maintain healthy soil ecosystem"
          ],
          materials: ["Reflective mulch", "Marigold seeds", "Basil seeds", "Sticky traps"],
          cost: "low",
          notes: "Prevents vector access and confuses them. Long-term solution."
        }
      ],
      nutrient: [
        {
          title: "Biochar + Compost Integration",
          steps: [
            "Apply biochar to soil (5% by volume)",
            "Mix with well-aged compost",
            "Add mycorrhizal fungi inoculant",
            "Water thoroughly and let settle",
            "Monitor plant response over time"
          ],
          materials: ["Biochar", "Compost", "Mycorrhizal inoculant", "Water"],
          cost: "low",
          notes: "Improves nutrient retention and availability. Long-term soil health."
        }
      ],
      pest: [
        {
          title: "Beneficial Insect Release",
          steps: [
            "Identify the specific pest problem",
            "Order appropriate beneficial insects",
            "Release according to supplier instructions",
            "Provide habitat for beneficials",
            "Monitor pest population reduction"
          ],
          materials: ["Beneficial insects", "Release containers", "Habitat materials"],
          cost: "medium",
          notes: "Natural pest control. May take time to establish."
        }
      ]
    };

    return uniqueSolutions[disease.category] || uniqueSolutions.fungal;
  }

  private generateNextSteps(disease: DiseaseDiagnosis) {
    const nextSteps = {
      labTest: false,
      contactAgronomist: false
    };

    // Determine if lab testing is needed
    if (disease.confidence < 0.7 || disease.severity === "uncertain") {
      nextSteps.labTest = true;
    }

    // Determine if agronomist consultation is needed
    if (disease.severity === "severe" || disease.category === "viral" || disease.category === "bacterial") {
      nextSteps.contactAgronomist = true;
    }

    return nextSteps;
  }
}

// Export singleton instance
export const diseaseAnalysisEngine = new DiseaseAnalysisEngine();
