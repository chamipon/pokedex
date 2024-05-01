import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ["identify", "email"].join(" ");
export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: scopes } },
		}),
		// ...add more providers here
	],
	callbacks: {
		async session({ session, token, user }) {
			if (token) {
				//Pretty scuffed, but this gets the discord user id
				if (token?.picture?.includes("discord")) {
					session.user.id = token.sub;
				}
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
