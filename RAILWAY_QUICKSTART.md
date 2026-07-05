# Quick Start - Frontend Railway Deployment

Deploy your Next.js frontend to Railway.com in minutes.

## 🚀 5-Minute Deployment

### 1. Create Railway Project

- Go to https://railway.app
- Click **"New Project"** → **"Deploy from GitHub repo"**
- Select: `tauseefiqbal/estate_mngt-django-next-rds-jwt-tcss-ts-fe`

### 2. Set Environment Variables

In Railway dashboard, add:

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend-api.railway.app
```

**⚠️ Replace** `your-backend-api.railway.app` with your actual backend URL!

### 3. Deploy

Railway automatically:
- ✅ Installs dependencies
- ✅ Builds Next.js app
- ✅ Starts production server
- ✅ Assigns public URL

Your frontend will be live at: `https://your-project.railway.app`

## 🔗 Full Stack Deployment

### If Backend is on Railway:

1. **Deploy Backend First**
   - See backend `RAILWAY_SIMPLE_DEPLOY.md`
   - Get backend URL: `https://backend-xyz.railway.app`

2. **Deploy Frontend**
   - Set `NEXT_PUBLIC_API_URL=https://backend-xyz.railway.app`
   - Deploy as shown above

### If Backend is on Render:

Just set `NEXT_PUBLIC_API_URL` to your Render backend URL:

```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## 💰 Cost

**Frontend Only**: ~$5-10/month

**Full Stack** (Frontend + Backend Simple):
- Frontend: $5-10/month
- Backend: $10-15/month
- **Total: ~$15-25/month**

## ✅ Test Your Deployment

1. **Visit your Railway URL**
2. **Try logging in**
3. **Check Network tab** (F12) - API calls should go to backend
4. **Test features**: View apartments, upload avatar, create posts

## 🐛 Common Issues

### API Requests Fail

**Fix**: Check `NEXT_PUBLIC_API_URL` matches your backend exactly

### Images Don't Load

**Fix**: Verify Cloudinary config in backend is correct

### Need to Redeploy

**Fix**: Push to GitHub - Railway auto-redeploys:
```bash
git push origin main
```

## 📚 Full Documentation

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete guide.

---

**That's it!** Your Next.js frontend is now live on Railway. 🎉
