import React, { useState, useContext } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';


const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <div className="ui teal inverted top menu">
      <div className="item">
        <img src="/logo.png" alt="Dog News Logo" />
        {/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> */}
        <NavLink to="/">
          Dogs News
        </NavLink>
      </div>
      {/* <button className="menu-bar">
        <i className="bars icon"></i>
      </button> */}

      <NavLink to="/new" className="item">
        New
      </NavLink>
      <NavLink to="/top" className="item">
        Top
      </NavLink>
      <NavLink to="/search" className="item">
        Search
      </NavLink>
      {user && <NavLink to="/create" className="item">
        Submit
      </NavLink>}

      <div className="right menu">
        {user
          ? (<>
            <div className="item">{user.displayName}</div>
            <div className="item logout" onClick={() => firebase.logout()}>Logout</div>
          </>)
          : (<NavLink to="/login" className="item">
            Login
          </NavLink>)
        }
      </div>
    </div>

  )
}

export default withRouter(Header);
