import { ProfilePageTemplate } from "../page";

import { Meta } from "@storybook/react";

const meta = {
	title: "Feature/Auth/ProfilePage",
} satisfies Meta;

export default meta;

export const Overview = () => (
	<ProfilePageTemplate
		user={{
			id: "1",
			email: "hoge@example.com",
			username: "hoge",
		}}
	/>
);
