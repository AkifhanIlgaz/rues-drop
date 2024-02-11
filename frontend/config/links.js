import { BriefcaseIcon, HomeIcon, InboxIcon, UserIcon } from '@heroicons/react/24/outline'

export const link = {
	root: '/',
	signUp: '/signup',
	signIn: '/signin',
	forgotPassword: '/forgot-password',
	home: '/home',
	profile: '/profile'
}

export const sidebarLinks = [
	{ name: 'Home', href: '/home', icon: HomeIcon },
	{ name: 'Profile', href: '/profile', icon: UserIcon },
	{ name: 'Projects', href: '/projects', icon: BriefcaseIcon },
	{ name: 'Todo', href: '/todo', icon: InboxIcon }
]
