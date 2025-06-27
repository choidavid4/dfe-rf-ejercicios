import { initializeApp } from "firebase/app";

// Reemplazar con nuestra configuración de Firebase
const firebaseConfig = {
	apiKey: "AIzaSyBnloejO1o-3CusXvWIR3LNhvRM2ucYcLM",
	authDomain: "auth-test-47d49.firebaseapp.com",
	projectId: "auth-test-47d49",
	storageBucket: "auth-test-47d49.firebasestorage.app",
	messagingSenderId: "986485670621",
	appId: "1:986485670621:web:d0e57d4211b95dfea21134",
	measurementId: "G-EFQ2P596RR",
};

// Función para inicializar Firebase con manejo de errores
const initializeFirebase = () => {
	try {
		if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
			throw new Error("Configuración de Firebase incompleta. Por favor, verifica las credenciales.");
		}

		const app = initializeApp(firebaseConfig);
		return { app, error: null };
	} catch (error) {
		let errorMessage = "Error al conectar con Firebase";

		if (error.code === "app/duplicate-app") {
			errorMessage = "Firebase ya está inicializado";
		} else if (error.code === "app/invalid-app-argument") {
			errorMessage = "Configuración de Firebase inválida";
		} else if (error.message.includes("Configuración de Firebase incompleta")) {
			errorMessage = error.message;
		} else if (error.code === "app/no-app") {
			errorMessage = "No se pudo inicializar la aplicación de Firebase";
		}

		return { app: null, error: errorMessage };
	}
};

const { app, error } = initializeFirebase();

export { app, error };
export default app;
