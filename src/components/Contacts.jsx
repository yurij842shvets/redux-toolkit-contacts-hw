import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "../redux/operations/contactsOperations";
import { setFilter } from "../redux/slice/filterSlice";
import { useState, useEffect } from "react";
import {
  selectVisibleContacts,
  selectContactCount,
  selectFilter,
} from "../redux/selectors/selectors";
import { statusFilters } from "../redux/constants/constants";

export default function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);
  const filter = useSelector(selectFilter);
  const counts = useSelector(selectContactCount);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (isLoading) return <p>...Завантаження</p>;
  if (error) return <p>помилка {error}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return;
    if (editingId) {
      dispatch(
        updateContact({ id: editingId, updateContact: { name, number } }),
      );
      setEditingId(null);
    } else {
      dispatch(
        addContact({ name, number, status: statusFilters.unread, count: 0 }),
      );
    }
    setName("");
    setNumber("");
  };
  const handleEdit = (contact) => {
    setName(contact.name);
    setNumber(contact.number);
    setEditingId(contact.id);
  };

  const handleToggleRead = (c) => {
    dispatch(
      updateContact({
        id: c.id,
        updateContact: {
          ...c,
          status:
            c.status === statusFilters.read
              ? statusFilters.unread
              : statusFilters.read,
          count: c.status === statusFilters.read ? c.count : c.count + 1,
        },
      }),
    );
  };

  return (
    <>
      <div>
        <h2>Книга контактів</h2>
        <form
          action="
      
      "
          onSubmit={handleSubmit}
        >
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
          <button type="submit">{editingId ? "зберегти" : "додати"}</button>
        </form>
        <input
          placeholder="Пошук"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />

        <div>
          <p>Прочитані: {counts.read}</p>
          <p>Непрочитані: {counts.unread}</p>
        </div>

        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} — {contact.number} —{" "}
              {contact.status === statusFilters.read
                ? "прочитано"
                : "непрочитано"}
              <button onClick={() => handleEdit(contact)}>редагувати</button>
              <input
                type="checkbox"
                checked={contact.status === statusFilters.read}
                onChange={() => handleToggleRead(contact)}
              />
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
