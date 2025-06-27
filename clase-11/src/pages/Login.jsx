import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../firebase";
import GoogleLogin from "../components/GoogleLogin/GoogleLogin";

function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		setError("");
		signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password)
			.then(() => {
				navigate("/welcome");
			})
			.catch((error) => {
				console.error("Error signing in:", error);
				setError("Error al iniciar sesión. Revisa tus credenciales.");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="auth-component">
			<h2>Iniciar sesión</h2>
			<form onSubmit={handleSubmit} className="auth-container__form">
				<input type="email" placeholder="Email" required name="email" value={formData.email} onChange={handleChange} />
				<input
					type="password"
					placeholder="Contraseña"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type="submit">Iniciar sesión</button>
			</form>
			<div className="auth-divider">
				<span>ó</span>
			</div>
			<GoogleLogin setLoading={setLoading} setError={setError} />
			{loading && <p>Ingresando...</p>}
			{error && <p className="error-message">{error}</p>}
			<p>
				¿No tenés una cuenta? <Link to="/">Registrarse</Link>
			</p>
			<p>
				<Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
			</p>
		</div>
	);
}

export default Login;
