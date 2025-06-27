import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Welcome from "./pages/Welcome.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import FirebaseErrorBoundary from "./components/FirebaseErrorBoundary/FirebaseErrorBoundary.jsx";

function App() {
	return (
		<FirebaseErrorBoundary>
			<Router>
				<div className="app">
					<main className="auth-container">
						<Routes>
							<Route path="" element={<Register />} />
							<Route path="login" element={<Login />} />
							<Route path="forgot-password" element={<ForgotPassword />} />
							<Route path="reset-password" element={<ResetPassword />} />
							<Route path="welcome" element={<Welcome />} />
							<Route path="*" element={<h1>Error 404: Página no encontrada</h1>} />
						</Routes>
					</main>
				</div>
			</Router>
		</FirebaseErrorBoundary>
	);
}

export default App;
