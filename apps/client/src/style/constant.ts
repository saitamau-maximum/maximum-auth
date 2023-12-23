/**
 * @deprecated
 * styles/constant.cssではなく、styles/indexをimportしてください
 */
export const constants = {
	zIndex: {
		normal: "0",
		forward: "1",
		float: "10",
		windowFloat: "100",
		modal: "1000",
		overlay: "10000",
	},
	breakpoint: {
		mobile: "768px",
		tablet: "1024px",
	},
	size: {
		maxCardWidth: "400px",
	},
	gradient: (direction: string, ...colors: string[]) => {
		return `linear-gradient(${direction}, ${colors.join(", ")})`;
	},
};
