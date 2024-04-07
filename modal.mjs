/**
 * Provides a class that wraps around the functionality provided by the <dialog>
 * HTML element.
 */
export default class Modal {
    /**
     * Creates an instance of the Modal class.
     * @param {string} id The id of the dialog element
     * @param {string} html The HTML of the dialog
     * @param {HTMLElement} container The HTMLElement that will contain the modal.
     */
    constructor(id, html, container) {
        this.elementId = id;
        this.html = html;
        this.containerElement = container;
        // eslint-disable-next-line no-undef
        this.element = document.createElement("dialog");
        this.element.id = this.elementId;
        this.element.innerHTML = this.html;
        this.containerElement.appendChild(this.element);
        this.isOpen = false;
        // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
        document.documentElement.addEventListener("click", (e) => this.close());
        // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
        document.documentElement.addEventListener("keypress", (e) => this.close());
    }
    /**
     * Gets the id of the dialog element.
     */
    get id() {
        return this.elementId;
    }
    /**
     * Gets an indication of whether the dialog is open or not.
     */
    get open() {
        return this.isOpen;
    }
    /**
     * Closes the modal if it is currently open.
     */
    close() {
        if (this.isOpen) {
            this.element.close();
            this.isOpen = false;
        }
    }
    /**
     * Shows the modal if it is currently not open.
     */
    show() {
        if (!this.isOpen) {
            this.element.showModal();
            this.isOpen = true;
        }
    }
}