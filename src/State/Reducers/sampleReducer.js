// This project didn't require complex state management (redux)
// Boiler Plate in form of diectory is defined here for future scaling.

const reducer = async (state, action) => {
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

}