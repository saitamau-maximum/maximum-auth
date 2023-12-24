import { vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	pageTitle: style({
		fontSize: vars.font.size.xl,
		fontWeight: 600,
		color: vars.semantic.text.strong,
	}),
};
