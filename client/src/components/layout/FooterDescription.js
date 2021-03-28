import React from "react"
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined
} from '@ant-design/icons';

const FooterDescription = props => {

  return(
    <div 
      className="grid-x grid-margin-x" 
      style={{ paddingBottom: "15px" }}
    >
      <div className="cell medium-6 large-6">
        <h6 className="footer-title"><b>About the Developer</b></h6>
        <div className="grid-x grid-margin-x dev-card">
          <div className="cell medium-6 large-6">
            <img alt="example" src="https://avatars.githubusercontent.com/u/60296310?s=460&u=fcae51be82a9c8f425ac59f99d2bdfc173068e62&v=4" />
          </div>
          <div className="cell medium-6 large-6" style={{ paddingBottom: "25px" }}>
            <p><b>Samson Park</b></p> 
            <p>
              Cornell '14, former Scrum Master who fell in love with coding. Prior career in biomedical research & health care. Huge fan of basketball, food, and oh, yeah, alpacas.
            </p>
          </div>
        </div>
      </div>
      <div className="cell medium-6 large-6">
          <h6 className="footer-title"><b>Contact</b></h6>
          <p>
            <GithubOutlined key="github" style={{ fontSize: "16px" }} /> GitHub: <a href="https://github.com/sam-austin" target="_blank">github.com/sam-austin</a>
          </p>
          <p>
            <LinkedinOutlined key="linkedin" style={{ fontSize: "16px" }} /> LinkedIn: <a href="https://www.linkedin.com/in/samson-park/" target="_blank">linkedin.com/in/samson-park/</a>
          </p>
          <p>
            <MailOutlined style={{ fontSize: "16px" }} /> Email: <a href="mailto:samson.park1@gmail.com">samson.park1@gmail.com</a>
          </p>
      </div>
    </div>
  )
}

export default FooterDescription