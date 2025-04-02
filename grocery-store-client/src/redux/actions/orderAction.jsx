export const add_Item = (item) => {
    return {type: "ADD_ITEM", payload: item};
};

export const remove_Item = (itemId) => {
    return { type: "REMOVE_ITEM",payload: itemId };
};

export const clear_cart = () => {
    return {type: "CLEAR_CART"};
};

export const load_orders=(orders)=>{
    return {type:"LOAD_ORDERS",payload:orders}
}


export const add_order = (item) => {
    return {type: "ADD_ORDER", payload: item};
};

export const set_amount=(amount, id)=>{
    debugger
    return {type:"SET_AMOUNT",payload:{amount, id}}
}