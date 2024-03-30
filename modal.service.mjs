import Modal from "./modal.mjs";

export default class ModalService {
    #modals;
    static #instanceCount = 0;
    constructor() {
        if (ModalService.#instanceCount === 0) {
            this.#modals = {};
            ModalService.#instanceCount = 1;
        } else {
            throw new Error('ModalService is meant to be used as a singleton object; use the static create() method');
        }
    }
    create() {
        if (ModalService.#instanceCount === 0) {
            return new ModalService();
        } else {
            throw new Error('ModalService is meant to be used as a singleton object; there is already one instance of this class created');
        }
    }
    /**
     * Registers a Modal (or creates one to) with the service.
     *
     * @param {Modal|string} modalOrId The Modal, or an id for one
     * @param {string|undefined} html The HTML for the modal's content (or nothing, if a Modal is provided)
     * @param {HTMLElement|undefined} container The containing element (or nothing, if a Modal is provided)
     */
    register(modalOrId, html, container) {
        let registeredModal;
        if (typeof modalOrId === 'object' && typeof html === 'undefined' && typeof container === 'undefined') {
            registeredModal = this.#modals[modalOrId.id] = modalOrId;
        } else if (typeof modalOrId === 'string' && typeof html === 'string' && typeof container === 'object') {
            registeredModal = this.#modals[modalOrId] = new Modal(modalOrId, html, container);
        }
        
        return registeredModal;
    }
    /**
     * Registers (if not already and opens) a Modal (or creates one to) with the service.
     *
     * @param {Modal|string} modalOrId The Modal, or an id for one
     * @param {string|undefined} html The HTML for the modal's content (or nothing, if a Modal is provided)
     * @param {HTMLElement|undefined} container The containing element (or nothing, if a Modal is provided)
     */
    openModal(modalOrId, html, container) {
        let modalToOpen;
        if (typeof modalOrId === 'object') {
            modalToOpen = this.#modals[modalOrId.id];
            if (!modalToOpen) {
                modalToOpen = this.register(modalOrId, undefined, undefined);
            }
        }
        if (!modalToOpen && typeof modalOrId === 'string') {
            modalToOpen = this.register(modalOrId, html, container);
        }
        if (modalToOpen) {
            modalToOpen.show();
        }
    }
    /**
     * Closes an open Modal registered with the service.
     *
     * @param {Modal|string} modalOrId The Modal, or an id for one
     */
    closeModal(modalOrId) {
        let id;
        if (typeof modalOrId === 'object') {
            id = modalOrId.id;
        } else if (typeof modalOrId === 'string') {
            id = modalOrId;
        }
        if (this.#modals[id]?.open) {
            this.#modals[id].close();
        }
    }
}