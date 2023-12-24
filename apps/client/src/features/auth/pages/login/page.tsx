import { CenterLayout } from "@/components/layout/center-layout";
import { Card } from "@/components/ui/card";
import { LoginForm } from "./_components/login-form";

export const LoginPage = () => {
	return (
		<CenterLayout>
			<Card shrink>
				<h2>Login</h2>
				<LoginForm />
			</Card>
		</CenterLayout>
	);
};
