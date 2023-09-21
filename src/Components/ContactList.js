import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import './MainScreen.css';

export default function ContactList(props) {
    const [contacts, setContacts] = useState([]);
    const [detailModal, setDetailModal] = useState(false);
    const [detailModalData, setDetailModalData] = useState(null);

    const [isApiFetching, setIsApiFetching] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            console.log(props.modalType);

            let params = {
                companyId: 560,
                noGroupDuplicates: 1,
                page: 1
            };

            if (props.modalType === 'modalB') {
                params.country_id = 226;
            }

            try {
                const response = await axios.get('https://api.dev.pastorsline.com/api/contacts.json', {
                    headers: {
                        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4',
                    },
                    params: params,
                });

                const contactsData = response.data.contacts;

                let filteredContacts = Object.values(contactsData);

                if (props.modalType === 'modalB') {
                    filteredContacts = filteredContacts.filter(contact => contact.country_id === 226);
                }

                if (props.onlyEven) {
                    filteredContacts = filteredContacts.filter(contact => contact.id % 2 === 0);
                }

                // Filter by searched ID
                if (props.searchedID) {
                    filteredContacts = filteredContacts.filter(contact => contact.id.toString().includes(props.searchedID));
                }

                setContacts(filteredContacts.slice(0, props.displayCount));

                setIsApiFetching(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setIsApiFetching(false);
            }

        };

        fetchData();
    }, [props.modalType, props.onlyEven, props.displayCount, props.searchedID]);

    const spinner = (
        <Spinner animation="border" role="status"></Spinner>
    )

    const handleItemClick = (contact) => {
        console.log(contact, 'contact');
        setDetailModalData(contact);
        setDetailModal(true);
    };

    const renderContactDetails = detailModalData && (
        <Modal show={detailModal} onHide={() => setDetailModal(false)}>
            <Modal.Header>
                <Modal.Title>Modal C. Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Country ID</th>
                            <th scope="col">Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{detailModalData.id}</th>
                            <td>{detailModalData.country_id}</td>
                            <td>{detailModalData.phone_number}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-close" onClick={() => setDetailModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            {isApiFetching ? (
                spinner
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Country ID</th>
                            <th scope="col">Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index} onClick={() => handleItemClick(contact)}>
                                <th scope="row">{contact.id}</th>
                                <td>{contact.country_id}</td>
                                <td>{contact.phone_number || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {renderContactDetails}
        </>
    )

}
