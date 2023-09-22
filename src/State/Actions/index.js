// This project didn't require complex state management (redux)
// Boiler Plate in form of diectory is defined here for future scaling.

export const allContacts = (status) => {
    if (status) {
        return (dispatch) => {
            dispatch({
                type: "allContacts",
                payload: status
            })
        }
    }
}

export const usContacts = (status) => {
    if (status) {
        return (dispatch) => {
            dispatch({
                type: "usContacts",
                payload: status
            })
        }
    }
}