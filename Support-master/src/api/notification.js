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

export async function getByUserId() {
  const userId = localStorage.getItem("userId");
  return await axios({
    ...requestBody,
    ...{
      method: "get",
      url: "/notifications/get-by-user-id/" + userId,
    },
  });
}
