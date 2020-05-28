import React,{useState} from 'react'

const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = event =>{
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]:event.target.value
    }))
  };

  const handleSubmit= event=>{
    event.preventDefault();
    console.log({values});
  }

  return {handleChange, handleSubmit, values}
}

export default useFormValidation
