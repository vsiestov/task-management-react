import { regExp } from './regexp';
import { validationMessages } from './constants';

export const isItemValid = (errors, form, name) => {
  errors[name] = '';
  let isValid = true;

  switch (name) {
    case 'description':
      if (!form.description || form.description.length < 10) {
        errors[name] = validationMessages.description;
      }
      break;

    case 'password':
      if (!form.password || form.password.length < 6) {
        errors[name] = validationMessages.password;
      }
      break;

    case 'email':
      if (!form.email) {
        errors.email = validationMessages.email.required;

        isValid = false;
      } else if (!regExp.email.test(form.email)) {
        errors.email = validationMessages.email.invalid;

        isValid = false;
      }
      break;

    default:
      if (!form[name] && validationMessages[name]) {
        errors[name] = validationMessages[name];
        isValid = false;
      }
  }

  return isValid;
};

export const isFormValid = (form, errors = {}) => {
  let counter = 0;

  for (const item in form) {

    if (form.hasOwnProperty(item)) {
      if (!isItemValid(errors, form, item)) {
        counter++;
      }
    }

  }

  return !counter;
};
