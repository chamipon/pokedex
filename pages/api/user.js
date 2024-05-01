import { kv } from "@vercel/kv";

export default async function handler(req, res) {
	if (req.method == "GET") {
		return await GET(req, res);
	} else if (req.method == "POST") {
		return await POST(req, res);
	}
}

export async function GET(request, res) {
	try {
		const user = await kv.hgetall("userSession" + request.headers.authorization);
		return res.status(200).json({ user });
	} catch {
		return res.status(500).json({ error: "failed to load data" });
	}
}

export async function POST(request, res) {
	try {
		const user = await kv.hset("userSession" + request.body.id, {
			userId: request.body.id,
			settings: request.body.settings,
		});
		return res.status(200).json({ user });
	} catch {
		return res.status(500).json({ error: "POST - failed to load data" });
	}
}
