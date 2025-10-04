# 📦 GitHub Setup Guide - Meeting Scheduler

## 🎯 What This Guide Does
Push your Meeting Scheduler app to GitHub while excluding node_modules and unnecessary files.

---

## ✅ Prerequisites Checklist

Before starting, ensure you have:
- [ ] Git installed on your computer
- [ ] GitHub account created
- [ ] Terminal/Command Prompt access

### Check if Git is installed:
```powershell
git --version
```
If not installed, download from: https://git-scm.com/downloads

---

## 🚀 Step-by-Step GitHub Upload

### Step 1: Initialize Git (if not already done)
```powershell
cd C:\Users\Adarsh Mishra\Assign1\MeetingScheduler
git init
```

### Step 2: Configure Git (First time only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Check What Will Be Uploaded
This shows files Git will track (node_modules should NOT appear):
```powershell
git status
```

**✅ Good signs:**
- See: `src/`, `App.js`, `package.json`, `README.md`
- DON'T see: `node_modules/`, `.expo/`, `*.log`

**❌ If you see node_modules:**
Make sure `.gitignore` is in the root folder and contains `node_modules/`

### Step 4: Add All Files to Git
```powershell
git add .
```

### Step 5: Create Your First Commit
```powershell
git commit -m "Initial commit - Meeting Scheduler app"
```

### Step 6: Create a New GitHub Repository

**Option A - Via GitHub Website (Recommended):**
1. Go to https://github.com
2. Click the "+" icon (top right) → "New repository"
3. Fill in:
   - **Repository name**: `meeting-scheduler-app`
   - **Description**: "React Native app for scheduling property visits"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Add a README" (you already have one)
   - **DO NOT** add .gitignore (you already have one)
4. Click "Create repository"

**Option B - Via GitHub CLI (if installed):**
```powershell
gh repo create meeting-scheduler-app --public --source=. --remote=origin
```

### Step 7: Connect Local Repository to GitHub

GitHub will show you commands. Use these (replace with YOUR username):

```powershell
git remote add origin https://github.com/YOUR-USERNAME/meeting-scheduler-app.git
git branch -M main
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/Bhoomi1722/meeting-scheduler-app.git
git branch -M main
git push -u origin main
```

### Step 8: Enter GitHub Credentials
When prompted:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (NOT your password)

**How to create Personal Access Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "MeetingScheduler"
4. Check: `repo` (all checkboxes under it)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password

### Step 9: Verify Upload
1. Refresh your GitHub repository page
2. You should see all files uploaded
3. **Verify node_modules is NOT uploaded**

---

## 🔄 Making Future Updates

After making changes to your code:

```powershell
# Check what changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push
```

**Example workflow:**
```powershell
# Made changes to DateTimePickerScreen.js
git add .
git commit -m "Fixed calendar alignment issue"
git push
```

---

## 🛠️ Common Issues & Fixes

### Issue 1: node_modules Still Being Uploaded
**Fix:**
```powershell
# Remove node_modules from Git tracking
git rm -r --cached node_modules

# Commit the removal
git commit -m "Remove node_modules from repository"

# Push
git push
```

### Issue 2: "fatal: remote origin already exists"
**Fix:**
```powershell
# Remove existing remote
git remote remove origin

# Re-add with correct URL
git remote add origin https://github.com/YOUR-USERNAME/meeting-scheduler-app.git
```

### Issue 3: Authentication Failed
**Fix:**
- Use Personal Access Token instead of password
- Or use SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Issue 4: "Permission denied"
**Fix:**
```powershell
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR-USERNAME/meeting-scheduler-app.git
```

### Issue 5: Large Files Error
**Fix:**
```powershell
# Remove large files from history (if accidentally committed)
git rm --cached path/to/large-file
git commit -m "Remove large file"
git push
```

---

## 📝 What Gets Uploaded vs Ignored

### ✅ Files That WILL Be Uploaded:
- `src/` folder (all your code)
- `App.js`
- `app.json`
- `eas.json`
- `package.json`
- `README.md`
- `SNACK_SETUP.md`
- `assets/` (images, icons)
- `.gitignore` itself

### ❌ Files That WON'T Be Uploaded (Ignored):
- `node_modules/` (dependencies - others will install via `npm install`)
- `.expo/` (Expo cache)
- `*.log` (log files)
- `.env` (environment secrets)
- `*.apk`, `*.aab` (build artifacts)
- `android/`, `ios/` (native folders)
- `.DS_Store`, `Thumbs.db` (OS files)

---

## 🔒 Security Best Practices

### Never Upload:
1. **API Keys** - Use `.env` files (already in `.gitignore`)
2. **Signing Keys** - `.jks`, `.keystore` files (already ignored)
3. **Personal Tokens** - Keep them in environment variables
4. **node_modules/** - Always ignored (too large)

### Create .env File (if needed):
```bash
# .env (this file is ignored by Git)
API_KEY=your_secret_key_here
GOOGLE_MAPS_KEY=your_maps_key
```

---

## 📊 Repository Checklist

After uploading, verify on GitHub:
- [ ] README.md displays correctly
- [ ] All source files in `src/` are present
- [ ] `package.json` is uploaded
- [ ] `node_modules/` is NOT visible
- [ ] `.gitignore` is present
- [ ] Repository description is set
- [ ] License is added (optional)

---

## 🌟 Optional: Make Repository Professional

### Add Topics (Tags):
On GitHub repo page, click "⚙️ Settings" → "Topics"
Add: `react-native`, `expo`, `mobile-app`, `scheduling`, `meeting-scheduler`

### Add License:
```powershell
# Create LICENSE file
echo "MIT License" > LICENSE
git add LICENSE
git commit -m "Add MIT license"
git push
```

### Add Repository Description:
On GitHub, click "About" (gear icon) → Add description:
```
📱 Modern React Native app for scheduling property visits with calendar, time picker, and meeting management features.
```

### Pin Important Files:
GitHub automatically shows README.md - you're good!

---

## 🔗 Useful Git Commands

```powershell
# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- .

# View remote URL
git remote -v

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature

# Clone repository (for others)
git clone https://github.com/YOUR-USERNAME/meeting-scheduler-app.git
```

---

## 👥 Sharing Your Repository

After uploading, share this with collaborators:

**Repository URL Format:**
```
https://github.com/YOUR-USERNAME/meeting-scheduler-app
```

**Clone Command for Others:**
```powershell
git clone https://github.com/YOUR-USERNAME/meeting-scheduler-app.git
cd meeting-scheduler-app
npm install
npx expo start
```

---

## 🎓 Quick Git Workflow Summary

**First Time Setup:**
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

**Regular Updates:**
```powershell
git add .
git commit -m "Description of changes"
git push
```

**Pull Latest Changes (if working with others):**
```powershell
git pull
```

---

## 📞 Need Help?

**Official Docs:**
- Git: https://git-scm.com/doc
- GitHub: https://docs.github.com

**Common Issues:**
- Authentication: https://docs.github.com/en/authentication
- .gitignore: https://git-scm.com/docs/gitignore

---

## ✅ Final Checklist

Before sharing your repository link:
- [ ] All code files uploaded
- [ ] node_modules NOT uploaded
- [ ] README.md looks good
- [ ] Repository is public/private as intended
- [ ] Description and topics added
- [ ] Can clone and run: `git clone <url> && cd <folder> && npm install && npx expo start`

---

**Your repository is now ready to share! 🎉**

Repository URL: `https://github.com/YOUR-USERNAME/meeting-scheduler-app`
