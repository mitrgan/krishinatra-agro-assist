import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  Wheat, 
  Droplets, 
  Bug, 
  Calculator, 
  Calendar, 
  TestTube,
  Users
} from "lucide-react";
import AppLogo from "@/components/AppLogo";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      title: t("yield_prediction"),
      description: t("yield_prediction_desc"),
      icon: Wheat,
      path: "/yield-prediction",
      color: "bg-gradient-harvest"
    },
    {
      title: t("recommendations"),
      description: t("recommendations_desc"),
      icon: Droplets,
      path: "/recommendations",
      color: "bg-gradient-primary"
    },
    {
      title: t("disease_detection"),
      description: t("disease_detection_desc"),
      icon: Bug,
      path: "/disease-detection",
      color: "bg-gradient-earth"
    },
    {
      title: t("profit_analysis"),
      description: t("profit_analysis_desc"),
      icon: Calculator,
      path: "/profit-analysis",
      color: "bg-gradient-harvest"
    },
    {
      title: t("timeline_guidance"),
      description: t("timeline_guidance_desc"),
      icon: Calendar,
      path: "/timeline",
      color: "bg-gradient-primary"
    },
    {
      title: t("soil_analysis"),
      description: t("soil_analysis_desc"),
      icon: TestTube,
      path: "/soil-analysis",
      color: "bg-gradient-earth"
    },
    {
      title: t("community"),
      description: t("community_desc"),
      icon: Users,
      path: "/community",
      color: "bg-gradient-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <div className="relative rounded-2xl overflow-hidden mb-12 shadow-soft">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dashboardHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          <div className="relative text-center py-20 px-4">
            <AppLogo variant="hero" className="mb-8" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("welcome")} to Smart Farming
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("welcome_message")}
            </p>
          </div>
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
                    {t("get_started")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-harvest rounded-lg p-8 text-center shadow-soft mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {t("revolutionize_farming")}
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {t("join_farmers")}
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/yield-prediction')}
          >
            {t("start_analysis")}
          </Button>
        </div>

        {/* Community Section */}
        <div className="bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] rounded-lg p-8 text-center shadow-soft border border-[#2E7D32]/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-[#2E7D32]" />
            <h2 className="text-2xl font-bold text-[#2E7D32]">
              {t("join_community")}
            </h2>
          </div>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            {t("community_benefits")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/community')}
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              {t("go_to_community")}
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/community')}
              className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white px-8 py-3 text-lg"
            >
              {t("learn_more")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;