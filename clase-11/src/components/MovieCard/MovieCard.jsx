import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./MovieCard.module.css";

export default function MovieCard({ movie, onFavorite, isFavorite }) {
	const handleFavorite = () => {
		onFavorite(movie);
	};

	return (
		<div className={styles["movie-card"]} onClick={handleFavorite}>
			<img src={movie.posterURL} alt={movie.title} />
			<div>
				<h3>{movie.title}</h3>
				<p>{movie.description}</p>
				<button onClick={handleFavorite}>
					{isFavorite ? <FaHeart size={24} color="#c42626" /> : <FaRegHeart size={24} color="#c42626" />}
				</button>
			</div>
		</div>
	);
}
