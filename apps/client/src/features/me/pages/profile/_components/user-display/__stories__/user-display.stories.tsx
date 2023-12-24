import { UserDisplay } from "..";

import { Meta } from "@storybook/react";

const meta = {
	title: "Feature/Auth/UserDisplay",
} satisfies Meta;

export default meta;

export const Overview = () => (
	<UserDisplay
		user={{
			id: "1",
			email: "hoge@example.com",
			username: "hoge",
		}}
	/>
);
