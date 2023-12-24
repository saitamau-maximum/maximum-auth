import { style } from "@vanilla-extract/css";
import { vars } from "..";

export const styles = {
	tokenDisplayContainer: style({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "12px",
	}),
	tokenDisplayItem: style({
		height: "48px",
		width: "48px",
		borderRadius: "50%",
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: vars.semantic.border.main,
	}),
	tokenDisplayName: style({
		fontSize: "0.75rem",
		color: vars.semantic.text.base,
	}),
	tokensContainer: style({
		display: "flex",
		gap: "32px",
		padding: "32px",
	}),
};
