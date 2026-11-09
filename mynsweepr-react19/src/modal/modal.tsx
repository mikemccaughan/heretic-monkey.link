import React from 'react';
import './modal.css';
import ModalProps from '../models/modal';

function ModalContent(props: ModalProps) {
    return (
        <dialog id={props.id} open={props.isOpen} onClose={props.onClose} className="modal">
            <div className="modal-header">
                <h1 className="modal-title">{props.title}</h1>
                <button type='button' className="modal-close" onClick={props.onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-content">
                {props.content}
            </div>
            <div className="modal-footer">
                {props.footer}
            </div>
        </dialog>
    );
}

export default ModalContent;