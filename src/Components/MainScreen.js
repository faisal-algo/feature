import React, { useState } from 'react';
import './MainScreen.css';
import Modal from './Modal';

export default function MainScreen() {

    const [modalType, setmodalType] = useState('')

    const handleButtonClick = (type) => {
        console.log(type);
        setmodalType(type)
    }

    const renderButtons = (
        <div className="MainScreen">
            <button type="button" className="btn btn-a"
                data-toggle="modal" data-target="#modal" onClick={() => { handleButtonClick("modalA") }}>
                Button A
            </button>


            <button type="button" class="btn btn-b"
                data-toggle="modal" data-target="#modal" onClick={() => { handleButtonClick("modalB") }}>
                Button B
            </button>
        </div>
    )

    return (
        <>

            {renderButtons}

            <Modal modalType={modalType} />

        </>
    )
}