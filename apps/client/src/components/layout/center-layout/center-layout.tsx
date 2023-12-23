import { styles } from "./center-layout.css";

interface Props {
	children: React.ReactNode;
}

export const CenterLayout = ({ children }: Props) => {
	return <div className={styles.centerContainer}>{children}</div>;
};
