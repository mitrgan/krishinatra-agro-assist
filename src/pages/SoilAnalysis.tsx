import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  TestTube, 
  ArrowLeft, 
  Leaf, 
  Droplets, 
  Sun, 
  TrendingUp,
  Calendar,
  Shield,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import AppLogo from "@/components/AppLogo";
import { soilAnalysisEngine, SoilAnalysisResult } from "@/lib/soilDatabase";

const SoilAnalysis = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedSoilType, setSelectedSoilType] = useState<string>("");
  const [phValue, setPhValue] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<SoilAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>("");

  const availableSoilTypes = soilAnalysisEngine.getAvailableSoilTypes();

  const handleAnalyze = async () => {
    if (!selectedSoilType) {
      setError("Please select a soil type");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const ph = phValue ? parseFloat(phValue) : undefined;
      console.log("Analyzing soil:", selectedSoilType, "pH:", ph);
      const result = soilAnalysisEngine.analyzeSoil(selectedSoilType, ph);
      console.log("Analysis result:", result);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPhStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "bg-green-100 text-green-800 border-green-200";
      case "too_acidic": return "bg-red-100 text-red-800 border-red-200";
      case "too_alkaline": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPhStatusIcon = (status: string) => {
    switch (status) {
      case "optimal": return <CheckCircle className="h-4 w-4" />;
      case "too_acidic": return <AlertTriangle className="h-4 w-4" />;
      case "too_alkaline": return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPhStatusText = (status: string) => {
    switch (status) {
      case "optimal": return "Optimal pH Level";
      case "too_acidic": return "Too Acidic - Needs Lime";
      case "too_alkaline": return "Too Alkaline - Needs Sulfur";
      default: return "pH Level Unknown";
    }
  };

  const getWaterRequirementColor = (requirement: string) => {
    switch (requirement) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getYieldPotentialColor = (potential: string) => {
    switch (potential) {
      case "low": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMarketValueColor = (value: string) => {
    switch (value) {
      case "low": return "bg-gray-100 text-gray-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "high": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "very_low": return "bg-green-100 text-green-800";
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-green-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <TestTube className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Soil Analysis</h1>
                <p className="text-sm text-gray-600">Analyze your soil for optimal crop selection</p>
              </div>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5" />
                  <span>Soil Input</span>
                </CardTitle>
                <CardDescription className="text-green-100">
                  Enter your soil details for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="soil-type" className="text-sm font-medium text-gray-700">
                    Soil Type *
                  </Label>
                  <Select value={selectedSoilType} onValueChange={setSelectedSoilType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSoilTypes.map((soilType) => (
                        <SelectItem key={soilType} value={soilType}>
                          {soilType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ph-value" className="text-sm font-medium text-gray-700">
                    Soil pH (Optional)
                  </Label>
                  <Input
                    id="ph-value"
                    type="number"
                    placeholder="e.g., 6.5"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                    min="0"
                    max="14"
                    step="0.1"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Enter pH value if you have tested your soil
                  </p>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedSoilType || isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Analyze Soil
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {analysisResult ? (
              <div className="space-y-6">
                {/* Soil Type Overview */}
                <Card className="shadow-lg border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span>Analysis Results</span>
                      <Badge className="bg-white text-green-600">
                        {analysisResult.soilType.name}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Soil Characteristics</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {analysisResult.soilType.characteristics.map((char, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Soil Properties</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Color:</span>
                            <span className="font-medium">{analysisResult.soilType.color}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Texture:</span>
                            <span className="font-medium">{analysisResult.soilType.texture}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ideal pH Range:</span>
                            <span className="font-medium">
                              {analysisResult.soilType.idealPhRange.min} - {analysisResult.soilType.idealPhRange.max}
                            </span>
                          </div>
                          {analysisResult.currentPh && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Current pH:</span>
                              <span className="font-medium">{analysisResult.currentPh}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* pH Status */}
                    {analysisResult.phStatus !== "unknown" && (
                      <div className="mt-4 p-4 rounded-lg border">
                        <div className="flex items-center space-x-2 mb-2">
                          {getPhStatusIcon(analysisResult.phStatus)}
                          <span className="font-medium">pH Status</span>
                        </div>
                        <Badge className={getPhStatusColor(analysisResult.phStatus)}>
                          {getPhStatusText(analysisResult.phStatus)}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Detailed Analysis Tabs */}
                <Tabs defaultValue="crops" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-green-50">
                    <TabsTrigger value="crops" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Leaf className="h-4 w-4 mr-2" />
                      Crops
                    </TabsTrigger>
                    <TabsTrigger value="corrections" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Droplets className="h-4 w-4 mr-2" />
                      Corrections
                    </TabsTrigger>
                    <TabsTrigger value="timeline" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger value="tips" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Tips
                    </TabsTrigger>
                  </TabsList>

                  {/* Crops Tab */}
                  <TabsContent value="crops" className="space-y-4">
                    <Card className="shadow-lg border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-800">
                          <Leaf className="h-5 w-5" />
                          <span>Recommended Crops</span>
                        </CardTitle>
                        <CardDescription>
                          Best crops suited for your soil type and pH level
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analysisResult.recommendedCrops.map((crop, index) => (
                            <Card key={index} className="border-green-100 hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                                  <div className="flex space-x-1">
                                    <Badge className={getWaterRequirementColor(crop.waterRequirement)}>
                                      {crop.waterRequirement} water
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Ideal pH:</span>
                                    <span className="font-medium">
                                      {crop.idealPhRange.min} - {crop.idealPhRange.max}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Yield Potential:</span>
                                    <Badge className={getYieldPotentialColor(crop.yieldPotential)}>
                                      {crop.yieldPotential}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Market Value:</span>
                                    <Badge className={getMarketValueColor(crop.marketValue)}>
                                      {crop.marketValue}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <h5 className="font-medium text-gray-900 mb-1">Planting Seasons:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {crop.plantingSeason.map((season, seasonIndex) => (
                                      <Badge key={seasonIndex} variant="outline" className="text-xs">
                                        {season}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {crop.specialNotes.length > 0 && (
                                  <div className="mt-3">
                                    <h5 className="font-medium text-gray-900 mb-1">Special Notes:</h5>
                                    <ul className="space-y-1">
                                      {crop.specialNotes.map((note, noteIndex) => (
                                        <li key={noteIndex} className="text-xs text-gray-600 flex items-start space-x-1">
                                          <span className="text-green-600 mt-0.5">•</span>
                                          <span>{note}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Corrections Tab */}
                  <TabsContent value="corrections" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResult.soilCorrections && Object.entries(analysisResult.soilCorrections).map(([type, corrections]) => (
                        corrections && corrections.length > 0 && (
                          <Card key={type} className="shadow-lg border-green-200">
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2 text-green-800 capitalize">
                                <Droplets className="h-5 w-5" />
                                <span>{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {corrections.map((correction, index) => (
                                  <div key={index} className="border-l-4 border-green-200 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">{correction.title}</h4>
                                    <p className="text-sm text-gray-600 mb-3">{correction.description}</p>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <Badge className={getCostColor(correction.cost)}>
                                          {correction.cost.replace('_', ' ')}
                                        </Badge>
                                        <Badge variant="outline">
                                          {correction.effectiveness} effectiveness
                                        </Badge>
                                        <span className="text-xs text-gray-500">
                                          {correction.timeToEffect}
                                        </span>
                                      </div>

                                      <div>
                                        <h5 className="font-medium text-gray-900 mb-1">Materials Needed:</h5>
                                        <div className="flex flex-wrap gap-1">
                                          {correction.materials.map((material, materialIndex) => (
                                            <Badge key={materialIndex} variant="outline" className="text-xs">
                                              {material}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <h5 className="font-medium text-gray-900 mb-1">Application Steps:</h5>
                                        <ol className="space-y-1">
                                          {correction.application.map((step, stepIndex) => (
                                            <li key={stepIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                              <span className="text-green-600 font-medium">{stepIndex + 1}.</span>
                                              <span>{step}</span>
                                            </li>
                                          ))}
                                        </ol>
                                      </div>

                                      {correction.notes.length > 0 && (
                                        <div>
                                          <h5 className="font-medium text-gray-900 mb-1">Important Notes:</h5>
                                          <ul className="space-y-1">
                                            {correction.notes.map((note, noteIndex) => (
                                              <li key={noteIndex} className="text-sm text-gray-600 flex items-start space-x-1">
                                                <span className="text-green-600 mt-0.5">•</span>
                                                <span>{note}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      ))}
                    </div>
                  </TabsContent>

                  {/* Timeline Tab */}
                  <TabsContent value="timeline" className="space-y-4">
                    <Card className="shadow-lg border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-800">
                          <Calendar className="h-5 w-5" />
                          <span>Timeline Integration</span>
                        </CardTitle>
                        <CardDescription>
                          Suggested crops and planting schedule for your soil
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">Suggested Crops for Timeline</h4>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                // In a real app, this would add crops to timeline
                                toast({
                                  title: "Added to Timeline",
                                  description: "Crops have been added to your farming timeline",
                                });
                              }}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Add to Timeline
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.timelineIntegration?.suggestedCrops?.map((crop, index) => (
                              <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200">
                                {crop}
                              </Badge>
                            )) || []}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Planting Schedule</h4>
                          <div className="space-y-2">
                            {analysisResult.timelineIntegration?.plantingSchedule?.map((schedule, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                                <Calendar className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-gray-700">{schedule}</span>
                              </div>
                            )) || []}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Soil Preparation Steps</h4>
                          <ol className="space-y-2">
                            {analysisResult.timelineIntegration?.soilPreparation?.map((step, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-700">{step}</span>
                              </li>
                            )) || []}
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Tips Tab */}
                  <TabsContent value="tips" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="shadow-lg border-green-200">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-green-800">
                            <Shield className="h-5 w-5" />
                            <span>Disease Prevention</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysisResult.diseasePrevention?.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </li>
                            )) || []}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-green-200">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-green-800">
                            <TrendingUp className="h-5 w-5" />
                            <span>Yield Optimization</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysisResult.yieldOptimization?.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                                <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </li>
                            )) || []}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card className="shadow-lg border-green-200">
                <CardContent className="p-12 text-center">
                  <TestTube className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Analyze Your Soil?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select your soil type and optionally enter the pH value to get personalized recommendations for crops, soil corrections, and farming tips.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => navigate('/disease-detection')}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Disease Detection
                    </Button>
                    <Button
                      onClick={() => navigate('/yield-prediction')}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Yield Prediction
                    </Button>
                    <Button
                      onClick={() => navigate('/recommendations')}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <Leaf className="h-4 w-4 mr-2" />
                      Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;
