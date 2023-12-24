import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	loginFormContainer: style({
		width: "100%",
	}),
	loginFormFieldsContainer: style({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: vars.spacing[4],
		marginBottom: vars.spacing[8],
	}),
	loginFormButtonsContainer: style({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: vars.spacing[4],
	}),
	loginFormErrorText: style({
		color: vars.semantic.text.error,
		fontSize: vars.font.size.xs,
	}),
};
