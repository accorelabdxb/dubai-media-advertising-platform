# Vercel Deployment Instructions

This project is now ready for deployment to Vercel. All necessary configurations are in place.

## ✅ Pre-Deployment Checklist

- [x] `vercel.json` configuration file exists and is properly configured
- [x] Build command is set to `npm run build`
- [x] Output directory is set to `build`
- [x] SPA routing support configured (all routes redirect to index.html)
- [x] Build completes successfully without errors
- [x] Case-sensitivity issues fixed for Vercel's build environment

## 🚀 Deployment Options

### Option 1: One-Click Deploy (Easiest)

Click the button below to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/accorelabdxb/dubai-media-advertising-platform)

### Option 2: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New" → "Project"
4. Import the `accorelabdxb/dubai-media-advertising-platform` repository
5. Vercel will auto-detect the settings from `vercel.json`
6. Click "Deploy"

Your app will be live at: `https://your-project-name.vercel.app`

### Option 3: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd dubai-media-advertising-platform

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

## 📋 Configuration Details

The project uses the following Vercel configuration (`vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### What This Configuration Does:

- **buildCommand**: Runs `npm run build` to create production build
- **outputDirectory**: Tells Vercel to serve files from the `build` directory
- **devCommand**: Configures development server command
- **installCommand**: Specifies how to install dependencies
- **rewrites**: Ensures all routes redirect to `index.html` for client-side routing (SPA support)

## 🔧 Build Process

When deployed to Vercel, the following happens:

1. Vercel clones your repository
2. Runs `npm install` to install dependencies
3. Runs `npm run build` to create production build
4. Serves the static files from the `build` directory
5. Applies URL rewrites for SPA routing

## 🌐 Environment Variables

If you need to add environment variables:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add variables with `VITE_` prefix (e.g., `VITE_API_URL`)
4. Redeploy for changes to take effect

## 📝 Post-Deployment

After successful deployment:

1. Your app will be available at `https://your-project-name.vercel.app`
2. Vercel provides automatic HTTPS
3. Automatic deployments on every push to the main branch
4. Preview deployments for pull requests

## 🎯 Custom Domain (Optional)

To add a custom domain:

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS records

## 🐛 Troubleshooting

### Build Fails

If the build fails on Vercel:

1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility (project uses Node.js 16+)
4. Test build locally with `npm run build`

### 404 Errors on Page Refresh

This should not happen as the `rewrites` configuration is in place. If it does:

1. Verify `vercel.json` includes the rewrites section
2. Redeploy the project

### Large Bundle Warning

The build may show a warning about bundle size. This is expected for feature-rich applications and won't prevent deployment.

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Project DEPLOYMENT.md](./DEPLOYMENT.md) - Comprehensive deployment guide for all platforms

## ✨ Success!

Once deployed, your Dubai Media Advertising Platform will be live and accessible worldwide with:
- ⚡ Lightning-fast performance
- 🔒 Automatic HTTPS
- 🌍 Global CDN distribution
- 🚀 Automatic deployments on every commit
