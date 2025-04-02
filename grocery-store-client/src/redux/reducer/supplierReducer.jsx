import { ADD_SUPPLIER, LOAD_SUPPLIERS } from "../actions/supplierAction";

const initialState = {
    listSuppliers: []
};

const supplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SUPPLIERS:
            return { ...state, listSuppliers: action.payload };

        case ADD_SUPPLIER:
            return { ...state, listSuppliers: [...state.listSuppliers, action.payload] };

        default:
            return state;
    }
};

export default supplierReducer;  // שימי לב ל-export default
