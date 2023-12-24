import { styles } from "./page-wrapper.css";

interface Props {
	children: React.ReactNode;
}

export const PageWrapper = ({ children }: Props) => {
	return <div className={styles.pageWrapper}>{children}</div>;
};
