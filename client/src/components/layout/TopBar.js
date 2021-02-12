import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
    <li>
      <Link to="/mymap">My Map</Link>
    </li>,
    <li>
    <Link to="/discover">Discover</Link>
    </li>,
  ];

  const emptyLiTag = <li></li>

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu callout">
          <li className="menu-text">Around the Block</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <ul className="menu">{user ? authenticatedListItems[1] : emptyLiTag}</ul>
          <ul className="menu">{user ? authenticatedListItems[2] : emptyLiTag}</ul>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems[0] : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;