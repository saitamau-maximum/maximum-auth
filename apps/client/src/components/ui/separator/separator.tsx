import { clsx } from "@/lib/clsx";
import { styles } from "./separator.css";

interface Props {
	direction?: "horizontal" | "vertical";
}

export const Separator = ({ direction = "horizontal" }: Props) => {
	return (
		<hr
			className={clsx(
				direction === "horizontal" && styles.horizontalSeparator,
				direction === "vertical" && styles.verticalSeparator,
			)}
		/>
	);
};
