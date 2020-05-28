import React, { useState } from 'react'
import useFormValidation from './useFormValidation';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const Login = (props) => {
  const { handleChange, handleSubmit, values } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = useState(true);

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
          />
        </div>
        <div className="field">
          <input
            type="password"
            name="password"
            placeholder="Choose a secure password"
            autoComplete="current-password"
            onChange={handleChange}
            values={values.password}
          />
        </div>
        <button className="ui button" type="submit">Submit</button>
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
