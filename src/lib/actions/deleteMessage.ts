'use server'
import { revalidatePath } from 'next/cache'

import connectDB from '@/config/database'
import MessageModel from '@/db/models/Message'
import { getSessionUser } from '@/lib/utils'

const deleteMessage = async (messageId: string) => {
	await connectDB()

	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		throw new Error('You must be logged in to delete a message')
	}

	const { userId } = sessionUser

	const message = await MessageModel.findById(messageId)

	if (!message) {
		throw new Error('Message not found')
	}

	// Verify ownership
	if (message.recipient.toString() !== userId) {
		throw new Error('Unauthorized')
	}

	// Delete property from database
	await message.deleteOne()

	revalidatePath('/', 'layout')
}

export default deleteMessage
