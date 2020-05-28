import React, { useState } from 'react'

const Login = (props) => {
  const [login, setLogin] = useState(true);

  return (
    <div className="ui container">
      <h2>{login ? 'Login' :'Create Account'}</h2>
      <form className="ui form">
        {!login && <div className="field">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="off"
          />
        </div>
        }
        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            autoComplete="off"
          />
        </div>
        <div className="field">
          <input
            type="password"
            name="password"
            placeholder="Choose a secure password"
          />
        </div>
        <button className="ui button" type="submit">Submit</button>
        <button
          className="ui button"
          type="button"
          onClick={() => setLogin(prevLogin => !prevLogin)}
        >{login ? 'Need to create an account?':'Already have an account?'}
        </button>
      </form>
    </div>
  )
}

export default Login
