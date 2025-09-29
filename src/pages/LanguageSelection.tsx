import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Globe } from 'lucide-react';
import AppLogo from '@/components/AppLogo';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', color: 'languages-english' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', color: 'languages-hindi' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', color: 'languages-punjabi' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', color: 'languages-tamil' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', color: 'languages-kannada' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', color: 'languages-marathi' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', color: 'languages-telugu' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', color: 'languages-bengali' },
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
            <AppLogo variant="card" className="mb-6" />
            <CardTitle className="text-3xl font-bold text-foreground">
              {t('select_language')}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Choose your preferred language
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-medium ${
                    selectedLanguage === language.code
                      ? `bg-${language.color} border-${language.color} shadow-soft`
                      : `border-border hover:border-${language.color} bg-card/50 backdrop-blur-sm`
                  }`}
                  style={{
                    backgroundColor: selectedLanguage === language.code 
                      ? `hsl(var(--lang-${language.code === 'en' ? 'english' : 
                          language.code === 'hi' ? 'hindi' :
                          language.code === 'pa' ? 'punjabi' :
                          language.code === 'ta' ? 'tamil' :
                          language.code === 'kn' ? 'kannada' :
                          language.code === 'mr' ? 'marathi' :
                          language.code === 'te' ? 'telugu' : 'bengali'}))` 
                      : undefined,
                    borderColor: selectedLanguage === language.code 
                      ? `hsl(var(--lang-${language.code === 'en' ? 'english' : 
                          language.code === 'hi' ? 'hindi' :
                          language.code === 'pa' ? 'punjabi' :
                          language.code === 'ta' ? 'tamil' :
                          language.code === 'kn' ? 'kannada' :
                          language.code === 'mr' ? 'marathi' :
                          language.code === 'te' ? 'telugu' : 'bengali'}))` 
                      : undefined
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-bold text-lg ${
                      selectedLanguage === language.code 
                        ? 'text-white' 
                        : 'text-foreground group-hover:text-primary'
                    }`}>
                      {language.name}
                    </h3>
                    {selectedLanguage === language.code && (
                      <Check className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <p className={`text-3xl font-bold ${
                    selectedLanguage === language.code 
                      ? 'text-white' 
                      : 'text-muted-foreground group-hover:text-primary'
                  }`}>
                    {language.nativeName}
                  </p>
                  
                  {/* Hover gradient overlay */}
                  <div 
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                      selectedLanguage !== language.code ? 'block' : 'hidden'
                    }`}
                    style={{
                      background: `hsl(var(--lang-${language.code === 'en' ? 'english' : 
                        language.code === 'hi' ? 'hindi' :
                        language.code === 'pa' ? 'punjabi' :
                        language.code === 'ta' ? 'tamil' :
                        language.code === 'kn' ? 'kannada' :
                        language.code === 'mr' ? 'marathi' :
                        language.code === 'te' ? 'telugu' : 'bengali'}))`
                    }}
                  />
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