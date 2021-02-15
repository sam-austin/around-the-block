import React, { useState, useEffect } from "react"
import { Card } from 'antd';
const { Meta } = Card;

const ProfileMarkersTile = props => {

  return(
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="user photo" src={props.userMarker.photo} />}
    >
      <Meta title="Soon to be dynamic" description={props.userMarker.caption} />
    </Card>
  )
}

export default ProfileMarkersTile