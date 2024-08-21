import Image from 'next/image'

import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { convertToSerializableObject, getSessionUser } from '@/lib/utils'
import { PropertyType } from '@/types/property'
import ProfileProperties from '@/components/ui/ProfileProperties'
import profileDefault from '@/assets/images/profile.png'

const ProfilePage = async () => {
	await connectDB()

	const sessionUser = await getSessionUser()

	const user = sessionUser

	if (!user) {
		throw new Error('You must be logged in to view this page')
	}

	const propertiesDocs = await PropertyModel.find({ owner: user.userId }).lean()

	const properties: PropertyType[] = propertiesDocs.map(
		property => convertToSerializableObject(property) as PropertyType
	)

	return (
		<section className='bg-blue-50'>
			<div className='container m-auto py-24'>
				<div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
					<h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
					<div className='flex flex-col md:flex-row'>
						<div className='md:w-1/4 mx-20 mt-10'>
							<div className='mb-4'>
								<Image
									className='h-32 w-32 md:h-32 md:w-32 rounded-full mx-auto md:mx-0'
									src={sessionUser.user.image || profileDefault}
									width={200}
									height={200}
									alt='User'
									quality={100}
								/>
							</div>

							<h2 className='text-2xl mb-4'>
								<span className='font-bold block'>Name: </span> {user.user.name}
							</h2>
							<h2 className='text-2xl'>
								<span className='font-bold block'>Email: </span> {user.user.email}
							</h2>
						</div>

						<div className='md:w-3/4 md:pl-4'>
							<h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
							<ProfileProperties properties={properties} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProfilePage
