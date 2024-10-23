"use client"

import { useRef } from 'react';
import Modal from './modal';

type ModalRef = {
  openModal: () => void;
};

export default function UseImperativeHandleComponent() {
  const modalRef = useRef<ModalRef>(null);

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  console.log('parent rendered');

  return (
    <main className="flex flex-col items-center">
      <p>Parent Component</p>
      <Modal ref={modalRef} />
      <button className="bg-green-400 border rounded p-2 w-20" onClick={handleOpenModal}>Open</button>
    </main>
  );
}
