/**
 * Provides a class that wraps around the functionality provided by the <dialog>
 * HTML element.
 */
export default class Modal {
    /**
     * Creates an instance of the Modal class.
     * @param {string} id The id of the dialog element
     * @param {string} html The HTML of the dialog
     * @param {HTMLElement} board The HTMLElement that contains the board.
     */
    constructor(id, html, board) {
        this.elementId = id;
        this.html = html;
        this.boardElement = board;
        // eslint-disable-next-line no-undef
        this.element = document.createElement("dialog");
        this.element.id = this.elementId;
        this.element.innerHTML = this.html;
        this.boardElement.appendChild(this.element);
        this.isOpen = false;
        // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
        document.documentElement.addEventListener("click", (e) => this.close());
        // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
        document.documentElement.addEventListener("keypress", (e) => this.close());
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
            let rect = this.boardElement.getBoundingClientRect();
            this.element.style.top = `${rect.top}px`;
            this.element.style.right = `${rect.left + rect.width}px`;
            // eslint-disable-next-line no-undef
            this.element.style.bottom = `${window.innerHeight - rect.top - rect.height}px`;
            this.element.style.left = `${rect.left}px`;
            this.element.showModal();
            this.isOpen = true;
        }
    }
}