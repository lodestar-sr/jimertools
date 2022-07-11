import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { CONFIG } from "../constants";

const http = axios.create({ baseURL: `${CONFIG.API_SERVER}/api/` });

const httpResponseHandler = (response: AxiosResponse) => {
  return response.data;
};

export class HttpService {
  static get(url: string, params: unknown = {}, headers: unknown = {}) {
    return HttpService.request("GET", url, { params, headers });
  }

  static post(url: string, body: unknown = {}, headers: unknown = {}) {
    return HttpService.request("POST", url, { data: body, headers });
  }

  static put(url: string, body: unknown = {}, headers: unknown = {}) {
    return HttpService.request("PUT", url, { data: body, headers });
  }

  static patch(url: string, body: unknown = {}, headers: unknown = {}) {
    return HttpService.request("PATCH", url, { data: body, headers });
  }

  static delete(url: string, body: unknown = {}, headers: unknown = {}) {
    return HttpService.request("DELETE", url, { data: body, headers });
  }

  static request(method: Method, url: string, options: AxiosRequestConfig) {
    const token = localStorage.getItem("token");
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    return http
      .request({
        ...options,
        method,
        url
      })
      .then(httpResponseHandler);
  }
}
