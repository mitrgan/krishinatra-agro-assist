import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft,
  Leaf,
  Bug,
  Droplets,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Solution {
  title: string;
  steps: string[];
  materials: string[];
  cost: "low" | "medium" | "high";
  notes: string;
}

interface DiseaseAnalysis {
  diseaseName: string;
  confidence: number;
  severity: "Early Stage" | "Moderate" | "Severe";
  symptoms: string[];
  causes: string[];
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
  questionsToFarmer?: string[];
  nextSteps: {
    labTest: boolean;
    contactAgronomist: boolean;
  };
  confidenceSummary: "High" | "Medium" | "Low";
}

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);

  // Mock disease analysis data - comprehensive system
  const mockAnalyses: DiseaseAnalysis[] = [
    {
      diseaseName: "Late Blight (Phytophthora infestans)",
      confidence: 72,
      severity: "Moderate",
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
      recommendations: {
        immediate: [
          "Remove and destroy all visibly infected leaves and stems today",
          "Stop overhead watering immediately - water at soil level only",
          "Improve air circulation by gentle pruning if safe",
          "Apply first treatment from solution pathways below"
        ],
        week: [
          "Monitor daily for new spots - mark affected plants",
          "Continue chosen treatment every 5-7 days",
          "Check soil moisture - avoid waterlogging",
          "Inspect neighboring crops for spread",
          "Document progression with photos"
        ],
        longTerm: [
          "Plant certified disease-free seed next season",
          "Practice 3-year crop rotation (avoid tomato, potato, eggplant)",
          "Consider resistant varieties (check with local extension)",
          "Install drip irrigation to keep foliage dry",
          "Improve field drainage before next planting"
        ]
      },
      solutions: {
        organic: [
          {
            title: "Neem + Wood Ash Spray",
            steps: [
              "Mix 30ml pure neem oil with 5 liters water",
              "Add 2 tablespoons wood ash (potash source)",
              "Add 5ml liquid soap as emulsifier",
              "Stir thoroughly and strain through cloth",
              "Spray in early morning on all leaf surfaces",
              "Repeat every 5 days for 3 weeks"
            ],
            materials: [
              "Pure neem oil (locally available)",
              "Clean wood ash from cooking fire",
              "Liquid soap (dishwashing type)",
              "Sprayer or hand-pump"
            ],
            cost: "low",
            notes: "Safe for beneficial insects. No harvest waiting period. Most effective in early stages. Will not eliminate severe infections but slows progression."
          }
        ],
        costEfficient: [
          {
            title: "Copper-Based Fungicide (Registered Product)",
            steps: [
              "Purchase copper oxychloride or Bordeaux mixture from licensed dealer",
              "DO NOT determine dosage yourself",
              "Consult product label or local agronomist for exact mixing ratio",
              "Apply as directed on packaging",
              "Observe safety precautions and harvest interval on label"
            ],
            materials: [
              "Registered copper-based fungicide",
              "Clean water",
              "PPE: gloves, mask, long sleeves",
              "Calibrated sprayer"
            ],
            cost: "medium",
            notes: "More effective than organic but requires careful handling. Follow local regulations. Check harvest waiting period. Cost: ₹300-500 for small farm treatment. NEVER mix without label guidance."
          }
        ],
        unique: [
          {
            title: "Mulch + Intercrop + Solar Trap",
            steps: [
              "Apply 5cm thick straw mulch around plant bases to reduce soil splash",
              "Plant fast-growing marigold or basil between crop rows (repels some insects, improves air flow)",
              "Create simple solar trap: place dark cloth strips coated with sticky substance (tree gum + oil) near infected area to catch spores",
              "Prune lower leaves to 15cm above soil to prevent contact with fungal spores",
              "If possible, construct simple rain shield (bamboo + plastic) over worst-affected row"
            ],
            materials: [
              "Straw or dried grass (free/farm waste)",
              "Marigold or basil seeds (low cost)",
              "Dark cloth scraps + sticky substance",
              "Bamboo poles + clear plastic (optional)"
            ],
            cost: "low",
            notes: "Innovative but labor-intensive. Best combined with one of the other methods. Particularly effective in small plots. Creates physical and biological barriers."
          }
        ]
      },
      questionsToFarmer: [
        "How many days ago did you first notice these spots?",
        "Are nearby plants (within 5 meters) also showing symptoms?",
        "Have you had heavy rain or fog in the past week?",
        "What crop was planted in this field last season?"
      ],
      nextSteps: {
        labTest: false,
        contactAgronomist: true
      },
      confidenceSummary: "High"
    },
    {
      diseaseName: "Powdery Mildew (Erysiphe/Oidium spp.)",
      confidence: 92,
      severity: "Early Stage",
      symptoms: [
        "White powdery coating on upper leaf surfaces",
        "Leaves curling at edges",
        "Slight yellowing under powder",
        "No visible pests or fruit damage yet"
      ],
      causes: [
        "Moderate temperatures (20-30°C) with low humidity paradoxically",
        "Shaded conditions with poor air movement",
        "Dense plantings",
        "High nitrogen fertilization making tender tissue"
      ],
      recommendations: {
        immediate: [
          "Remove worst-affected leaves (if <20% of plant)",
          "Thin out dense areas to improve sunlight penetration",
          "Apply first organic treatment today",
          "Move potted plants to sunnier location if applicable"
        ],
        week: [
          "Spray chosen treatment every 3-4 days",
          "Monitor new growth daily",
          "Avoid nitrogen-heavy fertilizers this week",
          "Water at soil level in morning only"
        ],
        longTerm: [
          "Select mildew-resistant varieties next season",
          "Maintain proper plant spacing (follow variety guidelines)",
          "Ensure 6+ hours direct sunlight daily",
          "Alternate crop families to break disease cycle"
        ]
      },
      solutions: {
        organic: [
          {
            title: "Milk + Water Spray",
            steps: [
              "Mix 1 part milk (any type) with 9 parts water",
              "Add 1 drop liquid soap per liter as wetting agent",
              "Pour into sprayer",
              "Spray thoroughly on all leaf surfaces until dripping",
              "Apply every 3 days for 2 weeks",
              "Best applied in morning sun"
            ],
            materials: [
              "Fresh or powdered milk (2 cups for 2L solution)",
              "Clean water",
              "Liquid soap",
              "Sprayer"
            ],
            cost: "low",
            notes: "Scientifically proven (milk proteins have antifungal properties). Safe and no waiting period. Effectiveness: 60-70% in early stages. Cost: ₹20-30 per application."
          }
        ],
        costEfficient: [
          {
            title: "Sulfur Dust (Agricultural Grade)",
            steps: [
              "Purchase wettable sulfur or sulfur dust from agricultural supplier",
              "Confirm product is registered for food crops",
              "Follow package instructions for application rate",
              "Apply in cool morning (avoid >30°C as sulfur can burn leaves)",
              "Wear dust mask during application"
            ],
            materials: [
              "Agricultural sulfur (wettable or dust)",
              "Duster or sprayer (depending on formulation)",
              "Dust mask and gloves"
            ],
            cost: "low",
            notes: "Very effective and inexpensive. Safe if used correctly. Do not apply in hot weather. Some organic certifications allow sulfur. Cost: ₹100-200 for small farm season supply."
          }
        ],
        unique: [
          {
            title: "Baking Soda + Oil Emulsion",
            steps: [
              "Mix 1 tablespoon baking soda per liter water",
              "Add 1 tablespoon vegetable oil (sunflower or mustard)",
              "Add 3 drops liquid soap",
              "Shake well before each spray",
              "Spray on all plant surfaces weekly",
              "Do a small test patch first to check for leaf sensitivity"
            ],
            materials: [
              "Baking soda (sodium bicarbonate - readily available)",
              "Cooking oil",
              "Liquid soap",
              "Sprayer"
            ],
            cost: "low",
            notes: "Creates alkaline surface hostile to fungus. Oil helps solution stick. Not suitable for all crops - test first. Popular home-garden remedy with moderate scientific backing. Cost: ₹15-20 per application."
          }
        ]
      },
      questionsToFarmer: [
        "Is this crop in full sun or partly shaded?",
        "When did you last fertilize and with what?",
        "Are leaves staying dry or getting wet from irrigation?"
      ],
      nextSteps: {
        labTest: false,
        contactAgronomist: false
      },
      confidenceSummary: "High"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomAnalysis = mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
      setAnalysis(randomAnalysis);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Disease detected: ${randomAnalysis.diseaseName}`,
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Early Stage":
        return "bg-green-100 text-green-800 border-green-200";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Severe":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back_to_dashboard')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('disease_detection')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('disease_detection_desc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                {t('upload_crop_image')}
              </CardTitle>
              <CardDescription>
                {t('upload_image_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Select Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Uploaded crop" 
                        className="max-w-full h-64 object-contain mx-auto rounded-lg"
                      />
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                            setAnalysis(null);
                          }}
                        >
                          Remove Image
                        </Button>
                        <Button 
                          onClick={analyzeImage}
                          disabled={isAnalyzing}
                          className="bg-gradient-primary"
                        >
                          {isAnalyzing ? t('analyzing') : t('analyze_disease')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Label 
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        Select Image
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              <Alert>
                <Leaf className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tips for better results:</strong> Focus on affected areas, ensure good lighting, 
                  include multiple angles if possible, and capture both healthy and diseased parts for comparison.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Disease Analysis
              </CardTitle>
              <CardDescription>
                AI-powered disease identification and treatment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Analyzing your crop image...</p>
                  <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
                </div>
              ) : analysis ? (
                <div className="space-y-6">
                  {/* Disease Identification */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{analysis.diseaseName}</h3>
                      <Badge variant="outline" className={getSeverityColor(analysis.severity)}>
                        {analysis.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full" 
                          style={{ width: `${analysis.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{analysis.confidence}%</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Symptoms */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Symptoms Detected
                    </h4>
                    <ul className="space-y-1">
                      {analysis.symptoms.map((symptom, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Questions to Farmer */}
                  {analysis.questionsToFarmer && analysis.questionsToFarmer.length > 0 && (
                    <>
                      <Separator />
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Help us refine the diagnosis:</strong>
                          <ul className="mt-2 space-y-1">
                            {analysis.questionsToFarmer.map((question, index) => (
                              <li key={index} className="text-sm">• {question}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </>
                  )}

                  <Separator />

                  {/* Action Plan */}
                  <div>
                    <h4 className="font-medium mb-3">📋 Action Plan</h4>
                    
                    <div className="space-y-3">
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 rounded">
                        <h5 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">⚡ Immediate (Today)</h5>
                        <ol className="list-decimal list-inside space-y-1 text-xs">
                          {analysis.recommendations.immediate.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 rounded">
                        <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">📅 This Week</h5>
                        <ol className="list-decimal list-inside space-y-1 text-xs">
                          {analysis.recommendations.week.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 rounded">
                        <h5 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">🌱 Long-term</h5>
                        <ol className="list-decimal list-inside space-y-1 text-xs">
                          {analysis.recommendations.longTerm.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Solution Pathways */}
                  <div>
                    <h4 className="font-medium mb-3">💊 Treatment Solutions</h4>

                    {/* Organic */}
                    <div className="mb-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-semibold text-green-700 dark:text-green-400">🌿 Organic Solution</h5>
                        <Badge variant="outline" className="text-xs">Cost: {analysis.solutions.organic[0].cost}</Badge>
                      </div>
                      <p className="font-medium text-sm mb-2">{analysis.solutions.organic[0].title}</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs mb-2">
                        {analysis.solutions.organic[0].steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                      <div className="bg-white dark:bg-green-950/40 p-2 rounded text-xs mb-2">
                        <p className="font-semibold">Materials:</p>
                        <p className="text-muted-foreground">{analysis.solutions.organic[0].materials.join(", ")}</p>
                      </div>
                      <p className="text-xs text-muted-foreground italic">{analysis.solutions.organic[0].notes}</p>
                    </div>

                    {/* Cost Efficient */}
                    <div className="mb-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-semibold text-blue-700 dark:text-blue-400">💰 Cost-Efficient</h5>
                        <Badge variant="outline" className="text-xs">Cost: {analysis.solutions.costEfficient[0].cost}</Badge>
                      </div>
                      <p className="font-medium text-sm mb-2">{analysis.solutions.costEfficient[0].title}</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs mb-2">
                        {analysis.solutions.costEfficient[0].steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                      <div className="bg-white dark:bg-blue-950/40 p-2 rounded text-xs mb-2">
                        <p className="font-semibold">Materials:</p>
                        <p className="text-muted-foreground">{analysis.solutions.costEfficient[0].materials.join(", ")}</p>
                      </div>
                      <Alert className="mt-2">
                        <AlertTriangle className="h-3 w-3" />
                        <AlertDescription className="text-xs">
                          {analysis.solutions.costEfficient[0].notes}
                        </AlertDescription>
                      </Alert>
                    </div>

                    {/* Unique */}
                    <div className="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-semibold text-purple-700 dark:text-purple-400">✨ Unique/Innovative</h5>
                        <Badge variant="outline" className="text-xs">Cost: {analysis.solutions.unique[0].cost}</Badge>
                      </div>
                      <p className="font-medium text-sm mb-2">{analysis.solutions.unique[0].title}</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs mb-2">
                        {analysis.solutions.unique[0].steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                      <div className="bg-white dark:bg-purple-950/40 p-2 rounded text-xs mb-2">
                        <p className="font-semibold">Materials:</p>
                        <p className="text-muted-foreground">{analysis.solutions.unique[0].materials.join(", ")}</p>
                      </div>
                      <p className="text-xs text-muted-foreground italic">{analysis.solutions.unique[0].notes}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Next Steps */}
                  <Alert>
                    <Droplets className="h-4 w-4" />
                    <AlertDescription>
                      <strong>When to Escalate:</strong>
                      <ul className="mt-2 space-y-1 text-sm">
                        {analysis.nextSteps.labTest && (
                          <li>• Consider lab testing if symptoms worsen or spread beyond 30%</li>
                        )}
                        {analysis.nextSteps.contactAgronomist && (
                          <li>• Contact local agronomist for chemical dosage guidance</li>
                        )}
                        <li>• Seek expert help if no improvement after 2 weeks</li>
                      </ul>
                      <p className="text-xs mt-2 text-muted-foreground">
                        Confidence: <strong>{analysis.confidenceSummary}</strong>
                      </p>
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Bug className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to start disease analysis</p>
                  <p className="text-sm mt-2">Our AI will identify diseases and provide treatment recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Camera className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">High-Quality Images</h3>
              <p className="text-sm text-muted-foreground">
                Clear, focused photos give the most accurate disease detection results
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Preventive Care</h3>
              <p className="text-sm text-muted-foreground">
                Get recommendations for preventing future disease outbreaks
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Leaf className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Organic Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Eco-friendly treatment options for sustainable farming
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;