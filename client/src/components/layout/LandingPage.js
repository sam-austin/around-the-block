import React from "react"

import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const LandingPage = props => {

  return(
    <Layout className="layout">
      <Header></Header>
      <Content>
        <div className="landing-page">
          <p className="landing-title subheader">capture.share.explore.</p>
        </div>
      </Content>
    <Footer style={{ textAlign: 'center' }}>
      <div className="attr-text">
        Map icons provided by  <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">  DinosoftLabs</a> and <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div> 
    </Footer>
  </Layout>
  )
}

export default LandingPage


