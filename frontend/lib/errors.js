import { errorMessage } from '@/config/errors'

export const generateError = (label, error) => {
	console.log(error)

	switch (label) {
		case 'confirmPassword':
		case 'password':
			return passwordError(error)
		case 'projectName':
			return projectNameError(error)
		case 'todos':
			return TodoError(error)
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

const projectNameError = error => {
	switch (error.type) {
		case 'required':
			return errorMessage.requiredProjectName
	}
}

const TodoError = error => {
	switch (error.type) {
		case 'required':
			return errorMessage.requiredTodo
	}
}
