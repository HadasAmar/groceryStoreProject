import { combineReducers, createStore } from "redux";
import { dataOrderReducer } from "./reducer/orderReducer";
import { dataSupplierReducer } from "./reducer/supplierReducer";


const reducer = combineReducers({
   dataOrderReducer,
   dataSupplierReducer
});

export const mystore = createStore(reducer);
window.store = mystore;