import React, { forwardRef, useImperativeHandle, useState } from "react";

type ModalRef = {
    openModal: () => void;
};

const Modal = (props: unknown, ref: React.Ref<ModalRef>) => {
    const [modalState, setModalState] = useState(false);

    useImperativeHandle(ref, () => ({
        openModal: () => setModalState(true)
    }));

    console.log('child rendered');

    if (!modalState) return null;

    return (
        <div className="w-52 h-52 bg-blue-200 flex  flex-col justify-center items-center">
            <p>This is my modal!</p>
            <button className="bg-blue-400 border rounded p-2 w-20" onClick={() => setModalState(false)}>Close</button>
        </div>
    );
};

export default forwardRef(Modal);
