import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../../firebase";
import { useNavigate } from "react-router-dom";
import { MOVIES } from "../../data/movies";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./Welcome.module.css";
import { motion, AnimatePresence } from "framer-motion";

function Welcome() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
	});
	const [favoriteMovies, setFavoriteMovies] = useState([]);

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

	const handleFavorite = (movie) => {
		if (favoriteMovies.includes(movie)) {
			setFavoriteMovies(favoriteMovies.filter((m) => m.id !== movie.id));
		} else {
			setFavoriteMovies([...favoriteMovies, movie]);
		}
	};

	return (
		<div>
			<div className="auth-container" style={{ margin: "auto" }}>
				<h2>Bienvenido</h2>
				<p>Bienvenido a la app: {userData.email}</p>
				<button onClick={handleSignOut}>Cerrar sesión</button>
				{loading && <p>Cerrando sesión...</p>}
			</div>
			<hr />
			<h2>Mis películas favoritas</h2>
			<div className={styles["movies-container"]}>
				<AnimatePresence>
					{favoriteMovies.map((movie) => (
						<motion.div
							key={movie.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -30 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}
						>
							<MovieCard key={movie.id} movie={movie} isFavorite={true} onFavorite={handleFavorite} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			<h2>Películas</h2>
			<div className={styles["movies-container"]}>
				{MOVIES.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						onFavorite={handleFavorite}
						isFavorite={favoriteMovies.includes(movie)}
					/>
				))}
			</div>
		</div>
	);
}

export default Welcome;
