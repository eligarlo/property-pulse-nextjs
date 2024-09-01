'use client'

import { createContext, useState, useContext, useEffect, Dispatch, SetStateAction } from 'react'
import { useSession } from 'next-auth/react'
import getUnreadMessageCount from '@/lib/actions/getUnreadMessageCount'

type GlobalContextType = {
	unreadCount: number
	setUnreadCount: Dispatch<SetStateAction<number>>
}

//  Create Context
const GlobalContext = createContext<GlobalContextType | null>(null)

// Create Provider
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [unreadCount, setUnreadCount] = useState(0)

	const { data: session } = useSession()

	useEffect(() => {
		if (session && session.user) {
			getUnreadMessageCount().then(res => {
				if (res.count) {
					setUnreadCount(res.count)
				}
			})
		}
	}, [session])

	return (
		<GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => {
	const context = useContext(GlobalContext)

	if (context === null) {
		throw new Error('useGlobalContext must be used within a GlobalProvider')
	}

	return context
}
