// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
//esta sera mi nueva pagina principal
import { ContactList } from "./pages/ContactList"; 
// componente para crear/editar contactos
import { AddContact } from "./pages/AddContact";   

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            {/* Página principal: lista de contactos */}
            <Route path="/" element={<ContactList />} />

            {/* Crear nuevo contacto */}
            <Route path="/add" element={<AddContact />} />

            {/* Editar contacto existente */}
            <Route path="/edit/:id" element={<AddContact />} />
        </Route>
    )
);