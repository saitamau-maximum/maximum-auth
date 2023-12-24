import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	registerFormContainer: style({
		width: "100%",
	}),
	registerFormFieldsContainer: style({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: vars.spacing[4],
		marginBottom: vars.spacing[8],
	}),
	registerFormButtonsContainer: style({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: vars.spacing[4],
	}),
	registerFormErrorText: style({
		color: vars.semantic.text.error,
		fontSize: vars.font.size.xs,
	}),
};
