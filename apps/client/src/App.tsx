import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

function App() {
	return (
		<BrowserRouter>
			<Suspense>
				<AppRoutes />
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
