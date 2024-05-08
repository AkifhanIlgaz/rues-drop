const baseUrl = 'http://localhost:8000/api'

const api = {
	projects: baseUrl + '/projects',
	allProjects: baseUrl + '/projects/all',
	addProject: baseUrl + '/projects/add',
	moderators: baseUrl + '/moderators',
	allModerators: baseUrl + '/moderators/all',
	createModerator: baseUrl + '/moderators/create',
	addModerator: baseUrl + '/moderators/add',
	deleteModerator: baseUrl + '/moderators/delete',
	addTask: baseUrl + '/tasks/add',
	tasks: baseUrl + '/tasks',
	finishTask: baseUrl + '/tasks/finish',
	action: baseUrl + '/tasks/action',
	bookmarks: baseUrl + '/user/bookmarks',
	bookmark: baseUrl + '/user/bookmark',
	removeBookmark: baseUrl + '/user/bookmark/remove'
}

export default api
