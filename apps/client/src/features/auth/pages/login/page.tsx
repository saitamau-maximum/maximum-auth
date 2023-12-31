import { CenterLayout } from "@/components/layout/center-layout";
import { PageTitle } from "../_components/page-title";
import { PageWrapper } from "../_components/page-wrapper";
import { LoginForm } from "./_components/login-form";

export const LoginPage = () => {
	return (
		<CenterLayout>
			<PageWrapper>
				<PageTitle>ログイン</PageTitle>
				<LoginForm />
			</PageWrapper>
		</CenterLayout>
	);
};
