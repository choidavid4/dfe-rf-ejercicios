import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../firebase";
import { useNavigate } from "react-router-dom";

function Welcome() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
	});

	const firebaseAuth = getAuth(firebaseApp);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				setUserData({
					name: user.displayName,
					email: user.email,
				});
			} else {
				navigate("/login");
			}
		});
	}, []);

	const handleSignOut = () => {
		setLoading(true);
		signOut(firebaseAuth)
			.then(() => {
				navigate("/login");
			})
			.catch((error) => {
				console.error("Error signing out:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div>
			<h2>Bienvenido</h2>
			<p>Bienvenido a la app: {userData.email}</p>
			<button onClick={handleSignOut}>Cerrar sesión</button>
			{loading && <p>Cerrando sesión...</p>}
		</div>
	);
}

export default Welcome;
