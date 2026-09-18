import path from "node:path";
import {defineConfig} from "vite";
import {nonna} from "@nonnajs/vite-plugin";

export default defineConfig({
    plugins: [
        // @nonnajs/di's published dist bundle statically imports a handful of Node builtins
        // (async_hooks, fs/promises, path, url) that a real browser bundler can't resolve on its
        // own. nonna() provides browser-safe shims for these.
        nonna(),
    ],
    resolve: {
        alias: {
            // Mirrors the `@services/*` external kept unbundled in stencil.config.ts's
            // rollupConfig - resolving to the exact same absolute files ensures the Stencil
            // components and the app's own DI registration (src/main.ts, the
            // nonna-compile-generated aggregator) share one module instance per service class,
            // not two distinct copies with two distinct (and mutually unrecognized) DI tokens.
            "@services": path.resolve(__dirname, "src/services"),
        },
    },
    server: {
        port: 5175,
    },
});
