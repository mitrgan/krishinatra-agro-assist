import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  Wheat, 
  TrendingUp, 
  Shield, 
  Target, 
  Zap, 
  Users 
} from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: Wheat,
      title: t("yield_prediction"),
      description: t("yield_prediction_desc")
    },
    {
      icon: Shield,
      title: t("disease_detection"),
      description: t("disease_detection_desc")
    },
    {
      icon: TrendingUp,
      title: t("profit_analysis"),
      description: t("profit_analysis_desc")
    }
  ];

  const stats = [
    { number: "50K+", label: "Farmers Helped" },
    { number: "25%", label: "Avg. Yield Increase" },
    { number: "30%", label: "Cost Reduction" },
    { number: "95%", label: "Accuracy Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroFarm})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero/80" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t("welcome")} to <span className="text-accent">Krishinatra</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              {t("welcome_message")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-3"
                onClick={() => navigate('/dashboard')}
              >
                <Target className="mr-2 h-5 w-5" />
                {t("get_started")}
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-3"
                onClick={() => navigate('/yield-prediction')}
              >
                <Zap className="mr-2 h-5 w-5" />
                {t("yield_prediction")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("revolutionize_farming")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("welcome_message")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-harvest rounded-2xl p-8 md:p-12 text-center shadow-medium">
            <Users className="h-12 w-12 text-white mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("join_farmers")}
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {t("welcome_message")}
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3"
              onClick={() => navigate('/dashboard')}
            >
              {t("get_started")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
