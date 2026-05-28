import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const blogsApi = {
  getAll: (params: any) => api.get("/blogs/", { params }),
  getBySlug: (slug: string) => api.get(`/blogs/${slug}`),
  create: (data: any) => api.post("/blogs/", data),
  update: (id: string, data: any) => api.put(`/blogs/${id}`, data),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

export const categoriesApi = {
  getAll: () => api.get("/categories/"),
  create: (data: any) => api.post("/categories/", data),
  update: (id: string, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

export const authApi = {
  login: (data: FormData) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  register: (data: any) => api.post("/auth/register", data),
};

export default api;
