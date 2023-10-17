import axios from "axios";

axios.defaults.baseURL = "https://the-shop2-0-d8de1f67b769.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

/* axios intercepters catches api-user-response/request infos  */
// export const axiosReq = axios.create();
// export const axiosRes = axios.create();