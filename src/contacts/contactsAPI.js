const BASE_URL = "https://695935806c3282d9f1d6e609.mockapi.io/contacts/contacts";

export const fetchContactsAPI = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addContactAPI = async (contact) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return res.json();
};

export const removeContactAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
};
