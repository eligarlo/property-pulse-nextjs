'use server'

import connectDB from '@/config/database'
import MessageModel from '@/db/models/Message'
import UserModel from '@/db/models/User'
import { getSessionUser } from '@/lib/utils'

async function getUnreadMessageCount() {
	await connectDB()

	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		return { error: 'User ID is required' }
	}

	const { userId } = sessionUser

	const user = await UserModel.findById(userId)

	if (!user) {
		return { error: 'User not found' }
	}

	const count = await MessageModel.countDocuments({
		recipient: userId,
		read: false,
	})

	return { count }
}

export default getUnreadMessageCount
