import { getClient } from "@/lib/hono";
import { AuthUserContext } from "@/provider/user";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, email, minLength, object, string } from "valibot";

const schema = object({
	email: string("メールアドレスは文字列でなければなりません", [
		minLength(1, "メールアドレスは必須です"),
		email("メールアドレスが不正です"),
	]),
	password: string("パスワードは文字列でなければなりません", [
		minLength(1, "パスワードは必須です"),
	]),
});

type FormData = Input<typeof schema>;

export const useLoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: valibotResolver(schema),
	});
	const [formError, setFormError] = useState("");
	const navigate = useNavigate();
	const { updateUser } = useContext(AuthUserContext);

	const onSubmit = async (form: FormData) => {
		const res = await getClient().users.auth.$post({
			json: {
				password: form.password,
				email: form.email,
			},
		});

		const data = await res.json();

		switch (data.type) {
			case "InternalServerError":
				setFormError("ログインに失敗しました、時間をおいて再度お試しください");
				return;
			case "AuthenticationFailed":
				setFormError("メールアドレスまたはパスワードが間違っています");
				return;
			case "AuthenticationSucceeded":
				setFormError("");
				localStorage.setItem("token", data.token);
				updateUser().then(() => navigate("/"));
				return;
			default:
				throw new Error(data satisfies never);
		}
	};

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors,
		formError,
	};
};
