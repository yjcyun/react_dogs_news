const validateLogin = (values) => {
  let errors={};

  // email errors
  if(!values.email) {
    errors.email = 'Email is required';
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalide email address"
  }

  // password errors
  if(!values.password) {
    errors.password = 'Password is required';
  }
  else if (values.password.length < 6) {
    errors.password = 'Password must be 6 characters or more';
  }
  return errors;

}

export default validateLogin
