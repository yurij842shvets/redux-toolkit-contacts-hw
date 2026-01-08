import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, addContact, deleteContact, updateContact } from "./operations/contactsOperations";
import { setFilter } from "./redux/slice/filterSlice";
import { useState, useEffect } from "react";

function App() {

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.value);
  const {list, isLoading, error} = useSelector(state => state.contacts)

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const filteredContacts = list.filter((contact) => {
        const name = (contact.name || "").toString().toLowerCase();
        const number = contact.number !== undefined && contact.number !== null ? String(contact.number) : "";
        return name.includes(filter.toLowerCase()) || number.includes(filter.toLowerCase());
      })

    if (isLoading) return <p>...Завантаження</p> 
    if (error) return <p>помилка {error}</p> 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !number) return;
    if (editingId) {
    dispatch(updateContact({id: editingId, updateContact: {name, number}}));
      setEditingId(null);
      }
    else {
    dispatch(addContact({ name, number }));
    }
    setName("");
    setNumber("");
  }; 
  const handleEdit = (contact) => {
    setName(contact.name);
    setNumber(contact.number);
    setEditingId(contact.id);
  }

  return (
    <>
      <div>
        <h2>Книга контактів</h2>
      <form action="
      
      " onSubmit={handleSubmit}>
        <input
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <input
          type="number"
          placeholder="Телефон"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">{editingId ? 'зберегти':'додати'}</button>

</form>
        <input
          placeholder="Пошук"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />

        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} — {contact.number}

              <button onClick={() => handleEdit(contact)}>
                редагувати
              </button>
              <button onClick={() => dispatch(deleteContact(contact.id))}>
                видалити
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
