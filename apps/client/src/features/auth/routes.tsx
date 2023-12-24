import { withUnauthGate } from "@/lib/router";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

export const ROUTE_LOGIN = "/auth/login";
export const ROUTE_REGISTER = "/auth/register";

interface RoutesProps {
	basePath: string;
}

export const AuthRoutes = ({ basePath }: RoutesProps) => {
	const trimUnderPath = (path: string) => {
		return path.replace(basePath, "");
	};

	return (
		<Routes>
			<Route
				path={trimUnderPath(ROUTE_LOGIN)}
				element={withUnauthGate(<Login />)}
			/>
			<Route
				path={trimUnderPath(ROUTE_REGISTER)}
				element={withUnauthGate(<Register />)}
			/>
		</Routes>
	);
};
