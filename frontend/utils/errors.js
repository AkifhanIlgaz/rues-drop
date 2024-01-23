import { errorMessage } from '@/config/errors';

export const generateError = (label, error) => {
  switch (label) {
    case 'oldPassword':
    case 'password':
    case 'passwordConfirm':
      return passwordError(error);
    case 'email':
      return emailError(error);
    case 'username':
      return usernameError(error);
    case 'name':
      return nameError(error);
  }
};

const passwordError = (error) => {
  switch (error.type) {
    case 'minLength':
      return errorMessage.shortPassword;
    case 'required':
      return errorMessage.requiredPassword;
    case 'validate':
      return errorMessage.notMatchPassword;
  }
};

const emailError = (error) => {
  switch (error.type) {
    case 'required':
      return errorMessage.requiredEmail;
    case 'validate':
      return errorMessage.invalidEmail;
  }
};

const usernameError = (error) => {
  switch (error.type) {
    case 'required':
      return errorMessage.requiredUsername;
  }
};

const nameError = (error) => {
  switch (error.type) {
    case 'required':
      return errorMessage.requiredName;
  }
};
