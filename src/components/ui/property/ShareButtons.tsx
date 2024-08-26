'use client'

import {
	FacebookShareButton,
	TwitterShareButton,
	TelegramShareButton,
	WhatsappShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	TelegramIcon,
	WhatsappIcon,
	EmailIcon,
} from 'react-share'

import { PropertyType } from '@/types/property'

type ShareButtonsProps = {
	property: PropertyType
}

const ShareButtons = ({ property }: ShareButtonsProps) => {
	const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

	return (
		<>
			<h3 className='text-xl font-bold text-center pt-2'>Share this Property:</h3>
			<div className='flex gap-3 justify-center pb-5'>
				<FacebookShareButton url={shareUrl} hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}>
					<FacebookIcon size={40} round />
				</FacebookShareButton>
				<TwitterShareButton
					url={shareUrl}
					title={property.name}
					hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
				>
					<TwitterIcon size={40} round />
				</TwitterShareButton>
				<TelegramShareButton url={shareUrl} title={property.name}>
					<TelegramIcon size={40} round />
				</TelegramShareButton>
				<WhatsappShareButton url={shareUrl} title={property.name} separator='::'>
					<WhatsappIcon size={40} round />
				</WhatsappShareButton>
				<EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property:`}>
					<EmailIcon size={40} round />
				</EmailShareButton>
			</div>
		</>
	)
}

export default ShareButtons
