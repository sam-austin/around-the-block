import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

import getCurrentUser from "../../services/getCurrentUser";

const LandingPage = props => {
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return(
    <Layout className="layout">
      <Header></Header>
      <Content>
        <div className="landing-page landing-bg">
          <div className="landing-text">
            <h1 className="landing-title">Capture.Share.Explore.</h1>
            <p className="landing-subheader">
              Pin photos around your neighborhood directly on the map!
            </p>
            <div className="get-started-button">
              {currentUser ? (<Link to="/map" className="rounded-button-extra button salmon large">
                    Get Started
                  </Link>) :
                  (<Link to="/users/new" className="rounded-button-extra button salmon large">
                    Get Started
                  </Link>)
                }
              </div>
          </div>
        </div>
      </Content>
    <Footer style={{ textAlign: 'center', height: "25px"}}>
      <div className="attr-text">
        Map icons provided by  <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">  DinosoftLabs</a> and <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div> 
    </Footer>
  </Layout>
  )
}

export default LandingPage


