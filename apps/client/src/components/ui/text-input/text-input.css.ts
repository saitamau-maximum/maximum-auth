import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	textInputContainer: style({
		display: "flex",
		flexDirection: "column",
		width: "100%",
	}),
	textInputLabel: style({
		color: vars.color.gray[11],
		fontSize: "1rem",
		marginBottom: vars.spacing[2],
	}),
	textInputLabelRequired: style({
		marginLeft: vars.spacing[1],
		color: vars.color.red[9],
	}),
	textInput: style({
		width: "100%",
		boxSizing: "border-box",
		padding: `${vars.spacing[2]} ${vars.spacing[3]}`,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: vars.color.gray[6],
		borderRadius: vars.spacing[2],
		backgroundColor: vars.color.gray[1],
		color: vars.color.gray[10],
		fontSize: vars.font.size.base,
		transition: vars.transition.normal("border-color", "box-shadow"),
		":focus": {
			outline: "none",
			borderColor: "transparent",
			boxShadow: `0 0 0 2px ${vars.color.green[10]}`,
		},
		"::placeholder": {
			color: vars.color.gray[8],
		},
		":disabled": {
			backgroundColor: vars.color.gray[3],
			color: vars.color.gray[6],
			cursor: "not-allowed",
		},
	}),
	textInputError: style({
		borderColor: vars.color.red[9],
		boxShadow: `0 0 0 0.5px ${vars.color.red[6]}`,
	}),
	textInputErrorText: style({
		color: vars.color.red[9],
		fontSize: vars.font.size.xs,
		marginTop: vars.spacing[2],
	}),
	textInputDescription: style({
		color: vars.color.gray[10],
		fontSize: vars.font.size.xs,
		marginTop: vars.spacing[2],
	}),
};
