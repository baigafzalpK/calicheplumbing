import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig({
    incrementalCache: "dummy",
    tagCache: "dummy",
    queue: "dummy",
    enableCacheInterception: false,
  }),
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
      cdnInvalidation: "dummy",
    },
    routePreloadingBehavior: "none",
  },
  dangerous: {
    disableIncrementalCache: true,
    disableTagCache: true,
    enableCacheInterception: false,
  },
  buildCommand: "npm run build:next",
};
