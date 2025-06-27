import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { SiGoogle } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../../firebase";
import styles from "./GoogleLogin.module.css";

function GoogleLogin({ setLoading, setError }) {
	const navigate = useNavigate();

	const firebaseAuth = getAuth(firebaseApp);
	const googleProvider = new GoogleAuthProvider();

	const handleGoogleLogin = () => {
		setLoading(true);
		setError("");
		signInWithPopup(firebaseAuth, googleProvider)
			.then(() => {
				navigate("/welcome");
			})
			.catch((error) => {
				console.error("Error signing in with Google:", error);
				setError("Error al iniciar sesión con Google.");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<button onClick={handleGoogleLogin} className={styles["google-login-btn"]}>
			<SiGoogle size={24} />
			Iniciar sesión con Google
		</button>
	);
}

export default GoogleLogin;
