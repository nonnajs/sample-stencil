import type { Components, JSX } from "../../dist/types/components";

interface AddUserForm extends Components.AddUserForm, HTMLElement {}
export const AddUserForm: {
    prototype: AddUserForm;
    new (): AddUserForm;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
