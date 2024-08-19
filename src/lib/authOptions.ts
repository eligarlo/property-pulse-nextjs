import GoogleProvider from 'next-auth/providers/google'

import connectDB from '@/config/database'
import UserModel from '@/db/models/User'

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		// Invoked on successful sign in
		async signIn({ profile }: { profile: { name: string; email: string; picture: string } }) {
			// 1. Connect to the database
			await connectDB()
			// 2. Check if the user already exists
			const userExists = await UserModel.findOne({ email: profile.email })
			// 3. If it doesn't, create a new user
			if (!userExists) {
				// Truncate user name if too long
				const username = profile.name.slice(0, 20)

				await UserModel.create({
					email: profile.email,
					username,
					image: profile.picture,
				})
			}
			// 4. Return true to allow sign in
			return true
		},
		// Session callback function that modifies the session object
		async session({ session }: { session: { user: { email: string; id: number } } }) {
			// 1. Get the user from the database
			const user = await UserModel.findOne({ email: session.user.email })
			// 2. Assign the user id to the session
			session.user.id = user._id.toString()
			// 3. Return the session object
			return session
		},
	},
}
