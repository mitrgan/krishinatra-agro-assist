import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5544a5064c9b40b3b3e7b7246ee5d8eb',
  appName: 'krishinatra-agroassistent',
  webDir: 'dist',
  server: {
    url: 'https://5544a506-4c9b-40b3-b3e7-b7246ee5d8eb.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2D5A27',
      showSpinner: true,
      spinnerColor: '#FFFFFF'
    }
  }
};

export default config;