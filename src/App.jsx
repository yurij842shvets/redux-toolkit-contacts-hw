import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact, removeContact } from "./redux/slice/contactsSlice";
import { setFilter } from "./redux/slice/filterSlice";
import { useState } from "react";

function App() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.list);
  const filter = useSelector((state) => state.filter);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  const handleAdd = () => {
    if (!name || !phone) return;
    dispatch(addContact(name, phone));
    setName("");
    setPhone("");
  };

  return (
    <>
      <div>
        <h2>Книга контактів</h2>

        <input
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <input
          type="number"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAdd}>Додати</button>

        <input
          placeholder="Пошук"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
        <button></button>

        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} — {contact.number}
              <button onClick={() => dispatch(removeContact(contact.id))}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
