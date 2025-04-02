import axios from "axios"


const url = "http://localhost:8080/categories"

export const getAllCategories = () => {

    return axios.get(`${url}`)
}

export const addCategory = (item) => {
    
    return axios.post(`${url}`, item);
}

export const deleteCategory = (id) => {
    
    return axios.delete(`${url}/${id}/`);
};

export const updateCategory = (item, id) => {

    alert("before axios");
    return axios.put(`${url}/${id}`, item);
};