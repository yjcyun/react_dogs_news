import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <div className="ui teal inverted top menu">
      <div className="item">
        <img src="/logo.png" alt="Dog News Logo" />
        <NavLink to="/">
          Dogs News
        </NavLink>
      </div>

      <NavLink to="/new" className="item">
        New
      </NavLink>
      <NavLink to="/top" className="item">
        Top
      </NavLink>
      <NavLink to="/search" className="item">
        Search
      </NavLink>
      <NavLink to="/create" className="item">
        Submit
      </NavLink>

    <div className="right menu">
        <NavLink to="/login" className="item">
          Login
      </NavLink>
    </div>
    </div>
  )
}

export default withRouter(Header);
