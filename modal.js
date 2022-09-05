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
        this.element = document.createElement("dialog");
        this.element.id = this.elementId;
        this.element.innerHTML = this.html;
        this.boardElement.appendChild(this.element);
        this.isOpen = false;
        document.documentElement.addEventListener("click", (e) => this.close());
        document.documentElement.addEventListener("keypress", (e) => this.close());
    }
    close() {
        if (this.isOpen) {
            this.element.close();
            this.isOpen = false;
        }
    }
    show() {
        if (!this.isOpen) {
            let rect = this.boardElement.getBoundingClientRect();
            this.element.style.top = `${rect.top}px`;
            this.element.style.right = `${rect.left + rect.width}px`;
            this.element.style.bottom = `${window.innerHeight - rect.top - rect.height}px`;
            this.element.style.left = `${rect.left}px`;
            this.element.showModal();
            this.isOpen = true;
        }
    }
}