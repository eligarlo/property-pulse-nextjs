import { Metadata } from 'next'

import { poppins } from '@/lib/fonts'
import Navbar from '@/components/layouts/Navbar'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Property Pulse',
	keywords: 'Property, Real Estate, Buy, Sell, Rent, Invest',
	description: 'Find the perfect rental property or buy your dream home',
}

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<html lang='en'>
			<body className={`${poppins.variable} font-sans`}>
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	)
}

export default RootLayout
