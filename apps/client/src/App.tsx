import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { LoadingOverlay } from "./components/layout/loading-overlay";
import { LoadingOverlayProvider } from "./provider/loading-overlay";
import { AuthUserProvider } from "./provider/user";
import { AppRoutes } from "./routes";
import "./style/global.css";

function App() {
	return (
		<LoadingOverlayProvider>
			<LoadingOverlay />
			<BrowserRouter>
				<AuthUserProvider>
					<Suspense>
						<AppRoutes />
					</Suspense>
				</AuthUserProvider>
			</BrowserRouter>
		</LoadingOverlayProvider>
	);
}

export default App;
