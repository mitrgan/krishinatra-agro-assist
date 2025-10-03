import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield,
  FileText,
  MessageSquare,
  Zap,
  DollarSign,
  Lightbulb,
  Microscope,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { diseaseAnalysisEngine, DiseaseAnalysis, DiseaseDiagnosis } from "@/lib/diseaseDatabase";

// Remove old interfaces - now using imported ones from diseaseDatabase

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);
  const [symptomDescription, setSymptomDescription] = useState("");
  const [cropType, setCropType] = useState("");
  const [activeTab, setActiveTab] = useState("image");

  // Analysis functions
  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with real disease database
    setTimeout(() => {
      const analysis = diseaseAnalysisEngine.analyzeImage(imagePreview || "");
      setAnalysis(analysis);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Top diagnosis: ${analysis.topDiagnoses[0].name}`,
      });
    }, 3000);
  };

  const analyzeSymptoms = async () => {
    if (!symptomDescription.trim()) {
      toast({
        title: "Please describe symptoms",
        description: "Enter a description of the plant symptoms you're observing",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with real disease database
    setTimeout(() => {
      const analysis = diseaseAnalysisEngine.analyzeSymptoms(symptomDescription, cropType);
      setAnalysis(analysis);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Top diagnosis: ${analysis.topDiagnoses[0].name}`,
      });
    }, 2000);
  };

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


  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "early":
        return "bg-green-100 text-green-800 border-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "severe":
        return "bg-red-100 text-red-800 border-red-200";
      case "uncertain":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fungal":
        return <Leaf className="h-4 w-4" />;
      case "bacterial":
        return <Bug className="h-4 w-4" />;
      case "viral":
        return <AlertTriangle className="h-4 w-4" />;
      case "nematode":
        return <Microscope className="h-4 w-4" />;
      case "nutrient":
        return <Droplets className="h-4 w-4" />;
      case "pest":
        return <Shield className="h-4 w-4" />;
      default:
        return <Bug className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fungal":
        return "text-green-600";
      case "bacterial":
        return "text-red-600";
      case "viral":
        return "text-purple-600";
      case "nematode":
        return "text-orange-600";
      case "nutrient":
        return "text-blue-600";
      case "pest":
        return "text-yellow-600";
      default:
        return "text-gray-600";
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
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Disease Detection Input
              </CardTitle>
              <CardDescription>
                Upload an image or describe symptoms to identify plant diseases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Image Analysis
                  </TabsTrigger>
                  <TabsTrigger value="symptoms" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Symptom Description
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="image" className="space-y-6 mt-6">
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
                </TabsContent>
                
                <TabsContent value="symptoms" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="crop-type">Crop Type (Optional)</Label>
                      <Input
                        id="crop-type"
                        placeholder="e.g., Tomato, Rice, Wheat, etc."
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="symptom-description">Describe the symptoms you're seeing</Label>
                      <Textarea
                        id="symptom-description"
                        placeholder="Describe what you observe: leaf spots, wilting, discoloration, growth issues, etc. Be as detailed as possible."
                        value={symptomDescription}
                        onChange={(e) => setSymptomDescription(e.target.value)}
                        rows={6}
                      />
                    </div>
                    
                    <Button 
                      onClick={analyzeSymptoms}
                      disabled={isAnalyzing || !symptomDescription.trim()}
                      className="w-full bg-gradient-primary"
                    >
                      {isAnalyzing ? t('analyzing') : 'Analyze Symptoms'}
                    </Button>
                  </div>

                  <Alert>
                    <MessageSquare className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Be specific:</strong> Include details about leaf color changes, spots, wilting patterns, 
                      growth stage, and any environmental conditions that might be relevant.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
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
                  <p className="text-muted-foreground">Analyzing your input...</p>
                  <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
                </div>
              ) : analysis ? (
                <div className="space-y-6">
                  {/* Top Diagnoses */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Top Diagnoses</h3>
                    <div className="space-y-3">
                      {analysis.topDiagnoses.map((diagnosis, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                              <h4 className="font-semibold">{diagnosis.name}</h4>
                              <div className={`flex items-center gap-1 ${getCategoryColor(diagnosis.category)}`}>
                                {getCategoryIcon(diagnosis.category)}
                                <span className="text-xs capitalize">{diagnosis.category}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className={getSeverityColor(diagnosis.severity)}>
                              {diagnosis.severity}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Confidence:</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full" 
                                style={{ width: `${diagnosis.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{Math.round(diagnosis.confidence * 100)}%</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground italic">{diagnosis.notes}</p>
                          
                          <div className="text-xs text-muted-foreground">
                            <strong>Affected crops:</strong> {diagnosis.crops.join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Questions to Farmer */}
                  {analysis.questionsToFarmer && analysis.questionsToFarmer.length > 0 && (
                    <>
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Help Us Refine the Diagnosis
                        </h4>
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Please answer these questions to improve accuracy:</strong>
                            <ul className="mt-2 space-y-1">
                              {analysis.questionsToFarmer.map((question, index) => (
                                <li key={index} className="text-sm">• {question}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>
                      <Separator />
                    </>
                  )}

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
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      Treatment Solutions
                    </h4>

                    {/* Organic */}
                    <div className="mb-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                          <Leaf className="h-4 w-4" />
                          Organic Solution
                        </h5>
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
                        <h5 className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Cost-Efficient
                        </h5>
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
                        <h5 className="text-sm font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Unique/Innovative
                        </h5>
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
                    <User className="h-4 w-4" />
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
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Bug className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload an image or describe symptoms to start disease analysis</p>
                  <p className="text-sm mt-2">Our AI will identify diseases and provide treatment recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Camera className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Image Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Upload clear photos for AI-powered visual disease detection
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Symptom Q&A</h3>
              <p className="text-sm text-muted-foreground">
                Describe symptoms for detailed analysis and diagnosis
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
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Comprehensive Coverage</h3>
              <p className="text-sm text-muted-foreground">
                Covers fungal, bacterial, viral, nutrient, and pest issues
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;