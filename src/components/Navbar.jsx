import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation(); // Saber en qué ruta estoy

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
			<div className="container">
				{/* este texto cambia según la ruta */}
				<Link to="/" className="navbar-brand fw-bold text-primary">
					<i class="fa-regular fa-address-book"></i>  {location.pathname === "/add" ? "Ir a mi agenda" : "Mi Agenda"}
				</Link>

			</div>
		</nav>
	);
};