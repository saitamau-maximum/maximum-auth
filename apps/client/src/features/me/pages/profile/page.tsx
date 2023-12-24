import { SideSpacingLayout } from "@/components/layout/side-spacing-layout";
import { AuthUserContext } from "@/provider/user";
import { useContext } from "react";
import { UserDisplay } from "./_components/user-display";

interface Props {
	user: {
		id: string;
		email: string;
		username: string;
	};
}

export const ProfilePageTemplate = ({ user }: Props) => {
	return (
		<SideSpacingLayout>
			<UserDisplay user={user} />
		</SideSpacingLayout>
	);
};

export const ProfilePage = () => {
	const auth = useContext(AuthUserContext);

	if (auth.state !== "authenticated") {
		return null;
	}

	return <ProfilePageTemplate user={auth.user} />;
};
