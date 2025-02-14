import axios, { AxiosError } from "axios";
const baseUrl = '/api'

const saveContact = contactInfo => {
    const promise = axios.post(`${baseUrl}/person`, contactInfo)
    return promise.then((res)=> res.data)
}

const getAllContact = () => {
    const promise = axios.get(`${baseUrl}/persons`)
    return promise.then((res)=>res.data)
}

const deleteContact = (id) => {
    const deleteUrl = `${baseUrl}/person/${id}`
    const promise = axios.delete(deleteUrl)
    return promise.then((res)=> res.data)
}

const updateContact = (id, data) => {
    const updateUrl = `${baseUrl}/person/${String(id)}`
    const promise = axios.put(updateUrl, data)
    return promise.then((res)=>res.data)
}


export default {
    saveContact,
    getAllContact,
    deleteContact, 
    updateContact
}