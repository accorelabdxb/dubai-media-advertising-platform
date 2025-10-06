
  # Dubai Media Advertising Platform

A comprehensive advertising platform landing page for Dubai Media with full English/Arabic localization support. This platform allows users to book advertising slots across TV, Radio, Print, and Social Media channels.

## 🚀 Deploy to Vercel Now!

**Ready to deploy?** Click the button below for instant deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/accorelabdxb/dubai-media-advertising-platform)

> ⚡ Takes 2 minutes | ✅ Zero configuration needed | 🌐 Get a live URL instantly

📖 **Need help?** See [DEPLOY_NOW.md](./DEPLOY_NOW.md) for step-by-step instructions.

---

## 🌐 Access the Application

> **Want a URL to access this app?** 👉 See [DEPLOY_NOW.md](./DEPLOY_NOW.md) for the fastest way to get a live URL!

### Deploy to Get a Public URL (2 minutes)

Click a button below to deploy instantly and get your own URL:

- **Vercel** (Recommended): [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/accorelabdxb/dubai-media-advertising-platform)
- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/accorelabdxb/dubai-media-advertising-platform)

After deployment, you'll get a URL like:
- Vercel: `https://your-project-name.vercel.app`
- Netlify: `https://your-site-name.netlify.app`

### Local Development

For local development, access at: `http://localhost:3000` (see [Getting Started](#getting-started) section below)

### More Options

📖 **Detailed deployment instructions:** [DEPLOYMENT.md](./DEPLOYMENT.md)  
🚀 **Quick start guide:** [QUICK_START.md](./QUICK_START.md)

## Features

### 🌐 Multi-Language Support
- **Complete Arabic Localization**: Full Arabic translation for all user interfaces
- **Dynamic Language Switching**: Real-time language switching between English and Arabic
- **RTL Support**: Right-to-left text direction support for Arabic
- **Localized Content**: All forms, buttons, navigation, and content fully translated

### 📺 Multi-Channel Advertising
- **Television**: Dubai TV, Sama TV and other major channels
- **Radio**: Various radio stations with audience reach data
- **Print Media**: Newspapers and magazines
- **Social Media**: Facebook, Instagram, Twitter, LinkedIn integration

### 🎯 Complete Booking Flow
- **Media Selection**: Choose from TV, Radio, Print, or Social platforms
- **Program/Time Slots**: Select specific programs and time slots
- **Pricing Packages**: Transparent pricing with multiple package options
- **Ad Material Upload**: Upload creative assets with approval workflow
- **Payment Integration**: Multiple payment methods including credit card, bank transfer
- **Review & Confirmation**: Complete booking review before submission

### 👤 User Management
- **Comprehensive Signup**: Multi-step registration process
- **Account Types**: Support for Agencies and Direct Advertisers
- **Business Details**: Company information and documentation upload
- **Address & Contact**: Detailed contact information for UAE and GCC countries
- **Payment Preferences**: Flexible payment method selection
- **Compliance & Approval**: Complete approval workflow

### 📊 Analytics & Reporting
- **Performance Tracking**: Campaign reach, engagement, and ROI metrics
- **Real-time Analytics**: Live campaign performance monitoring
- **Custom Reports**: Detailed reporting for different stakeholder needs

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **State Management**: React Hooks + Context API
- **Routing**: React Router (if applicable)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Translation System

The project includes a comprehensive translation system with:
- **580+ Translation Keys**: Covering all user-facing text
- **Context-Aware Translations**: Different translations for different contexts
- **Parameter Support**: Dynamic content with placeholder support
- **Type-Safe**: Full TypeScript support for translation keys

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Advertising Platform Landing Page"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── signup/          # Signup flow components
│   └── dashboard/       # Dashboard and booking components
├── contexts/            # React contexts
│   └── LanguageContext.tsx  # Language/translation management
├── images/              # Static images
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## Language Support

The platform supports:
- **English** (en) - Default language
- **Arabic** (ar) - Complete localization

To add a new language:
1. Add language code to `Language` type in `LanguageContext.tsx`
2. Add translations to the `translations` object
3. Update language switcher component

## Deployment

### 🚀 Deploy to Vercel Now

**One-Click Deploy:** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/accorelabdxb/dubai-media-advertising-platform)

This project is **100% ready** for Vercel deployment! All configurations are in place.

### 📚 Deployment Guides

- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Quick start guide with deploy button
- **[DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)** - Complete setup including automated deployments
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Detailed Vercel-specific guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - All deployment platforms

### Quick CLI Deploy

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `build` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Original Design

This project is based on the Figma design available at: https://www.figma.com/design/0EYdD7bVkwThvSzvtGZEuX/Advertising-Platform-Landing-Page
  