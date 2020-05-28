import React, { useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';

const INITIAL_STATE = {
  description: '',
  url: ''
};

const CreateLink = (props) => {
  const { firebase, user } = useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  function handleCreateLink() {
    if (!user) {
      props.history.push('/login')
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        votes: [],
        comments: [],
        created: Date.now()
      };
      firebase.db.collection('links').add(newLink);
      props.history.push('/');
    }
  }

  return (
    <div className="ui container">
      <div className="ui segment">
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
              type="url"
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
    </div>
  )
}

export default CreateLink
