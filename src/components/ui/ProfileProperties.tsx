'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { PropertyType } from '@/types/property'

type ProfilePropertiesProps = {
	properties: PropertyType[]
}

const ProfileProperties = ({ properties: initialProperties }: ProfilePropertiesProps) => {
	const [properties, setProperties] = useState(initialProperties)

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
			{properties.map(property => (
				<div key={property._id} className='mb-10'>
					<Link href={`/properties/${property._id}`}>
						<Image
							className='h-32 w-full rounded-md object-cover'
							src={property.images[0]}
							alt='Property 1'
							width={1000}
							height={600}
						/>
					</Link>
					<div className='mt-2'>
						<p className='text-lg font-semibold'>{property.name}</p>
						<p className='text-gray-600'>
							Address: {property.location.street}, {property.location.city}{' '}
							{property.location.state}
						</p>
					</div>
					<div className='mt-2'>
						<Link
							href='/add-property.html'
							className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
						>
							Edit
						</Link>
						<button
							className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
							type='button'
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProfileProperties
