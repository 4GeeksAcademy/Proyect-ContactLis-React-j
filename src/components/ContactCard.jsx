// //mostrara solo un contacto toda su info

import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ModalConfirm } from "./ModalConfirm";

export const ContactCard = ({ contact }) => {
  const { store, dispatch } = useGlobalReducer();
  const modalId = `modal-delete-${contact.id}`; // ID único del modal

  const deleteContact = async (id) => {
    try {
      const resp = await fetch(`https://playground.4geeks.com/contact/agendas/jenn-agenda/contacts/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Error en la respuesta de la API");

      const updatedContacts = store.contacts.filter(c => c.id !== id);
      dispatch({ type: "set_contacts", payload: updatedContacts });
    } catch (error) {
      console.error("Error al eliminar contacto", error);
    }
  };

  const confirmDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <>
      <div className="card mb-3 shadow-sm">
        <div className="card-body d-flex align-items-center">
          <img
            src={`https://i.pravatar.cc/100?u=${contact.id}`}
            alt="avatar"
            className="rounded-circle me-3"
            width="60"
            height="60"
          />
          <div className="flex-grow-1">
            <h5 className="card-title mb-1">{contact.name}</h5>
            <p className="mb-0"><i className="fa-solid fa-envelope me-2"></i>{contact.email}</p>
            <p className="mb-0"><i className="fa-solid fa-phone me-2"></i>{contact.phone}</p>
            <p className="mb-0"><i className="fa-solid fa-location-dot me-2"></i>{contact.address}</p>
          </div>
          <div className="ms-3 d-flex flex-column">
            <Link to={`/edit/${contact.id}`} className="btn btn-outline-primary btn-sm mb-2">
              <i className="fa-solid fa-pen"></i>
            </Link>
            <button className="btn btn-outline-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target={`#${modalId}`}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <ModalConfirm
        id={modalId}
        message={`¿Estás seguro de eliminar a ${contact.name}?`}
        onConfirm={confirmDelete}
      />
    </>
  );
};