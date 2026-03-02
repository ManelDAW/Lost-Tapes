import axios from 'axios'

const SERVER = 'http://localhost:3000'

async function getDBBooks() {
    return axios.get(`${SERVER}/books`)
}

async function getDBEmployees() {
    return axios.get(`${SERVER}/empleados`)
}

async function getDBClients(id) {
    return axios.get(`${SERVER}/clientes?gestor=`+id)
}

async function getDBClient(id) {
    return axios.get(`${SERVER}/clientes/`+id)
}

async function deleteDBClients(itemId) {
    return axios.delete(`${SERVER}/clients/${itemId}`)
}

async function changeDBClient(id,client) {
    return axios.put(`${SERVER}/clientes/${id}`, client)
}

async function createDBClient(id,client) {
    return axios.post(`${SERVER}/clientes/`, client)
}

async function getDBModules() {
    return axios.get(`${SERVER}/modules`)
}

async function getDBItem(bookId) {
    return axios.get(SERVER + '/books/' + bookId);
}

async function getDBItemById(itemId) {
    return axios.get(`${SERVER}/todos/${itemId}`)
}

async function addDBItem(newItem) {
    return axios.post(`${SERVER}/books`, newItem)
}

async function removeDBItem(itemId) {
    return axios.delete(`${SERVER}/books/${itemId}`)
}

async function changeDBItem(item) {
    return axios.put(`${SERVER}/books/${item.id}`, item)
}

async function changeDBItemDone(item) {
    return item.done = !item.done
}


export {
    getDBEmployees,
    getDBClients,
    deleteDBClients,
    changeDBClient,
    createDBClient,
    getDBClient,
}