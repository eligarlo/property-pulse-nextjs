'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import markMessageAsRead from '@/lib/actions/markMessageAsRead'
import { MessageType } from '@/types/messages'
import deleteMessage from '@/lib/actions/deleteMessage'

const MessageCard = ({ _id, name, body, email, phone, property, read, createdAt }: MessageType) => {
	const [isRead, setIsRead] = useState(read)
	const [isDelete, setIsDelete] = useState(false)

	const handleReadClick = async () => {
		const { isMessageRead, error } = await markMessageAsRead(_id)

		if (error) {
			throw new Error(error)
		}

		setIsRead(isMessageRead)
		toast.success(`Message Marked As ${isMessageRead ? 'Unread' : 'Read'}`)
	}

	const handleDeleteClick = async () => {
		await deleteMessage(_id)

		setIsDelete(true)
		toast.success('Message deleted')
	}

	if (isDelete) {
		return <p>Message deleted</p>
	}

	return (
		<div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
			{!isRead && (
				<div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
					New
				</div>
			)}
			<h2 className='text-xl mb-4'>
				<span className='font-bold'>Property Inquiry:</span> {property.name}
			</h2>
			<p className='text-gray-700'>{body}</p>

			<ul className='mt-4'>
				<li>
					<strong>Name:</strong> {name}
				</li>

				<li>
					<strong>Reply Email:</strong>{' '}
					<a href={`mailto:${email}`} className='text-blue-500'>
						{email}
					</a>
				</li>
				<li>
					<strong>Reply Phone:</strong>{' '}
					<a href={`tel:${phone}`} className='text-blue-500'>
						{phone}
					</a>
				</li>
				<li>
					<strong>Received:</strong> {new Date(createdAt).toLocaleString()}
				</li>
			</ul>
			<button
				onClick={handleReadClick}
				className={`${
					isRead ? 'bg-blue-500' : 'bg-green-600'
				} mt-4 mr-3 text-white py-1 px-3 rounded-md`}
			>
				{isRead ? 'Mark As Unread' : 'Mark As Read'}
			</button>
			<button
				onClick={handleDeleteClick}
				className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
			>
				Delete
			</button>
		</div>
	)
}

export default MessageCard
