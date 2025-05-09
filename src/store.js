// Estado inicial de la app (lista vacía al comienzo)
export const initialStore = () => ({
  contacts: []
});

// El reducer recibe acciones y actualiza el estado
const storeReducer = (store, action= {}) => {
  switch (action.type) {
    case "set_contacts":
      return { ...store, contacts: action.payload };
    default:
      throw Error('Unknown action.');
  }
};

export const getActions = (dispatch) => {
  const actions = {
    

    addContact: async (contact) => {
      try {
        await fetch("https://playground.4geeks.com/apis/fake/contact/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...contact, agenda_slug: "jenn-agenda" }),
        });
        await actions.loadContacts();
      } catch (error) {
        console.error("Error al agregar contacto", error);
      }
    },

  
    deleteContact: async (id) => {
      try {
        await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
          method: "DELETE",
        });
        await actions.loadContacts();
      } catch (error) {
        console.error("Error al eliminar contacto", error);
      }
    },
  };

  return actions;
};

export default storeReducer;