import { getClient } from "@/lib/hono";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadingOverlayContext } from "./loading-overlay";

interface User {
	id: string;
	email: string;
	username: string;
}

type UserState =
	| { state: "initializing" }
	| { state: "authenticated"; user: User }
	| { state: "unauthenticated" };

type AuthUserContextProps = {
	updateUser: () => Promise<void>;
} & UserState;

export const AuthUserContext = createContext<AuthUserContextProps>({
	state: "initializing",
	updateUser: async () => void 0,
});

interface LoadingProviderProps {
	children: React.ReactNode;
}

export const AuthUserProvider = ({ children }: LoadingProviderProps) => {
	const [userState, setUserState] = useState<UserState>({
		state: "initializing",
	});
	const { setIsLoading } = useContext(LoadingOverlayContext);

	const fetchUser = async () => {
		const res = await getClient().users.me.$get();

		if (!res.ok) {
			return null;
		}

		const data = await res.json();

		if (data.type !== "UserFound") {
			return null;
		}

		return data.user;
	};

	const updateUser = async () => {
		setUserState({ state: "initializing" });
		const user = await fetchUser();
		if (!user) {
			setUserState({ state: "unauthenticated" });
			return;
		}
		setUserState({ state: "authenticated", user });
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setIsLoading(true);
		updateUser().finally(() => {
			setIsLoading(false);
		});
	}, []);

	return (
		<AuthUserContext.Provider value={{ ...userState, updateUser }}>
			{children}
		</AuthUserContext.Provider>
	);
};
