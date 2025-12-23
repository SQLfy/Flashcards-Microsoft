# DP-700 Flashcards - iOS Native App

A polished React Native flashcard app for studying Microsoft's DP-700 (Fabric Data Engineer) exam, optimized for iPhone with native iOS features.

## Features

- 🎴 **70+ Comprehensive Flashcards** covering all DP-700 exam topics
- 📱 **Native iOS Experience** with smooth animations and haptic feedback
- 🎯 **Two Study Modes**:
  - **Study Mode**: Navigate through cards at your own pace
  - **Quiz Mode**: Test yourself with randomized cards and score tracking
- 🎨 **Polished iOS Design** with blur effects, gradients, and native feel
- 📊 **Section Filtering** to focus on specific exam areas
- ⚡ **Smooth Animations** including 3D card flips
- 📈 **Progress Tracking** with visual progress bar
- 🔄 **Swipe Gestures** for intuitive navigation

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or newer)
   ```bash
   node --version
   ```

2. **Xcode** (latest version from Mac App Store)
   - Make sure Command Line Tools are installed:
   ```bash
   xcode-select --install
   ```

3. **CocoaPods** (iOS dependency manager)
   ```bash
   sudo gem install cocoapods
   ```

4. **Watchman** (file watching service)
   ```bash
   brew install watchman
   ```

## Installation & Setup

### Step 1: Install Dependencies

```bash
cd DP700Flashcards
npm install
```

### Step 2: Install iOS Dependencies

```bash
cd ios
pod install
cd ..
```

### Step 3: Run on Simulator (Easiest)

Start Metro bundler:
```bash
npm start
```

In another terminal, run on iOS simulator:
```bash
npm run ios
```

This will:
- Open Xcode's iOS Simulator
- Build the app
- Install and launch it automatically

### Step 4: Run on Physical iPhone (Recommended for best experience)

#### A. Connect your iPhone to your Mac via USB

#### B. Trust your development computer on your iPhone
- When you connect, a popup will appear on your iPhone asking "Trust This Computer?"
- Tap **Trust** and enter your passcode

#### C. Open the project in Xcode

```bash
open ios/DP700Flashcards.xcworkspace
```

**IMPORTANT**: Always open the `.xcworkspace` file, NOT the `.xcodeproj` file!

#### D. Configure Signing in Xcode

1. In Xcode, select the project in the left sidebar (top item)
2. Select the **DP700Flashcards** target
3. Go to the **Signing & Capabilities** tab
4. Check **"Automatically manage signing"**
5. Select your **Team** (your Apple ID)
   - If you don't see a team, click "Add Account" and sign in with your Apple ID
6. Xcode will automatically create a provisioning profile

#### E. Select Your iPhone as the Build Target

1. In Xcode, at the top near the play button, click the device selector
2. Choose your iPhone from the list (it should show as "Your iPhone Name")

#### F. Build and Run

Click the ▶️ Play button in Xcode (or press ⌘+R)

#### G. Trust Developer Certificate on iPhone

The first time you run the app, you'll need to trust the developer certificate:

1. On your iPhone, go to: **Settings → General → VPN & Device Management**
2. Tap on your Apple ID under "Developer App"
3. Tap **Trust "[Your Apple ID]"**
4. Confirm by tapping **Trust**

Now you can launch the app from your iPhone's home screen!

## Project Structure

```
DP700Flashcards/
├── App.tsx                 # Main app component
├── index.js                # Entry point
├── src/
│   ├── screens/
│   │   └── FlashcardScreen.tsx  # Main flashcard screen
│   ├── data/
│   │   └── flashcards.ts   # All flashcard data
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   └── components/         # Reusable components (future)
├── ios/                    # iOS native code
└── android/                # Android native code (future)
```

## Usage

### Study Mode
- **Tap the card** to flip between question and answer
- Use **Previous/Next** buttons to navigate
- Filter by **Section** to focus on specific topics
- Track your progress with the **progress bar**

### Quiz Mode
- Cards are **randomized**
- Mark each card as **Got It!** or **Didn't Know**
- View your **score** in real-time
- Complete all cards to see final results

## Troubleshooting

### "Bundle identifier is already in use"
If you get this error in Xcode:
1. Select your project in Xcode
2. Change the **Bundle Identifier** to something unique like: `com.yourname.DP700Flashcards`

### "No profiles for 'com.dp700flashcards' were found"
1. Make sure you're logged into your Apple ID in Xcode
2. Enable "Automatically manage signing"
3. Select your Team

### "Command not found: react-native"
```bash
npm install -g react-native-cli
```

### Metro Bundler Issues
Clear the cache and restart:
```bash
npm start -- --reset-cache
```

### Pod Install Fails
```bash
cd ios
pod deintegrate
pod cache clean --all
pod install
cd ..
```

### Simulator Won't Start
1. Quit Xcode completely
2. Quit Simulator
3. Run: `killall -9 com.apple.CoreSimulator.CoreSimulatorService`
4. Try again

## Building for Release (Advanced)

To create a release build for the App Store:

1. In Xcode, select **Product → Archive**
2. Once archived, click **Distribute App**
3. Choose distribution method (App Store, Ad Hoc, etc.)
4. Follow the prompts

Note: You'll need an Apple Developer account ($99/year) to distribute on the App Store.

## Customization

### Adding More Flashcards

Edit `src/data/flashcards.ts` and add more items to the array:

```typescript
{
  id: 71,
  category: "Your Category",
  section: "Your Section",
  question: "Your question?",
  answer: "Your answer"
}
```

### Changing Colors

Modify the `StyleSheet` in `src/screens/FlashcardScreen.tsx`:

```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#your-color-here',
  },
  // ... other styles
});
```

## Tech Stack

- **React Native 0.76.5** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Screen navigation
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions

## License

MIT License - Feel free to use this for your exam prep!

## Contributing

Found a bug or want to add features? Feel free to submit a PR!

## Good Luck on Your DP-700 Exam! 🎓

---

**Questions?** Open an issue on GitHub or check out the [React Native docs](https://reactnative.dev/)
