import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link/link";
import { TextInput } from "@/components/ui/text-input";
import { ROUTE_LOGIN } from "@/features/auth/routes";
import { styles } from "./register-form.css";
import { useRegisterForm } from "./use-register-form";

export const RegisterForm = () => {
	const { register, errors, handleSubmit, formError } = useRegisterForm();

	return (
		<form className={styles.registerFormContainer} onSubmit={handleSubmit}>
			<div className={styles.registerFormFieldsContainer}>
				<TextInput
					id="register-form-username"
					label="ユーザー名"
					type="text"
					description="Maximum内で共通して使うハンドルネーム"
					error={errors.username?.message}
					required
					{...register("username")}
				/>
				<TextInput
					id="register-form-email"
					label="メールアドレス"
					type="email"
					error={errors.email?.message}
					required
					{...register("email")}
				/>
				<TextInput
					id="register-form-password"
					label="パスワード"
					type="password"
					error={errors.password?.message}
					required
					{...register("password")}
				/>
				{formError && (
					<p className={styles.registerFormErrorText}>{formError}</p>
				)}
			</div>
			<div className={styles.registerFormButtonsContainer}>
				<Button type="submit" expand>
					登録
				</Button>
				<LinkButton to={ROUTE_LOGIN}>ログインはこちら</LinkButton>
			</div>
		</form>
	);
};
