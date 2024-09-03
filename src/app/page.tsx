import Hero from '@/components/ui/Hero'
import InfoBoxes from '@/components/ui/InfoBox/InfoBoxes'
import FeaturedProperties from '@/components/ui/FeaturedProperties'
import HomeProperties from '@/components/ui/HomeProperties'

const HomePage = () => {
	return (
		<>
			<Hero />
			<InfoBoxes />
			<FeaturedProperties />
			<HomeProperties />
		</>
	)
}

export default HomePage
