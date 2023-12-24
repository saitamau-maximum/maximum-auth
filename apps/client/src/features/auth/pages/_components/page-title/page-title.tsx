import { styles } from "./page-title.css";

interface Props {
	children: React.ReactNode;
}

export const PageTitle = ({ children }: Props) => {
	return <h1 className={styles.pageTitle}>{children}</h1>;
};
