import React, { useState, useEffect, useRef } from "react";
import "./MainScreen.css";
import ContactList from "./ContactList";
import { Scrollbars } from 'react-custom-scrollbars';

export default function Modal(props) {
    const [onlyEven, setOnlyEven] = useState(false);
    const [modalType, setmodalType] = useState(props.modalType)
    const [searchedID, setSearchedID] = useState('');
    const [displayCount, setDisplayCount] = useState(10);
    const scrollbarsRef = useRef();

    const handleCheckboxChange = () => {
        setOnlyEven(prevState => !prevState);
    };

    let timeout;
    const debounce = (func, delay) => {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };

    // const handleSearch = (event) => {
    //     const { value } = event.target;
    //     debounce(() => {
    //         setSearchedID(value);
    //     }, 300);
    // };

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchedID(value);
    };

    const handleCloseModal = () => {
        setmodalType('')
        setSearchedID('');
        setTimeout(() => {
            setOnlyEven(false);
        }, 500);
    }

    const handleContactClick = (contact) => {
        console.log(contact, 'contact');
    };

    const handleScroll = () => {
        const scrollY = scrollbarsRef.current.getScrollTop();
        const clientHeight = scrollbarsRef.current.getClientHeight();
        const scrollHeight = scrollbarsRef.current.getScrollHeight();

        if (scrollY + clientHeight >= scrollHeight) {
            setDisplayCount(prevCount => prevCount + 5);
        }
    }

    const handleAllcontactsClick = () => {
        console.log('handleAllcontactsClick');
        setmodalType('modalA')
    }
    const handleUScontactsClick = () => {
        console.log('handleUScontactsClick');
        setmodalType('modalB')
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="modal fade" id="modal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-dialog" style={{ maxHeight: '90vh' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                {props.modalType === 'modalA' ? 'Modal A. All Contacts' : 'Modal B. US Contacts'}
                            </h5>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-block btn-a"
                                        data-toggle="modal" data-target="#modalAllContacts"
                                        onClick={handleAllcontactsClick}
                                    >
                                        All Contacts
                                    </button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-block btn-b"
                                        onClick={handleUScontactsClick}
                                    >US Contacts</button>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by ID"
                                        aria-label="ID"
                                        aria-describedby="addon-wrapping"
                                        value={searchedID}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>

                        <Scrollbars
                            style={{ width: "100%", height: "530px" }}
                            ref={scrollbarsRef}
                            onScroll={handleScroll}
                        >
                            <ContactList
                                modalType={modalType}
                                onlyEven={onlyEven}
                                searchedID={searchedID}
                                displayCount={displayCount}
                                onContactClick={handleContactClick}
                            />
                        </Scrollbars>

                        {/* <ContactList
                            modalType={modalType}
                            onlyEven={onlyEven}
                            searchedID={searchedID}
                            onContactClick={handleContactClick}
                        /> */}

                        <div className="modal-footer d-flex justify-content-between">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheckA" checked={onlyEven} onChange={handleCheckboxChange} />
                                <label className="custom-control-label" htmlFor="customCheckA">Only even</label>
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary btn-close"
                                data-dismiss="modal"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
