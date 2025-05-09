//mi lista de contactos

import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const ContactList = () => {
    const { store, dispatch } = useGlobalReducer();

    const loadContacts = async () => {
        try {
            const resp = await fetch("https://playground.4geeks.com/contact/agendas/jenn-agenda/contacts");
            if (!resp.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            const data = await resp.json();
            if (Array.isArray(data.contacts)) {
                dispatch({ type: "set_contacts", payload: data.contacts });
            } else {
                dispatch({ type: "set_contacts", payload: [] });
                console.warn("Agenda no encontrada o vacía");
            }
        } catch (error) {
            console.error("Error al cargar contactos", error);
            dispatch({ type: "set_contacts", payload: [] });
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>
                    <i className="fa-solid fa-users me-2"></i> Contactos
                </h2>
                <Link to="/add">
                    <button className="btn btn-success">
                        <i className="fa-solid fa-plus"></i> Agregar Contacto
                    </button>
                </Link>
            </div>

            {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                store.contacts.map(contact => (
                    <ContactCard key={contact.id} contact={contact} />
                ))
            ) : (
                <p>No hay contactos.</p>
            )}
        </div>
    );
};
