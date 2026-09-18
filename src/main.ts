import {Nonna} from "@nonnajs/di";
import {defineNonnaProvider, type NonnaProviderElement} from "@nonnajs/stencil";
import "./__generated__/nonna-dependencies.generated";
import {FormalGreeter, FriendlyGreeter, GREETER} from "./services/greeter";

defineNonnaProvider();

async function bootstrap() {
    const injector = await Nonna.injector()
        .register({provide: GREETER, useClass: FriendlyGreeter, multi: true})
        .register({provide: GREETER, useClass: FormalGreeter, multi: true})
        .scan()
        .build();

    const provider = document.getElementById("app-provider") as NonnaProviderElement;
    if (provider) {
        provider.injector = injector;
    }

    // Only define the Stencil custom elements *after* the provider is listening - each
    // component's `componentWillLoad()` calls `requestInjection(this.el, ...)` synchronously,
    // and defining a tag upgrades/connects any already-present matching element immediately
    // (synchronously, per the Custom Elements spec). Defining these any earlier - the same trap
    // the sample-web-components README documents - would race the async injector build.
    const [
        {defineCustomElement: defineGreetingBanner},
        {defineCustomElement: defineAddUserForm},
        {defineCustomElement: defineUserList},
        {defineCustomElement: defineDebugPanel},
    ] = await Promise.all([
        import("../stencil-dist/components/greeting-banner"),
        import("../stencil-dist/components/add-user-form"),
        import("../stencil-dist/components/user-list"),
        import("../stencil-dist/components/debug-panel"),
    ]);
    defineGreetingBanner();
    defineAddUserForm();
    defineUserList();
    defineDebugPanel();

    if (provider) {
        provider.innerHTML = `
            <greeting-banner></greeting-banner>
            <add-user-form></add-user-form>
            <user-list></user-list>
            <debug-panel></debug-panel>
        `;
    }
}

bootstrap().catch(err => {
    console.error("Failed to bootstrap Nonna Stencil sample:", err);
});
