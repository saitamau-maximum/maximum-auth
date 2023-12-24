import { ROUTE_LOGIN } from "@/features/auth/routes";
import { AuthUserContext } from "@/provider/user";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface AuthProtectionWrapperProps {
	children: React.ReactNode;
}

const AuthProtection = ({ children }: AuthProtectionWrapperProps) => {
	const authUser = useContext(AuthUserContext);

	if (authUser.state === "initializing") {
		return null;
	}

	if (authUser.state === "unauthenticated") {
		return <Navigate to={ROUTE_LOGIN} />;
	}

	return <>{children}</>;
};

const UnauthProtection = ({ children }: AuthProtectionWrapperProps) => {
	const authUser = useContext(AuthUserContext);

	if (authUser.state === "initializing") {
		return null;
	}

	if (authUser.state === "authenticated") {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export const withAuthGate = (children: React.ReactNode) => {
	return <AuthProtection>{children}</AuthProtection>;
};

export const withUnauthGate = (children: React.ReactNode) => {
	return <UnauthProtection>{children}</UnauthProtection>;
};
