import { clsx } from "@/lib/clsx";
import {
	ComponentPropsWithRef,
	ComponentPropsWithoutRef,
	forwardRef,
} from "react";
import { styles } from "./button.css";

type Props = ComponentPropsWithRef<"button"> & {
	type: NonNullable<ComponentPropsWithoutRef<"button">["type"]>;
	children: React.ReactNode;
	expand?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ type, children, expand = false, ...props }, ref) => (
		<button
			ref={ref}
			type={type}
			className={clsx(styles.button, expand && styles.buttonExpand)}
			{...props}
		>
			{children}
		</button>
	),
);
