import axios from "axios";

const BASE_URL = "https://69666c8af6de16bde44d5d0a.mockapi.io/contacts/contacts";

export const fetchContactsAPI = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export const addContactAPI = async (contact) => {
  const res = await axios.post(BASE_URL, contact);
  return res.data;
}

export const updateContactAPI = async (contact) => {
  const res = await axios.put(`${BASE_URL}/${contact.id}`, contact);
  return res.data;
}

export const deleteContactAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data
}