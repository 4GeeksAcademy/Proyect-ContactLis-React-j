//formulario para crear y editar la lista de contactos

// src/pages/AddContact.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams(); // Si existe, estamos editando

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });


  const addContact = async (contact) => {
    try {
      const resp = await fetch("https://playground.4geeks.com/contact/agendas/jenn-agenda/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!resp.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await resp.json();
      dispatch({ type: "set_contacts", payload: [...store.contacts, data] });
    } catch (error) {
      console.error("Error al agregar contacto", error);
    }
  }
  const updateContact = async (id, contact) => {
    try {
      const resp = await fetch(`https://playground.4geeks.com/contact/agendas/jenn-agenda/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!resp.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await resp.json();
      const updatedContacts = store.contacts.map(c => c.id === id ? data : c);
      dispatch({ type: "set_contacts", payload: updatedContacts });
    } catch (error) {
      console.error("Error al actualizar contacto", error);
    }
  }

  // Si estamos editando, buscar el contacto existente
  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const existing = store.contacts.find(c => c.id === parseInt(id));
      if (existing) setFormData(existing);
    }
  }, [id, store.contacts]);

  // Maneja el cambio de campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateContact(id, formData);
    } else {
      addContact(formData);
    }
    navigate("/"); // Volver a la lista
  };

  return (
    <div className="container mt-4">
      <h2>
        <i className="fa-solid fa-user me-2"></i> {id ? "Editar Contacto" : "Agregar Contacto"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre Completo</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Actualizar" : "Guardar"}
        </button>
        <button className="btn btn-secondary ms-2" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};
