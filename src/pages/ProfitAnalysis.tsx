import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  Calculator, 
  ArrowLeft, 
  Leaf, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3,
  Target,
  Shield,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";
import AppLogo from "@/components/AppLogo";
import { profitAnalysisEngine, ProfitAnalysisResult, CropProfitData } from "@/lib/profitAnalysisDatabase";

const ProfitAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // State management
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [landSize, setLandSize] = useState<string>("1");
  const [isOrganic, setIsOrganic] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ProfitAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>("");
  const [availableCrops, setAvailableCrops] = useState<CropProfitData[]>([]);

  // Get crop suggestions from soil analysis if available
  useEffect(() => {
    const soilAnalysisData = location.state?.soilAnalysisData;
    if (soilAnalysisData?.recommendedCrops) {
      const suggestedCrops = soilAnalysisData.recommendedCrops.map((crop: any) => crop.name);
      const crops = profitAnalysisEngine.getAllCrops().filter(crop => 
        suggestedCrops.some((suggested: string) => 
          suggested.toLowerCase().includes(crop.name.toLowerCase()) ||
          crop.name.toLowerCase().includes(suggested.toLowerCase())
        )
      );
      setAvailableCrops(crops);
      if (crops.length > 0) {
        setSelectedCrop(crops[0].name);
      }
    } else {
      setAvailableCrops(profitAnalysisEngine.getAllCrops());
    }
  }, [location.state]);

  const handleAnalyze = async () => {
    if (!selectedCrop) {
      setError("Please select a crop");
      return;
    }

    if (!landSize || parseFloat(landSize) <= 0) {
      setError("Please enter a valid land size");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const landSizeNum = parseFloat(landSize);
      const result = profitAnalysisEngine.calculateProfit(selectedCrop, landSizeNum, isOrganic);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: `Profit analysis completed for ${selectedCrop}`,
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getProfitColor = (profit: number) => {
    if (profit > 0) return "text-green-600";
    if (profit < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getProfitIcon = (profit: number) => {
    if (profit > 0) return <ArrowUpRight className="h-5 w-5 text-green-600" />;
    if (profit < 0) return <ArrowDownRight className="h-5 w-5 text-red-600" />;
    return <Minus className="h-5 w-5 text-gray-600" />;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profit Analysis</h1>
                <p className="text-sm text-gray-600">Calculate potential profits and ROI for your crops</p>
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
                  <Calculator className="h-5 w-5" />
                  <span>Crop & Land Details</span>
                </CardTitle>
                <CardDescription className="text-green-100">
                  Enter your crop and land information for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="crop-select" className="text-sm font-medium text-gray-700">
                    Select Crop *
                  </Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCrops.map((crop) => (
                        <SelectItem key={crop.name} value={crop.name}>
                          <div className="flex items-center space-x-2">
                            <span>{crop.emoji}</span>
                            <span>{crop.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="land-size" className="text-sm font-medium text-gray-700">
                    Land Size (acres) *
                  </Label>
                  <Input
                    id="land-size"
                    type="number"
                    placeholder="e.g., 1"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    min="0.1"
                    step="0.1"
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="organic-farming"
                    checked={isOrganic}
                    onCheckedChange={setIsOrganic}
                  />
                  <Label htmlFor="organic-farming" className="text-sm font-medium text-gray-700">
                    Organic Farming
                  </Label>
                </div>
                <p className="text-xs text-gray-500">
                  Organic farming can reduce input costs by 15-30%
                </p>

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
                  disabled={!selectedCrop || !landSize || isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Analyze Profit
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
                {/* Main Profit Card */}
                <Card className="shadow-lg border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{analysisResult.crop.emoji}</span>
                        <span>{analysisResult.crop.name} Profit Analysis</span>
                      </div>
                      <Badge className="bg-white text-green-600">
                        {analysisResult.landSize} acre{analysisResult.landSize > 1 ? 's' : ''}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Cost Card */}
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-4 text-center">
                          <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <h3 className="font-semibold text-blue-800 mb-1">Total Cost</h3>
                          <p className="text-2xl font-bold text-blue-900">
                            {formatCurrency(analysisResult.totalCost)}
                          </p>
                          {isOrganic && (
                            <p className="text-xs text-blue-600 mt-1">
                              Saved: {formatCurrency(analysisResult.organicSavings)}
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Yield Card */}
                      <Card className="border-yellow-200 bg-yellow-50">
                        <CardContent className="p-4 text-center">
                          <BarChart3 className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                          <h3 className="font-semibold text-yellow-800 mb-1">Expected Yield</h3>
                          <p className="text-2xl font-bold text-yellow-900">
                            {analysisResult.expectedYield.toFixed(1)} quintals
                          </p>
                          <p className="text-xs text-yellow-600 mt-1">
                            {analysisResult.crop.marketPrice.average} ₹/quintal
                          </p>
                        </CardContent>
                      </Card>

                      {/* Income Card */}
                      <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <h3 className="font-semibold text-purple-800 mb-1">Total Income</h3>
                          <p className="text-2xl font-bold text-purple-900">
                            {formatCurrency(analysisResult.totalIncome)}
                          </p>
                          <p className="text-xs text-purple-600 mt-1">
                            {formatCurrency(analysisResult.crop.marketPrice.average)} per quintal
                          </p>
                        </CardContent>
                      </Card>

                      {/* Profit Card */}
                      <Card className={`border-2 ${
                        analysisResult.netProfit > 0 ? 'border-green-200 bg-green-50' : 
                        analysisResult.netProfit < 0 ? 'border-red-200 bg-red-50' : 
                        'border-gray-200 bg-gray-50'
                      }`}>
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center mb-2">
                            {getProfitIcon(analysisResult.netProfit)}
                          </div>
                          <h3 className="font-semibold mb-1">Net Profit</h3>
                          <p className={`text-2xl font-bold ${getProfitColor(analysisResult.netProfit)}`}>
                            {formatCurrency(analysisResult.netProfit)}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {analysisResult.profitMargin.toFixed(1)}% margin
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Analysis Tabs */}
                <Tabs defaultValue="breakdown" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-green-50">
                    <TabsTrigger value="breakdown" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Cost Breakdown
                    </TabsTrigger>
                    <TabsTrigger value="yield" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Yield Analysis
                    </TabsTrigger>
                    <TabsTrigger value="risk" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Shield className="h-4 w-4 mr-2" />
                      Risk Assessment
                    </TabsTrigger>
                    <TabsTrigger value="recommendations" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Recommendations
                    </TabsTrigger>
                  </TabsList>

                  {/* Cost Breakdown Tab */}
                  <TabsContent value="breakdown" className="space-y-4">
                    <Card className="shadow-lg border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-800">
                          <DollarSign className="h-5 w-5" />
                          <span>Cost Breakdown (Per Acre)</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm font-medium text-blue-800">Seeds</span>
                              <span className="font-semibold text-blue-900">
                                {formatCurrency(analysisResult.crop.costPerAcre.seeds)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                              <span className="text-sm font-medium text-green-800">Fertilizers</span>
                              <span className="font-semibold text-green-900">
                                {formatCurrency(analysisResult.crop.costPerAcre.fertilizers)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                              <span className="text-sm font-medium text-cyan-800">Irrigation</span>
                              <span className="font-semibold text-cyan-900">
                                {formatCurrency(analysisResult.crop.costPerAcre.irrigation)}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                              <span className="text-sm font-medium text-orange-800">Labor</span>
                              <span className="font-semibold text-orange-900">
                                {formatCurrency(analysisResult.crop.costPerAcre.labor)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                              <span className="text-sm font-medium text-red-800">Pesticides</span>
                              <span className="font-semibold text-red-900">
                                {formatCurrency(analysisResult.crop.costPerAcre.pesticides)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-800">Other</span>
                              <span className="font-semibold text-gray-900">
                                {formatCurrency(analysisResult.crop.costPerAcre.other)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-200">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-green-800">Total Cost per Acre</span>
                            <span className="text-xl font-bold text-green-900">
                              {formatCurrency(analysisResult.crop.costPerAcre.total)}
                            </span>
                          </div>
                          {isOrganic && (
                            <div className="mt-2 text-sm text-green-700">
                              <CheckCircle className="h-4 w-4 inline mr-1" />
                              Organic savings: {formatCurrency(analysisResult.organicSavings / analysisResult.landSize)} per acre
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Yield Analysis Tab */}
                  <TabsContent value="yield" className="space-y-4">
                    <Card className="shadow-lg border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-800">
                          <BarChart3 className="h-5 w-5" />
                          <span>Yield & Market Analysis</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Yield Range (Quintals/Acre)</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                                <span className="text-sm text-red-800">Minimum</span>
                                <span className="font-semibold text-red-900">{analysisResult.crop.yieldPerAcre.min}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                                <span className="text-sm text-yellow-800">Average</span>
                                <span className="font-semibold text-yellow-900">{analysisResult.crop.yieldPerAcre.average}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                <span className="text-sm text-green-800">Maximum</span>
                                <span className="font-semibold text-green-900">{analysisResult.crop.yieldPerAcre.max}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Market Price (₹/Quintal)</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                                <span className="text-sm text-red-800">Minimum</span>
                                <span className="font-semibold text-red-900">{formatCurrency(analysisResult.crop.marketPrice.min)}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                                <span className="text-sm text-yellow-800">Average</span>
                                <span className="font-semibold text-yellow-900">{formatCurrency(analysisResult.crop.marketPrice.average)}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                <span className="text-sm text-green-800">Maximum</span>
                                <span className="font-semibold text-green-900">{formatCurrency(analysisResult.crop.marketPrice.max)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Growing Period</h4>
                          <p className="text-blue-700">
                            {analysisResult.crop.growingPeriod.average} days average 
                            ({analysisResult.crop.growingPeriod.min}-{analysisResult.crop.growingPeriod.max} days range)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Risk Assessment Tab */}
                  <TabsContent value="risk" className="space-y-4">
                    <Card className="shadow-lg border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-800">
                          <Shield className="h-5 w-5" />
                          <span>Risk Assessment</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-gray-900">Overall Risk Level</span>
                            <Badge className={getRiskColor(analysisResult.riskLevel)}>
                              {analysisResult.riskLevel.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                analysisResult.riskLevel === 'low' ? 'bg-green-500' :
                                analysisResult.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{
                                width: analysisResult.riskLevel === 'low' ? '33%' :
                                       analysisResult.riskLevel === 'medium' ? '66%' : '100%'
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Risk Factors</h4>
                          <div className="space-y-2">
                            {analysisResult.riskFactors.map((risk, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm text-yellow-800">{risk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Recommendations Tab */}
                  <TabsContent value="recommendations" className="space-y-4">
                    <Card className="shadow-lg border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-800">
                          <Lightbulb className="h-5 w-5" />
                          <span>Recommendations</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analysisResult.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-green-800">{recommendation}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Crop Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-blue-700">Soil Types:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {analysisResult.crop.soilTypes.map((soil, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {soil}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-blue-700">Planting Seasons:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {analysisResult.crop.seasons.map((season, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {season}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card className="shadow-lg border-green-200">
                <CardContent className="p-12 text-center">
                  <Calculator className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Analyze Your Profit?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select a crop and enter your land size to get detailed profit analysis including cost breakdown, yield estimates, and market insights.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => navigate('/soil-analysis')}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <Leaf className="h-4 w-4 mr-2" />
                      Soil Analysis
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
                      <Target className="h-4 w-4 mr-2" />
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

export default ProfitAnalysis;
