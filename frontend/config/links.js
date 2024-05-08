import { BookmarkIcon, BriefcaseIcon, HomeIcon, UserPlusIcon } from '@heroicons/react/24/outline'

export const link = {
	root: '/',
	signUp: '/signup',
	signIn: '/signin',
	forgotPassword: '/forgot-password',
	home: '/home',
	projects: '/projects',
	bookmarks: '/bookmarks',
	admin: {
		projects: '/admin/projects',
		addProject: '/admin/projects/add',
		moderators: '/admin/moderators',
		createModerator: '/moderators/add',
		createModerator: '/admin/moderators/add'
	}
}

export const sidebarLinks = {
	home: { name: 'Home', href: link.home, icon: HomeIcon },
	projects: { name: 'Projects', href: link.projects, icon: BriefcaseIcon },
	bookmarks: { name: 'Bookmarks', href: link.bookmarks, icon: BookmarkIcon }
}

export const adminSidebarLinks = {
	projects: { name: 'Projects', href: link.admin.projects, icon: BriefcaseIcon },
	moderators: { name: 'Moderator', href: link.admin.createModerator, icon: UserPlusIcon }
}

export const adminBreadcrumbs = {
	projects: { name: 'Projects', href: link.admin.projects, icon: BriefcaseIcon },
	addProject: { name: 'Add Project', href: link.admin.addProject },
	createModerator: { name: 'Create moderator', href: link.admin.createModerator, icon: UserPlusIcon }
}

export const breadcrumbs = {
	home: { name: 'Home', href: link.home, icon: HomeIcon },
	projects: { name: 'Projects', href: link.projects, icon: BriefcaseIcon }
}
