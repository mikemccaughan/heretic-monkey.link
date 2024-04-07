export class Checkbox extends HTMLElement {
    #internals;
    #instanceId = -1;
    #value = "on";
    #checked = false;
    #indeterminate = false;
    #defaultChecked = false;
    #autofocus = false;
    #disabled = false;
    #name = "";
    #required = false;
    #readonly = false;
    #change = new CustomEvent('change', { bubbles: true, composed: true, cancelable: false });
    #input = new CustomEvent('input', { bubbles: true, composed: true, cancelable: false });
    #valueChange = new CustomEvent('valueChange', { bubbles: true, composed: true, cancelable: false });
    #indeterminateChange = new CustomEvent('indeterminateChange', { bubbles: true, composed: true, cancelable: true });
    get value() {
        return this.#value;
    }
    set value(value) {
        if (this.#value !== value && this.dispatchEvent(this.#valueChange)) {
            this.#value = value;
            this.#internals.setFormValue(value);
        }
    }
    get checked() {
        return this.#checked;
    }
    set checked(value) {
        this.#change = new CustomEvent('change', { bubbles: true, composed: true, cancelable: false, detail: { willBe: !!value, was: this.#checked } });
        this.#indeterminateChange = new CustomEvent('indeterminateChange', { bubbles: true, composed: true, cancelable: true, detail: { willBe: false, was: this.#indeterminate } });
        if (this.#checked !== !!value && this.dispatchEvent(this.#change) && this.dispatchEvent(this.#indeterminateChange)) {
            this.#checked = !!value;
            this.#indeterminate = false;
            this.#internals.ariaChecked = value.toString();
        }
    }
    get indeterminate() {
        return this.#indeterminate;
    }
    set indeterminate(value) {
        this.#change = new CustomEvent('change', { bubbles: true, composed: true, cancelable: false, detail: { willBe: value ? null : this.#checked, was: this.#checked } });
        this.#indeterminateChange = new CustomEvent('indeterminateChange', { bubbles: true, composed: true, cancelable: true, detail: { willBe: value, was: this.#indeterminate } });
        if (this.#indeterminate !== !!value && this.dispatchEvent(this.#change) && this.dispatchEvent(this.#indeterminateChange)) {
            this.#indeterminate = !!value;
            this.#checked = this.#indeterminate ? null : this.#checked;
        }
    }
    get defaultChecked() {
        return this.#defaultChecked;
    }
    get form() {
        return this.#internals.form;
    }
    get isContentEditable() {
        return false;
    }
    constructor() {
        super();
        this.#instanceId = window.performance ? window.performance.now() : Date.now();
        this.#internals = this.attachInternals();
        this.#internals.role = "checkbox";
        this.attachShadow({ mode: 'open', delegatesFocus: true, slotAssignment: "named" });
    }
}