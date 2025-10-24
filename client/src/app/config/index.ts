"use client"
import axios from "axios";

// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https:172.18.0.33:2000';

export const BASE_URL = 'https://server-production-fa9f.up.railway.app';
// export const BASE_URL = 'https://172.18.0.33';

export const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});




export const categories = [
    { id: 1, label: "All" },
    { id: 2, label: "Featured" },
    { id: 3, label: "AI" },
    { id: 4, label: "Dev" },
    { id: 5, label: "Design" },
    { id: 6, label: "Productivity" },
    { id: 7, label: "Entertainment" },
    { id: 8, label: "Utility" },
];