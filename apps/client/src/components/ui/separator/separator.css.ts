import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	horizontalSeparator: style({
		border: "none",
		borderTop: `1px solid ${vars.semantic.border.main}`,
		marginTop: vars.spacing[4],
		marginBottom: vars.spacing[4],
		width: "100%",

		":first-child": {
			marginTop: 0,
		},
		":last-child": {
			marginBottom: 0,
		},
	}),
	verticalSeparator: style({
		border: "none",
		borderLeft: `1px solid ${vars.semantic.border.main}`,
		marginLeft: vars.spacing[4],
		marginRight: vars.spacing[4],
		height: "100%",

		":first-child": {
			marginLeft: 0,
		},
		":last-child": {
			marginRight: 0,
		},
	}),
};
