# 📱 Meeting Scheduler - Property Visit Booking App

A modern React Native mobile app for scheduling property visits with real-time meeting coordination.

## ✨ Features

- 📅 **Interactive Calendar** - Select visit dates with an intuitive calendar interface
- ⏰ **Time Picker** - Choose preferred meeting times
- ⚡ **Instant Meetings** - Start immediate property visits
- 👥 **Participant Management** - Add and manage meeting attendees
- 🌐 **Online/Offline Meetings** - Support for both virtual and in-person visits
- 🔔 **Smart Reminders** - Multiple reminder options
- 🔗 **Meeting Links** - Auto-generated links for online meetings
- 📝 **Notes & Details** - Add meeting notes and descriptions

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MeetingScheduler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device**
   - Scan QR code with Expo Go app (Android/iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## 📦 Tech Stack

- **Framework**: React Native with Expo (SDK 54)
- **Navigation**: React Navigation (Stack Navigator)
- **UI Components**: Custom components with React Native
- **Icons**: @expo/vector-icons
- **Safe Area**: react-native-safe-area-context
- **Validation**: Custom validation utilities

## 📁 Project Structure

```
MeetingScheduler/
├── App.js                      # Main app entry with navigation
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
├── package.json                # Dependencies
├── assets/                     # Images and icons
├── src/
│   ├── screens/
│   │   ├── DateTimePickerScreen.js    # Date/time selection
│   │   └── UpdateMeetingScreen.js     # Meeting details
│   ├── components/
│   │   └── ParticipantSelectionModal.js
│   └── utils/
│       └── validation.js       # Form validation
├── SNACK_SETUP.md             # Snack deployment guide
└── README.md                   # This file
```

## 🎯 Main Screens

### 1. Date & Time Picker Screen
- Interactive monthly calendar
- Time selection with AM/PM toggle
- Tab navigation between date and time
- Instant meeting quick action

### 2. Update Meeting Screen
- Meeting title input
- Date/time display with edit option
- Online/Offline toggle
- Participant selection
- Meeting link generation (for online)
- Reminder settings
- Notes field
- Validation and error handling

## 📲 Distribution Options

### Option 1: Expo Go (Fastest - For Testing)
```bash
npx expo start --tunnel
```
Share the QR code with testers who have Expo Go installed.

### Option 2: Snack (Web-Based Demo)
See detailed instructions in [SNACK_SETUP.md](SNACK_SETUP.md)
- Perfect for client demos
- No installation needed
- Shareable link

### Option 3: Build APK/IPA
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build Android APK
eas build -p android --profile preview

# Build iOS
eas build -p ios --profile preview
```

### Option 4: Google Play Store (Production)
```bash
# Build production AAB
eas build -p android --profile production

# Submit to Play Store
eas submit -p android
```

## 🔧 Configuration

### Update Package Name (Android)
Edit `app.json`:
```json
{
  "android": {
    "package": "com.yourcompany.meetingscheduler"
  }
}
```

### Update Bundle Identifier (iOS)
Edit `app.json`:
```json
{
  "ios": {
    "bundleIdentifier": "com.yourcompany.meetingscheduler"
  }
}
```

## 🧪 Testing

### Run on Android Emulator
```bash
npm run android
```

### Run on iOS Simulator
```bash
npm run ios
```

### Test on Real Device
1. Install Expo Go from App Store / Play Store
2. Scan QR code from `npx expo start`

## 🐛 Troubleshooting

### SafeAreaView Deprecation Warning
✅ Already fixed - using `react-native-safe-area-context`

### Metro Bundler Cache Issues
```bash
npx expo start -c
```

### Navigation Not Working
Ensure all navigation dependencies are installed:
```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
```

### Build Errors
Clear node modules and reinstall:
```bash
rm -rf node_modules
npm install
```

## 📚 Dependencies

### Core
- `expo` - Expo framework
- `react` - React library
- `react-native` - React Native framework

### Navigation
- `@react-navigation/native` - Navigation core
- `@react-navigation/stack` - Stack navigator
- `react-native-screens` - Native screen optimization
- `react-native-safe-area-context` - Safe area handling
- `@react-native-masked-view/masked-view` - Masked views for stack

### UI & Icons
- `@expo/vector-icons` - Icon library
- `expo-status-bar` - Status bar control

### Utilities
- `expo-clipboard` - Clipboard access

## 🔄 Updates & Versioning

### Version Format
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Update App Version
Edit `app.json`:
```json
{
  "version": "1.0.0",
  "android": {
    "versionCode": 1
  }
}
```

Increment both before new builds.

## 🎨 Customization

### Colors
Main brand color: `#7950F2` (purple)
Edit in respective screen files to customize.

### Icons
Replace icons in `/assets`:
- `icon.png` - App icon (1024x1024)
- `adaptive-icon.png` - Android adaptive icon
- `splash-icon.png` - Splash screen

### Fonts (Optional)
Add custom fonts:
1. Add font files to `/assets/fonts`
2. Load in App.js
3. Use in StyleSheet

## 📖 Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Navigation team
- Community contributors

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@example.com
- Documentation: See SNACK_SETUP.md for deployment

---

**Made with ❤️ using React Native & Expo**
