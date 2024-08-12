import Link from 'next/link'

import { InfoBoxDataType } from './InfoBoxes'

const InfoBox = ({
	title,
	description,
	buttonInfo: { link, bgColor: bgColorButton, text: buttonText },
	bgColor = 'bg-gray-100',
	textColor = 'text-gray-800',
}: InfoBoxDataType) => {
	return (
		<div className={`${bgColor} p-6 rounded-lg shadow-md`}>
			<h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
			<p className={`${textColor} mt-2 mb-4`}>{description}</p>
			<Link
				href={link}
				className={`${bgColorButton} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
			>
				{buttonText}
			</Link>
		</div>
	)
}

export default InfoBox
