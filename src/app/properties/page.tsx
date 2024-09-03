import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { PropertyType } from '@/types/property'
import PropertyCard from '@/components/ui/PropertyCard'
import Pagination from '@/components/ui/Pagination'

type SearchParams = {
	page?: string
	pageSize?: string
}

const PropertiesPage = async ({
	searchParams: { page = '1', pageSize = '9' },
}: {
	searchParams: SearchParams
}) => {
	await connectDB()

	const skip = (Number(page) - 1) * Number(pageSize)

	const total = await PropertyModel.countDocuments({})
	const properties: PropertyType[] = await PropertyModel.find({})
		.skip(skip)
		.limit(Number(pageSize))
		.lean()

	const showPagination = total > Number(pageSize)

	return (
		<section className='px-4 py-6'>
			<div className='container-xl lg:container m-auto px-4 py6'>
				{properties.length === 0 ? (
					<p>No properties found</p>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{properties.map(property => (
							<PropertyCard key={property._id} {...property} />
						))}
					</div>
				)}

				{showPagination && (
					<Pagination page={Number(page)} pageSize={Number(pageSize)} totalItems={total} />
				)}
			</div>
		</section>
	)
}

export default PropertiesPage
