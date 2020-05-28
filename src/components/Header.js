import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <div className="ui stackable teal inverted top menu">
      <div className="item">
        <img src="/logo.png" alt="Dog News Logo" />
        {/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> */}
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
