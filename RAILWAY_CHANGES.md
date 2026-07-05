# Railway.com Frontend Configuration Summary

## ✅ Configuration Files Created

### 1. Railway Deployment Files
- **`.railwayignore`** - Excludes unnecessary files from deployment
- **`railway.json`** - Railway build and deploy configuration

### 2. Documentation Files
- **`RAILWAY_DEPLOYMENT.md`** - Complete deployment guide
- **`RAILWAY_QUICKSTART.md`** - Quick start instructions
- **`RAILWAY_CHANGES.md`** - This file

## 🏗️ Architecture

### Frontend Service (Next.js)
- **Framework**: Next.js 16.1.6
- **Runtime**: Node.js
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Port**: Assigned by Railway (via `$PORT`)

### Dependencies
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Axios for API calls
- Cloudinary integration for images

## 📝 Configuration Details

### railway.json

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### .railwayignore

Excludes:
- `node_modules/` (rebuilt on Railway)
- `.next/` (rebuilt on Railway)
- Development files (`.env.local`)
- IDE configs
- Test files

## 🌐 Environment Variables Required

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Node environment |
| `NEXT_PUBLIC_API_URL` | Backend URL | API endpoint (e.g., `https://backend.railway.app`) |
| `NEXT_PUBLIC_DOMAIN` | Frontend URL | Optional - Railway auto-assigns |

**⚠️ Important**: `NEXT_PUBLIC_*` variables are embedded at **build time**, not runtime!

## 🔗 Backend Connection

### API Rewrites (Already Configured)

In `next.config.mjs`:
```javascript
async rewrites() {
  return [
    {
      source: "/api/v1/:path*",
      destination: `${API_URL}/api/v1/:path*`,
    },
  ];
}
```

This allows frontend to call `/api/v1/...` which gets proxied to backend.

### Cloudinary Images (Already Configured)

In `next.config.mjs`:
```javascript
images: {
  remotePatterns: [
    {
      hostname: "res.cloudinary.com",
    },
  ],
}
```

Allows Next.js Image component to load from Cloudinary.

## 📦 Deployment Flow

1. **Push to GitHub** → Triggers Railway deployment
2. **Railway detects** → Node.js project (from `package.json`)
3. **Install dependencies** → `npm install`
4. **Build Next.js** → `npm run build` (creates `.next/` folder)
5. **Start server** → `npm run start` (serves optimized production build)
6. **Assign URL** → `https://project-name.railway.app`

## 💰 Cost Estimate

**Frontend Service**: ~$5-10/month

**Full Stack on Railway**:
- Frontend: $5-10/month
- Backend (simple): $10-15/month
- **Total**: ~$15-25/month

**Full Stack with Celery**:
- Frontend: $5-10/month
- Backend (full): $25-30/month
- **Total**: ~$30-40/month

## 🚀 Deployment Options

### Option 1: Frontend + Backend on Railway (Recommended)

**Benefits**:
- Same platform for both
- Faster communication (same datacenter)
- Unified billing
- Easy internal URL references

**Cost**: ~$15-25/month

### Option 2: Frontend on Railway + Backend on Render

**Benefits**:
- Backend already deployed on Render
- Just add frontend to Railway
- Separate platforms (redundancy)

**Cost**: ~$5-10/month (frontend only)

## 🧪 Testing Checklist

- [ ] Frontend builds successfully
- [ ] Frontend URL accessible
- [ ] API calls reach backend (check Network tab)
- [ ] User login/registration works
- [ ] Apartments list loads
- [ ] Images display (from Cloudinary)
- [ ] Avatar upload works (via backend)
- [ ] Create posts/issues/ratings works
- [ ] Responsive design works
- [ ] Dark/light theme toggle works

## 🔄 Continuous Deployment

Railway automatically redeploys when:
- You push to GitHub `main` branch
- You manually trigger redeploy in dashboard
- You change environment variables (triggers rebuild)

## 🐛 Common Issues & Solutions

### Build Fails
- Check Railway logs for specific error
- Verify `package.json` is valid
- Test build locally: `npm run build`

### API Calls Fail (CORS)
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend allows frontend domain in CORS settings
- Update backend `DJANGO_ALLOWED_HOSTS`

### Environment Variables Not Working
- Remember: `NEXT_PUBLIC_*` vars embed at build time
- After changing, trigger redeploy
- Check Railway logs to confirm vars are set

### Images Don't Load
- Verify Cloudinary setup in backend
- Check `next.config.mjs` remote patterns
- Test Cloudinary URLs directly

## 📚 Documentation Links

- **Backend Simple Deploy**: `../backend/RAILWAY_SIMPLE_DEPLOY.md`
- **Backend Full Deploy**: `../backend/RAILWAY_DEPLOYMENT.md`
- **Frontend Deploy**: `./RAILWAY_DEPLOYMENT.md`
- **Quick Start**: `./RAILWAY_QUICKSTART.md`

## ✅ Summary

Frontend is configured for Railway with:
- ✅ Optimized build configuration (`railway.json`)
- ✅ Automatic Next.js detection and building
- ✅ Production-ready start command
- ✅ Environment variable support
- ✅ API rewrites for backend communication
- ✅ Cloudinary image optimization
- ✅ Continuous deployment from GitHub
- ✅ Complete documentation

**Status**: ✅ Ready for Production Deployment

---

**Last Updated**: 2025  
**Target Platform**: Railway.com
