# 📱 Krishinatra Mobile App Setup

Your farming app is now configured for mobile deployment using Capacitor!

## 🚀 Quick Test (Development)
Your app is already configured to run from the Lovable sandbox. Simply:
1. Install Capacitor CLI globally: `npm install -g @capacitor/cli`
2. Run: `npx cap run android` or `npx cap run ios`

## 📋 For Physical Device/Production Setup

### 1. Export to GitHub
- Click "Export to GitHub" button in Lovable
- Clone your repository locally
- Run `npm install`

### 2. Add Platforms
```bash
# Add the platforms you want to support
npx cap add android
npx cap add ios  # Requires Mac with Xcode
```

### 3. Build and Sync
```bash
# Build your web app
npm run build

# Sync changes to native platforms
npx cap sync
```

### 4. Run on Device
```bash
# For Android (requires Android Studio)
npx cap run android

# For iOS (requires Mac with Xcode)
npx cap run ios
```

## 📱 Mobile Features
- ✅ Responsive design optimized for mobile screens
- ✅ Touch-friendly button sizes
- ✅ Mobile-optimized forms and inputs  
- ✅ Fast loading with splash screen
- ✅ Agricultural green theme throughout

## 🔄 Development Workflow
After making changes in Lovable:
1. Git pull your changes
2. Run `npx cap sync` 
3. Test on your device

## 🌾 App Details
- **App ID**: `app.lovable.5544a5064c9b40b3b3e7b7246ee5d8eb`
- **App Name**: `krishinatra-agroassistent`
- **Theme**: Agricultural green for farmers
- **Features**: Crop detection, yield prediction, disease detection