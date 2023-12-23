import { useRoutes } from "react-router-dom";
import { AuthRoutes } from "./features/auth/routes";

const routes = [{ path: "/*", element: <AuthRoutes /> }];

export const AppRoutes = () => {
	const element = useRoutes([...routes]);

	return <>{element}</>;
};
