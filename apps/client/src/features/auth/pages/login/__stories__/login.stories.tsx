import { LoginPage } from "../page";

import { Meta } from "@storybook/react";

const meta = {
	title: "Feature/Auth/LoginPage",
} satisfies Meta;

export default meta;

export const Overview = () => <LoginPage />;
