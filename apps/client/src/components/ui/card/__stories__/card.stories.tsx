import { Meta } from "@storybook/react";
import { Card } from "..";
import { constants } from "@/style";

const meta = {
	title: "Component/UI/Card",
} satisfies Meta;

export default meta;

export const Overview = () => <Card>This is a card.</Card>;

export const WithShrink = () => <Card shrink>This is a shrinkable card. (maxWidth: {constants.size.maxCardWidth})</Card>;
