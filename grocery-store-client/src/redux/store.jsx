import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducer/orderReducer";  
import supplierReducer from "./reducer/supplierReducer";  


export const mystore = configureStore({
   reducer: {
       dataOrder: orderReducer,
       dataSupplier: supplierReducer
   }
});

console.log("Redux Store:", mystore.getState());


