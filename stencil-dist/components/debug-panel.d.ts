import type { Components, JSX } from "../../dist/types/components";

interface DebugPanel extends Components.DebugPanel, HTMLElement {}
export const DebugPanel: {
    prototype: DebugPanel;
    new (): DebugPanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
