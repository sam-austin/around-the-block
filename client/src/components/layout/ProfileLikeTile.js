import React, { useState, useEffect } from "react"

import { Button } from 'antd';
import { HeartFilled, HeartTwoTone } from '@ant-design/icons'

const ProfileLikeTile = ({ fetchedSelected, currentUser, addNewLikeProfile, removeLike }) => {
  const [likedPhoto, setLikedPhoto] = useState(false)

  useEffect(() => {
    fetchedSelected.likes.forEach(like => {
      if (like.userId === currentUser.id && like.liked === 1) {
        setLikedPhoto(true)
      }
    })
  }, [])
  
  let heartButton 
  if (likedPhoto === false) {
    heartButton = (
      <HeartTwoTone 
        twoToneColor="#ff0000" 
        style={{ fontSize: '22px'}} 
      />
    )
  } else if (likedPhoto === true) {
    heartButton = (
    <HeartFilled 
      style={{color: "#ff0000", fontSize: '22px'}} 
    />
    )
  }

  const onClickLikeHandler = event => {
    event.preventDefault()
    if (likedPhoto === false) {
      addNewLikeProfile({ liked: 1, markerId: fetchedSelected.id })
      setLikedPhoto(true)
    } else if (likedPhoto === true) {
      removeLike({ markerId: fetchedSelected.id })
      setLikedPhoto(false)
    }
  }

  return(
    <Button 
      size="small"
      icon={heartButton}
      type="link"
      style={{float: "right"}}
      onClick={onClickLikeHandler}
    /> 
  )
}

export default ProfileLikeTile



