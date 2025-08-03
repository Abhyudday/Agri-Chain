# 🚀 Vercel Deployment Guide for AgriChain IoT Supply Chain

## 📋 Prerequisites

- Node.js 16+ installed locally
- Vercel account (free tier available)
- GitHub repository connected to Vercel
- MetaMask wallet for testing

## 🔧 Deployment Configuration

### 1. Automatic Deployment (Recommended)

1. **Connect Repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

2. **Environment Variables (Optional):**
   Add these in Vercel Dashboard → Project → Settings → Environment Variables:
   ```
   REACT_APP_NETWORK_NAME=sepolia
   REACT_APP_CHAIN_ID=11155111
   REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
   ```

### 2. Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel --prod

# Or deploy from frontend directory
cd frontend
vercel --prod
```

## 📁 Project Structure

```
IoT project - Health/
├── frontend/                 # React application
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── build/               # Production build (generated)
│   ├── package.json         # Frontend dependencies
│   └── craco.config.js      # Webpack configuration
├── contracts/               # Smart contracts
├── vercel.json             # Vercel configuration
└── package.json            # Root package.json
```

## ⚙️ Build Configuration

### Vercel Configuration (`vercel.json`)
- **Build Command**: `cd frontend && npm ci && npm run build:vercel`
- **Output Directory**: `frontend/build`
- **Framework**: Create React App with CRACO
- **Node Runtime**: 18.x
- **Routes**: SPA routing configured
- **Headers**: Security headers included

### Frontend Configuration
- **Build Script**: `CI=false GENERATE_SOURCEMAP=false craco build`
- **Homepage**: `./` (relative paths)
- **Webpack Polyfills**: Node.js modules for blockchain libraries
- **Bundle Optimization**: Disabled source maps for production

## 🔍 Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check Node.js version (16+)
   - Verify all dependencies are installed
   - Check for ESLint errors

2. **404 Errors:**
   - Ensure SPA routing is configured
   - Check `homepage` field in package.json
   - Verify build output directory

3. **Blockchain Connection Issues:**
   - Set correct environment variables
   - Ensure MetaMask is connected to Sepolia
   - Verify smart contract is deployed

### Build Commands:

```bash
# Local development
npm run frontend

# Local production build
cd frontend && npm run build

# Optimized Vercel build
cd frontend && npm run build:vercel

# Bundle analysis
cd frontend && npm run analyze
```

## 🌐 Live Deployment Features

### Included Functionality:
- ✅ **Dashboard**: System overview and statistics
- ✅ **QR Scanner**: Camera-based product scanning
- ✅ **Product Registration**: Blockchain product registration
- ✅ **IoT Simulator**: Real-time sensor data simulation
- ✅ **Compliance Verification**: Zero-knowledge proof integration
- ✅ **Block Explorer**: Transaction and contract interaction
- ✅ **Wallet Integration**: MetaMask connection with Sepolia

### Performance Optimizations:
- ✅ **Code Splitting**: Lazy loading for components
- ✅ **Bundle Optimization**: Minimized JavaScript and CSS
- ✅ **Static Asset Caching**: Long-term caching headers
- ✅ **Security Headers**: XSS protection and content security
- ✅ **No Source Maps**: Reduced bundle size for production

## 📊 Expected Bundle Size

- **Main Bundle**: ~244 kB (gzipped)
- **Vendor Chunks**: ~17 kB (gzipped)
- **CSS**: ~1.4 kB (gzipped)
- **Total**: ~263 kB (optimized for Web3 libraries)

## 🔐 Security Configuration

- **Content Security Policy**: Configured for blockchain interactions
- **XSS Protection**: Enabled
- **Frame Options**: DENY
- **Content Type Options**: nosniff
- **Static Asset Caching**: 1 year cache for immutable assets

## 📱 Mobile Compatibility

- **Responsive Design**: Works on all device sizes
- **PWA Ready**: Service worker configuration
- **Touch Optimized**: Mobile-friendly QR scanner
- **MetaMask Mobile**: Compatible with mobile wallets

## 🚀 Post-Deployment

1. **Test the Application:**
   - Connect MetaMask to Sepolia testnet
   - Register a test product
   - Scan QR codes
   - Submit compliance records

2. **Monitor Performance:**
   - Check Vercel Analytics
   - Monitor build times
   - Track error rates

3. **Custom Domain (Optional):**
   - Add custom domain in Vercel dashboard
   - Configure DNS settings
   - Enable HTTPS (automatic)

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test local build first
4. Check browser console for errors

---

**Deployment Status**: ✅ Ready for Vercel deployment
**Last Updated**: August 2025