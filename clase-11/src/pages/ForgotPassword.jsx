import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseApp from "../firebase";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		sendPasswordResetEmail(firebaseAuth, email)
			.then(() => {
				setSubmitted(true);
			})
			.catch((error) => {
				console.error("Error sending password reset email:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="auth-container">
			<h2>Recuperar contraseña</h2>
			{!submitted ? (
				<>
					<p>Ingresa tu email para recibir un enlace de recuperación</p>
					<form onSubmit={handleSubmit} className="auth-container__form">
						<input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
						<button type="submit">Enviar enlace de recuperación</button>
					</form>
					{loading && <p>Procesando...</p>}
				</>
			) : (
				<div>
					<p>¡Enlace enviado! Revisa tu email para continuar.</p>
				</div>
			)}
			<p>
				<Link to="/login">Volver al login</Link>
			</p>
		</div>
	);
}

export default ForgotPassword;
