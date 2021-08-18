import jwtDecode from "jwt-decode";
import http, {apiUrl} from "./http";
import {store} from "../store";


const apiEndpoint = apiUrl + "partner/login";
export const tokenKey = "x-partner-stats-token";

export async function login(token, name) {
    const {data: jwt} = await http.post(apiEndpoint, {token, name});
    sessionStorage.setItem(tokenKey, jwt);
    http.setJwt(jwt)
    try {
        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }
}

export function loginWithJwt(jwt) {
    sessionStorage.setItem(tokenKey, jwt);
}

export function logout() {
    sessionStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        let user = (store.getState())['auth']['user'];
        if (!user) {
            const jwt = sessionStorage.getItem(tokenKey);
            user = jwtDecode(jwt);
        }
        return user;
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    return sessionStorage.getItem(tokenKey);
}