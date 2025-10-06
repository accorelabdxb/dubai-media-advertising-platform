# Vercel Deployment Setup Guide

This guide will help you deploy the Dubai Media Advertising Platform to Vercel. The project is fully configured and ready for deployment.

## 🚀 Quick Deployment Options

### Option 1: One-Click Deploy (Easiest - 2 minutes)

Click this button to deploy directly to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/accorelabdxb/dubai-media-advertising-platform)

This will:
1. Fork or import the repository to your Vercel account
2. Automatically detect the Vite + React configuration
3. Build and deploy the application
4. Provide you with a live URL

### Option 2: Via Vercel Dashboard (3 minutes)

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Choose `accorelabdxb/dubai-media-advertising-platform`

3. **Configure Project** (Optional - auto-detected)
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (~2-3 minutes)
   - Your app will be live at: `https://your-project-name.vercel.app`

### Option 3: Via Vercel CLI (5 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project directory
cd dubai-media-advertising-platform

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

### Option 4: Automated GitHub Actions Deployment

A GitHub Actions workflow has been set up for automatic deployments. To enable it:

1. **Get Vercel Credentials**
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create a new token and copy it

2. **Get Project IDs**
   ```bash
   # Install Vercel CLI if not already installed
   npm install -g vercel
   
   # Link to your Vercel project
   vercel link
   
   # Get the project details
   cat .vercel/project.json
   ```
   
   This will show your `projectId` and `orgId`

3. **Add GitHub Secrets**
   - Go to your GitHub repository settings
   - Navigate to: Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your organization ID
     - `VERCEL_PROJECT_ID`: Your project ID

4. **Automatic Deployments**
   - Push to `main` branch → Production deployment
   - Open a Pull Request → Preview deployment

## 📋 Pre-Deployment Checklist

✅ All items are already completed:

- [x] `vercel.json` configuration exists
- [x] Build command configured: `npm run build`
- [x] Output directory set: `build`
- [x] SPA routing configured (rewrites)
- [x] Build tested and working
- [x] Dependencies properly listed in `package.json`
- [x] GitHub Actions workflow created

## 🔧 What Happens During Deployment

1. **Clone Repository**: Vercel clones your code
2. **Install Dependencies**: Runs `npm install`
3. **Build Application**: Runs `npm run build`
4. **Serve Static Files**: Serves from `build` directory
5. **Apply Routing**: SPA routing configured automatically

## 🌐 Post-Deployment

After successful deployment:

- ✅ Live URL: `https://your-project-name.vercel.app`
- ✅ Automatic HTTPS enabled
- ✅ Global CDN distribution
- ✅ Auto-deployments on every push to main
- ✅ Preview URLs for pull requests

## 🎯 Custom Domain (Optional)

To add a custom domain:

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow DNS configuration instructions

## 📊 Environment Variables (If Needed)

If you need to add environment variables:

1. Go to Vercel project settings
2. Click "Environment Variables"
3. Add variables with `VITE_` prefix
   - Example: `VITE_API_URL=https://api.example.com`
4. Redeploy for changes to take effect

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🐛 Troubleshooting

### Build Fails

If the build fails:

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Test locally: `npm run build`
4. Ensure Node.js version is 16+

### 404 Errors on Refresh

Should not happen due to `vercel.json` rewrites configuration. If it does:

1. Verify `vercel.json` exists in project root
2. Check rewrites section is present
3. Redeploy the project

### Large Bundle Size Warning

Expected for feature-rich applications. The warning won't prevent deployment.

To optimize (optional):
- Use dynamic imports for route-based code splitting
- Lazy load components not needed on initial render

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Project DEPLOYMENT.md](./DEPLOYMENT.md) - All deployment platforms
- [Project VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Detailed Vercel guide

## ✨ Success!

Once deployed, your Dubai Media Advertising Platform will be:

- ⚡ Lightning-fast (Edge-optimized)
- 🔒 Secure (Automatic HTTPS)
- 🌍 Global (CDN distribution)
- 🚀 Always up-to-date (Auto-deployments)

## 🆘 Need Help?

- Check the [Vercel Status Page](https://www.vercel-status.com/)
- Visit [Vercel Support](https://vercel.com/support)
- Review [Project Documentation](./README.md)
