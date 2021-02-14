import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

import { Layout, Menu } from 'antd';
const { Header } = Layout;

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <Menu.Item key="sign-up" style={{float: "right"}}>
      <Link to="/users/new">Sign Up</Link>
    </Menu.Item>,
    <Menu.Item  key="sign-in" style={{float: "right"}}>
      <Link to="/user-sessions/new">Sign In</Link>
    </Menu.Item>,
  ];

  const authenticatedListItems = [
    <Menu.Item key="sign-out" style={{float: "right"}}>
      <SignOutButton />
    </Menu.Item>,
    <Menu.Item key="3" style={{float: "right"}}>
      <Link to="/map">Map</Link>
    </Menu.Item>,
  ];

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">Around the Block</div>
        <Menu theme="dark" mode="horizontal">
          {user ? authenticatedListItems : unauthenticatedListItems}
          <Menu.Item key="2" style={{float: "right"}}>
            <Link to="/">Home</Link>
          </Menu.Item>  
        </Menu>
      </Header>
    </Layout>
  );
};

export default TopBar;