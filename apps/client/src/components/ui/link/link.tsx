import { ComponentPropsWithRef, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styles } from "./link.css";

type Props = ComponentPropsWithRef<typeof RouterLink> & {
	children: React.ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, Props>(
	({ children, ...props }, ref) => (
		<RouterLink ref={ref} className={styles.link} {...props}>
			{children}
		</RouterLink>
	),
);

export const LinkButton = forwardRef<HTMLAnchorElement, Props>(
	({ children, ...props }, ref) => (
		<RouterLink ref={ref} className={styles.linkButton} {...props}>
			{children}
		</RouterLink>
	),
);
