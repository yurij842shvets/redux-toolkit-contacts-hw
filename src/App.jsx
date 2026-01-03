import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, removeContacts, fetchContacts} from './redux/slice/contactsSlice';
import { setFilter } from "./redux/slice/filterSlice";
import { useState, useEffect } from "react";

function App() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts?.list || []);
  const filter = useSelector((state) => state.filter?.value ?? "");

  const normalizedFilter = (typeof filter === "string" ? filter : String(filter)).toLowerCase();

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter((contact) => {
        const name = (contact.name || "").toString().toLowerCase();
        const number = contact.number !== undefined && contact.number !== null ? String(contact.number) : "";
        return name.includes(normalizedFilter) || number.includes(normalizedFilter);
      })
    : [];

  const handleAdd = () => {
    if (!name || !phone) return;
    dispatch(addContacts({name, number: phone}));
    setName("");
    setPhone("");
  };

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

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

        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} — {contact.number}
              <button onClick={() => dispatch(removeContacts(contact.id))}>
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
