import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase";
import GoogleLogin from "../components/GoogleLogin/GoogleLogin";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const firebaseAuth = getAuth(firebaseApp);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				navigate("/welcome");
			}
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Completar con el método de Firebase para registrar un nuevo usuario.
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="auth-component">
			<h2>Registrarse</h2>
			<form onSubmit={handleSubmit} className="auth-container__form">
				<input type="text" placeholder="Nombre" required name="name" value={formData.name} onChange={handleChange} />
				<input type="text" placeholder="Email" required name="email" value={formData.email} onChange={handleChange} />
				<input
					type="password"
					placeholder="Contraseña"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type="submit">Registrarse</button>
			</form>
			<div className="auth-divider">
				<span>ó</span>
			</div>
			<GoogleLogin setLoading={setLoading} setError={setError} />

			{loading && <p>Cargando...</p>}
			{error && <p className="error-message">{error}</p>}
			<p>
				¿Ya tenés una cuenta? <Link to="/login">Iniciar sesión</Link>
			</p>
		</div>
	);
}

export default Register;
