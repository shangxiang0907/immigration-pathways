import { site } from "../site.config.mjs";

const preferredHost = new URL(site.url).hostname;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.protocol !== "https:" || url.hostname === `www.${preferredHost}`) {
      url.protocol = "https:";
      url.hostname = preferredHost;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
