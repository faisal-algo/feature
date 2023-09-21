import React, { useEffect, useState } from "react";
import contactData from '../contactData.json'; // static data
import { Button, Modal } from "react-bootstrap";
import './MainScreen.css'

export default function ContactList(props) {
    const [contacts, setContacts] = useState([]);
    const [detailModal, setDetailModal] = useState(false);
    const [detailModalData, setDetailModalData] = useState(null);

    useEffect(() => {
        let filteredContacts = [];
        if (props.modalType === 'modalA') {
            filteredContacts = contactData.contacts_ids.map(id => contactData.contacts[id]);
        } else if (props.modalType === 'modalB') {
            filteredContacts = contactData.contacts_ids
                .filter(id => contactData.contacts[id].country_id === 226)
                .map(id => contactData.contacts[id]);
        }
        if (props.onlyEven) {
            filteredContacts = filteredContacts.filter(contact => contact.id % 2 === 0);
        }
        setContacts(filteredContacts.slice(0, props.displayCount));
    }, [props.modalType, props.onlyEven, props.displayCount]);

    useEffect(() => {
        if (props.searchedID) {
            const partialMatch = props.searchedID.toString();
            const filteredContacts = contactData.contacts_ids
                .filter(id => id.toString().includes(partialMatch))
                .map(id => contactData.contacts[id]);

            setContacts(filteredContacts.slice(0, props.displayCount));
        }
    }, [props.searchedID, props.displayCount]);

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
            {renderContactDetails}
        </>
    )
}
