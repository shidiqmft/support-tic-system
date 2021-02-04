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

export async function postAsUser(request = {}) {
    return await axios({
      ...requestBody,
      ...{
        method: "post",
        url: "/register",
        data: request,
      },
    });
  }
  
//   export async function updateUser(id, data) {
//     return await axios({
//       ...requestBody,
//       ...{
//         method: "put",
//         url: "/register/" + id,
//         data,
//       },
//     });
//   }
  
// export async function getUser(email = "", is_deleted = false) {
//     return await axios({
//       ...requestBody,
//       ...{
//         method: "get",
//         url:
//           "/tickets?email=" + email + "&is_deleted=" + (is_deleted ? "true" : ""),
//       },
//     });
//   }