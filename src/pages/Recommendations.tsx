import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Droplets, Beaker, Calendar, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const mockRecommendations = {
        irrigation: {
          schedule: "Water every 3-4 days",
          amount: "25-30mm per session",
          timing: "Early morning (6-8 AM)"
        },
        fertilizer: {
          type: "NPK 20-20-20",
          amount: "150kg per hectare",
          schedule: "Apply in split doses"
        },
        pestControl: {
          treatment: "Neem-based organic spray",
          frequency: "Weekly application",
          precaution: "Avoid during flowering"
        },
        timing: {
          nextAction: "Nitrogen application in 5 days",
          harvest: "Expected in 45-50 days",
          monitoring: "Check for pest activity daily"
        }
      };
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
      
      toast({
        title: "Recommendations Generated",
        description: "Your personalized farming recommendations are ready.",
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
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Crop Recommendations</h1>
            <p className="text-muted-foreground">Get personalized suggestions for optimal farming</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Farm Details
              </CardTitle>
              <CardDescription>
                Tell us about your current farming situation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="crop">Current Crop</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="growth-stage">Growth Stage</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="germination">Germination</SelectItem>
                        <SelectItem value="vegetative">Vegetative</SelectItem>
                        <SelectItem value="flowering">Flowering</SelectItem>
                        <SelectItem value="maturity">Maturity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soil-type">Soil Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="silty">Silty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (hectares)</Label>
                    <Input id="area" type="number" placeholder="10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State, Country" />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Get Recommendations"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {recommendations && (
            <div className="space-y-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Irrigation Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">Schedule</p>
                    <p className="text-muted-foreground">{recommendations.irrigation.schedule}</p>
                  </div>
                  <div>
                    <p className="font-medium">Amount</p>
                    <p className="text-muted-foreground">{recommendations.irrigation.amount}</p>
                  </div>
                  <div>
                    <p className="font-medium">Best Timing</p>
                    <p className="text-muted-foreground">{recommendations.irrigation.timing}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="h-5 w-5 text-secondary" />
                    Fertilizer Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">Type</p>
                    <p className="text-muted-foreground">{recommendations.fertilizer.type}</p>
                  </div>
                  <div>
                    <p className="font-medium">Amount</p>
                    <p className="text-muted-foreground">{recommendations.fertilizer.amount}</p>
                  </div>
                  <div>
                    <p className="font-medium">Application</p>
                    <p className="text-muted-foreground">{recommendations.fertilizer.schedule}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Timeline & Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">Next Action</p>
                    <p className="text-muted-foreground">{recommendations.timing.nextAction}</p>
                  </div>
                  <div>
                    <p className="font-medium">Expected Harvest</p>
                    <p className="text-muted-foreground">{recommendations.timing.harvest}</p>
                  </div>
                  <div>
                    <p className="font-medium">Daily Monitoring</p>
                    <p className="text-muted-foreground">{recommendations.timing.monitoring}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;