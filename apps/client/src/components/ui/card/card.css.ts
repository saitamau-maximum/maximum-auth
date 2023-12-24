import { constants, vars } from "@/style";
import { style } from "@vanilla-extract/css";

export const styles = {
	cardContainer: style({
		width: "100%",
		boxSizing: "border-box",
		borderRadius: vars.spacing[2],
		backgroundColor: vars.semantic.background.sub,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: vars.semantic.border.main,
		padding: vars.spacing[6],
	}),
	cardContainerShrink: style({
		maxWidth: constants.size.maxCardWidth,
	}),
};
