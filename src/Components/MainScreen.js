import React, { useState } from 'react';
import './MainScreen.css';
// import Modal from './Modal';
import { useHistory } from 'react-router-dom';

export default function MainScreen() {
    const history = useHistory();

    const [modalType, setmodalType] = useState('')

    const handleButtonClick = (type) => {
        localStorage.setItem('modalType', type)
        console.log(type);
        setmodalType(type)
        history.push(`/${type}`);
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

            {/* <Modal modalType={modalType} /> */}

        </>
    )
}