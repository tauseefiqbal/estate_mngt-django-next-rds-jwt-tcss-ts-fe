# Railway.com Deployment - Frontend (Next.js)

Complete guide for deploying the Estate Management Next.js frontend on Railway.com.

## 📋 Prerequisites

- Railway.com account
- GitHub repository with frontend code
- Backend API already deployed (or accessible URL)

## 🚀 Deployment Steps

### 1. Create Railway Project

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your frontend repository: `tauseefiqbal/estate_mngt-django-next-rds-jwt-tcss-ts-fe`
5. Railway will auto-detect it as a Node.js project

### 2. Set Environment Variables

Add these in Railway dashboard (Variables tab):

```bash
# Node Environment
NODE_ENV=production

# API Connection (CRITICAL)
NEXT_PUBLIC_API_URL=https://your-backend-api.railway.app

# Domain (optional - Railway auto-assigns)
NEXT_PUBLIC_DOMAIN=https://your-frontend.railway.app
```

**Important**: `NEXT_PUBLIC_API_URL` must point to your deployed backend URL.

### 3. Configure Build Settings (Optional)

Railway auto-detects from `package.json`, but you can override:

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Root Directory**: `/` (or specify if different)

### 4. Deploy

Railway automatically:
- Installs dependencies (`npm install`)
- Builds Next.js app (`npm run build`)
- Starts production server (`npm run start`)
- Assigns a public URL

## 🔧 Configuration Files

### railway.json

Already created with optimal settings:

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

Excludes unnecessary files from deployment:
- Development files (`.env.local`)
- Dependencies (`node_modules/`)
- Build artifacts (`.next/`)
- IDE configs

## 🌐 Environment Variables Explained

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | ✅ Yes | Node environment | `production` |
| `NEXT_PUBLIC_API_URL` | ✅ Yes | Backend API base URL | `https://backend.railway.app` |
| `NEXT_PUBLIC_DOMAIN` | ⚠️ Optional | Frontend domain | `https://frontend.railway.app` |

**⚠️ Critical**: All `NEXT_PUBLIC_*` variables must be set at **build time** (not runtime). If you change them, redeploy!

## 🔗 Connecting Frontend to Backend

### Option 1: Both on Railway (Recommended)

If both frontend and backend are on Railway:

1. Deploy backend first
2. Get backend URL: `https://your-backend.railway.app`
3. Set `NEXT_PUBLIC_API_URL=https://your-backend.railway.app`
4. Deploy frontend

### Option 2: Backend on Render, Frontend on Railway

If backend is on Render:

1. Get Render backend URL: `https://your-backend.onrender.com`
2. Set `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
3. Deploy frontend

### Option 3: Use Internal Railway URLs (Advanced)

For better performance (same datacenter):

1. Use Railway's internal URL for backend
2. Set `NEXT_PUBLIC_API_URL=${{Backend.RAILWAY_PUBLIC_DOMAIN}}`

## 📦 What Gets Deployed

✅ **Included**:
- Source code (`src/`)
- Public assets (`public/`)
- Configuration files
- `package.json` and lock files
- Next.js config

❌ **Excluded**:
- `node_modules/` (rebuilt on Railway)
- `.next/` (rebuilt on Railway)
- Development files
- IDE configs

## 🧪 Testing Your Deployment

### 1. Check Build Logs

In Railway dashboard:
- Click on your service
- Go to **"Deployments"** tab
- Check for any build errors

### 2. Test Frontend

Visit your Railway-assigned URL:
```
https://your-project-name.railway.app
```

### 3. Test API Connection

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Navigate through the app
4. Check API requests go to correct backend

### 4. Test Features

- ✅ User login/registration
- ✅ View apartments
- ✅ Avatar upload (should work via backend)
- ✅ Create/edit posts, issues, ratings
- ✅ Images load from Cloudinary

## 💰 Cost Estimate

Railway charges for:
- **Compute**: ~$5-10/month (depends on usage)
- **Builds**: Included in compute
- **Bandwidth**: Usually included

**Total**: ~$5-10/month for frontend

**Full Stack** (Frontend + Backend Simple):
- Frontend: $5-10/month
- Backend: $10-15/month
- **Total**: ~$15-25/month

## 🔄 Redeployment

Railway automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Railway detects the push and triggers a new deployment.

## 🐛 Troubleshooting

### Issue: Build fails with "Cannot find module"
**Solution**: Check `package.json` dependencies, run `npm install` locally first

### Issue: API requests fail (CORS errors)
**Solution**: 
1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check backend CORS settings allow frontend domain
3. Update backend `DJANGO_ALLOWED_HOSTS` and CORS config

### Issue: Images don't load
**Solution**: Check Cloudinary config in `next.config.mjs`, verify `remotePatterns`

### Issue: Environment variables not working
**Solution**: 
1. `NEXT_PUBLIC_*` vars must be set at build time
2. After changing them, trigger a redeploy
3. Check Railway logs to confirm vars are set

### Issue: 404 on page refresh
**Solution**: Next.js should handle this automatically with `next start`. Check logs.

### Issue: Slow build times
**Solution**: Railway caches `node_modules`. Clear cache in settings if needed.

### Issue: App works locally but not on Railway
**Solution**:
1. Check build logs for errors
2. Verify all environment variables are set
3. Test API URL is accessible from Railway
4. Check Next.js config (`next.config.mjs`)

## 📊 Performance Optimization

### Enable Caching

Railway caches dependencies by default. For faster builds:
- Use `package-lock.json` (already present)
- Avoid unnecessary dependencies

### Image Optimization

Next.js optimizes images automatically:
- Uses `sharp` (already in dependencies)
- Cloudinary serves optimized images
- Railway handles image delivery

### API Rewrites

`next.config.mjs` already configured with API rewrites:
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

This allows calling `/api/v1/...` from frontend without CORS issues.

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env.production` to GitHub
2. **API URL**: Always use HTTPS for production API
3. **CORS**: Configure backend to only allow your frontend domain
4. **Secrets**: Use Railway's environment variables (encrypted)

## 📚 Related Documentation

- **Backend Deployment**: See backend `RAILWAY_SIMPLE_DEPLOY.md`
- **Railway Docs**: https://docs.railway.app
- **Next.js Docs**: https://nextjs.org/docs

## ✅ Deployment Checklist

- [ ] Frontend code pushed to GitHub
- [ ] Backend deployed and accessible
- [ ] Railway project created from GitHub repo
- [ ] `NEXT_PUBLIC_API_URL` set to backend URL
- [ ] `NODE_ENV=production` set
- [ ] Build successful (check logs)
- [ ] Frontend URL accessible
- [ ] API requests working (check DevTools)
- [ ] Login/registration working
- [ ] Image uploads working
- [ ] All features tested

## 🆘 Need Help?

- **Railway Discord**: https://discord.gg/railway
- **Railway Docs**: https://docs.railway.app
- **Next.js Discord**: https://nextjs.org/discord

---

**Last Updated**: 2025  
**Status**: ✅ Ready for Production
