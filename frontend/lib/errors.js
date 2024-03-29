import { errorMessage } from '@/config/errors'

export const generateError = (label, error) => {
	switch (label) {
		case 'confirmPassword':
		case 'password':
			return passwordError(error)
		case 'projectName':
			return projectNameError(error)
		case 'username':
			return userNameError(error)
		case 'todos':
			return todoError(error)
		case 'projects':
			return projectsError(error)
		case 'description':
			return descriptionError(error)
		case 'url':
			return errorMessage.requiredUrl
	}
}

const passwordError = error => {
	switch (error.type) {
		case 'minLength':
			return errorMessage.shortPassword
		case 'required':
			return errorMessage.requiredPassword
		case 'validate':
			return errorMessage.notMatchPassword
	}
}

const descriptionError = error => {
	switch (error.type) {
		case 'required':
			return errorMessage.requiredDescription
	}
}

const projectNameError = error => {
	switch (error.type) {
		case 'required':
			return errorMessage.requiredProjectName
	}
}

const projectsError = error => {
	switch (error.type) {
		case 'required':
			return errorMessage.requiredProjects
	}
}

const todoError = error => {
	switch (error.type) {
		case 'required':
			return errorMessage.requiredTodo
	}
}

const userNameError = error => {
	switch (error.type) {
		case 'required':
			return errorMessage.requiredUsername
	}
}
