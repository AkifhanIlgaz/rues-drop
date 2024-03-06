const baseUrl = 'http://localhost:8000/api'

const api = {
	projects: baseUrl + '/projects',
	allProjects: baseUrl + '/projects/all',
	addProject: baseUrl + '/projects/add',
	addModerator: baseUrl + '/moderators/add',
	addTask: baseUrl + '/tasks/add',
	tasks: baseUrl + '/tasks'
}

export default api
