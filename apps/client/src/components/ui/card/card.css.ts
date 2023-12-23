import { constants, vars } from "@/style";
import { style, styleVariants } from "@vanilla-extract/css";

export const styles = {
	cardContainer: style({
		width: "100%",
		boxSizing: "border-box",
		borderRadius: vars.spacing[2],
		backgroundColor: vars.color.gray[1],
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: vars.color.gray[3],
		boxShadow: `0 1px 16px ${vars.color.gray[3]}`,
		padding: vars.spacing[6],
	}),
	cardContainerShrink: style({
		maxWidth: constants.size.maxCardWidth,
	}),
};
