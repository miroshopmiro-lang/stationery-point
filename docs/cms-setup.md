# Stationery Point — /admin CMS setup (one-time)

The site has a Decap CMS admin panel at `/admin`. Products and categories live as
JSON in `src/data/`; every save from the panel commits to GitHub and Cloudflare
Pages redeploys automatically. Code side is done — what remains is the GitHub
OAuth hookup, which only the repo owner can do.

## A. Test it locally right now (no OAuth needed)

```powershell
# terminal 1, in the project folder
npx decap-server

# terminal 2
npm run dev
```

Open http://localhost:5173/admin/ → it connects to the local repo directly.
Edit a product, save, and the change appears in `src/data/products/` (and the
dev site hot-reloads). Commit/push those changes like any other edit.

## B. Enable the hosted /admin (production)

1. **Create a GitHub OAuth App** (github.com → Settings → Developer settings →
   OAuth Apps → New):
   - Homepage URL: `https://stationery-point.pages.dev`
   - Authorization callback URL: `https://stationery-point-cms-oauth.<your-account>.workers.dev/callback`
     (you'll know the exact worker URL after step 2 — you can come back and fix it)
   - Note the **Client ID** and generate a **Client Secret**.

2. **Deploy the OAuth proxy worker** (folder `cms-oauth-worker/`):
   ```powershell
   cd cms-oauth-worker
   # put the Client ID into wrangler.toml [vars] first
   npx wrangler deploy
   npx wrangler secret put GITHUB_CLIENT_SECRET   # paste the secret when prompted
   ```
   Note the deployed URL, e.g. `https://stationery-point-cms-oauth.xyz.workers.dev`.

3. **Point the CMS at the worker**: in `public/admin/config.yml`, replace
   `base_url: https://REPLACE-WITH-YOUR-WORKER-URL.workers.dev` with the real
   worker URL. Commit + push → Cloudflare redeploys.

4. **Log in**: open `https://stationery-point.pages.dev/admin/`, click
   "Login with GitHub", authorize, done.

## C. Who can edit?

Anyone who logs in needs **write access to the GitHub repo**. Options for the
client:

- Make a free GitHub account for the shop (e.g. `stationerypoint-kochi`) and add
  it as a collaborator on `miroshopmiro-lang/stationery-point` (repo → Settings →
  Collaborators). They log into /admin with that account. **Recommended.**
- Or keep edits with Abhinand only — the client WhatsApps changes.

## D. What the client can edit

- **Products**: add/remove products, name, brand, category, MRP + Our Price
  (shows the strike-through deal price on cards), photo upload, In Stock toggle,
  **Show in New Arrivals** toggle (drives the homepage carousel), search tags.
- **Site Settings → Categories**: category names and the homepage strip colours.

Photos uploaded through the panel land in `public/shop-catalogue-images/`.
Plain-background photos (white chart paper backdrop) keep the grid looking tidy.
