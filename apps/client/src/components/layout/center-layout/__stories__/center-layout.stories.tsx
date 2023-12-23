import { Meta } from "@storybook/react";
import { CenterLayout } from "..";

const meta = {
	title: "Component/Layout/CenterLayout",
} satisfies Meta;

export default meta;

export const Overview = () => (
	<CenterLayout>
		<img src="/maximum.svg" alt="Maximum" width="300" height="100" />
	</CenterLayout>
);
