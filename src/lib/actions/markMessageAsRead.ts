'use server'

import connectDB from '@/config/database'
import MessageModel from '@/db/models/Message'
import UserModel from '@/db/models/User'
import { getSessionUser } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

async function markMessageAsRead(messageId: string) {
	await connectDB()

	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		return { error: 'User ID is required', isMessageRead: false }
	}

	const { userId } = sessionUser

	const user = await UserModel.findById(userId)

	if (!user) {
		return { error: 'User not found', isMessageRead: false }
	}

	const message = await MessageModel.findById(messageId)

	if (!message) {
		return { error: 'Message not found', isMessageRead: false }
	}

	// Verify Ownership
	if (message.recipient.toString() !== userId) {
		return { error: 'Unauthorized', isMessageRead: false }
	}

	message.read = !message.read

	revalidatePath('/messages', 'page')

	await message.save()

	return { isMessageRead: message.read }
}

export default markMessageAsRead
