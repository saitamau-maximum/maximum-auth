import { Meta } from "@storybook/react";
import { Link, LinkButton } from "..";

const meta = {
	title: "Component/UI/Link",
} satisfies Meta;

export default meta;

export const InlineLink = () => <Link to="/">これはインラインリンクです</Link>;
export const ButtonLink = () => (
	<LinkButton to="/">これはボタンリンクです</LinkButton>
);
