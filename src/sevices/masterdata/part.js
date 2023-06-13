import { baseApi } from "@/plugins/axios";

const api = '/api/part';

const part = () => baseApi.get(`${api}`);
const add = (data) => baseApi.post(`${api}`, data);
const del = (id) => baseApi.delete(`${api}/${id}`);
const update = (newdata) => baseApi.post(`${api}`, newdata);

export { part, del, add, update };