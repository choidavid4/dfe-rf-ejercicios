import React, { Component } from "react";
import { error } from "../../firebase";
import "./FirebaseErrorBoundary.css";

class FirebaseErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			firebaseError: error,
		};
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	render() {
		// Si hay un error de Firebase en la configuración
		if (this.state.firebaseError) {
			return (
				<div className="firebase-error-container">
					<div className="firebase-error-card">
						<h2>🚨 Error de Configuración</h2>
						<p className="error-message">{this.state.firebaseError}</p>
						<div className="error-actions">
							<button onClick={() => window.location.reload()} className="retry-button">
								Reintentar
							</button>
						</div>
					</div>
				</div>
			);
		}

		// Si hay un error en tiempo de ejecución
		if (this.state.hasError) {
			return (
				<div className="firebase-error-container">
					<div className="firebase-error-card">
						<h2>⚠️ Error Inesperado</h2>
						<p className="error-message">Ha ocurrido un error inesperado en la aplicación.</p>
						<div className="error-actions">
							<button onClick={() => window.location.reload()} className="retry-button">
								Recargar Página
							</button>
							<button
								onClick={() => this.setState({ hasError: false, error: null })}
								className="retry-button secondary"
							>
								Intentar de Nuevo
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default FirebaseErrorBoundary;
