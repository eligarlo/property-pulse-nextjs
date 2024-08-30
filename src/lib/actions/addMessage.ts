'use server'

import { revalidatePath } from 'next/cache'

import connectDB from '@/config/database'
import { getPropertySizes, getSessionUser } from '@/lib/utils'
import MessageModel from '@/db/models/Message'

async function addMessage(prevState: any, formData: FormData) {
	await connectDB()

	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		return { message: 'User ID is required', submitted: false, error: true }
	}

	const { userId } = sessionUser

	const recipient = formData.get('recipient')

	if (userId === recipient) {
		return { message: 'You cannot send a message to yourself', submitted: false, error: true }
	}

	const newMessage = new MessageModel({
		sender: userId,
		recipient,
		property: formData.get('property'),
		name: formData.get('name'),
		email: formData.get('email'),
		phone: formData.get('phone'),
		body: formData.get('body'),
	})

	await newMessage.save()

	return { message: 'Message sent successfully', submitted: true, error: false }
}

export default addMessage
