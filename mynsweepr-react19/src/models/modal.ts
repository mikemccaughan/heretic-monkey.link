export default class ModalProps {
  id: string = '';
  isOpen?: boolean = false;
  onOpen?: () => void = () => {};
  onClose?: () => void = () => {};
  title?: string;
  content?: string;
  footer?: string;
}