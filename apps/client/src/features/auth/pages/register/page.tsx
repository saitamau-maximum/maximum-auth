import { CenterLayout } from "@/components/layout/center-layout";

import { PageTitle } from "../_components/page-title";
import { PageWrapper } from "../_components/page-wrapper";
import { RegisterForm } from "./_components/register-form";

export const RegisterPage = () => {
	return (
		<CenterLayout>
			<PageWrapper>
				<PageTitle>新規会員登録</PageTitle>
				<RegisterForm />
			</PageWrapper>
		</CenterLayout>
	);
};
