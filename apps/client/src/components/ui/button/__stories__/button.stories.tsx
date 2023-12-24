import { Meta } from "@storybook/react";
import { Button } from "..";

const meta = {
	title: "Component/UI/Button",
} satisfies Meta;

export default meta;

export const Overview = () => <Button type="button">登録</Button>;

export const Expand = () => (
	<Button type="button" expand>
		登録
	</Button>
);

export const Disabled = () => (
	<Button type="button" disabled>
		登録
	</Button>
);
