import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link/link";
import { TextInput } from "@/components/ui/text-input";
import { ROUTE_REGISTER } from "@/features/auth/routes";
import { styles } from "./login-form.css";
import { useLoginForm } from "./use-login-form";

export const LoginForm = () => {
	const { register, errors, handleSubmit, formError } = useLoginForm();

	return (
		<form className={styles.loginFormContainer} onSubmit={handleSubmit}>
			<div className={styles.loginFormFieldsContainer}>
				<TextInput
					id="login-form-email"
					label="メールアドレス"
					type="email"
					error={errors.email?.message}
					{...register("email")}
				/>
				<TextInput
					id="login-form-password"
					label="パスワード"
					type="password"
					error={errors.password?.message}
					{...register("password")}
				/>
				{formError && <p className={styles.loginFormErrorText}>{formError}</p>}
			</div>
			<div className={styles.loginFormButtonsContainer}>
				<Button type="submit" expand>
					ログイン
				</Button>
				<LinkButton to={ROUTE_REGISTER}>登録はこちら</LinkButton>
			</div>
		</form>
	);
};
