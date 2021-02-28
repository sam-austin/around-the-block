import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import {
  CameraOutlined,
  HomeOutlined,
  GlobalOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';


import { Layout, Menu } from 'antd';
const { Header } = Layout;

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <Menu.Item key="sign-up" style={{float: "right"}}>
      <Link to="/users/new"><UserOutlined />Sign Up</Link>
    </Menu.Item>,
    <Menu.Item  key="sign-in" style={{float: "right"}}>
      <Link to="/user-sessions/new"><LoginOutlined />Sign In</Link>
    </Menu.Item>,
  ];

  const authenticatedListItems = [
    <Menu.Item key="sign-out" style={{float: "right"}}>
      <SignOutButton />
    </Menu.Item>,
    <Menu.Item key="4" style={{float: "right"}}>
      <Link to="/myphotos"><CameraOutlined />My Photos</Link>
    </Menu.Item>,
    <Menu.Item key="3" style={{float: "right"}}>
      <Link to="/map"><GlobalOutlined />Map</Link>
    </Menu.Item>,
  ];

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu theme="dark" mode="horizontal" style={{fontSize: "15.5px"}}>
        <Menu.Item key="1" style={{float: "left"}}>
          <Link to="/">
            <div className="logo"><img src="https://around-the-block.s3.amazonaws.com/ABTPink-text-ht-adj12.png"/></div>
          </Link>
        </Menu.Item>
        {user ? authenticatedListItems : unauthenticatedListItems}
        <Menu.Item key="2" style={{float: "right"}}>
          <Link to="/"><HomeOutlined />Home</Link>
        </Menu.Item>  
      </Menu>
    </Header>
  );
};

export default TopBar;