import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authAction"
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Avatar from "./Avatar";

const Header = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ];

  const { auth, theme } = useSelector(state => state);
  const dispatch = useDispatch();

  const {  pathname } = useLocation();

  const isActive = (pn) => {
    if(pathname === pn) return "active"
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
      <Link to={"/"} className="navbar-brand" href="#">
        <h1 className="navbar-brand text-uppercase p-0 m-0">V-Network</h1>
      </Link>

      <div className="menu">
        <ul className="navbar-nav flex-row">

          {navLinks.map((link, index) => (
            <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
              <Link to={link.path} className="nav-link" href="#">
                <span className="material-icons">{link.icon}</span>
              </Link>
            </li>
          ))}

         
          <li className="nav-item dropdown" style={{opacity: 1}}>
            <span
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Avatar src={auth.user.avatar} size="medium-avatar" /> 
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={`/profile/${auth.user._id}`} className="dropdown-item">
                Profile
              </Link>
              <label htmlFor="theme" className="dropdown-item" onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>{ theme ? "Light mode": "Dark mode" }</label>
              <div className="dropdown-divider"></div>
              <Link to={"/"} className="dropdown-item" onClick={() => dispatch(logout())}>
               Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
