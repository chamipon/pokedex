import { createClient } from "@vercel/kv";
import { KV_REST_API_TOKEN, KV_REST_API_URL } from "/";
export default async function handler(request, response) {
	const users = createClient({
		url: KV_REST_API_URL,
		token: KV_REST_API_TOKEN,
	});

	const user = await users.hgetall("user:me");

	return response.status(200).json(user);
}
