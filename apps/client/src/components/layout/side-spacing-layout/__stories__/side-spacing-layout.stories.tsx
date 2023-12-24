import { Meta } from "@storybook/react";
import { SideSpacingLayout } from "..";

const meta = {
	title: "Component/Layout/SideSpacingLayout",
} satisfies Meta;

export default meta;

export const Overview = () => (
	<SideSpacingLayout>
		This layout is used to add side spacing to the content.
	</SideSpacingLayout>
);
