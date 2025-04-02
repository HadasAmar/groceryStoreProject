
import axios from "axios"


const url = "http://localhost:8080/orders"

export const getAllOrders = () => {

    return axios.get(`${url}`)
}

export const addOrder = (item) => {

    return axios.post(`${url}/`, item);
}

export const getByUser = (userId) => {
    
    return axios.get(`${url}/getByUser/${userId}/`);
};
