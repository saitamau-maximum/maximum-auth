import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	link: style({
		color: vars.semantic.text.base,
		textDecoration: "none",
		transition: vars.transition.normal("color"),

		":hover": {
			color: vars.semantic.text.strong,
			textDecoration: "underline",
		},
	}),
	linkButton: style({
		background: "transparent",
		textDecoration: "none",
		color: vars.semantic.text.base,
		padding: `${vars.spacing[1]} ${vars.spacing[2]}`,
		borderRadius: vars.spacing[1],
		fontSize: vars.font.size.sm,
		transition: vars.transition.normal("background"),

		":hover": {
			background: vars.semantic.background.hover,
		},
	}),
};
