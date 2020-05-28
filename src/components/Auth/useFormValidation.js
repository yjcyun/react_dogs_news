import React, { useState, useEffect } from 'react'

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('Authenticated');
        setSubmitting(false);
      }
      else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = event => {
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }))
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }
  const handleSubmit = event => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log({ values });
  }

  return { handleChange, handleSubmit, handleBlur, errors, isSubmitting, values }
}

export default useFormValidation
