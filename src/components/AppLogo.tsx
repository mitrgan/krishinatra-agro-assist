import { cn } from "@/lib/utils";
import krishinetraLogo from "@/assets/krishinetra-logo.png";

interface AppLogoProps {
  variant?: "header" | "hero" | "card";
  className?: string;
  showTagline?: boolean;
}

const AppLogo = ({ 
  variant = "card", 
  className, 
  showTagline = true 
}: AppLogoProps) => {
  const variants = {
    header: {
      container: "flex items-center gap-3",
      logoWrapper: "bg-primary/10 rounded-lg p-2",
      logo: "h-8 w-8",
      title: "text-xl font-bold text-primary",
      tagline: "text-xs text-muted-foreground"
    },
    hero: {
      container: "flex flex-col items-center text-center",
      logoWrapper: "bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20",
      logo: "h-24 md:h-32 drop-shadow-2xl",
      title: "text-4xl md:text-5xl font-bold text-white mb-2",
      tagline: "text-lg md:text-xl text-accent font-semibold"
    },
    card: {
      container: "flex flex-col items-center text-center",
      logoWrapper: "bg-primary/5 rounded-xl p-4 mb-4 border border-primary/10",
      logo: "h-16 md:h-20 drop-shadow-lg",
      title: "text-2xl md:text-3xl font-bold text-primary mb-2",
      tagline: "text-sm md:text-base text-muted-foreground"
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={cn(currentVariant.container, className)}>
      <div className={currentVariant.logoWrapper}>
        <img 
          src={krishinetraLogo} 
          alt="Krishinetra Logo" 
          className={cn("mx-auto", currentVariant.logo)}
        />
      </div>
      <h1 className={currentVariant.title}>
        Krishinetra
      </h1>
      {showTagline && (
        <p className={currentVariant.tagline}>
          Smart Farming Companion
        </p>
      )}
    </div>
  );
};

export default AppLogo;