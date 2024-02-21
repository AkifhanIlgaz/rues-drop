import { BriefcaseIcon, HomeIcon, InboxIcon } from '@heroicons/react/24/outline'

export const link = {
	root: '/',
	signUp: '/signup',
	signIn: '/signin',
	forgotPassword: '/forgot-password',
	home: '/home'
}

export const sidebarLinks = [
	{ name: 'Home', href: '/home', icon: HomeIcon },
	{ name: 'Projects', href: '/projects', icon: BriefcaseIcon },
	{ name: 'Todo', href: '/todo', icon: InboxIcon }
]
