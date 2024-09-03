import Image from 'next/image'
import Link from 'next/link'
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa'

import { PropertyType } from '@/types/property'
import { getRateDisplay } from '@/lib/utils'

const FeaturedPropertyCard = ({ property }: { property: PropertyType }) => {
	// TODO: Implement user preference for metric or imperial units
	const userPrefersMetric = false

	return (
		<div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
			<Image
				src={property.images[0]}
				alt={property.name}
				width={0}
				height={0}
				sizes='100vw'
				className='w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5'
			/>
			<div className='p-6'>
				<h3 className='text-xl font-bold'>{property.name}</h3>
				<div className='text-gray-600 mb-4'>{property.type}</div>
				<h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
					{getRateDisplay(property.rates)}
				</h3>
				<div className='flex justify-center gap-4 text-gray-500 mb-4'>
					<p>
						<FaBed className='inline-block mr-2' /> {property.beds}{' '}
						<span className='md:hidden lg:inline'>Beds</span>
					</p>
					<p>
						<FaBath className='inline-block mr-2' /> {property.baths}{' '}
						<span className='md:hidden lg:inline'>Baths</span>
					</p>
					<p>
						{userPrefersMetric ? (
							<p>
								<FaRulerCombined className='inline-block mr-2' />
								{property.square_meters} <span className='md:hidden lg:inline'>sqm</span>
							</p>
						) : (
							<p>
								<FaRulerCombined className='inline-block mr-2' />
								{property.square_feet} <span className='md:hidden lg:inline'>sqft</span>
							</p>
						)}
					</p>
				</div>

				<div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
					{Object.keys(property.rates).map(key => (
						<p key={key}>
							<FaMoneyBill className='inline-block mr-2' />{' '}
							{key.charAt(0).toUpperCase() + key.slice(1)}
						</p>
					))}
				</div>

				<div className='border border-gray-200 mb-5'></div>

				<div className='flex flex-col lg:flex-row justify-between'>
					<div className='flex align-middle gap-2 mb-4 lg:mb-0'>
						<FaMapMarker className='text-lg text-orange-700' />
						<span className='text-orange-700'> Boston MA </span>
					</div>
					<Link
						href={`/properties/${property._id}`}
						className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
					>
						Details
					</Link>
				</div>
			</div>
		</div>
	)
}

export default FeaturedPropertyCard
