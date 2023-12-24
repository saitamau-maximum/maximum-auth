import { styles } from "./side-spacing-layout.css";

interface Props {
	children: React.ReactNode;
}

export const SideSpacingLayout = ({ children }: Props) => {
	return <div className={styles.sideSpacingContainer}>{children}</div>;
};
