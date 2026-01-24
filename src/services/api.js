import axios from "axios";

//  Base MockAPI URL
const BASE_URL = "https://697392aeb5f46f8b5827b519.mockapi.io";

// Get all books
export const getBooks = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

// Get book by ID
export const getBook = async (id) => {
  const res = await axios.get(`${BASE_URL}/books/${id}`);
  return res.data;
};

// Add new book
export const addBook = async (book) => {
  return axios.post(`${BASE_URL}/books`, book);
};

// Update book
export const updateBook = async (id, book) => {
  return axios.put(`${BASE_URL}/books/${id}`, book);
};

// Delete book
export const deleteBook = async (id) => {
  return axios.delete(`${BASE_URL}/books/${id}`);
};

// Get all users
export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

// Add new user (Sign Up)
export const addUser = async (user) => {
  return axios.post(`${BASE_URL}/users`, user);
};
