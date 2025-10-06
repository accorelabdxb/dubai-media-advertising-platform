# Quick Start Guide - Dubai Media Advertising Platform

## 🚀 Access the Application

### Option 1: Deploy to the Cloud (Get a Public URL)

#### Deploy to Vercel (Easiest - 2 minutes)
1. Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/accorelabdxb/dubai-media-advertising-platform)
2. Sign in with GitHub
3. Click "Deploy"
4. **Done!** Your app is live at: `https://your-project-name.vercel.app`

#### Deploy to Netlify (Also Easy - 3 minutes)
1. Click this button: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/accorelabdxb/dubai-media-advertising-platform)
2. Connect with GitHub
3. Click "Deploy site"
4. **Done!** Your app is live at: `https://your-site-name.netlify.app`

### Option 2: Run Locally (Development)

```bash
# 1. Clone the repository
git clone https://github.com/accorelabdxb/dubai-media-advertising-platform.git
cd dubai-media-advertising-platform

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

**Access at:** `http://localhost:3000`

### Option 3: Build and Preview Locally

```bash
# Build for production
npm run build

# Preview the production build
npx vite preview --port 4173
```

**Access at:** `http://localhost:4173`

## 📱 What You'll See

Once deployed or running locally, you'll have access to:

- **Landing Page** - Main homepage with platform overview
- **Multi-language Support** - Toggle between English and Arabic
- **Media Booking** - Book advertising slots across TV, Radio, Print, Digital
- **Dashboard** - View and manage your campaigns
- **User Signup** - Complete registration workflow

## 🔧 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

**Build fails?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 More Information

- **Full Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Main README**: See [README.md](./README.md)

## 🆘 Need Help?

- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Review the [README.md](./README.md) for project documentation
- Open an issue on GitHub for support
