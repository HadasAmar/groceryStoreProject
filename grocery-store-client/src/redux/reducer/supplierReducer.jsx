import { produce } from 'immer'

export const customers = {
    listSuppliers: [],

    currentUser: { name: "לא מחובר" }
}

export const dataSupplierReducer = produce((state, action) => {
    switch (action.type) {
        case "ADD_CUSTOMER":
            state.listCustomers.push(action.payload);
            return; 

        case "UPDATE_USER":
            state.currentUser = action.payload;
            return; 

        case "LOAD_CUSTOMERS":
            state.listCustomers = action.payload

        default:
            break;
    }
}, suppliers);
