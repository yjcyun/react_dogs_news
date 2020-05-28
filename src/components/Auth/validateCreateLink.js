const validateCreateLink = (values) => {
  let errors = {};

  // Description errors
  if (!values.description) {
    errors.description = 'Description is required';
  }
  else if (values.description.length< 10) {
    errors.description = "Description must be 10 characters or more"
  }

  // URL errors
  if (!values.url) {
    errors.url = 'URL is required';
  }
  else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = 'URL must be valid';
  }
  return errors;
}

export default validateCreateLink
