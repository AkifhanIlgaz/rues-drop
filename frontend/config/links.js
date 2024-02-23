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
	moderators: '/moderators',
	createModerator: '/moderators/add'
}

export const sidebarLinks = {
	home: { name: 'Home', href: link.home, icon: HomeIcon },
	projects: { name: 'Projects', href: link.projects, icon: BriefcaseIcon },
	todo: { name: 'Todo', href: link.todo, icon: InboxIcon },
	moderators: { name: 'Moderators', href: link.moderators, icon: UserGroupIcon }
}

export const breadcrumbs = {
	home: { name: 'Home', href: link.home, icon: HomeIcon },
	projects: { name: 'Projects', href: link.projects, icon: BriefcaseIcon },
	addProject: { name: 'Add Project', href: link.addProject },
	todo: { name: 'Todo', href: link.todo, icon: InboxIcon },
	moderators: { name: 'Moderators', href: link.moderators, icon: UserGroupIcon },
	createModerator: { name: 'Create moderator', href: link.createModerator }
}
