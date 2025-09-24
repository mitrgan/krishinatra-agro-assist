import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const YieldPrediction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPrediction = {
        expectedYield: "45-55 tons/hectare",
        confidenceLevel: "87%",
        factors: [
          "Optimal soil moisture detected",
          "Favorable weather conditions",
          "Good nutrient levels"
        ],
        recommendations: [
          "Continue current irrigation schedule",
          "Apply nitrogen fertilizer in 2 weeks",
          "Monitor for pest activity"
        ]
      };
      
      setPrediction(mockPrediction);
      setIsLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your yield prediction has been generated successfully.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
            <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back_to_dashboard')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('yield_prediction')}</h1>
            <p className="text-muted-foreground">{t('yield_prediction_desc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('crop_information')}
              </CardTitle>
              <CardDescription>
                {t('crop_info_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="crop">{t('crop_type')}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_crop')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">{t('wheat')}</SelectItem>
                        <SelectItem value="rice">{t('rice')}</SelectItem>
                        <SelectItem value="corn">{t('corn')}</SelectItem>
                        <SelectItem value="soybeans">{t('soybeans')}</SelectItem>
                        <SelectItem value="cotton">{t('cotton')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="area">{t('field_area')}</Label>
                    <Input id="area" type="number" placeholder="10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="variety">Crop Variety</Label>
                    <Input id="variety" placeholder="e.g., HD-2967" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="plantingDate">Planting Date</Label>
                    <Input id="plantingDate" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location/Region</Label>
                  <Input id="location" placeholder="e.g., Punjab, India" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conditions">Current Conditions</Label>
                  <Textarea 
                    id="conditions"
                    placeholder="Describe current weather, soil moisture, pest status, etc."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-harvest hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? t('analyzing') : t('predict_yield')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {prediction && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-primary">Yield Prediction Results</CardTitle>
                <CardDescription>Based on AI analysis of your crop data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-harvest/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Expected Yield</h3>
                  <p className="text-2xl font-bold text-primary">{prediction.expectedYield}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confidence: {prediction.confidenceLevel}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Factors</h4>
                  <ul className="space-y-1">
                    {prediction.factors.map((factor: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {prediction.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;