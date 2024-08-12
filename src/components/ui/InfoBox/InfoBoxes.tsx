import InfoBox from './InfoBox'

export type InfoBoxDataType = {
	title: string
	description: string
	buttonInfo: {
		link: string
		text: string
		bgColor: string
	}
	bgColor?: string
	textColor?: string
}

const infoBoxesData: InfoBoxDataType[] = [
	{
		title: 'For Renters',
		description: 'Find your dream rental property. Bookmark properties and contact owners.',
		buttonInfo: {
			link: '/properties',
			text: 'Browse Properties',
			bgColor: 'bg-black',
		},
	},
	{
		title: 'For Property Owners',
		description:
			'List your properties and reach potential tenants. Rent as an airbnb or long term.',
		buttonInfo: {
			link: '/properties/add',
			text: 'Add Property',
			bgColor: 'bg-blue-500',
		},
		bgColor: 'bg-blue-100',
	},
]

const InfoBoxes = () => {
	return (
		<section>
			<div className='container-xl lg:container m-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
					{infoBoxesData.map(({ title, description, buttonInfo, bgColor, textColor }) => (
						<InfoBox
							key={buttonInfo.link}
							title={title}
							description={description}
							buttonInfo={buttonInfo}
							bgColor={bgColor}
							textColor={textColor}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default InfoBoxes
