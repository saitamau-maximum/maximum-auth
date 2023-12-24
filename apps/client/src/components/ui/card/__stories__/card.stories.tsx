import { constants } from "@/style";
import { Meta } from "@storybook/react";
import { Card, CardTitle } from "..";

const meta = {
	title: "Component/UI/Card",
} satisfies Meta;

export default meta;

export const Overview = () => <Card>This is a card.</Card>;

export const WithShrink = () => (
	<Card shrink>
		This is a shrinkable card. (maxWidth: {constants.size.maxCardWidth})
	</Card>
);

export const WithCardTitle = () => (
	<Card>
		<CardTitle>This is a card with title.</CardTitle>
		This is a card with title.
	</Card>
);
