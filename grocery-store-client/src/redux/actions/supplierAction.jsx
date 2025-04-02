export const load_customers=(item)=>{
    return {type:"LOAD_CUSTOMERS",payload:item}
}

export const add_customer=(item)=>{
    return {type:"ADD_CUSTOMER",payload:item}
}

export const update_user=(item)=>{
    return {type:"UPDATE_USER",payload:item}
}