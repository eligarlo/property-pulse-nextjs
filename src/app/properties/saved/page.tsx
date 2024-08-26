import { redirect } from 'next/navigation'

import { getSessionUser } from '@/lib/utils'
import UserModel from '@/db/models/User'
import { UserType } from '@/types/user'
import PropertyCard from '@/components/ui/PropertyCard'

const SavedPropertiesPage = async () => {
	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		redirect('/')
	}

	const user: UserType | null = await UserModel.findById(sessionUser.userId)
		.populate('bookmarks')
		.lean()

	if (!user) {
		throw new Error('User not found')
	}

	return (
		<section className='px-4 py-6'>
			<div className='container lg:container m-auto px-4 py-6'>
				<h1 className='text-2xl mb-4'>Saved Properties</h1>
				{Array.isArray(user.bookmarks) && user.bookmarks.length === 0 ? (
					<p>No saved properties</p>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{Array.isArray(user.bookmarks) &&
							user.bookmarks.map(property => <PropertyCard key={property._id} {...property} />)}
					</div>
				)}
			</div>
		</section>
	)
}

export default SavedPropertiesPage
