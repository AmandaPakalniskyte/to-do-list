import Validator from '../validator.js';

const todoValidator = ({ title }) => {
  const errors = {};

  const titleValidator = new Validator(title)
    .required('Wish field cannot be empty')
    .min(3, 'Must have more than 3 characters')
    .max(50, 'Must have less than 50 characters');
  if (titleValidator.hasErrors) errors.title = titleValidator.HTMLError;

  return errors;
}

export default todoValidator;
