import { Meta } from "@storybook/react";
import { Button } from "..";

const meta = {
	title: "Component/UI/Button",
} satisfies Meta;

export default meta;

export const Overview = () => <Button type="button">登録</Button>;
