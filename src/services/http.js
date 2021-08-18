import axios from "axios";
import logger from "./logService";
import {createToast} from "../utils/toasts";
import {getJwt, tokenKey} from "./user";

const toast = createToast();

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.fire({title: "An unexpected error occurred.", icon: "error"}).then(r => console.log("Toasted"));
    } else {
        logger.log(error);
        toast.fire({
            title: error.response.data.error || "An error occurred.",
            icon: "error"
        }).then(r => console.log("Toasted"));
    }

    return Promise.reject(error);
});

axios.interceptors.request.use(config => {
    config.baseURL = apiUrl;
    let token = getJwt();
    if (token) {
        config.headers[tokenKey] = token;
    }
    config.headers = {...config.headers, "Access-Control-Allow-Origin": "*"}
    return config;
}, error => Promise.reject(error));

function setJwt(jwt, key = tokenKey) {
    axios.defaults.headers['common'][key] = jwt;
}

let Http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};
export default Http;

export const apiUrl = process.env.REACT_APP_API;
