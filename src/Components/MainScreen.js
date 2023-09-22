import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../State';
import { bindActionCreators } from 'react-redux'
import './MainScreen.css';
// import Modal from './Modal';
import { useHistory } from 'react-router-dom';

export default function MainScreen() {
    const history = useHistory();

    // const { allContacts, usContacts } = bindActionCreators(
    //     actionCreators,
    //     useDispatch()
    // )

    const [modalType, setmodalType] = useState('')

    const handleButtonClick = (type) => {

        // type === 'modalA' ? allContacts(true) : usContacts(true)

        localStorage.setItem('modalType', type)
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