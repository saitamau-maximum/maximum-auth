import { LoginForm } from "..";

import { Meta } from "@storybook/react";

const meta = {
	title: "Feature/Auth/Components/LoginForm",
} satisfies Meta;

export default meta;

export const Overview = () => <LoginForm />;
