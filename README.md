# @nonnajs/sample-stencil

Sample StencilJS application demonstrating `@nonnajs/stencil` over `@nonnajs/di`.

## Dependency Injection At A Glance

`UserList` resolves `UserService` with the `@Inject()` property decorator - no `@Element()` field
needed. Note the `declare` modifier: it's required (see `@nonnajs/stencil`'s README for why) or the
property silently resolves to `undefined`.

```tsx
@Component({tag: "user-list", shadow: false})
export class UserList {
    @Inject(UserService)
    private declare readonly userService: UserService;

    @State() users: User[] = [];

    componentWillLoad() {
        this.users = this.userService.getUsers();
    }

    render() {
        return (
            <ul>
                {this.users.map(u => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
        );
    }
}
```

`src/main.ts` builds the injector, assigns it to `<nonna-provider>`, and only _then_ defines and
appends the Stencil components - defining them earlier would upgrade any already-present matching
elements immediately (synchronously, per the Custom Elements spec) and race the async injector build:

```ts
const injector = await Nonna.injector()
    .register({provide: GREETER, useClass: FriendlyGreeter, multi: true})
    .register({provide: GREETER, useClass: FormalGreeter, multi: true})
    .scan()
    .build();

const provider = document.getElementById("app-provider") as NonnaProviderElement;
provider.injector = injector;

const [{defineCustomElement: defineUserList}] = await Promise.all([import("../stencil-dist/components/user-list")]);
defineUserList();
provider.appendChild(document.createElement("user-list"));
```

## Highlights

-   **Decorators**: `@Inject(Token)`, `@OptionalInject(Token)`, and `@AllInject(Token)` on component properties - no separate `@Element()` field needed, unlike calling `requestInjection()` directly.
-   **Standard W3C Context Protocol underneath**: those decorators resolve via bubbling `"context-request"` events, the same mechanism `@nonnajs/web-components` implements.
-   **`<nonna-provider>`**: The same vanilla custom element from `@nonnajs/web-components` acts as the DI boundary - no Stencil-specific provider needed.
-   **`@services/*` alias**: `vite.config.ts`/`stencil.config.ts` resolve it to the same absolute files so Stencil's bundler and Vite share one module instance per service class - see the comment in `stencil.config.ts` for why that's load-bearing (two copies of `UserService` would mean two distinct, mutually unrecognized DI tokens).
-   **AOT metadata generation** via `@nonnajs/compiler` (`pnpm compile-deps`).
-   **Two-stage build**: `stencil build` compiles the `.tsx` components to individually-importable custom element modules (`stencil-dist/components/*.js`, `dist-custom-elements` output target); Vite then serves/bundles the app around them.
-   **Deterministic bootstrap ordering**: `<nonna-provider>` starts empty in `index.html`; `src/main.ts` builds the injector, assigns it to the provider, _then_ defines and appends the Stencil components - see the comment in `main.ts` for why this order is load-bearing.

## Running

```bash
pnpm dev
pnpm test
pnpm build
```
