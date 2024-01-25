import axios from "axios";
const httpapi = axios.create({
    baseURL: 'http://172.16.8.97/nguyenhoanvu/public/api',
    timeout: 7000,
    headers: { 'X-Custom-Header': 'foobar' }
});
export default httpapi;
