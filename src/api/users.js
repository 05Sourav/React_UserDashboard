import axios from 'axios';


const client = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' });


export const fetchUsers = async () => {
const res = await client.get('/users');
return res.data;
};


export const fetchUserById = async (id) => {
const res = await client.get(`/users/${id}`);
return res.data;
};