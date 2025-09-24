import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export default function LanguageSelection() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">
              {t('select_language')}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              {t('app_title')} - Choose your preferred language
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    selectedLanguage === language.code
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-left">
                      {language.name}
                    </h3>
                    {selectedLanguage === language.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <p className="text-2xl font-medium text-primary mb-1">
                    {language.nativeName}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Continue to Dashboard
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>You can change your language preference anytime from the settings</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}