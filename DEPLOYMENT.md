# Deployment Guide

This guide covers how to deploy the ProElevate Clone application to production.

## Pre-deployment Checklist

### 1. Environment Variables
Ensure all required environment variables are set in your production environment:

```env
REACT_APP_API_BASE_URL=https://your-production-api.com
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENABLE_API_CACHE_BUSTING=true
```

### 2. Build Optimization
The application is configured for production builds with:
- Code splitting
- Minification
- Asset optimization
- Environment-specific configurations

### 3. Security Considerations
- API endpoints are configurable via environment variables
- No hardcoded secrets or API keys in the codebase
- All sensitive data should be set via environment variables

## Deployment Options

### Option 1: Netlify
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `build`

### Option 2: Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Build command: `npm run build`
4. Output directory: `build`

### Option 3: AWS S3 + CloudFront
1. Build the application: `npm run build`
2. Upload the `build` folder to S3
3. Configure CloudFront distribution
4. Set environment variables before build

### Option 4: Docker
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_TIMEOUT
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_API_TIMEOUT=$REACT_APP_API_TIMEOUT
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment-Specific Configurations

### Development
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENABLE_API_CACHE_BUSTING=true
```

### Staging
```env
REACT_APP_API_BASE_URL=https://staging-api.yourapp.com
REACT_APP_ENABLE_API_CACHE_BUSTING=true
```

### Production
```env
REACT_APP_API_BASE_URL=https://api.yourapp.com
REACT_APP_ENABLE_API_CACHE_BUSTING=false
REACT_APP_API_TIMEOUT=5000
```

## Monitoring and Logging

The application includes:
- Environment validation on startup
- Error logging for API failures
- Fallback data for offline scenarios
- Performance monitoring ready

## Performance Optimizations

- Lazy loading of components
- Image optimization for YouTube thumbnails
- API response caching
- Bundle size optimization

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure variables start with `REACT_APP_`
   - Restart development server after adding new variables
   - Check for typos in variable names

2. **API connection issues**
   - Verify `REACT_APP_API_BASE_URL` is correct
   - Check CORS settings on your API
   - Ensure API is accessible from your deployment environment

3. **Build failures**
   - Run `npm run build` locally to test
   - Check for any missing dependencies
   - Verify all environment variables are set

### Debug Mode
Set `NODE_ENV=development` to enable additional logging and error details.