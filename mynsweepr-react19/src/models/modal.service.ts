import ModalProps from "./modal";

export class ModalService {
    private static instance: ModalService;
    public static getInstance(): ModalService {
        if (!ModalService.instance) {
            ModalService.instance = new ModalService();
        }
        return ModalService.instance;
    }
    private constructor() { this.modals = new Map<string, ModalProps>(); }
    public modals: Map<string, ModalProps>;
    public registerModal(modal: ModalProps): void {
        this.modals.set(modal.id, modal);
    }
    public unregisterModal(modalId: string): void {
        this.modals.delete(modalId);
    }
    public openModal(modalId: string): void {
        const modal = this.modals.get(modalId);
        Array.from(this.modals.values())
            .filter(m => m.id !== modalId && m.isOpen)
            .forEach(m => {
                m.isOpen = false;
                m.onClose?.();
            });
        if (modal && !modal.isOpen) {
            modal.isOpen = true;
            modal.onOpen?.();
        }
    }
    public closeModal(modalId: string): void {
        const modal = this.modals.get(modalId);
        if (modal && modal.isOpen) {
            modal.isOpen = false;
            modal.onClose?.();
        }
    }
}