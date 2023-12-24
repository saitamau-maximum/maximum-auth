import { client } from "@/lib/hono";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOverlayContext } from "./loading-overlay";

interface User {
	id: string;
	email: string;
	username: string;
}

interface AuthUserContextProps {
	user: User | null;
	setUser: (user: User) => void;
	fetchUser: () => Promise<User | null>;
}

export const AuthUserContext = createContext<AuthUserContextProps>({
	user: null,
	setUser: () => {},
	fetchUser: async () => null,
});

interface LoadingProviderProps {
	children: React.ReactNode;
}

export const AuthUserProvider = ({ children }: LoadingProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const { setIsLoading } = useContext(LoadingOverlayContext);
	const navigate = useNavigate();

	const fetchUser = async () => {
		const res = await client.users.me.$get();

		if (!res.ok) {
			return null;
		}

		const data = await res.json();

		if (data.type === "UserNotFound") {
			return null;
		}

		return data.user;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setIsLoading(true);
		fetchUser()
			.then((user) => {
				if (user) {
					setUser(user);
				} else {
					navigate("/login");
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<AuthUserContext.Provider value={{ user, setUser, fetchUser }}>
			{children}
		</AuthUserContext.Provider>
	);
};
