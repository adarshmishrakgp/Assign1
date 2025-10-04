# ⚠️ Important: Setting Up Git Correctly for MeetingScheduler

## 🔴 Problem Detected
Your entire user directory (`C:\Users\Adarsh Mishra\`) is currently a Git repository. This means Git is trying to track EVERYTHING - all your projects, documents, downloads, etc. This is **not recommended** for the following reasons:

1. **Massive repository size** (hundreds of GB)
2. **Slow Git operations** (takes forever to commit/push)
3. **Privacy risk** (might accidentally upload personal files)
4. **Hard to manage** (thousands of unrelated files)

## ✅ Solution: Create a Dedicated Repository

We'll create a **new, isolated Git repository** just for MeetingScheduler.

---

## 📋 Step-by-Step Instructions

### Step 1: Navigate to MeetingScheduler Folder
```powershell
cd "C:\Users\Adarsh Mishra\Assign1\MeetingScheduler"
```

### Step 2: Verify You're in the Right Place
```powershell
# Should show: C:\Users\Adarsh Mishra\Assign1\MeetingScheduler
pwd

# Should show: App.js, package.json, src/, etc.
dir
```

### Step 3: Initialize a NEW Git Repository Here
```powershell
# This creates a fresh .git folder ONLY in MeetingScheduler
git init
```

**Expected output:**
```
Initialized empty Git repository in C:/Users/Adarsh Mishra/Assign1/MeetingScheduler/.git/
```

### Step 4: Configure Git (if you haven't already)
```powershell
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 5: Check What Will Be Tracked
```powershell
git status
```

**✅ What you SHOULD see:**
```
Untracked files:
  App.js
  app.json
  package.json
  src/
  assets/
  README.md
  ...
```

**❌ What you should NOT see:**
- Files from other folders (InternWork, Astrologer, etc.)
- Parent directory files
- Hundreds of unrelated folders

### Step 6: Add All MeetingScheduler Files
```powershell
# This adds ONLY files in the MeetingScheduler folder
git add .
```

### Step 7: Verify What's Being Added
```powershell
git status
```

**Should show GREEN files like:**
```
Changes to be committed:
  new file:   App.js
  new file:   app.json
  new file:   package.json
  new file:   src/components/ParticipantSelectionModal.js
  new file:   src/screens/DateTimePickerScreen.js
  ...
```

**Should NOT show:**
- node_modules/ (ignored by .gitignore)
- .expo/ (ignored)
- Files from other projects

### Step 8: Create First Commit
```powershell
git commit -m "Initial commit: Meeting Scheduler React Native app"
```

### Step 9: Create a New Repository on GitHub

Go to: https://github.com/new

Fill in:
- **Repository name**: `meeting-scheduler-app`
- **Description**: "React Native app for scheduling property visits"
- **Visibility**: Choose Public or Private
- **DO NOT check**: "Initialize this repository with a README"

Click: **"Create repository"**

### Step 10: Connect to GitHub

GitHub will show you commands. Use these (replace `YOUR-USERNAME`):

```powershell
git remote add origin https://github.com/YOUR-USERNAME/meeting-scheduler-app.git
git branch -M main
git push -u origin main
```

### Step 11: Enter GitHub Credentials

When prompted:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (see below)

#### How to Get Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token (classic)"
3. Name it: "MeetingScheduler"
4. Select scope: `repo` (check all repo boxes)
5. Click: "Generate token"
6. **COPY IT** immediately (you won't see it again!)
7. Use this as your password

### Step 12: Verify on GitHub

1. Go to your repository URL: `https://github.com/YOUR-USERNAME/meeting-scheduler-app`
2. Refresh the page
3. You should see:
   - ✅ App.js
   - ✅ src/ folder
   - ✅ package.json
   - ✅ README.md
   - ❌ NO node_modules/
   - ❌ NO .expo/

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Repository only contains MeetingScheduler files
- [ ] No parent directory files included
- [ ] No other project files included
- [ ] node_modules/ is NOT uploaded
- [ ] .gitignore is working correctly
- [ ] README.md displays properly on GitHub

---

## 🔄 Future Updates

After making changes:

```powershell
# 1. Navigate to MeetingScheduler folder
cd "C:\Users\Adarsh Mishra\Assign1\MeetingScheduler"

# 2. Check changes
git status

# 3. Add changes
git add .

# 4. Commit with message
git commit -m "Description of what changed"

# 5. Push to GitHub
git push
```

---

## 🛠️ Troubleshooting

### Issue: Git still shows parent directory files
**Cause**: You're in the parent directory's Git repo

**Fix**:
```powershell
# Make sure you're in the RIGHT folder
cd "C:\Users\Adarsh Mishra\Assign1\MeetingScheduler"

# Check current directory
pwd

# Should show: C:\Users\Adarsh Mishra\Assign1\MeetingScheduler
```

### Issue: "fatal: not a git repository"
**Cause**: Git not initialized in this folder

**Fix**:
```powershell
git init
```

### Issue: node_modules/ is being tracked
**Cause**: .gitignore not working

**Fix**:
```powershell
# Remove from Git tracking
git rm -r --cached node_modules

# Add to .gitignore (should already be there)
echo "node_modules/" >> .gitignore

# Commit the change
git add .gitignore
git commit -m "Add node_modules to gitignore"
```

### Issue: Shows files from other projects
**Cause**: You're in the parent Git repository

**Fix**: Follow steps 1-3 above to create a NEW repository in the MeetingScheduler folder

---

## 📊 What Gets Uploaded

### ✅ Files Included (Good):
- `App.js`, `index.js` (entry points)
- `app.json`, `eas.json` (config)
- `package.json` (dependencies list)
- `src/` folder (all your code)
- `assets/` (images, icons)
- `README.md`, `SNACK_SETUP.md` (documentation)
- `.gitignore` (tells Git what to ignore)

### ❌ Files Excluded (Good):
- `node_modules/` (~200MB - others install via `npm install`)
- `.expo/` (Expo cache)
- `*.log` (log files)
- `.env` (secrets)
- OS files (`.DS_Store`, `Thumbs.db`)

**Total upload size**: ~5-10 MB (instead of 200+ MB)

---

## 📝 Quick Reference

```powershell
# Check current directory
pwd

# List files
dir

# Initialize Git
git init

# Check status
git status

# Stage files
git add .

# Commit
git commit -m "Your message"

# Add remote
git remote add origin https://github.com/USERNAME/REPO.git

# Push
git push -u origin main

# Future pushes
git push
```

---

## 🎯 Summary

**Before (Wrong):**
```
C:\Users\Adarsh Mishra\ <-- Git repo here (BAD!)
├── Assign1/
│   └── MeetingScheduler/
├── Documents/
├── Downloads/
└── (Git tracking EVERYTHING)
```

**After (Correct):**
```
C:\Users\Adarsh Mishra\
├── Assign1/
│   └── MeetingScheduler/ <-- Git repo here (GOOD!)
│       ├── .git/
│       ├── App.js
│       ├── package.json
│       └── src/
├── Documents/ (not tracked)
└── Downloads/ (not tracked)
```

---

## ✅ Ready to Start

Now run these commands in order:

```powershell
cd "C:\Users\Adarsh Mishra\Assign1\MeetingScheduler"
git init
git add .
git commit -m "Initial commit: Meeting Scheduler app"
```

Then create your GitHub repo and push!

**Your repository will be clean, fast, and professional! 🚀**
