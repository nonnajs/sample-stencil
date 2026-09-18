import type { Components, JSX } from "../../dist/types/components";

interface GreetingBanner extends Components.GreetingBanner, HTMLElement {}
export const GreetingBanner: {
    prototype: GreetingBanner;
    new (): GreetingBanner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
