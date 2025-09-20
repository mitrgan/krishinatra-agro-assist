import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Wheat, 
  Droplets, 
  Bug, 
  Calculator, 
  Calendar, 
  TestTube 
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Yield Prediction",
      description: "Estimate expected harvest based on crop conditions",
      icon: Wheat,
      path: "/yield-prediction",
      color: "bg-gradient-harvest"
    },
    {
      title: "Crop Recommendations",
      description: "Get personalized suggestions for your farm",
      icon: Droplets,
      path: "/recommendations",
      color: "bg-gradient-primary"
    },
    {
      title: "Disease Detection",
      description: "Identify and treat plant diseases early",
      icon: Bug,
      path: "/disease-detection",
      color: "bg-gradient-earth"
    },
    {
      title: "Profit Analysis",
      description: "Calculate potential profit margins and ROI",
      icon: Calculator,
      path: "/profit-analysis",
      color: "bg-gradient-harvest"
    },
    {
      title: "Timeline Guidance",
      description: "Track crop growth and farming activities",
      icon: Calendar,
      path: "/timeline",
      color: "bg-gradient-primary"
    },
    {
      title: "Soil Analysis",
      description: "Find the best crops for your soil type",
      icon: TestTube,
      path: "/soil-analysis",
      color: "bg-gradient-earth"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Krishinatra
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered farming assistant for smarter agriculture and better yields
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1 border-border/50"
                onClick={() => navigate(feature.path)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary hover:text-primary-foreground"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-harvest rounded-lg p-8 text-center shadow-soft">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Revolutionize Your Farming?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AI to increase their yields, 
            reduce costs, and make data-driven decisions for their crops.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/yield-prediction')}
          >
            Start Your First Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;