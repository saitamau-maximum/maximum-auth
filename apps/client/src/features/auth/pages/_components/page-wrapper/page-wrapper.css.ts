import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	pageWrapper: style({
		maxWidth: "320px",
		width: "100%",
		padding: vars.spacing[4],
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: vars.spacing[8],
	}),
};
