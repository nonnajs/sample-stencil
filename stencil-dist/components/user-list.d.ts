import type { Components, JSX } from "../../dist/types/components";

interface UserList extends Components.UserList, HTMLElement {}
export const UserList: {
    prototype: UserList;
    new (): UserList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
