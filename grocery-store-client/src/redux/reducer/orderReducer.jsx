// import { ADD_ORDER, LOAD_ORDERS } from "../actions/orderAction";

const initialState = {
    listOrders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOAD_ORDERS:
        //     return { ...state, listOrders: action.payload };

        // case ADD_ORDER:
        //     return { ...state, listOrders: [...state.listOrders, action.payload] };

        default:
            return state;
    }
};

export default orderReducer;
