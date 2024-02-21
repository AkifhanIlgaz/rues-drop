import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'
import clsx from 'clsx'
import { Providers } from './providers'

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`
	},
	description: siteConfig.description,

	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png'
	}
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={clsx('min-h-screen bg-white dark:bg-black font-sans antialiased', fontSans.variable)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
