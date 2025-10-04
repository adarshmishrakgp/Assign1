# 📱 How to Share Your App on Snack (Step-by-Step)

## 🎯 What You'll Achieve
Share your Meeting Scheduler app with clients via a simple link - they can run it instantly on Android without installing APKs.

---

## ⚡ PART 1: One-Time Setup (5 minutes)

### Step 1: Create Expo Account
1. Go to https://expo.dev
2. Click "Sign Up" (top right)
3. Use GitHub, Google, or email
4. Verify your email

### Step 2: Go to Snack
1. Visit https://snack.expo.dev
2. Click "Sign In" (use your Expo account from Step 1)
3. Click "Create a new Snack"

---

## 📂 PART 2: Upload Your Code to Snack

### Step 3: Create Folder Structure
In Snack's left sidebar, create these folders/files:

**Click the "+" button and create:**
```
screens/
  DateTimePickerScreen.js
  UpdateMeetingScreen.js
components/
  ParticipantSelectionModal.js
utils/
  validation.js
App.js (already exists - you'll replace it)
```

### Step 4: Copy Files from Your Local Project

#### 📄 Replace App.js
1. In Snack, click on `App.js`
2. Delete everything
3. Copy the content from your local `App.js` file
4. Paste it in Snack

#### 📄 Copy DateTimePickerScreen.js
1. In Snack, click `screens/DateTimePickerScreen.js`
2. Open your local file: `src/screens/DateTimePickerScreen.js`
3. Copy ALL content
4. Paste in Snack

#### 📄 Copy UpdateMeetingScreen.js
1. In Snack, click `screens/UpdateMeetingScreen.js`
2. Open your local file: `src/screens/UpdateMeetingScreen.js`
3. Copy ALL content
4. Paste in Snack

#### 📄 Copy ParticipantSelectionModal.js
1. In Snack, click `components/ParticipantSelectionModal.js`
2. Open your local file: `src/components/ParticipantSelectionModal.js`
3. Copy ALL content
4. Paste in Snack

#### 📄 Copy validation.js
1. In Snack, click `utils/validation.js`
2. Open your local file: `src/utils/validation.js`
3. Copy ALL content
4. Paste in Snack

---

## 📦 PART 3: Add Dependencies

### Step 5: Install Required Packages
In Snack's left sidebar, click "Dependencies" tab, then click "+ Add package" and search/add these ONE BY ONE:

**Required packages:**
```
@react-navigation/native
@react-navigation/stack
react-native-safe-area-context
react-native-screens
@react-native-masked-view/masked-view
@expo/vector-icons
react-native-gesture-handler
react-native-reanimated
```

**How to add each:**
1. Click "+ Add package"
2. Type package name (e.g., `@react-navigation/native`)
3. Click the package when it appears
4. Wait for "Installed" checkmark
5. Repeat for all packages above

---

## ⚙️ PART 4: Fix Import Paths

### Step 6: Update Import Paths in App.js
In Snack's `App.js`, change:
```javascript
// FROM:
import DateTimePicker from './src/screens/DateTimePickerScreen';
import UpdateMeeting from './src/screens/UpdateMeetingScreen';

// TO:
import DateTimePicker from './screens/DateTimePickerScreen';
import UpdateMeeting from './screens/UpdateMeetingScreen';
```

### Step 7: Update Import Paths in Screens
In `screens/UpdateMeetingScreen.js`, change:
```javascript
// FROM:
import ParticipantSelectionModal from '../components/ParticipantSelectionModal';
import { validateMeetingForm, ... } from '../utils/validation';

// TO (if needed, check actual structure):
import ParticipantSelectionModal from '../components/ParticipantSelectionModal';
import { validateMeetingForm, ... } from '../utils/validation';
```

---

## 🧪 PART 5: Test Your App

### Step 8: Preview
1. Look at the right panel in Snack (Web Preview or Android)
2. Wait for it to load (may take 30-60 seconds first time)
3. Check for red error screens
4. Open Console (bottom panel) if errors appear

**Common fixes:**
- Red screen "module not found" → check import paths (./screens/ not ./src/screens/)
- "SafeAreaView undefined" → ensure react-native-safe-area-context is installed
- White screen → check Console for errors

---

## 📲 PART 6: Test on Real Android Device

### Step 9: Install Expo Go on Android
1. Open Play Store on Android device
2. Search "Expo Go"
3. Install it

### Step 10: Run on Device
**Option A - QR Code:**
1. In Snack, click "My Device" tab (right panel)
2. Scan the QR code with Expo Go app

**Option B - Link:**
1. Click "Share" button (top right in Snack)
2. Copy "Project URL"
3. Send to your phone via SMS/WhatsApp
4. Open link → tap "Open in Expo Go"

### Step 11: Test All Features
- Navigate between screens
- Test calendar date selection
- Test time picker
- Test "Start Instant Meeting" button
- Test "Schedule Visit" button

---

## 🚀 PART 7: Share with Client

### Step 12: Save & Get Share Link
1. Click "Save" button (top in Snack)
2. Give it a name (e.g., "Meeting Scheduler Demo")
3. Click "Share" button (top right)
4. **Copy the "Project URL"** (looks like: `https://snack.expo.dev/@username/meeting-scheduler`)

### Step 13: Share Options

**Option 1 - Direct Link (Recommended):**
Send this message to your client:
```
Hi! Here's the Meeting Scheduler app demo:

🔗 Link: [paste your Snack URL]

📱 To run on Android:
1. Install "Expo Go" from Play Store
2. Open the link above on your phone
3. Tap "Open in Expo Go"

You can also view it in your browser!
```

**Option 2 - QR Code:**
1. In Share dialog, click "QR Code" tab
2. Screenshot the QR code
3. Send to client
4. They scan with Expo Go app

**Option 3 - Embed (if you have a website):**
1. Click "Embed" tab in Share dialog
2. Copy the iframe code
3. Paste in your portfolio/website

---

## 🔒 PART 8: Security Settings

### Step 14: Lock Down Your Snack
1. Click "Share" → Settings
2. **Turn OFF** "Allow anyone to edit"
3. **Turn ON** "Public" (so link works)
4. Click "Save"

---

## 🎨 PART 9: Optional Improvements

### Step 15: Add Instructions (Optional)
Create a `README.md` file in Snack:
```markdown
# Meeting Scheduler

Schedule property visits with ease.

## Features
- Pick date and time
- Start instant meetings
- Manage participants

## How to Use
1. Select date from calendar
2. Choose time
3. Click "Schedule Visit"
```

### Step 16: Add App Icon (Optional)
1. Click "Assets" in left sidebar
2. Upload your `icon.png`
3. Reference in code if needed

---

## 🔄 PART 10: Updates & Maintenance

### Step 17: Update Your Snack
When you make changes:
1. Edit files in Snack
2. Click "Save"
3. Share the SAME link (it auto-updates)
4. Client reopens link or pulls down to refresh in Expo Go

---

## ⚠️ Troubleshooting Common Issues

### Issue: "SafeAreaView doesn't exist"
**Fix:** Ensure `react-native-safe-area-context` is in Dependencies

### Issue: Navigation not working
**Fix:** Check all navigation packages are installed:
- @react-navigation/native
- @react-navigation/stack
- react-native-screens
- @react-native-masked-view/masked-view

### Issue: Icons missing
**Fix:** Add `@expo/vector-icons` in Dependencies

### Issue: White screen on Android
**Fix:** 
1. Open Expo Go settings → Clear cache
2. Shake device → Reload
3. Check Snack Console for errors

### Issue: "Module not found"
**Fix:** Import paths should be:
- `./screens/...` not `./src/screens/...`
- `./components/...` not `./src/components/...`

---

## 📋 Quick Checklist Before Sharing

- [ ] All files uploaded to Snack
- [ ] All dependencies installed
- [ ] Import paths fixed (no `./src/`)
- [ ] App loads in Web Preview
- [ ] Tested on Android via Expo Go
- [ ] Navigation works
- [ ] No red error screens
- [ ] "Allow anyone to edit" is OFF
- [ ] Share link copied

---

## 🎯 Final Share Message Template

```
Hi [Client Name],

I've prepared the Meeting Scheduler app demo for you!

🔗 Live Demo: [YOUR SNACK URL]

📱 To test on your Android phone:
1. Install "Expo Go" from Google Play Store (free)
2. Open the link above on your phone
3. Tap "Open in Expo Go"
4. The app will load instantly!

You can also view it directly in your browser to see the code.

Features included:
✅ Date/Time picker
✅ Instant meeting scheduling
✅ Participant management
✅ Clean, modern UI

Let me know if you have any questions!

Best regards,
[Your Name]
```

---

## 🚀 Next Steps After Client Approval

If client likes the demo:
1. Build production APK using EAS (see main README)
2. Or publish to Google Play Store
3. Or set up Firebase App Distribution

---

## 💡 Pro Tips

1. **Test before sharing** - Always test the Snack link yourself first
2. **Add a demo video** - Record a quick walkthrough (use your phone's screen recorder)
3. **Provide test data** - Tell client what to click/test
4. **Set expectations** - Mention it's a demo (Expo Go watermark appears)
5. **Have a backup** - Also send screenshots in case link doesn't work

---

## 📞 Need Help?

If you encounter issues:
1. Check Snack Console (bottom panel) for errors
2. Verify all dependencies are green (installed)
3. Clear Expo Go cache and retry
4. Re-import files if corrupted

---

**That's it! Your app is now shareable worldwide via a simple link! 🎉**
