// One address for Google and for visitors: www and the old pages.dev URL
// 301 to https://stationerypoint.in, keeping the path and query.
// Only the exact production hosts redirect, so preview deploys
// (<hash>.stationery-point.pages.dev) stay reachable.
const CANONICAL_HOST = 'stationerypoint.in';
const REDIRECT_HOSTS = new Set(['www.stationerypoint.in', 'stationery-point.pages.dev']);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
