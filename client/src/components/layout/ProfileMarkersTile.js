import React from "react"
import { Card } from 'antd';
const { Meta } = Card;

const ProfileMarkersTile = props => {

  return(
    <Card
      hoverable
      style={{ width: 350}}
      cover={<img alt="user photo" src={props.userMarker.photo} />}
      title={props.userMarker.title}
    >
      <Meta 
      description={props.userMarker.user.userName}
      />
      <p>{props.userMarker.caption}</p>
    </Card>
  )
}

export default ProfileMarkersTile