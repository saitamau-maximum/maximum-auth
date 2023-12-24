import { getClient } from "@/lib/hono";
import { AuthUserContext } from "@/provider/user";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, email, maxLength, minLength, object, string } from "valibot";

const schema = object({
	email: string("メールアドレスは文字列でなければなりません", [
		minLength(1, "メールアドレスは必須です"),
		email("メールアドレスが不正です"),
	]),
	username: string("ユーザー名は文字列でなければなりません", [
		minLength(3, "ユーザー名は3文字以上である必要があります"),
		maxLength(32, "ユーザー名は32文字以下である必要があります"),
	]),
	password: string("パスワードは文字列でなければなりません", [
		minLength(8, "パスワードは8文字以上である必要があります"),
		maxLength(64, "パスワードは64文字以下である必要があります"),
	]),
});

type FormData = Input<typeof schema>;

export const useRegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: valibotResolver(schema),
	});
	const [formError, setFormError] = useState("");
	const { updateUser } = useContext(AuthUserContext);
	const navigate = useNavigate();

	const onSubmit = async (form: FormData) => {
		const res = await getClient().users.$post({
			json: {
				username: form.username,
				password: form.password,
				email: form.email,
			},
		});

		const data = await res.json();

		switch (data.type) {
			case "InternalServerError":
				setFormError("ログインに失敗しました、時間をおいて再度お試しください");
				return;
			case "UserCreated":
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
