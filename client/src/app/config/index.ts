"use client"
import axios from "axios";

// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https:172.18.0.33:2000';

export const BASE_URL = 'https://server-production-fa9f.up.railway.app';

export const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});
