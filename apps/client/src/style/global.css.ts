import { globalStyle } from "@vanilla-extract/css";

import { colorVars } from "./contract.css";

globalStyle("body", {
	backgroundColor: colorVars.gray[2],
	fontFamily:
		'"Noto Sans", "Noto Sans JP", sans-serif',
	margin: 0,
	padding: 0,
	color: colorVars.gray[12],

	minHeight: "100dvh",
	height: "100%",
});

globalStyle("html", {
	scrollPaddingTop: "50dvh",
	scrollBehavior: "smooth",
});

globalStyle("*", {
	margin: 0,
});
