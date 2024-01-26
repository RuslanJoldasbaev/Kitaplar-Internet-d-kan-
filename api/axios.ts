import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders }  from "axios"
export const $host = axios.create({
    baseURL: "http://bookie.abbc.uz"
});

export const $userhost = axios.create({
    baseURL: "http://bookie.abbc.uz"
})

$userhost.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    (config.headers as AxiosRequestHeaders).authorization = `Bearer ${window.localStorage.getItem("token")}`;
    return config;
});