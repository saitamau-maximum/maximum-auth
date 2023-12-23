import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
	type Input,
	email,
	maxLength,
	minLength,
	object,
	string,
} from "valibot";
import { client } from "./lib/hono";

const createUserFormSchema = object({
	username: string([
		minLength(3, "username must be at least 3 characters"),
		maxLength(32, "username must be at most 32 characters"),
	]),
	email: string([email("email must be a valid email address")]),
	password: string([
		minLength(8, "password must be at least 8 characters"),
		maxLength(64, "password must be at most 64 characters"),
	]),
});

function App() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Input<typeof createUserFormSchema>>({
		resolver: valibotResolver(createUserFormSchema),
	});

	const onSubmit = async (
		data: Input<typeof createUserFormSchema>,
	): Promise<void> => {
		console.log(data);
		const res = await client.users.$post({
			json: {
				username: data.username,
				email: data.email,
				password: data.password,
			},
		});
		if (!res.ok) {
			const json = await res.json();
			console.log(json.message);
		}
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit(onSubmit)}>
				<p>
					<label htmlFor="username">Username</label>
					<br />
					<input
						{...register("username")}
						placeholder="username"
						id="username"
						required
					/>
				</p>
				<p>{errors.username?.message}</p>
				<p>
					<label htmlFor="email">Email</label>
					<br />
					<input
						{...register("email")}
						placeholder="email"
						id="email"
						required
					/>
				</p>
				<p>{errors.email?.message}</p>
				<p>
					<label htmlFor="password">Password</label>
					<br />
					<input
						{...register("password")}
						placeholder="password"
						id="password"
						required
					/>
				</p>
				<p>{errors.password?.message}</p>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default App;
