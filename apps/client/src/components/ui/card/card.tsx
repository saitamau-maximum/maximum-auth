import { clsx } from "@/lib/clsx";
import { styles } from "./card.css";

interface Props {
	children: React.ReactNode;
	shrink?: boolean;
}

export const Card = ({ children, shrink = false }: Props) => (
	<div
		className={clsx(styles.cardContainer, shrink && styles.cardContainerShrink)}
	>
		{children}
	</div>
);

export const CardTitle = ({ children }: Props) => (
	<p className={styles.cardTitle}>{children}</p>
);
