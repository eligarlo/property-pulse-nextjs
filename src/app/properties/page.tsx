import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { PropertyType } from '@/types/property'
import PropertyCard from '@/components/ui/PropertyCard'

const PropertiesPage = async () => {
	await connectDB()
	const properties: PropertyType[] = await PropertyModel.find({}).lean()

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
			</div>
		</section>
	)
}

export default PropertiesPage
