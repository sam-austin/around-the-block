import React from "react"
import { Card } from 'antd';
const { Meta } = Card;

const LikedMarkersTile = ({likedMarker}) => {

  return(
    <Card
      hoverable
      style={{ width: "350px" }}
      cover={
        <img 
          alt="user photo" 
          src={likedMarker.photo} 
          style={{ 
            objectFit: "cover",
            width: "340px",
            height: "340px"
          }}
        />
      }
      title={likedMarker.title}
    >
      <Meta 
      description={likedMarker.user.userName}
      />
      <p>{likedMarker.caption}</p>
    </Card>
  )
}

export default LikedMarkersTile