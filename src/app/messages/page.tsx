import connectDB from '@/config/database'
import MessageModel from '@/db/models/Message'
import '@/db/models/Property'
import { convertToSerializableObject } from '@/lib/utils'
import { getSessionUser } from '@/lib/utils'
import { MessageType } from '@/types/messages'
import MessageCard from '@/components/ui/MessageCard'

const MessagesPage = async () => {
	await connectDB()

	const sessionUser = await getSessionUser()

	const user = sessionUser

	if (!user) {
		throw new Error('You must be logged in to view this page')
	}

	const readMessages = await MessageModel.find({ recipient: user.userId, read: true })
		.sort({ createdAt: -1 })
		.populate('sender', 'username')
		.populate('property', 'name')
		.lean()

	const unreadMessages = await MessageModel.find({ recipient: user.userId, read: false })
		.sort({ createdAt: -1 })
		.populate('sender', 'username')
		.populate('property', 'name')
		.lean()

	const messages: MessageType[] = [...unreadMessages, ...readMessages].map(messageDoc => {
		const message = convertToSerializableObject(messageDoc)
		message.sender = convertToSerializableObject(message.sender)
		message.property = convertToSerializableObject(message.property)

		return message as MessageType
	})

	return (
		<section className='bg-blue-50'>
			<div className='container m-auto py-24 max-w-6xl'>
				<div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
					<h1 className='text-3xl font-bold mb-4'>Messages</h1>

					<div className='space-y-4'>
						{messages.length === 0 ? (
							<p>You have no messages</p>
						) : (
							messages.map(message => <MessageCard key={message._id} {...message} />)
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default MessagesPage
