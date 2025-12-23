# 🚀 Quick Start Guide - Run on Your iPhone

## Option 1: Simulator (Quickest)

```bash
cd DP700Flashcards
npm install
cd ios && pod install && cd ..
npm start
```

Then in a new terminal:
```bash
npm run ios
```

## Option 2: Your Physical iPhone (Best Experience)

### Prerequisites Check
```bash
# Check Node.js
node --version  # Should be v18+

# Check if Xcode Command Line Tools are installed
xcode-select -p

# Install if needed
xcode-select --install

# Install CocoaPods if needed
sudo gem install cocoapods
```

### Steps

1. **Install Dependencies**
```bash
cd DP700Flashcards
npm install
cd ios && pod install && cd ..
```

2. **Connect iPhone to Mac** (USB cable)

3. **Trust Computer on iPhone**
   - Popup will appear → Tap "Trust"

4. **Open in Xcode**
```bash
open ios/DP700Flashcards.xcworkspace
```

5. **Configure Signing**
   - Click project name (top left)
   - Select "DP700Flashcards" target
   - Go to "Signing & Capabilities"
   - Check "Automatically manage signing"
   - Select your Team (Apple ID)
   - Change Bundle ID if needed: `com.yourname.dp700flashcards`

6. **Select Your iPhone**
   - Click device selector (next to play button)
   - Choose your iPhone

7. **Build & Run**
   - Click ▶️ Play button (or press ⌘+R)

8. **Trust Developer on iPhone**
   - Settings → General → VPN & Device Management
   - Tap your Apple ID → Trust

9. **Launch the app!** 🎉

## Common Issues

### "No profiles found"
- Make sure you're signed into Apple ID in Xcode
- Xcode → Preferences → Accounts → Add Apple ID

### "Bundle identifier already in use"
- Change Bundle Identifier in Xcode to something unique

### Metro bundler won't start
```bash
npm start -- --reset-cache
```

### Pod install fails
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

## Features You'll Get

✅ Smooth 3D card flip animations
✅ Haptic feedback on every interaction
✅ Native iOS look and feel
✅ Quiz mode with score tracking
✅ Section filtering
✅ Progress tracking
✅ 70+ comprehensive flashcards

## Next Steps

- Study Mode: Navigate through cards
- Quiz Mode: Test yourself with randomized questions
- Filter by section to focus on specific topics
- Track your progress as you study

Good luck with your DP-700 exam! 🎓
