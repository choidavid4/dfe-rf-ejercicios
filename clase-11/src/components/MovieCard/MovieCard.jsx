import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./MovieCard.module.css";
import { motion } from "framer-motion";

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
					<motion.span
						key={isFavorite ? "filled" : "outline"}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1.2, opacity: 1 }}
						transition={{ type: "spring", stiffness: 300, damping: 10 }}
						whileTap={{ scale: 1.4 }}
						style={{ display: "inline-block" }}
					>
						{isFavorite ? <FaHeart size={24} color="#c42626" /> : <FaRegHeart size={24} color="#c42626" />}
					</motion.span>
				</button>
			</div>
		</div>
	);
}
