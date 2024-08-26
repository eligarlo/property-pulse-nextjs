'use server'

import connectDB from '@/config/database'
import UserModel from '@/db/models/User'
import { getSessionUser } from '@/lib/utils'

async function checkBookmarkStatus(propertyId: string) {
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

	let isBookmarked = user.bookmarks.includes(propertyId)

	return { isBookmarked }
}

export default checkBookmarkStatus
