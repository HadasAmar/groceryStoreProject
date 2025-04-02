export const ADD_SUPPLIER = "ADD_SUPPLIER";
export const LOAD_SUPPLIERS = "LOAD_SUPPLIERS";

export const add_supplier = (supplier) => ({
    type: ADD_SUPPLIER,
    payload: supplier
});

export const load_suppliers = (suppliers) => ({
    type: LOAD_SUPPLIERS,
    payload: suppliers
});
