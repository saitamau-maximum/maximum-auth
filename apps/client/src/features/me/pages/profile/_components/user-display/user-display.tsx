import { styles } from "./user-display.css";

interface Props {
	user: {
		id: string;
		email: string;
		username: string;
	};
}

const Info = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className={styles.info}>
			<p className={styles.infoLabel}>{label}</p>
			<p className={styles.infoValue}>{value}</p>
		</div>
	);
};

export const UserDisplay = ({ user }: Props) => {
	return (
		<div className={styles.userDisplayContainer}>
			<img
				className={styles.userDisplayAvatar}
				src="https://i.pravatar.cc/300"
				alt="avatar"
			/>
			<div className={styles.userDisplayInfoContainer}>
				<Info label="Username" value={user.username} />
				<Info label="Email" value={user.email} />
			</div>
		</div>
	);
};
