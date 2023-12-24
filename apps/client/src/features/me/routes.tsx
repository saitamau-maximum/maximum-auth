import { withAuthGate } from "@/lib/router";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Profile = lazy(() => import("./pages/profile"));

export const ROUTE_PROFILE = "/";

interface RoutesProps {
	basePath: string;
}

export const MeRoutes = ({ basePath }: RoutesProps) => {
	const trimUnderPath = (path: string) => {
		return path.replace(basePath, "");
	};

	return (
		<Routes>
			<Route
				path={trimUnderPath(ROUTE_PROFILE)}
				element={withAuthGate(<Profile />)}
			/>
		</Routes>
	);
};
