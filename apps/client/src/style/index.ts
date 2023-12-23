import { vars as vs } from "./theme.css";

export const vars = {
	...vs,
	transition: {
		normal: (...properties: string[]) => {
			return properties
				.map((property) => `${property} 0.3s ease-in-out`)
				.join(", ");
		},
	},
};

import { constants as cs } from "./constant";

export const constants = cs;
