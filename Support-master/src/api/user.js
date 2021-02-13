import axios from "axios";
import { getCookie } from "@/helpers/cookie.js";

const tokenUser = getCookie("token_user");

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const requestBody = {
  method: "post",
  headers: {
    common: {
      Authorization: `Bearer ${tokenUser}`,
    },
  },
  url: "",
  data: {},
}; // kerangkaaa

export async function loginAsUser(request = {}) {
  return await axios({
    ...requestBody,
    ...{
      method: "post",
      url: "/login",
      data: request,
    },
  });
}

export async function getTickets(email = "", is_deleted = false) {
  return await axios({
    ...requestBody,
    ...{
      method: "get",
      url:
        "/tickets?email=" + email + "&is_deleted=" + (is_deleted ? "true" : ""),
    },
  });
}

export async function postTicket(data) {
  return await axios({
    ...requestBody,
    ...{
      method: "post",
      url: "/tickets",
      data,
    },
  });
}

export async function updateTicket(id, data) {
  return await axios({
    ...requestBody,
    ...{
      method: "put",
      url: "/tickets/" + id,
      data,
    },
  });
}

export async function getUsers() {
  return await axios({
    ...requestBody,
    ...{
      method: "get",
      url: "/users",
    },
  });
}
