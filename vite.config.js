import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Vite's dev server rewrites any extensionless path (like /admin or /admin/)
// to the SPA's index.html before checking public/ for a matching file — only
// a literal /admin/index.html request bypasses that rewrite. This middleware
// restores normal static-file behavior for /admin so the CMS loads the same
// way it will on Cloudflare Pages in production.
function decapAdminDevRedirect() {
  return {
    name: 'decap-admin-dev-redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // No trailing slash: redirect so the browser URL matches the file's
        // real location — otherwise the CMS's relative fetch of config.yml
        // resolves against "/" instead of "/admin/" and 404s into the SPA.
        if (req.url === '/admin') {
          res.statusCode = 302;
          res.setHeader('Location', '/admin/');
          res.end();
          return;
        }
        if (req.url === '/admin/') {
          req.url = '/admin/index.html';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [decapAdminDevRedirect(), react()],
});
