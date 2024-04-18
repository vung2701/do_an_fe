import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_URL_LINKS;


const _createAxios = (url, token?: string | null, headers): AxiosInstance => {
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    const sessionToken = localStorage.getItem('token');
    if (sessionToken) {
      headers.Authorization = `Bearer ${sessionToken}`;
    }
  }

  const instance = axios.create({
    baseURL: API_URL,
    headers
  });

  return instance;
}

const createAxios = (token?: string | null): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  return _createAxios(API_URL, token, headers)
};


const uploadAxios = (token?: string | null): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': 'multipart/form-data',
  };
  return _createAxios(API_URL, token, headers)
};

export { createAxios, uploadAxios };