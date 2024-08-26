'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { FaBookmark } from 'react-icons/fa'

import bookmarkProperty from '@/lib/actions/bookmarkProperty'
import checkBookmarkStatus from '@/lib/actions/checkBookmarkStatus'
import { PropertyType } from '@/types/property'

type BookmarkButtonProps = {
	property: PropertyType
}

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
	const { data: session } = useSession()
	// @ts-ignore
	const userId = session?.user?.id

	const [isBookmarked, setIsBookmarked] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!userId) {
			setLoading(false)
			return
		}

		checkBookmarkStatus(property._id).then(res => {
			if (res.error) return toast.error(res.error)

			setIsBookmarked(res.isBookmarked)
			setLoading(false)
		})
	}, [property._id, userId])

	const handleClick = async () => {
		if (!userId) {
			toast.error('You must be logged in to bookmark a property')
			return
		}

		bookmarkProperty(property._id).then(res => {
			if (res.error) return toast.error(res.error)

			setIsBookmarked(res.isBookmarked)
			toast.success(res.message)
		})
	}

	if (loading) {
		return <p className='text-center'>Loading...</p>
	}

	return isBookmarked ? (
		<button
			className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
			onClick={handleClick}
		>
			<FaBookmark className='mr-2' /> Remove Bookmark
		</button>
	) : (
		<button
			className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
			onClick={handleClick}
		>
			<FaBookmark className='mr-2' /> Bookmark Property
		</button>
	)
}

export default BookmarkButton
