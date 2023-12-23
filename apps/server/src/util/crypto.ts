interface EncodedPassword {
	salt: Uint8Array;
	hash: Uint8Array;
}

export const hashSecret = async (
	password: string | Uint8Array,
): Promise<EncodedPassword> => {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const data =
		typeof password === "string"
			? new TextEncoder().encode(password)
			: password;
	const combined = new Uint8Array(salt.length + data.length);
	combined.set(salt);
	combined.set(data, salt.length);
	const hash = await crypto.subtle.digest("SHA-256", combined);
	return { salt, hash: new Uint8Array(hash) };
};

export const verifySecret = async (
	password: string | Uint8Array,
	encodedPassword: EncodedPassword,
) => {
	const data =
		typeof password === "string"
			? new TextEncoder().encode(password)
			: password;
	const combined = new Uint8Array(encodedPassword.salt.length + data.length);
	combined.set(encodedPassword.salt);
	combined.set(data, encodedPassword.salt.length);
	const hash = await crypto.subtle.digest("SHA-256", combined);
	const arrayHash = new Uint8Array(hash);
	return encodedPassword.hash.every((v, i) => v === arrayHash[i]);
};
