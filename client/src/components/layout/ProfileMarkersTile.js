import React from "react"
import { Card } from 'antd';
const { Meta } = Card;

const ProfileMarkersTile = ({ marker }) => {

  return(
    <Card
      hoverable
      style={{ width: "350px" }}
      cover={
        <img 
          alt="user photo" 
          src={marker.photo} 
          style={{ 
            objectFit: "cover",
            width: "340px",
            height: "340px"
          }}
        />
      }
      title={marker.title}
    >
      <Meta 
      description={marker.user.userName}
      />
      <p>{marker.caption}</p>
    </Card>
  )
}

export default ProfileMarkersTile