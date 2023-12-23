import type { Meta } from "@storybook/react";
import { vars } from "..";
import { styles } from "./color-tokens.stories.css";

const meta = {
	title: "Styles/Color Tokens",
} satisfies Meta;

export default meta;

const TokenDisplay = ({ name, value }: { name: string; value: string }) => (
	<div className={styles.tokenDisplayContainer}>
		<div
			style={{
				backgroundColor: value,
			}}
			className={styles.tokenDisplayItem}
		/>
		<code className={styles.tokenDisplayName}>{name}</code>
	</div>
);

const ColorTokens = () => (
	<>
		<h1>Color Tokens</h1>
		<div className={styles.tokensContainer}>
			{Object.entries(vars.color.gray).map(([key, value]) => (
				<TokenDisplay key={key} name={`Gray ${key}`} value={value} />
			))}
		</div>
	</>
);

export const Overview = () => <ColorTokens />;
