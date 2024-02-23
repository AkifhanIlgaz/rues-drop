const baseUrl = 'http://localhost:8000/api'

const api = {
	projects: baseUrl + '/projects',
	addProject: baseUrl + '/projects/add',
	addModerator: baseUrl + "/moderators/add"
}

export default api
