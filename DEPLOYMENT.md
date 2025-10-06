# Deployment Guide

This guide provides instructions on how to deploy the Dubai Media Advertising Platform to various hosting platforms.

## Table of Contents
- [Quick Start](#quick-start)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [Other Platforms](#other-platforms)
- [Local Development](#local-development)
- [Production Build](#production-build)

## Quick Start

The fastest way to deploy this application is using Vercel:

1. Fork this repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your forked repository
5. Click "Deploy"

Your app will be live at: `https://your-project-name.vercel.app`

## Deployment Platforms

### Vercel (Recommended)

Vercel provides the easiest deployment experience with zero configuration.

#### Via Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

#### Via Vercel Dashboard:

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New" → "Project"
4. Import this repository
5. Vercel will auto-detect the settings
6. Click "Deploy"

**Configuration:** The `vercel.json` file is already configured for optimal deployment.

### Netlify

Netlify is another excellent option for deploying static sites.

#### Via Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

#### Via Netlify Dashboard:

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

**Configuration:** The `netlify.toml` file is already configured.

### GitHub Pages

To deploy to GitHub Pages:

1. Update `vite.config.ts` to add a base path:
   ```typescript
   export default defineConfig({
     base: '/dubai-media-advertising-platform/',
     // ... rest of config
   })
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

Your app will be available at: `https://<username>.github.io/dubai-media-advertising-platform/`

### Other Platforms

The application can be deployed to any static hosting platform:

- **AWS S3 + CloudFront**
- **Azure Static Web Apps**
- **Google Cloud Storage**
- **Firebase Hosting**
- **Cloudflare Pages**
- **Render**

All these platforms require:
- Build command: `npm run build`
- Output directory: `build`

## Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at: `http://localhost:3000`

## Production Build

To create a production build locally:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The production files will be in the `build` directory.

## Environment Variables

If you need to add environment variables:

1. Create a `.env` file in the root directory
2. Add variables with `VITE_` prefix:
   ```
   VITE_API_URL=https://api.example.com
   ```
3. Access in code: `import.meta.env.VITE_API_URL`

**Note:** Don't commit `.env` files with sensitive data!

## Custom Domain

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update your DNS records as instructed

### Netlify:
1. Go to Domain Settings
2. Add your custom domain
3. Update your DNS records as instructed

## Troubleshooting

### Build Fails
- Ensure Node.js version is 16 or higher
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Check for any TypeScript errors

### Routing Issues (404 on refresh)
- Ensure your deployment platform is configured to redirect all routes to `index.html`
- For Vercel: Check `vercel.json` rewrites
- For Netlify: Check `netlify.toml` redirects

### Large Bundle Size
The app may show a warning about chunk sizes. This is expected for a feature-rich application. To optimize:
- Consider code splitting for routes
- Lazy load components not needed on initial render

## Support

For deployment issues, refer to the platform-specific documentation:
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## License

This project is licensed under the MIT License.
