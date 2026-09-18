import {Config} from "@stencil/core";

// Compiles the Stencil `.tsx` components into individually-importable custom element modules
// (`stencil-dist/components/*.js`, each exporting `defineCustomElement()`) rather than a
// self-registering "app" bundle - the consuming Vite app (see vite.config.ts / src/main.ts)
// controls exactly when each component is defined, the same way sample-web-components controls
// when its vanilla custom elements are defined: only after the injector is built and assigned to
// `<nonna-provider>`, so no component's connectedCallback can ever request injection before a
// provider is listening.
export const config: Config = {
    namespace: "sample-stencil",
    // Narrower than tsconfig.json: excludes src/main.ts and src/__generated__, which reference
    // the stencil-dist output this very build produces (a chicken-and-egg module-resolution
    // error otherwise) and aren't components Stencil needs to compile anyway.
    tsconfig: "tsconfig.stencil.json",
    // `@services/*` is kept external (unbundled) rather than inlined into each component chunk.
    // Services are `@Injectable()` singletons resolved by class-reference identity - if Stencil's
    // Rollup bundler inlined its own copy of `src/services/*.ts` into stencil-dist while Vite
    // separately loads the *same* source for the app's own `nonna-dependencies.generated.ts` /
    // `.scan()` registration, the two builds end up with two distinct `UserService` classes, and
    // `requestInjection(el, UserService)` inside a component throws `ProviderNotFoundError` even
    // though a UserService *is* registered - just under the other copy's class reference. Vite's
    // matching `resolve.alias` in vite.config.ts resolves `@services/*` to the exact same absolute
    // file, so both builds share one module instance and one class identity.
    rollupConfig: {
        inputOptions: {
            external: source => source.startsWith("@services/"),
        },
    },
    outputTargets: [
        {
            type: "dist-custom-elements",
            dir: "stencil-dist/components",
            customElementsExportBehavior: "default",
            externalRuntime: false,
        },
    ],
};
