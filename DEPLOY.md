# Deployment Guide: Cloudflare Pages

This website is configured for static hosting on Cloudflare Pages.

## Build Configuration

- Framework preset: Astro
- Build command: `npm run build:preview` (for development testing) or `npm run build` (for production once all placeholders are confirmed)
- Build output directory: `dist`
- Node.js version: `20.x` or `22.x`

## Environment Variables

Configure the following variable in the Cloudflare Pages dashboard under **Settings > Environment variables**:

- `PUBLIC_WEB3FORMS_KEY`: Your access key from Web3Forms.

## Custom Domain and DNS Configuration

1. Log into your Cloudflare account and navigate to **Workers and Pages**.
2. Select the `new-durga-website` project and open the **Custom domains** tab.
3. Add your production apex domain (`newdurgawirenettingworks.in`) and the www subdomain (`www.newdurgawirenettingworks.in`).
4. In your DNS provider (e.g. GoDaddy), configure DNS records:
   - For apex domain (`newdurgawirenettingworks.in`): CNAME or ALIAS pointing to `new-durga-website.pages.dev` (or assign Cloudflare nameservers).
   - For `www` (`www.newdurgawirenettingworks.in`): CNAME pointing to `new-durga-website.pages.dev`.
5. Ensure SSL/TLS encryption mode is set to Full or Strict.
6. Configure Page Rules or Bulk Redirects so `www.newdurgawirenettingworks.in` redirects permanently (301) to the apex domain `newdurgawirenettingworks.in`.

## Security Headers

Cloudflare Pages automatically reads `public/_headers` to apply HTTP security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` restricting execution to self and the Web3Forms submission endpoint.
