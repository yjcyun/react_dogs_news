import React, { useState } from 'react'
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const Login = (props) => {
  const { handleChange, handleSubmit, handleBlur, errors, isSubmitting, values
  } = useFormValidation(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );

  // state
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  // firebase authenticate user
  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
    }
    catch (err) {
      console.log('Authentication Error', err);
      setFirebaseError(err.message);
    }
  }

  return (
    <div className="ui container">
      <h2>{login ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="ui form">
        {!login && <div className="field">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="off"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
          />
        </div>
        }
        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            autoComplete="off"
            onChange={handleChange}
            values={values.email}
            onBlur={handleBlur}
            className={errors.email && ''}
          />
          {errors.email &&
            <div className="ui pointing red basic label">
              {errors.email}
            </div>
          }
        </div>

        <div className="field">
          <input
            type="password"
            name="password"
            placeholder="Choose a secure password"
            autoComplete="current-password"
            onChange={handleChange}
            values={values.password}
            onBlur={handleBlur}
            className={errors.password && ''}
          />
          {errors.password &&
            <div className="ui pointing red basic label">{errors.password}</div>}
          {firebaseError && 
          <div className="ui pointing red basic label">{firebaseError}</div>
          }
        </div>
        <button className="ui button" type="submit" disabled={isSubmitting} style={{ background: isSubmitting ? 'grey' : 'teal', color: isSubmitting ? 'black' : 'white' }}>Submit</button>
        <button
          className="ui button"
          type="button"
          onClick={() => setLogin(prevLogin => !prevLogin)}
        >
          {login ? 'Need to create an account?' : 'Already have an account?'}
        </button>
      </form>
    </div>
  )
}

export default Login
