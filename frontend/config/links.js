import { BriefcaseIcon, HomeIcon, InboxIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export const link = {
	root: '/',
	signUp: '/signup',
	signIn: '/signin',
	forgotPassword: '/forgot-password',
	home: '/home',
	projects: '/projects',
	addProject: '/projects/add',
	todo: '/todo',
	users: '/users',
	createAdmin: '/users/create'
}

export const sidebarLinks = {
	home: { name: 'Home', href: link.home, icon: HomeIcon },
	projects: { name: 'Projects', href: link.projects, icon: BriefcaseIcon },
	todo: { name: 'Todo', href: link.todo, icon: InboxIcon },
	users: { name: 'Users', href: link.users, icon: UserGroupIcon }
}

export const breadcrumbs = {
	home: { name: 'Home', href: link.home, icon: HomeIcon },
	projects: { name: 'Projects', href: link.projects, icon: BriefcaseIcon },
	addProject: { name: 'Add Project', href: link.addProject },
	todo: { name: 'Todo', href: link.todo, icon: InboxIcon },
	users: { name: 'Users', href: link.users, icon: UserGroupIcon },
	createAdmin: { name: 'Create admin', href: link.createAdmin }
}
