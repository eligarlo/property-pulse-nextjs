import connectDB from '@/config/database'
import PropertyModel from '@/db/models/Property'
import { convertToSerializableObject } from '@/lib/utils'
import { PropertyType } from '@/types/property'
import FeaturedPropertyCard from '@/components/ui/FeaturedPropertyCard'

const FeaturedProperties = async () => {
	await connectDB()

	const propertiesDocs = await PropertyModel.find({ is_featured: true }).limit(3).lean()

	const properties: PropertyType[] = propertiesDocs.map(
		property => convertToSerializableObject(property) as PropertyType
	)

	return properties.length > 0 ? (
		<section className='bg-blue-50 px-4 pt-6 pb-10'>
			<div className='container-xl lg:container m-auto'>
				<h2 className='text-3xl font-bold text-blue-500 text-center mb-6'>Featured Properties</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{properties.map(property => (
						<FeaturedPropertyCard key={property._id} property={property} />
					))}
				</div>
			</div>
		</section>
	) : null
}

export default FeaturedProperties
