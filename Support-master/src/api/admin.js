import axios from 'axios';
import { getCookie } from '@/helpers/cookie.js';

const tokenAdmin = getCookie("token_admin");

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const requestBody = {
    method: "post",
    headers: {
        common: {
            Authorization: `Bearer ${tokenAdmin}`
        }
    },
    url: "",
    data: {}
}; // kerangkaaa

export async function loginAsAdmin(request={}) {
	return await axios({...requestBody, ...{
        method: "post",
        url: "/logins",
        data: request
    }}); 
}
