import { useRoutes } from "react-router-dom";
import { AuthRoutes } from "./features/auth/routes";
import { MeRoutes } from "./features/me/routes";

const routes = [
	{ path: "/auth/*", element: <AuthRoutes basePath="/auth" /> },
	{
		path: "/*",
		element: <MeRoutes basePath="/" />,
	},
];

export const AppRoutes = () => {
	const element = useRoutes([...routes]);

	return <>{element}</>;
};
