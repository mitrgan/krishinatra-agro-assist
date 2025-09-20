import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
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

interface DiseaseAnalysis {
  diseaseName: string;
  confidence: number;
  severity: "Early Stage" | "Moderate" | "Severe";
  symptoms: string[];
  causes: string[];
  treatments: {
    immediate: string[];
    preventive: string[];
    organic: string[];
  };
  followUp: string;
}

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);

  // Mock disease analysis data
  const mockAnalyses: DiseaseAnalysis[] = [
    {
      diseaseName: "Leaf Blight",
      confidence: 85,
      severity: "Moderate",
      symptoms: ["Brown spots on leaves", "Yellowing edges", "Wilting"],
      causes: ["High humidity", "Poor air circulation", "Infected seeds"],
      treatments: {
        immediate: ["Remove infected leaves", "Apply copper-based fungicide", "Improve drainage"],
        preventive: ["Ensure proper spacing", "Avoid overhead watering", "Crop rotation"],
        organic: ["Neem oil spray", "Baking soda solution", "Compost tea"]
      },
      followUp: "Monitor for 7-10 days. If spreading continues, consider laboratory testing."
    },
    {
      diseaseName: "Powdery Mildew",
      confidence: 92,
      severity: "Early Stage",
      symptoms: ["White powdery coating", "Stunted growth", "Leaf distortion"],
      causes: ["High humidity", "Poor ventilation", "Overcrowding"],
      treatments: {
        immediate: ["Increase air circulation", "Reduce humidity", "Apply sulfur fungicide"],
        preventive: ["Plant resistant varieties", "Proper spacing", "Morning watering"],
        organic: ["Milk spray (1:10 ratio)", "Potassium bicarbonate", "Essential oil mixture"]
      },
      followUp: "Treatment should show results in 3-5 days. Continue monitoring weekly."
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
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              AI Disease Detection
            </h1>
            <p className="text-muted-foreground mt-1">
              Upload crop images to identify diseases and get treatment recommendations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Crop Image
              </CardTitle>
              <CardDescription>
                Take a clear photo of the affected plant parts. Best results with good lighting and close-up shots.
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
                          {isAnalyzing ? "Analyzing..." : "Analyze Disease"}
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

                  <Separator />

                  {/* Treatments */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Treatment Recommendations
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-red-600 mb-2">Immediate Actions</h5>
                        <ul className="space-y-1">
                          {analysis.treatments.immediate.map((treatment, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-red-500 flex-shrink-0" />
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-green-600 mb-2">Organic Solutions</h5>
                        <ul className="space-y-1">
                          {analysis.treatments.organic.map((treatment, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <Leaf className="h-3 w-3 text-green-500 flex-shrink-0" />
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-blue-600 mb-2">Prevention</h5>
                        <ul className="space-y-1">
                          {analysis.treatments.preventive.map((treatment, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <Shield className="h-3 w-3 text-blue-500 flex-shrink-0" />
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Follow-up */}
                  <Alert>
                    <Droplets className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Follow-up:</strong> {analysis.followUp}
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