'use server'

import { revalidatePath } from 'next/cache'

import connectDB from '@/config/database'
import UserModel from '@/db/models/User'
import { getSessionUser } from '@/lib/utils'

async function bookmarkProperty(propertyId: string) {
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

	let message = ''

	if (isBookmarked) {
		// If already bookmarked, remove it
		user.bookmarks.pull(propertyId)
		message = 'Bookmark removed'
		isBookmarked = false
	} else {
		// If not bookmarked, add it
		user.bookmarks.push(propertyId)
		message = 'Bookmark added'
		isBookmarked = true
	}

	await user.save()

	revalidatePath('/properties/saved', 'page')

	return { message, isBookmarked }
}

export default bookmarkProperty
