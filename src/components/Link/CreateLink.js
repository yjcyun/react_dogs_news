import React from 'react';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';

const INITIAL_STATE = {
  description: '',
  url: ''
};

const CreateLink = () => {
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  function handleCreateLink() {
    console.log('link created');
  }

  return (
    <div className="ui container">
      <form onSubmit={handleSubmit} className="ui form">
        <div className={errors.url ? "field error" : 'field'}>
          <input
            type="text"
            name="description"
            placeholder="A description for your link"
            autoComplete="off"
            onChange={handleChange}
            value={values.description}
          />
          {errors.description &&
            <div className="ui pointing red basic label">{errors.description}</div>}
        </div>
        <div className={errors.url ? "field error" : 'field'}>
          <input
            type="text"
            name="url"
            placeholder="The URL for the link"
            autoComplete="off"
            onChange={handleChange}
            value={values.url}
          />
          {errors.url &&
            <div className="ui pointing red basic label">{errors.url}</div>}
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    </div>

  )
}

export default CreateLink
