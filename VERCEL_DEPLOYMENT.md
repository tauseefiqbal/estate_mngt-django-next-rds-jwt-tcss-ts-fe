# Vercel Deployment Guide - Next.js Frontend

Complete guide for deploying Next.js frontend on Vercel (the perfect platform for Next.js!).

## 🎯 Why Vercel for Next.js?

Vercel **created Next.js**, making it the **best platform** for Next.js deployment:

✅ **Zero configuration** - works out of the box
✅ **FREE tier** - generous limits
✅ **Automatic optimization** - image optimization, caching, edge functions
✅ **Global CDN** - lightning fast worldwide
✅ **Instant deployments** - every git push
✅ **Preview deployments** - every PR gets a URL

---

## 🚀 Quick Deployment (5 Minutes)

### Step 1: Push to GitHub

```bash
cd frontend
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### Step 2: Import to Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up/login with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select: `tauseefiqbal/estate_mngt-django-next-rds-jwt-tcss-ts-fe`
   - Click "Import"

3. **Configure (Auto-detected)**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Click "Deploy"**

That's it! Your frontend is live in 2 minutes. 🎉

---

## 🔧 Environment Variables

In Vercel dashboard (Settings → Environment Variables):

```bash
# Backend API URL (CRITICAL)
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app

# OR if backend is on Railway/Render
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Node Environment (auto-set by Vercel)
NODE_ENV=production

# Domain (optional - Vercel auto-assigns)
NEXT_PUBLIC_DOMAIN=https://your-frontend.vercel.app
```

**⚠️ Important**: After adding/changing `NEXT_PUBLIC_*` variables, redeploy!

---

## 🔗 Connecting to Backend

### Backend on Vercel

```bash
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
```

### Backend on Railway

```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### Backend on Render

```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

**Update `vercel.json` rewrites** (already configured, just update URL):

```json
{
  "rewrites": [
    {
      "source": "/api/v1/:path*",
      "destination": "https://YOUR_BACKEND_URL/api/v1/:path*"
    }
  ]
}
```

---

## 📁 Configuration Files

### vercel.json (Already Created)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/v1/:path*",
      "destination": "https://your-backend.vercel.app/api/v1/:path*"
    }
  ]
}
```

**Note**: Update the `destination` URL to your actual backend!

### .vercelignore (Already Created)

Excludes unnecessary files:
- `node_modules/` (rebuilt by Vercel)
- `.next/` (rebuilt by Vercel)
- Development files
- Documentation

---

## 🌐 How It Works

### Vercel's Next.js Architecture

```
User Request
    ↓
Vercel Edge Network (Global CDN)
    ↓
Next.js Server (Optimized)
    ↓
API Calls → Backend
    ↓
Static Assets (Cached)
    ↓
Response (Lightning Fast)
```

**Features**:
- ✅ Automatic image optimization
- ✅ Edge caching
- ✅ ISR (Incremental Static Regeneration)
- ✅ API routes as serverless functions
- ✅ Automatic code splitting

---

## 💰 Cost

### FREE Hobby Plan

**Perfect for personal projects**:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments
- ✅ Analytics (basic)
- ⚠️ Non-commercial use only

### Pro Plan ($20/month)

**For production/commercial**:
- ✅ 1 TB bandwidth/month
- ✅ Commercial use
- ✅ Password protection
- ✅ Advanced analytics
- ✅ Team collaboration

### Full Stack Cost

| Backend Platform | Frontend | Backend | Total |
|------------------|----------|---------|-------|
| **Backend on Vercel** | FREE | FREE | **FREE** 🎉 |
| **Backend on Railway** | FREE | $10-15 | **$10-15** ✅ |
| **Backend on Render** | FREE | $7-15 | **$7-15** ✅ |

---

## 🧪 Testing Your Deployment

### 1. Check Deployment URL

Vercel provides:
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`

### 2. Test Features

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Images display (from Cloudinary)
- ✅ Login/registration works
- ✅ API calls reach backend
- ✅ Apartments list loads
- ✅ Avatar upload works
- ✅ Create posts/issues/ratings

### 3. Check Network Tab

Open DevTools (F12) → Network tab:
- API calls should go to your backend URL
- Check for CORS errors (none should appear)
- Verify response status codes (200, 201, etc.)

---

## 🔄 Continuous Deployment

Vercel auto-deploys on every push:

```bash
git add .
git commit -m "Update frontend"
git push origin main  # ← Vercel auto-deploys to production
```

**Preview Deployments**:
- Every PR gets a unique preview URL
- Test changes before merging
- Share with team/clients

---

## 🎨 Custom Domain

### Add Your Domain (Free on all plans)

1. **In Vercel Dashboard**:
   - Settings → Domains
   - Add domain: `yourdomain.com`

2. **Update DNS**:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`

3. **Done!**
   - Vercel auto-provisions SSL
   - HTTPS works immediately

---

## 🐛 Troubleshooting

### Issue: Build fails

**Solution**:
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Verify `package.json` is valid
4. Check Node.js version compatibility

### Issue: API calls fail (CORS)

**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check backend CORS settings allow frontend domain
3. Update backend `DJANGO_ALLOWED_HOSTS`
4. Test backend URL directly in browser

### Issue: Images don't load

**Solution**:
1. Check `next.config.mjs` remote patterns
2. Verify Cloudinary URLs are correct
3. Check image paths are absolute

### Issue: Environment variables not working

**Solution**:
1. `NEXT_PUBLIC_*` vars embed at build time
2. After changing vars, trigger redeploy
3. Check vars are set in Vercel dashboard
4. Don't commit `.env` files with secrets

### Issue: Page shows 404

**Solution**:
1. Verify file structure matches Next.js App Router
2. Check `src/app` directory structure
3. Clear Vercel build cache and redeploy

### Issue: Slow initial load

**Solution**:
1. This is normal for first visit (cold start)
2. Vercel caches aggressively after first load
3. Enable ISR for frequently accessed pages
4. Use Next.js Image component for optimization

---

## ⚡ Performance Optimization

### Already Optimized

Your Next.js app already uses:
- ✅ App Router (Next.js 16)
- ✅ Image optimization (`next/image`)
- ✅ Cloudinary for image hosting
- ✅ Tailwind CSS (optimized in production)
- ✅ Code splitting (automatic)

### Additional Optimizations

**1. Enable ISR** (Incremental Static Regeneration):
```typescript
// For apartment listings
export const revalidate = 60; // Revalidate every 60 seconds
```

**2. Use Edge Middleware**:
```typescript
// middleware.ts
export const config = {
  matcher: '/apartments/:path*',
};
```

**3. Optimize Images**:
- Already using `next/image`
- Cloudinary provides optimized images
- Perfect setup! ✅

---

## 📊 Vercel Analytics

### Enable Analytics (Free on Pro)

1. Go to dashboard → Analytics
2. Enable Web Vitals tracking
3. Monitor:
   - Page load times
   - Lighthouse scores
   - Real user metrics

---

## 🔐 Security

### Built-in Security Features

Vercel provides:
- ✅ Automatic HTTPS/SSL
- ✅ DDoS protection
- ✅ Edge network security
- ✅ Environment variable encryption

### Additional Security

**Password Protection** (Pro plan):
- Protect staging environments
- Requires authentication to access

---

## 🎯 Best Practices

### 1. Environment Variables

```bash
# Production (Vercel)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Development (Local)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Branch Deployments

- `main` → Production
- `develop` → Preview deployment
- Feature branches → Unique preview URLs

### 3. Testing

Test preview deployments before merging:
```bash
git checkout -b feature/new-component
# make changes
git push origin feature/new-component
# Vercel creates preview URL automatically
# Test at: https://your-project-git-feature-new-component.vercel.app
```

---

## 🔗 Integration with Backend

### Update Backend CORS

Ensure backend allows Vercel frontend:

```python
# backend/config/settings/production.py

CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
    "https://*.vercel.app",  # Allow all preview deployments
]

DJANGO_ALLOWED_HOSTS = [
    ".vercel.app",  # Allow Vercel domains
    "yourdomain.com",
]
```

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project imported
- [ ] `NEXT_PUBLIC_API_URL` set to backend
- [ ] Build successful
- [ ] Frontend accessible
- [ ] API calls working
- [ ] Images loading
- [ ] Login/registration tested
- [ ] All features working
- [ ] Custom domain configured (optional)
- [ ] Backend CORS configured

---

## 🎉 Success!

Your Next.js frontend is now live on Vercel at:
```
https://your-project.vercel.app
```

**Advantages**:
- ✅ FREE hosting
- ✅ Lightning fast (global CDN)
- ✅ Auto-deploys from GitHub
- ✅ Preview deployments for PRs
- ✅ Perfect Next.js integration

---

**Last Updated**: 2025  
**Status**: ✅ Ready for Production  
**Platform**: Vercel (Best for Next.js!)
