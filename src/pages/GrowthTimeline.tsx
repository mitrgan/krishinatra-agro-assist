import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Calendar, 
  Camera, 
  Upload, 
  Leaf, 
  Droplets, 
  Scissors, 
  Shield, 
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Image as ImageIcon,
  FileText,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  growthAnalysisEngine, 
  GrowthAnalysis, 
  CropType, 
  GrowthStage 
} from "@/lib/growthStageDatabase";

const GrowthTimeline = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // State management
  const [cropType, setCropType] = useState<string>("");
  const [sowingDate, setSowingDate] = useState<string>("");
  const [farmerObservations, setFarmerObservations] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<GrowthAnalysis | null>(null);
  const [availableCrops, setAvailableCrops] = useState<CropType[]>([]);
  const [activeTab, setActiveTab] = useState("input");

  // Load available crops on component mount
  useEffect(() => {
    const crops = growthAnalysisEngine.getAvailableCrops();
    setAvailableCrops(crops);
  }, []);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Analyze growth stage
  const analyzeGrowthStage = async () => {
    if (!cropType || !sowingDate) {
      toast({
        title: "Missing Information",
        description: "Please select a crop type and enter the sowing date",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI image analysis
      const imageAnalysis = selectedImage ? {
        detectedCharacteristics: [
          "Green leaves visible",
          "Stem development",
          "Overall plant vigor"
        ],
        confidence: 0.85,
        leafCount: Math.floor(Math.random() * 10) + 5,
        height: Math.floor(Math.random() * 30) + 10,
        hasFlowers: Math.random() > 0.7,
        hasFruits: Math.random() > 0.8
      } : undefined;

      const observations = farmerObservations
        .split('\n')
        .filter(obs => obs.trim().length > 0);

      const analysisResult = growthAnalysisEngine.analyzeGrowthStage(
        cropType,
        new Date(sowingDate),
        new Date(),
        observations,
        imageAnalysis
      );

      setAnalysis(analysisResult);
      setActiveTab("timeline");
      
      toast({
        title: "Analysis Complete",
        description: `Current stage: ${analysisResult.currentStage.name}`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please check your inputs and try again",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Get stage icon component
  const getStageIcon = (stage: GrowthStage) => {
    const iconMap: { [key: string]: any } = {
      germination: "🌱",
      seedling: "🌿", 
      vegetative: "🌾",
      flowering: "🌸",
      fruiting: "🍅",
      maturity: "🌻",
      harvest: "🧺"
    };
    return iconMap[stage.id] || "🌱";
  };

  // Get stage color based on progress
  const getStageColor = (stage: GrowthStage, isCurrent: boolean, isCompleted: boolean) => {
    if (isCompleted) return "bg-green-500";
    if (isCurrent) return "bg-blue-500";
    return "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("growth_timeline")}
              </h1>
              <p className="text-muted-foreground">
                {t("growth_timeline_desc")}
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">{t("crop_input")}</TabsTrigger>
            <TabsTrigger value="timeline" disabled={!analysis}>
              {t("growth_timeline")}
            </TabsTrigger>
          </TabsList>

          {/* Input Tab */}
          <TabsContent value="input" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Crop Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    {t("crop_information")}
                  </CardTitle>
                  <CardDescription>
                    {t("crop_info_desc")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="crop-type">{t("crop_type")}</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_crop")} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCrops.map((crop) => (
                          <SelectItem key={crop.id} value={crop.id}>
                            {crop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sowing-date">{t("sowing_date")}</Label>
                    <Input
                      id="sowing-date"
                      type="date"
                      value={sowingDate}
                      onChange={(e) => setSowingDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observations">{t("farmer_observations")}</Label>
                    <Textarea
                      id="observations"
                      placeholder={t("observations_placeholder")}
                      value={farmerObservations}
                      onChange={(e) => setFarmerObservations(e.target.value)}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      {t("observations_help")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Image Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    {t("image_analysis")}
                  </CardTitle>
                  <CardDescription>
                    {t("image_analysis_desc")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Crop preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {selectedImage?.name}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                          >
                            {t("remove_image")}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div>
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <Button variant="outline" asChild>
                              <span>
                                <Upload className="h-4 w-4 mr-2" />
                                {t("upload_image")}
                              </span>
                            </Button>
                          </Label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t("image_upload_help")}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <Button
                onClick={analyzeGrowthStage}
                disabled={isAnalyzing || !cropType || !sowingDate}
                size="lg"
                className="px-8"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    {t("analyzing")}
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    {t("analyze_growth")}
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            {analysis && (
              <>
                {/* Current Stage Overview */}
                <Card className="bg-gradient-primary text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-3">
                          <span className="text-4xl">{getStageIcon(analysis.currentStage)}</span>
                          {analysis.currentStage.name}
                        </CardTitle>
                        <CardDescription className="text-white/90">
                          {analysis.currentStage.description}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">
                          {analysis.progressPercentage}%
                        </div>
                        <div className="text-sm text-white/80">
                          {t("stage_progress")}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress 
                        value={analysis.progressPercentage} 
                        className="h-3 bg-white/20"
                      />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">{analysis.daysInCurrentStage}</div>
                          <div className="text-sm text-white/80">{t("days_in_stage")}</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{analysis.daysUntilNextStage}</div>
                          <div className="text-sm text-white/80">{t("days_to_next")}</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{Math.round(analysis.aiConfidence * 100)}%</div>
                          <div className="text-sm text-white/80">{t("ai_confidence")}</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {analysis.nextStage ? getStageIcon(analysis.nextStage) : "✓"}
                          </div>
                          <div className="text-sm text-white/80">
                            {analysis.nextStage ? t("next_stage") : t("final_stage")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Growth Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {t("growth_timeline")}
                    </CardTitle>
                    <CardDescription>
                      {t("timeline_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                      
                      {/* Timeline Stages */}
                      <div className="space-y-8">
                        {availableCrops.find(c => c.id === cropType)?.stages.map((stage, index) => {
                          const isCurrent = stage.id === analysis.currentStage.id;
                          const isCompleted = index < availableCrops.find(c => c.id === cropType)?.stages.findIndex(s => s.id === analysis.currentStage.id)!;
                          const isUpcoming = index > availableCrops.find(c => c.id === cropType)?.stages.findIndex(s => s.id === analysis.currentStage.id)!;
                          
                          return (
                            <div key={stage.id} className="relative flex items-start gap-6">
                              {/* Stage Icon */}
                              <div className={`
                                relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg
                                ${isCurrent ? 'bg-blue-500 text-white' : 
                                  isCompleted ? 'bg-green-500 text-white' : 
                                  'bg-gray-300 text-gray-600'}
                              `}>
                                <span className="text-2xl">{getStageIcon(stage)}</span>
                              </div>
                              
                              {/* Stage Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className={`text-lg font-semibold ${
                                    isCurrent ? 'text-blue-600' : 
                                    isCompleted ? 'text-green-600' : 
                                    'text-gray-600'
                                  }`}>
                                    {stage.name}
                                  </h3>
                                  {isCurrent && (
                                    <Badge variant="default" className="bg-blue-500">
                                      {t("current")}
                                    </Badge>
                                  )}
                                  {isCompleted && (
                                    <Badge variant="default" className="bg-green-500">
                                      {t("completed")}
                                    </Badge>
                                  )}
                                </div>
                                
                                <p className="text-muted-foreground mb-3">
                                  {stage.description}
                                </p>
                                
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {stage.duration} {t("days")}
                                  </div>
                                  {isCurrent && (
                                    <div className="flex items-center gap-1">
                                      <TrendingUp className="h-4 w-4" />
                                      {analysis.daysInCurrentStage}/{stage.duration} {t("days_completed")}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Key Characteristics */}
                                <div className="mt-4">
                                  <h4 className="text-sm font-medium mb-2">{t("key_characteristics")}</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {stage.keyCharacteristics.slice(0, 3).map((characteristic, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {characteristic}
                                      </Badge>
                                    ))}
                                    {stage.keyCharacteristics.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{stage.keyCharacteristics.length - 3} {t("more")}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stage-Specific Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Irrigation Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-600">
                        <Droplets className="h-5 w-5" />
                        {t("irrigation_tips")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.stageSpecificRecommendations.irrigation.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Fertilization Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <Leaf className="h-5 w-5" />
                        {t("fertilization_tips")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.stageSpecificRecommendations.fertilization.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Disease Prevention */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <Shield className="h-5 w-5" />
                        {t("disease_prevention")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.stageSpecificRecommendations.diseasePrevention.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Critical Actions and Warnings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Critical Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-600">
                        <Target className="h-5 w-5" />
                        {t("critical_actions")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.criticalActions.map((action, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Warnings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        {t("warnings")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Analysis Results */}
                {analysis.visualAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        {t("ai_analysis_results")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">
                            {t("confidence")}: {Math.round(analysis.visualAnalysis.confidence * 100)}%
                          </Badge>
                          <Badge variant="outline">
                            {t("characteristics_detected")}: {analysis.visualAnalysis.detectedCharacteristics.length}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">{t("detected_characteristics")}</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysis.visualAnalysis.detectedCharacteristics.map((char, index) => (
                              <Badge key={index} variant="secondary">
                                {char}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {analysis.visualAnalysis.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">{t("ai_recommendations")}</h4>
                            <ul className="space-y-1">
                              {analysis.visualAnalysis.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GrowthTimeline;
