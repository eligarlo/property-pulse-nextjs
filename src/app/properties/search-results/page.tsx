import Link from 'next/link'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { PropertyType } from '@/types/property'
import { convertToSerializableObject } from '@/lib/utils'
import PropertySearchForm from '@/components/ui/PropertySearchForm'
import PropertyCard from '@/components/ui/PropertyCard'

type SearchParams = {
	location?: string
	propertyType?: string
}

const SearchResultsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
	const { location, propertyType } = searchParams

	await connectDB()

	const locationPattern = new RegExp(location ?? '', 'i')

	let query: any = {
		$or: [
			{ name: locationPattern },
			{ description: locationPattern },
			{ 'location.street': locationPattern },
			{ 'location.city': locationPattern },
			{ 'location.state': locationPattern },
			{ 'location.zipcode': locationPattern },
		],
	}

	if (propertyType && propertyType !== 'All') {
		const typePattern = new RegExp(propertyType, 'i')
		query.type = typePattern
	}

	const propertiesQueryResults = await PropertyModel.find(query).lean()

	const properties: PropertyType[] = propertiesQueryResults.map(
		property => convertToSerializableObject(property) as PropertyType
	)

	return (
		<>
			<section className='bg-blue-700 py-4'>
				<div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
					<PropertySearchForm />
				</div>
			</section>

			<section className='px-4 py-6'>
				<div className='container-xl lg:container m-auto px-4 py-6'>
					<Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
						<FaArrowAltCircleLeft className='mr-2 mb-1' /> Back to Properties
					</Link>

					<h1 className='text-2xl mb-4'>Search Results</h1>

					{properties.length === 0 ? (
						<p>No properties found</p>
					) : (
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
							{properties.map(property => (
								<PropertyCard key={property._id} {...property} />
							))}
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default SearchResultsPage
