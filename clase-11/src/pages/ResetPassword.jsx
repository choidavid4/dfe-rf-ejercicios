import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import firebaseApp from "../firebase";

export default function ResetPassword() {
	const [searchParams] = useSearchParams();
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const firebaseAuth = getAuth(firebaseApp);
	const oobCode = searchParams.get("oobCode");

	useEffect(() => {
		if (!oobCode) {
			navigate("/login");
		}
	}, [oobCode]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		if (formData.password !== formData.confirmPassword) {
			setError("Las contraseñas no coinciden");
			setLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			setError("La contraseña debe tener al menos 6 caracteres");
			setLoading(false);
			return;
		}

		try {
			await confirmPasswordReset(firebaseAuth, oobCode, formData.password);
			setSuccess(true);
		} catch (error) {
			console.error("Error resetting password:", error);
			setError("Error al restablecer la contraseña. El enlace puede haber expirado.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	if (success) {
		return (
			<div className="auth-component">
				<h2>Contraseña restablecida</h2>
				<p>Tu contraseña ha sido actualizada exitosamente.</p>
				<Link to="/login">
					<button>Ir al inicio de sesión</button>
				</Link>
			</div>
		);
	}

	return (
		<div className="auth-component">
			<h2>Restablecer contraseña</h2>
			<form onSubmit={handleSubmit} className="auth-container__form">
				<input
					type="password"
					placeholder="Nueva contraseña"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
					minLength={6}
				/>
				<input
					type="password"
					placeholder="Confirmar nueva contraseña"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleChange}
					required
					minLength={6}
				/>
				<button type="submit" disabled={loading}>
					{loading ? "Restableciendo..." : "Restablecer contraseña"}
				</button>
			</form>
			{loading && <p>Restableciendo contraseña...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			<p>
				<Link to="/login">Volver al inicio de sesión</Link>
			</p>
		</div>
	);
}
