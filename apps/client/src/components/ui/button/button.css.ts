import { constants, vars } from "@/style";
import { lightColorVars } from "@/style/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
	button: style({
		boxSizing: "border-box",
		borderRadius: vars.spacing[2],
		background: constants.gradient(
			"to right bottom",
			vars.color.gradient.from,
			vars.color.gradient.to,
		),
		color: lightColorVars.gray[2],
		border: "none",
		padding: `${vars.spacing[2]} ${vars.spacing[4]}`,
		fontWeight: 600,
		cursor: "pointer",
		transition: vars.transition.normal("opacity", "background"),

		":hover": {
			opacity: 0.8,
		},
	}),
	buttonExpand: style({
		width: "100%",
	}),
};
