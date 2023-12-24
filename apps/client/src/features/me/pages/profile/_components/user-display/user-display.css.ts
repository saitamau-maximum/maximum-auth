import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	userDisplayContainer: style({
		display: "flex",
		alignItems: "center",
	}),
	userDisplayAvatar: style({
		width: "6rem",
		height: "6rem",
		borderRadius: "50%",
		marginRight: vars.spacing[6],
	}),
	userDisplayInfoContainer: style({
		display: "flex",
		flexDirection: "column",
		gap: vars.spacing[4],
	}),
	info: style({
		display: "flex",
		flexDirection: "column",
	}),
	infoLabel: style({
		marginRight: vars.spacing[4],
		color: vars.semantic.text.base,
	}),
	infoValue: style({
		fontSize: vars.font.size.lg,
		color: vars.semantic.text.strong,
	}),
};
