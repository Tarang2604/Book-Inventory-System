import axios from "axios";

const API_URL = "https://697392aeb5f46f8b5827b519.mockapi.io/books";

export const getBooks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getBook = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const addBook = async (book) => {
  const res = await axios.post(API_URL, book);
  return res.data;
};

export const updateBook = async (id, book) => {
  const res = await axios.put(`${API_URL}/${id}`, book);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

