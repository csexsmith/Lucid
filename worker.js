import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          mapRequestToAsset: (req) => {
            let url = new URL(req.url);
            if (url.pathname === '/' || url.pathname.startsWith('/index')) {
              return new Request(`${url.origin}/index.html`, req);
            }
            return req;
          },
        }
      );
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};
